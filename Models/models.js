/**
 * FLT ACADEMY DATA MODEL
 * Manages local persistence via IndexedDB to ensure the portal remains 
 * fully operational in environments without internet connectivity.
 */

const DB_NAME = 'FLT_Academy_DB';
const DB_VERSION = 1;
const STORE_NAME = 'sync-queue';

/**
 * DATABASE INITIALIZATION
 * Opens a connection to the client-side database. 
 * IndexedDB is utilized for its high storage limits, allowing for large payloads 
 * such as Base64 encoded receipt images.
 */
function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        // Schema management: defines the structure for local storage
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                // Auto-incrementing IDs allow for a FIFO (First-In-First-Out) sync queue
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

/**
 * OFFLINE PERSISTENCE ENGINE
 * Captures form data and serializes it into the local sync queue.
 * This function is the "Safety Buffer" that prevents data loss during ramp operations.
 * * @param {string} type - The report category (e.g., 'DISPATCH', 'STAGE_CHECK')
 * @param {Object} formData - Key-value pairs of the submitted form
 */

async function saveToSyncQueue(type, formData) {
    try {
        const db = await openDatabase();
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        const record = {
            type: type,
            data: formData,
            timestamp: Date.now() // Track submission time for chronological syncing
        };

        await new Promise((resolve, reject) => {
            const request = store.add(record);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });

        if ('serviceWorker' in navigator && 'SyncManager' in window) {
            const registration = await navigator.serviceWorker.ready;
            await registration.sync.register('flt-sync-queue');
        }

    } catch (error) {
        console.error("Critical Data Error: Failed to save to local queue.", error);
        throw error;
    }
}

/**
 * IMAGE SERIALIZATION UTILITY
 * Converts raw File objects from the camera or library into Base64 strings.
 * This allows binary image data to be stored as simple text within IndexedDB.
 */

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => {
            console.error("Image Processing Error:", error);
            reject(error);
        };
    });
}