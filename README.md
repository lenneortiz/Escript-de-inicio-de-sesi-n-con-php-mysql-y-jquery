La presente aplicación esta desarrollada  con la extención PDO de PHP,MYSQL Y JQUERY . He puesto mi mejor esfuerzo en programar el código, pero la seguridad y sobre todo la encriptación son temas complejos que cambian todo el tiempo y no puedo decir que domino todo ese campo. Por lo tanto, podria haber obviado unos cuantos trucos en la programación. De ser así, házmelo saber y tratare de incorporar toda mejora a lo que tengo.

Aplicar el codigo aquí mostrado te ayudará a cuidarte de muchos tipos de ataques que podrían emplear los crackers para apoderarse del control de las cuentas de otros usuarios, eliminar cuentas y/o cambiar datos. A continuación te presentare un lista de posibles ataques de los cuales la presente aplicación procura defenderse:

    SQL Injections
    Session Hijacking
    Network Eavesdropping
    Cross Site Scripting
    Brute Force Attacks

Instalación.

importar el archvio sql crud.sql a mysql.
entrar al directorio config y editar el archivo dbconfig.php 
con 
define("DSN", "mysql:host=localhost;dbname=tu base de datos");
define("DB_USER", "tu usuario");
define("DB_PASS", "tu clave");

