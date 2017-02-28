<?php
error_reporting(E_ALL || E_NOTICE);
ini_set("display_errors",1);
abstract class Conectar
{

	protected $dbh;

	public function Conexion()

	{
		
		require_once(dirname(__FILE__).'/dbconfig.php');

			try
			{
				
				$this->dbh=new PDO(DSN,DB_USER,DB_PASS);
				$this->dbh->exec("SET NAMES'UTF8'");
				$this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $this->dbh;

				//echo "conexion exitosa";

			} catch(PDOException $e) {

				die("error de conexion".$e->getMessage() );

			}
	}

	public  function VerificaPassword($password, $hashedPassword) 
	  {
	        

	       if(password_verify($password, $hashedPassword) ):

	       return true;

	       	else:

	       	return false;


	       endif;

	  }

	public function ruta()
    {
        return "http://localhost/sistem-login/";
    }

    public function limpiarcampo($campo)
    {
    	$campo=strip_tags(trim(htmlspecialchars($campo, ENT_QUOTES, "ISO-8859-1")));
    	return $campo;
    }

   
}
?>