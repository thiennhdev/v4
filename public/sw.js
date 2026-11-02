/*
 * Kill-switch service worker.
 *
 * The previous Gatsby site registered an offline service worker at /sw.js
 * (gatsby-plugin-offline). Browsers that visited it keep serving the old,
 * cached site until that worker is replaced. When they check for an update
 * they fetch this file, which clears every cache, unregisters itself and
 * reloads open tabs so visitors get the current site.
 */
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      for (const client of clients) client.navigate(client.url);
    })(),
  );
});
