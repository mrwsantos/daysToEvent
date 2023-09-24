export declare let self: ServiceWorkerGlobalScope;
declare let registration: ServiceWorkerRegistration;

self.addEventListener("push", function (event: PushEvent) {
  const message = event.data?.text() ?? "";

  event.waitUntil(
    registration.showNotification("Loft - Ibiúna", {
      body: message,
      icon: "/android-icon-192x192.png",
    })
  );
});
