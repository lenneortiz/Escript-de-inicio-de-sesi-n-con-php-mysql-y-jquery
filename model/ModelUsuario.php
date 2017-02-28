<?php
date_default_timezone_set("America/Caracas");
//ini_set("session.cookie_lifetime","36000");10 horas la session, 36,000 seg = 10 horas. el tiempo lo tenes que poner en segundos
ini_set("session.cookie_lifetime","7220");
ini_set("session.gc_maxlifetime","7220");
session_start();
$file="../config/database.php";
require_once($file);


class Usuario extends Conectar
{

  private $conex;
  private $table_name = "";
  public $foto;
  public $foto_user;
  public $id; 
  public $nombre; 
  public $apellido; 
  public $correo; 
  public $clave; 
  public $lasInsertId;

  // constructor with $db as database connection 
public function __construct()
{
  $this->conex=parent::Conexion();
  
}



public function addUsuario(){

  if(!empty($_POST['correo']) AND !empty($_POST['password']) AND !empty($_POST['nombre'])):

    // Eliminar cualquier carácter que pueda dar problemas
    $this->nombre = filter_input(INPUT_POST,'nombre', FILTER_SANITIZE_STRING);
    $this->correo = filter_input(INPUT_POST,'correo', FILTER_SANITIZE_EMAIL);
    $this->clave  = filter_input(INPUT_POST,'password', FILTER_SANITIZE_STRING);

    //despues de haber limpiado los datos encriptaremos la contraseña

    $clave_encript = password_hash($this->clave, PASSWORD_BCRYPT);
    //esto genera una contraseña encriptada con una longitud de 60 caracteres .

    //validamos la el correo

    if (!filter_var( $this->correo, FILTER_VALIDATE_EMAIL) ):// el correo no es valido

        $resp[0]='10';//la dirección de correo no es valida
    endif;

    //comprobamos que la lonitud de la contraseña sea de 60  caracteres
    if(strlen($$clave_encript) == 60):
      
       $resp[0]='10';//Ha ocurrido un error su contraseña no pudo ser encriptada

    endif;
    
    

        try {

                
                    $sql="INSERT INTO miembros
                          VALUES (NULL,?,?,?,NULL) ";
                    $query=$this->conex->prepare($sql);
                    $query->bindParam(1,$this->nombre,PDO::PARAM_STR);
                    $query->bindParam(2,$this->correo,PDO::PARAM_STR);
                    $query->bindParam(3,$clave_encript,PDO::PARAM_STR);


                    $sql2= "SELECT * FROM miembros WHERE correo = ?";
                    $query2=$this->conex->prepare($sql2);
                    $query2->bindParam(1,$this->correo,PDO::PARAM_STR);

                    if(!$query2->execute() )return false;
                    if($query2->rowCount() > 0):

                        $resp[0]='3';

                    else:

                       if($query->execute() ):


                            $this->lasInsertId = $this->conex->lastInsertId();
                            $sql = "SELECT 
                                    id,
                                    username,
                                    correo
                                    FROM miembros
                                    WHERE id = ?";
                            $login=$this->conex->prepare($sql);
                            $login->bindParam(1,$this->lasInsertId,PDO::PARAM_INT);
                            if(!$login->execute() )return false;
                              if($login->rowCount() == 1):

                                $row = $login->fetch(PDO::FETCH_ASSOC);
                                $this->nombre    = $row['username'];
                                $_SESSION['username']  = $this->nombre;

                                $resp[0]='1';

                            else:

                                $resp[0]='4';

                              endif;


                        endif;




                          

                          

                        

                  endif;
       
             } catch(PDOException $e) {


              echo '{"error":{"text":'. $e->getMessage() .'}}'; 
            }

    else:

    $resp[0] = '2';

  endif;

  print_r(json_encode($resp));
}


  
  

