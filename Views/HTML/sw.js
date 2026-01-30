/**
 * FLT ACADEMY SERVICE WORKER
 * Version: 1.0.0
 * * Responsibilities:
 * 1. Pre-caching the "App Shell" for instant offline loading.
 * 2. Intercepting network requests to serve cached assets.
 * 3. Managing Background Sync for IndexedDB form persistence.
 */

const CACHE_NAME = 'flt-portal-v1';

// Assets required for the application to function without a data connection
const ASSETS_TO_CACHE = [
  './index.html',
  '../CSS/style.css',
  '../../Controllers/app.js',
  '../../Models/models.js',
  './manifest.json'
];

/**
 * INSTALL EVENT
 * Triggered when the browser first detects the Service Worker.
 * Populates the Cache Storage with the App Shell.
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('FLT SW: Pre-caching App Shell');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Forces the new Service Worker to become active immediately
});

/**
 * ACTIVATE EVENT
 * Performs cleanup of legacy cache versions to manage device storage efficiently.
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

/**
 * FETCH INTERCEPTOR
 * Cache-First Strategy: Serves local assets instantly to improve performance 
 * and enable offline access in low-connectivity areas (ramps/hangars).
 */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

/**
 * BACKGROUND SYNC ENGINE
 * Automatically triggers when the device regains internet connectivity.
 * Processes the FIFO (First-In-First-Out) queue from IndexedDB.
 */
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-flt-forms') {
        event.waitUntil(processSyncQueue());
    }
});

/**
 * PROCESS SYNC QUEUE
 * Connects to IndexedDB, retrieves pending reports, and simulates transmission.
 * In production, this replaces console.log with an authenticated fetch() request.
 */

const syncChannel = new BroadcastChannel('flt-sync-notifications');

async function processSyncQueue() {
    console.log('FLT SW: Background Sync Initialized');
    const dbRequest = indexedDB.open('FLT_Academy_DB', 1);

    dbRequest.onsuccess = async (event) => {
        const db = event.target.result;
        const transaction = db.transaction('sync-queue', 'readwrite');
        const store = transaction.objectStore('sync-queue');
        const allRecords = store.getAll();

        allRecords.onsuccess = async () => {
            const records = allRecords.result;
            if (records.length === 0) return;

            for (const record of records) {
                // Simulate successful transmission
                db.transaction('sync-queue', 'readwrite').objectStore('sync-queue').delete(record.id);
            }

            // The "Magic" Bridge: Tell the UI we finished
            syncChannel.postMessage({ 
                type: 'SYNC_COMPLETE', 
                count: records.length 
            });
        };
    };
}