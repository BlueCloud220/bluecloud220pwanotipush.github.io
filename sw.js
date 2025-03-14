/* Este archivo debe estar colocado en la carpeta raíz del sitio.
 *
 * Cualquier cambio en el contenido de este archivo hace que el service
 * worker se reinstale. */

/**
 * Cambia el número de la versión cuando cambia el contenido de los
 * archivos.
 *
 * El número a la izquierda del punto (.), en este caso <q>1</q>, se
 * conoce como número mayor y se cambia cuando se realizan
 * modificaciones grandes o importantes.
 *
 * El número a la derecha del punto (.), en este caso <q>00</q>, se
 * conoce como número menor y se cambia cuando se realizan
 * modificaciones menores.
 */
const VERSION = "6.01";

/**
 * Nombre de la carpeta de caché.
 */
const CACHE = "pushwave";

/**
 * Archivos requeridos para que la aplicación funcione fuera de
 * línea.
 */
const ARCHIVOS = [
  "ayuda.html",
  "composer.json",
  "composer.lock",
  "favicon.ico",
  "index.html",
  "site.webmanifest",
  "css/dark-hc.css",
  "css/dark-mc.css",
  "css/dark.css",
  "css/estilos.css",
  "css/light-hc.css",
  "css/light-mc.css",
  "css/light.css",
  "css/transicion_pestanas.css",
  "error/authtokenincorrecto.html",
  "error/contentencodingincorrecta.html",
  "error/datosnojson.html",
  "error/endpointincorrecto.html",
  "error/errorinterno.html",
  "error/faltamensaje.html",
  "error/mensajeenblanco.html",
  "error/publickeyincorrecta.html",
  "error/resultadonojson.html",
  "img/icono2048.png",
  "img/maskable_icon.png",
  "img/maskable_icon_x128.png",
  "img/maskable_icon_x192.png",
  "img/maskable_icon_x384.png",
  "img/maskable_icon_x48.png",
  "img/maskable_icon_x512.png",
  "img/maskable_icon_x72.png",
  "img/maskable_icon_x96.png",
  "img/screenshot_horizontal.png",
  "img/screenshot_horizontal_2.png",
  "img/screenshot_horizontal_3.png",
  "img/screenshot_vertical.png",
  "img/screenshot_vertical_2.png",
  "img/screenshot_vertical_3.png",
  "img/screenshot_vertical_4.png",
  "js/configura.js",
  "js/nav-tab-fixed.js",
  "js/registraServiceWorker.js",
  "lib/css/material-symbols-outlined.css",
  "lib/css/md-filled-button.css",
  "lib/css/md-filled-text-field.css",
  "lib/css/md-list.css",
  "lib/css/md-menu.css",
  "lib/css/md-outline-button.css",
  "lib/css/md-ripple.css",
  "lib/css/md-slider-field.css",
  "lib/css/md-standard-icon-button.css",
  "lib/css/md-tab.css",
  "lib/css/md-top-app-bar.css",
  "lib/css/roboto.css",
  "lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].codepoints",
  "lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].ttf",
  "lib/fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].woff2",
  "lib/fonts/roboto-v32-latin-regular.woff2",
  "lib/js/abreElementoHtml.js",
  "lib/js/activaNotificacionesPush.js",
  "lib/js/calculaDtoParaSuscripcion.js",
  "lib/js/cancelaSuscripcionPush.js",
  "lib/js/cierraElementoHtml.js",
  "lib/js/consumeJson.js",
  "lib/js/enviaJson.js",
  "lib/js/exportaAHtml.js",
  "lib/js/getAttribute.js",
  "lib/js/getSuscripcionPush.js",
  "lib/js/muestraError.js",
  "lib/js/muestraObjeto.js",
  "lib/js/ProblemDetails.js",
  "lib/js/querySelector.js",
  "lib/js/resaltaSiEstasEn.js",
  "lib/js/submitForm.js",
  "lib/js/suscribeAPush.js",
  "lib/js/urlBase64ToUint8Array.js",
  "lib/js/const/ES_APPLE.js",
  "lib/js/custom/md-menu-button.js",
  "lib/js/custom/md-options-menu.js",
  "lib/js/custom/md-overflow-button.js",
  "lib/js/custom/md-overflow-menu.js",
  "lib/js/custom/md-select-menu.js",
  "lib/js/custom/md-slider-field.js",
  "lib/js/custom/md-top-app-bar.js",
  "lib/js/custom/MdNavigationDrawer.js",
  "material-tokens/css/baseline.css",
  "material-tokens/css/colors.css",
  "material-tokens/css/elevation.css",
  "material-tokens/css/motion.css",
  "material-tokens/css/palette.css",
  "material-tokens/css/shape.css",
  "material-tokens/css/state.css",
  "material-tokens/css/typography.css",
  "ungap/custom-elements.js",
  "vendor/brick/math/CHANGELOG.md",
  "vendor/brick/math/composer.json",
  "vendor/brick/math/LICENSE",
  "vendor/composer/LICENSE",
  "vendor/guzzlehttp/guzzle/CHANGELOG.md",
  "vendor/guzzlehttp/guzzle/composer.json",
  "vendor/guzzlehttp/guzzle/LICENSE",
  "vendor/guzzlehttp/guzzle/README.md",
  "vendor/guzzlehttp/guzzle/UPGRADING.md",
  "vendor/guzzlehttp/promises/CHANGELOG.md",
  "vendor/guzzlehttp/promises/composer.json",
  "vendor/guzzlehttp/promises/LICENSE",
  "vendor/guzzlehttp/promises/README.md",
  "vendor/guzzlehttp/psr7/CHANGELOG.md",
  "vendor/guzzlehttp/psr7/composer.json",
  "vendor/guzzlehttp/psr7/LICENSE",
  "vendor/guzzlehttp/psr7/README.md",
  "vendor/minishlink/web-push/composer.json",
  "vendor/minishlink/web-push/LICENSE",
  "vendor/psr/clock/CHANGELOG.md",
  "vendor/psr/clock/composer.json",
  "vendor/psr/clock/LICENSE",
  "vendor/psr/clock/README.md",
  "vendor/psr/http-client/CHANGELOG.md",
  "vendor/psr/http-client/composer.json",
  "vendor/psr/http-client/LICENSE",
  "vendor/psr/http-client/README.md",
  "vendor/psr/http-factory/composer.json",
  "vendor/psr/http-factory/LICENSE",
  "vendor/psr/http-factory/README.md",
  "vendor/psr/http-message/CHANGELOG.md",
  "vendor/psr/http-message/composer.json",
  "vendor/psr/http-message/LICENSE",
  "vendor/psr/http-message/README.md",
  "vendor/psr/http-message/docs/PSR7-Interfaces.md",
  "vendor/psr/http-message/docs/PSR7-Usage.md",
  "vendor/ralouphie/getallheaders/composer.json",
  "vendor/ralouphie/getallheaders/LICENSE",
  "vendor/ralouphie/getallheaders/README.md",
  "vendor/spomky-labs/base64url/composer.json",
  "vendor/spomky-labs/base64url/LICENSE",
  "vendor/spomky-labs/base64url/.github/FUNDING.yml",
  "vendor/spomky-labs/pki-framework/composer.json",
  "vendor/spomky-labs/pki-framework/LICENSE",
  "vendor/spomky-labs/pki-framework/README.md",
  "vendor/spomky-labs/pki-framework/SECURITY.md",
  "vendor/symfony/deprecation-contracts/CHANGELOG.md",
  "vendor/symfony/deprecation-contracts/composer.json",
  "vendor/symfony/deprecation-contracts/LICENSE",
  "vendor/symfony/deprecation-contracts/README.md",
  "vendor/web-token/jwt-library/composer.json",
  "vendor/web-token/jwt-library/LICENSE",
  "vendor/web-token/jwt-library/README.md",
  "vendor/web-token/jwt-library/.github/CONTRIBUTING.md",
  "vendor/web-token/jwt-library/.github/FUNDING.yml",
  "vendor/web-token/jwt-library/.github/PULL_REQUEST_TEMPLATE.md",
  "vendor/web-token/jwt-library/.github/stale.yml",
  "/",
];

