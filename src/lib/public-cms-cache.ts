/**
 * Short-lived in-process cache for public CMS reads.
 * Dedupes concurrent loads for the same key (request stampede).
 */
type CacheEntry = { value: unknown; expiresAt: number };

const store = new Map<string, CacheEntry>();
const inflight = new Map<string, Promise<unknown>>();

/** Default TTL: 45s — fresh enough for CMS edits, enough to cut MySQL on warm traffic. */
export const PUBLIC_CMS_CACHE_TTL_MS = 45_000;

export async function cachedPublic<T>(
  key: string,
  loader: () => Promise<T>,
  ttlMs: number = PUBLIC_CMS_CACHE_TTL_MS,
): Promise<T> {
  const now = Date.now();
  const hit = store.get(key);
  if (hit && hit.expiresAt > now) {
    return hit.value as T;
  }

  const pending = inflight.get(key);
  if (pending) {
    return pending as Promise<T>;
  }

  const promise = loader()
    .then((value) => {
      store.set(key, { value, expiresAt: Date.now() + ttlMs });
      inflight.delete(key);
      return value;
    })
    .catch((err) => {
      inflight.delete(key);
      throw err;
    });

  inflight.set(key, promise);
  return promise;
}

export function invalidatePublicCmsCache(prefix?: string): void {
  if (!prefix) {
    store.clear();
    return;
  }
  for (const key of store.keys()) {
    if (key === prefix || key.startsWith(`${prefix}:`) || key.startsWith(prefix)) {
      store.delete(key);
    }
  }
}
