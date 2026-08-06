/* YatraNexus — cache CMS images in the browser (Cache Storage), not cookies.
   Cookies cannot hold images and would slow every request. */
const CACHE_NAME = "yn-images-v1";
const MAX_ENTRIES = 120;

function isCacheable(url) {
  try {
    const u = new URL(url);
    if (u.origin !== self.location.origin) return false;
    return (
      u.pathname.startsWith("/images/") ||
      u.pathname.startsWith("/assets/") ||
      u.pathname === "/favicon.png"
    );
  } catch {
    return false;
  }
}

async function trimCache(cache) {
  const keys = await cache.keys();
  if (keys.length <= MAX_ENTRIES) return;
  const overflow = keys.length - MAX_ENTRIES;
  for (let i = 0; i < overflow; i++) {
    await cache.delete(keys[i]);
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((n) => n.startsWith("yn-images-") && n !== CACHE_NAME)
          .map((n) => caches.delete(n)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || !isCacheable(req.url)) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(req);
      if (cached) return cached;

      try {
        const res = await fetch(req);
        if (res.ok && (res.type === "basic" || res.type === "cors")) {
          await cache.put(req, res.clone());
          await trimCache(cache);
        }
        return res;
      } catch (err) {
        if (cached) return cached;
        throw err;
      }
    })(),
  );
});
