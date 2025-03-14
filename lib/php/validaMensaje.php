<?php

require_once __DIR__ . "/BAD_REQUEST.php";
require_once __DIR__ . "/ProblemDetails.php";

function validaMensaje(false|string $mensaje)
{

    if ($mensaje === false)
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "Falta el mensaje.",
            type: "/error/faltamensaje.html",
            detail: "La solicitud no tiene el valor de mensaje."
        );

    $trimMensaje = trim($mensaje);

    if ($trimMensaje === "")
        throw new ProblemDetails(
            status: BAD_REQUEST,
            title: "Mensaje en blanco.",
            type: "/error/mensajeenblanco.html",
            detail: "Pon texto en el campo mensaje.",
        );

    return $trimMensaje;
}
