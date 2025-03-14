<?php

class Bd
{

  private static ?PDO $pdo = null;

  static function pdo(): PDO
  {
    if (self::$pdo === null) {

      self::$pdo = new PDO(
        // cadena de conexión
        "mysql:host=sql309.infinityfree.com;dbname=if0_38514320_notipush",
        // usuario
        "if0_38514320",
        // contraseña
        "Pm9G4VmFC455qoi",
        // Opciones: pdos no persistentes y lanza excepciones.
        [PDO::ATTR_PERSISTENT => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
      );  

      self::$pdo->exec(
            "CREATE TABLE IF NOT EXISTS SUSCRIPCION (
          SUS_ENDPOINT VARCHAR(500) NOT NULL,
          SUS_PUB_KEY TEXT NOT NULL,
          SUS_AUT_TOK TEXT NOT NULL,
          SUS_CONT_ENCOD TEXT NOT NULL,
          CONSTRAINT SUS_PK PRIMARY KEY(SUS_ENDPOINT),
          CONSTRAINT SUS_ENDPNT_NV CHECK(CHAR_LENGTH(SUS_ENDPOINT) > 0)
        ) ENGINE=InnoDB"
      );
    }

    return self::$pdo;
  }
}