const URL_SERVIDOR = "https://utnbluecloud2025.infy.uk";

// Verifica si el código corre dentro de un service worker.
if (self instanceof ServiceWorkerGlobalScope) {
  // Evento al empezar a instalar el servide worker,
  self.addEventListener("install", (/** @type {ExtendableEvent} */ evt) => {
    console.log("El service worker se está instalando.");
    evt.waitUntil(llenaElCache());
  });

  // Evento al solicitar información a la red.
  self.addEventListener("fetch", (/** @type {FetchEvent} */ evt) => {
    if (evt.request.method === "GET") {
      evt.respondWith(buscaLaRespuestaEnElCache(evt));
    }
  });

  // Evento cuando el service worker se vuelve activo.
  self.addEventListener("activate", () =>
    console.log("El service worker está activo.")
  );

  // El siguiente código se activa cuando llega una notificación push.
  self.addEventListener("push", (/** @type {PushEvent} */ event) => {
    const notificacion = event.data;
    /* Si el navegador tiene permitido mostrar notificaciones push,
     * nuestra la que se ha recibido. */
    if (notificacion !== null && self.Notification.permission === "granted") {
      event.waitUntil(muestraNotificacion(notificacion));
    }
  });
  self.addEventListener(
    "notificationclick",
    (/** @type {NotificationEvent} */ event) => {
      event.notification.close();
      event.waitUntil(muestraVentana());
    }
  );
}

// Función para llenar el caché con los archivos definidos.
async function llenaElCache() {
  console.log("Intentando cargar caché:", CACHE);
  // Borra todos los cachés.
  const keys = await caches.keys();
  for (const key of keys) {
    await caches.delete(key);
  }
  // Abre el caché de este service worker.
  const cache = await caches.open(CACHE);
  // Carga el listado de ARCHIVOS.
  await cache.addAll(ARCHIVOS);
  console.log("Cache cargado:", CACHE);
  console.log("Versión:", VERSION);
}

/** @param {FetchEvent} evt */
async function buscaLaRespuestaEnElCache(evt) {
  // Abre el caché.
  const cache = await caches.open(CACHE);
  const request = evt.request;
  /* Busca la respuesta a la solicitud en el contenido del caché, sin
   * tomar en cuenta la parte después del símbolo "?" en la URL. */
  const response = await cache.match(request, { ignoreSearch: true });
  if (response === undefined) {
    /* Si no la encuentra, empieza a descargar de la red y devuelve
     * la promesa. */
    return fetch(request);
  } else {
    // Si la encuentra, devuelve la respuesta encontrada en el caché.
    return response;
  }
}

/**
 * @param {PushMessageData} notificacion
 */
async function muestraNotificacion(notificacion) {
  if (self instanceof ServiceWorkerGlobalScope) {
    const mensaje = notificacion.text();
    await self.registration.showNotification(mensaje);
  }
}
async function muestraVentana() {
  if (self instanceof ServiceWorkerGlobalScope) {
    const clientes = await self.clients.matchAll({ type: "window" });
    for (const cliente of clientes) {
      if (cliente.url.startsWith(URL_SERVIDOR)) {
        return cliente.focus();
      }
    }
    return self.clients.openWindow("/");
  }
}
