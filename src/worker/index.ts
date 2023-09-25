export declare let self: ServiceWorkerGlobalScope;
declare let registration: ServiceWorkerRegistration;

self.addEventListener("push", function (event: PushEvent) {
  const data = JSON.parse(event.data?.text() ?? "{}");

  event.waitUntil(
    registration.showNotification(data.title, {
      body: data.message,
      icon: "/android-icon-192x192.png",
    })
  );
});