  public function login() {
      // Usar declaraciones preparadas significa que la inyección de SQL no será posible.

    
   
   if(!empty($_POST['correo']) AND !empty($_POST['password'])):

    $email = $_POST['correo'];
    $password = $_POST['password'];

    //sentencia de bloque

     try {

          $sql = sprintf("SELECT 
           miembros.id, 
           miembros.username, 
           miembros.clave
          FROM miembros  
          WHERE  miembros.correo='%s' LIMIT 1",$email);
          //echo $sql;
          $stmt=$this->conex->prepare($sql);
          if(!$stmt->execute()) return false;
          //comprobamos que exista el correo en la base de datos
          if($stmt->rowCount() == 1):

         
            //si existen datos procedemos a extraerlos de la base de datos
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                $user_id    = $row['id'];
                $username  = $row['username'];
                $db_password  = $row['clave'];

                  //validar que el usuario ha marcado la casilla recordar
                if ($_POST["recordar"] AND $_POST["recordar"] == TRUE):

                    mt_srand(time());
                    $rand = mt_rand(1000000,9999999);

                    $sql="UPDATE 
                          miembros 
                          SET 
                          cookie=? 
                          WHERE id = ?";
                   $query = $this->conex->prepare($sql);
                   $query->bindParam(1,$rand,PDO::PARAM_INT);
                   $query->bindParam(2,$user_id,PDO::PARAM_INT);
                   $query->execute();
                    // ahora meto una cookie en el ordenador del usuario con el identificador del usuario y la cookie aleatoria
                    setcookie("id_user", $user_id, time()- 3600);
                    setcookie("marca", $rand, time()- 3600);



                  endif;

          //chequeamos el numero de intentos para loguearse
                if ($this->check_max_intento_login($user_id) == true) :

                      $resp[0] = '4';//se ha excedido de intentos fallidos su cuenta ha sido bloqueada
                  else:

                      // Recalculamos a ver si el hash coincide.//////////////
                           // if (parent::VerificaPassword($password,  $db_password)):
                      //if ($password == $db_password):
                      if(parent::VerificaPassword($password, $db_password) == true):

                            
                            // ¡La contraseña es correcta!
                                                // Obtén el agente de usuario del usuario.
                                                $user_browser = $_SERVER['HTTP_USER_AGENT'];
                                                //  Protección XSS ya que podríamos imprimir este valor.
                                                $user_id = preg_replace("/[^0-9]+/", "", $user_id);
                                                $_SESSION['user_id'] = $user_id;
                                                // Protección XSS ya que podríamos imprimir este valor.
                                                $username = preg_replace("/[^a-zA-Z0-9_\-]+/", "", $username);

                                                $_SESSION['username'] = $username;
                                                $_SESSION['id'] =  $user_id;
                                                // Inicio de sesión exitoso
                              $resp[0] = '1';//Inicio de sesión exitoso

                            else:

                           
                                  // La contraseña no es correcta.
                                                     // Se graba este intento en la base de datos.
                                                  $now = time();
                                                   $sql="INSERT INTO intento_login VALUES (?,?)";
                                                   $query=$this->conex->prepare($sql);
                                                   $query->bindParam(1,$user_id,PDO::PARAM_INT);
                                                   $query->bindParam(2,$now,PDO::PARAM_INT);
                                                  $query->execute();
                                                  $resp[0]='3';//se ha grabado el intento fallido
                                                     //return false;

                                              
                            endif;

                  endif;//end chequeo de intentos para loguearse

              else:

                $resp[0] = '5';//EL correo ingresado no se encuentra asignado a ningun usuario

          endif;//end comprobamos que exista el correo en la base de datos

          }catch(PDOException $e) {

            //echo '{"error":{"text":'. $e->getMessage() .'}}'; 
            $resp[0] = '34';
        }//end sentencia de bloque
       

     else:

      $resp[0] = '2';//Los Datos son requeridos
      

    endif;

      //print_r($resp); 
         
      print_r(json_encode($resp) );   
   
         
        
  }

  public function check_max_intento_login($user_id) {
      // Obtiene el timestamp del tiempo actual.
      $now = time();
   
      // Todos los intentos de inicio de sesión se cuentan desde las 2 horas anteriores.
      $valid_attempts = $now - (2 * 60 * 60);
   
      if ($stmt = $this->conex->prepare("SELECT tiempo 
                                          FROM intento_login
                                          WHERE user_id = '". $user_id."' 
                                          AND tiempo > '".$valid_attempts."'")) {
         
   
          // Ejecuta la consulta preparada.
          $stmt->execute();
          $stmt->fetch(PDO::FETCH_ASSOC);
   
          // Si ha habido más de 3 intentos de inicio de sesión fallidos.
          if ($stmt->rowCount() > 5) {
              return true;
          } else {
              return false;
          }
      }
  }

  public function truncate_table_intento_login($user_id){

    $sql = "DELETE FROM intento_login WHERE user_id = ?";
    $query = $this->conex->prepare($sql);
    $query->bindParam(1, $user_id);
    $query->execute();
  }

  public function sec_session_start() {
      $session_name = 'sec_session_id';   // Configura un nombre de sesión personalizado.
      $secure = SECURE;
      // Esto detiene que JavaScript sea capaz de acceder a la identificación de la sesión.
      $httponly = true;
      // Obliga a las sesiones a solo utilizar cookies.
      if (ini_set('session.use_only_cookies', 1) === FALSE) {
          header("Location: ../error.php?err= (ini_set)");
          exit();
      }
      // Obtiene los params de los cookies actuales.
      $cookieParams = session_get_cookie_params();
      session_set_cookie_params($cookieParams["lifetime"],
          $cookieParams["path"], 
          $cookieParams["domain"], 
          $secure,
          $httponly);
      // Configura el nombre de sesión al configurado arriba.
      session_name($session_name);
      session_start();            // Inicia la sesión PHP.
      session_regenerate_id();    // Regenera la sesión, borra la previa. 
  }

    public function login_user_por_cookie($id_user,$cookie){

      try
      {

            $sql="SELECT 
                  id,username,
                  correo,
                  cookie 
                  FROM 
                  miembros 
                  WHERE id = ?,
                  AND cookie = ?,
                  AND cookie <>";


            $query = $this->conex->prepare($sql);
            $query->bindParam(1,$id_user,PDO::PARAM_INT);
            $query->bindParam(2,$cookie,PDO::PARAM_INT);
            if(!$query->execute()) return false;
            if($query->rowCount() == 1):

              return $query->fetchAll(PDO::FETCH_ASSOC);

              else:

                echo "no existen usuario con cookies";

            endif;

      }catch(PDOException $e){

        die("error en el query".$e->getMessage() );
      }
    }

}



?>
