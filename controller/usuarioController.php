<?php
sleep(3);
	$file="../model/ModelUsuario.php";
	require_once($file);
	$classUser=new Usuario();

	switch($_GET["action"]) {
	case "login":
		//Comprobamos que sea una petición ajax;
		if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'):
		
			$classUser->login();
		else:
		    throw new Exception("Error procesando el requerimiento", 1);   
		endif;
	break;
	case "adduser":
			
			//Comprobamos que sea una petición ajax;
		if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'):
		   
		   	$classUser->addUsuario();
		 else:
		     throw new Exception("Error procesando el requerimiento", 1);   
		 endif;
		 
	break;
	case "logout":
		
		if(isset($_GET["token"]) && $_GET["token"] == $_SESSION["token"]):


					   	//print getcwd() . "\n"; //Obtiene el directorio actual en donde se esta trabajando

					$classUser->truncate_table_intento_login($_SESSION['id']);
					$params = session_get_cookie_params();
					   		   	 
					   		   	// Borra el cookie actual.
					   		   	setcookie(session_name(),
					   		   	        '', time() - 42000, 
					   		   	        $params["path"], 
					   		   	        $params["domain"], 
					   		   	        $params["secure"], 
					   		   	        $params["httponly"]);
					   		   	 
					   		   	// Destruye sesión. 
					   		   	session_destroy();
					   		   	
					   	$_SESSION['username'] = "0";
					   	$_SESSION['id']       = "";
					   	header("Cache-Control: private");
					   	header("Location:../");

			   	else:

					header("Location:../");		

		endif;
			   	
	break;
	default:
	header("Location:../");
	}

		
?>