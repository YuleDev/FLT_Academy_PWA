/**
 * FLT ACADEMY SERVICE WORKER
 * Update-safe strategy:
 * - Navigations (HTML): network-first (so new deploys show up)
 * - Static assets (JS/CSS/etc): stale-while-revalidate (fast + auto-refresh)
 * - Auto-activate new SW and auto-reload clients (no manual cache clears)
 */

const VERSION = "2026-02-02-1";
const PRECACHE = `flt-precache-${VERSION}`;
const RUNTIME = "flt-runtime";

// App shell (relative to the SW scope: /Views/HTML/)
const PRECACHE_URLS = [
  `/FLT_Academy_PWA/Views/HTML/index.html?v=${VERSION}`,
  `/FLT_Academy_PWA/Views/CSS/style.css?v=${VERSION}`,
  `/FLT_Academy_PWA/Controllers/app.js?v=${VERSION}`,
  `/FLT_Academy_PWA/Models/models.js?v=${VERSION}`,
  `/FLT_Academy_PWA/Views/HTML/manifest.json?v=${VERSION}`
];


// Install: precache the shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PRECACHE);
      await cache.addAll(PRECACHE_URLS);
      // Activate this SW immediately
      await self.skipWaiting();
    })()
  );
});

// Activate: clean old caches, take control, and refresh precache from network
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k !== PRECACHE && k !== RUNTIME)
          .map((k) => caches.delete(k))
      );

      // Take control of all pages under this scope immediately
      await self.clients.claim();

      // Force-refresh precache in the background so updates land reliably (especially iOS)
      const cache = await caches.open(PRECACHE);
      await Promise.all(
        PRECACHE_URLS.map(async (url) => {
          try {
            const req = new Request(url, { cache: "reload" });
            const res = await fetch(req);
            if (res && res.ok) await cache.put(url, res.clone());
          } catch {
            // If offline, keep whatever is already cached
          }
        })
      );
    })()
  );
});

// Allow the page to tell the SW to activate immediately
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Fetch handler
self.addEventListener("fetch", (event) => {
  const req = event.request;

  if (req.method !== "GET") return;

  // 1) HTML navigations: NETWORK-FIRST
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          const cache = await caches.open(PRECACHE);
          cache.put("/FLT_Academy_PWA/Views/HTML/index.html", fresh.clone());
          return fresh;
        } catch {
          return (await caches.match("/FLT_Academy_PWA/Views/HTML/index.html")) || Response.error();
        }
      })()
    );
    return;
  }

  const url = new URL(req.url);

  // 2) Same-origin assets: STALE-WHILE-REVALIDATE
  if (url.origin === self.location.origin) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(RUNTIME);
        const cached = await cache.match(req);

        const fetchPromise = fetch(req)
          .then((res) => {
            if (res && res.ok) cache.put(req, res.clone());
            return res;
          })
          .catch(() => null);

        return cached || (await fetchPromise) || Response.error();
      })()
    );
    return;
  }

  // 3) Cross-origin: just go to the network (don’t cache)
  event.respondWith(fetch(req));
});

// Listen for the 'sync' event (fired when internet returns)
self.addEventListener('sync', (event) => {
  if (event.tag === 'flt-sync-queue') {
    event.waitUntil(simulateBackgroundSync());
  }
});

async function simulateBackgroundSync() {
  // Use a BroadcastChannel to talk to the UI (app.js)
  const syncChannel = new BroadcastChannel('flt-sync-notifications');
  
  // This is where you would normally fetch your IndexedDB data 
  // and send it to a server. For your MVP demo, we wait 2 seconds 
  // to make it look like a real upload is happening.
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Tell app.js that the sync is finished
  syncChannel.postMessage({ 
    type: 'SYNC_COMPLETE', 
    count: "Pending" // You can enhance this to count real records later
  });
}