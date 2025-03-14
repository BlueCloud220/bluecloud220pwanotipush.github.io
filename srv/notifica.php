<?php

require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . "/../lib/php/ejecutaServicio.php";
require_once __DIR__ . "/../lib/php/recuperaTexto.php";
require_once __DIR__ . "/../lib/php/validaMensaje.php";
require_once  __DIR__ . "/../lib/php/select.php";
require_once  __DIR__ . "/../lib/php/devuelveJson.php";
require_once  __DIR__ . "/Bd.php";
require_once __DIR__ . "/TABLA_SUSCRIPCION.php";
require_once __DIR__ . "/Suscripcion.php";
require_once __DIR__ . "/suscripcionElimina.php";

use Minishlink\WebPush\WebPush;

const AUTH = [
    "VAPID" => [
        "subject" => "https://notificacionesphp.gilbertopachec2.repl.co/",
        "publicKey" => "BBvrWghrlEvYhq6ztbCurCZcY-9jZzCdINXJ9qi2dEJetj-9B5tIeAGZHarRb5ynUYo6SRg3S-MfAoUXbI6x4SI",
        "privateKey" => "qmPK-3KbmaOhQboxMgDZ3adXyGfr5_sO0E-eaCh3z-A"
    ]
];

ejecutaServicio(function () {
    
    $webPush = new WebPush(AUTH);
    $mensaje = recuperaTexto("mensaje");
    $mensaje = validaMensaje($mensaje);
    // Envia el mensaje a todas las suscripciones.

    $pdo = Bd::pdo();

    $suscripciones = select(
        pdo: $pdo,
        from: SUSCRIPCION,
        mode: PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE,
        opcional: Suscripcion::class
    );

    foreach ($suscripciones as $suscripcion) {
        $webPush->queueNotification($suscripcion, $mensaje);
    }
    $reportes = $webPush->flush();

    // Genera el reporte de envio a cada suscripcion.
    $reporteDeEnvios = "";
    foreach ($reportes as $reporte) {
        $endpoint = $reporte->getRequest()->getUri();
        $htmlEndpoint = htmlentities($endpoint);
        if ($reporte->isSuccess()) {
            // Reporte de éxito.
            $reporteDeEnvios .= "<dt>$htmlEndpoint</dt><dd>Éxito</dd>";
        } else {
            if ($reporte->isSubscriptionExpired()) {
                suscripcionElimina($pdo, $endpoint);
            }
            // Reporte de fallo.
            $explicacion = htmlentities($reporte->getReason());
            $reporteDeEnvios .= "<dt>$endpoint</dt><dd>Fallo: $explicacion</dd>";
        }
    }

    devuelveJson(["reporte" => ["innerHTML" => $reporteDeEnvios]]);
});
