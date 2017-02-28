<?php
$file="../model/ModelUsuario.php";
if(file_exists($file)):
  require_once($file);
//print_r($_SESSION);

$ClassUser = new Usuario();
else:
  echo "no existe";
  
endif;
?>

<?php if (isset($_COOKIE["id_user"]) && isset($_COOKIE["marca"])): ?>

    <?php if ($_COOKIE["id_user"]!="" || $_COOKIE["marca"]!=""): ?>


      <!---si existe las COOKIES llamamos la funcion que nos traer los datos del usuario-->

      <?php  //$ClassUser->function login_user_por_cookie($_COOKIE["id_user"], $_COOKIE["marca"]); ?>

                <li><p class="navbar-text">¿Bievenido ? <?php  echo 'Usuario con cookie'; ?></p></li>
                        <li class="dropdown">
                          <a href="#" class="dropdown-toggle" data-toggle="dropdown"><b>Mi Cuenta</b> <span class="caret"></span></a>
                      <ul id="login-dp" class="dropdown-menu">
                        <li>
                           <div class="row">
                              <div class="col-md-12">
                                
                                <div class="social-buttons">
                                  <a href="#" class="btn btn-fb"></i> Editar datos</a>
                                  <a href="#" class="btn btn-tw" id="logout"></i>Cerrar sessión</a>
                                </div>
                                                
                                 
                           </div>
                        </li>
                      </ul>
                        </li>

      <?php else: ?>

        <!---si no existe las COOKIES mostramos el formulario de logueo-->

          <li><p class="navbar-text">¿Ya tiene una cuenta?</p></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown"><b></b> <span class="caret"></span></a>
        <ul id="login-dp" class="dropdown-menu">
          <li>
             <div class="row" class="area__login">
                <div class="col-md-12">
                  <H4>Iniciar Session Via</H4>
                  <div class="social-buttons">
                    <a href="#" class="btn btn-fb"><i class="fa fa-facebook"></i> Facebook</a>
                    <a href="#" class="btn btn-tw"><i class="fa fa-twitter"></i> Twitter</a>
                  </div>
                                 <H4>O iNGRESE SU CORREO Y CLAVE.</H4>
                   <form class="form" role="form"  accept-charset="UTF-8" id="login-nav">
                      <div class="form-group">
                         <label class="sr-only" for="correo">Ingrese el correo</label>
                         <input type="email" class="form-control" id="correo" placeholder="Ingrese el Correo" required>
                      </div>
                      <div class="form-group">
                         <label class="sr-only" for="clave">Clave</label>
                         <input type="password" class="form-control" id="clave" placeholder="Ingrese la Clave" required>
                                               <div class="help-block text-right"><a href="">Olvide la contraseña?</a></div>
                      </div>
                      <div class="form-group">
                         <button type="submit" class="btn btn-primary btn-block" id="submit-ingreso-user">INGRESAR</button>
                      </div>
                      <div class="checkbox">
                         <label>
                         <input type="checkbox"> Mantenme conectado
                         </label>
                      </div>
                      <div class="resp-login"></div>
                   </form>
                </div>
                <div class="bottom text-center">
                  Nuevo aquí ? <a href="#" data-toggle="modal" data-target=".modal-register-user"><b>Unete a Nosotros</b></a>
                </div>
             </div>
          </li>
        </ul>
          </li>


    <?php  endif; ?>


  


<?php else: ?>

   <?php if(isset($_SESSION['username']) ):  $usuario   = $_SESSION['username'];  ?>

   	<?php $_SESSION["token"] = md5(uniqid(mt_rand(), true)); ?>

  <li><p class="navbar-text">¿Bievenido ? <?php  echo $usuario; ?></p></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown"><b>Mi Cuenta</b> <span class="caret"></span></a>
        <ul id="login-dp" class="dropdown-menu">
          <li>
             <div class="row">
                <div class="col-md-12">
                  
                  <div class="social-buttons">
                    <a href="#" class="btn btn-fb"></i> Editar datos</a>
                    <a href="#" class="btn btn-tw" data-token="<?php echo $_SESSION["token"]; ?>" id="logout"></i>Cerrar sessión</a>
                  </div>
                                  
                   
             </div>
          </li>
        </ul>
          </li>
   
  <?php else: ?>


      <li><p class="navbar-text">¿Ya tiene una cuenta?</p></li>
      <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><b></b> <span class="caret"></span></a>
    <ul id="login-dp" class="dropdown-menu">
      <li>
         <div class="row" class="area__login">
            <div class="col-md-12">
              <H4>Iniciar Session Via</H4>
              <div class="social-buttons">
                <a href="#" class="btn btn-fb"><i class="fa fa-facebook"></i> Facebook</a>
                <a href="#" class="btn btn-tw"><i class="fa fa-twitter"></i> Twitter</a>
              </div>
                             <H4>O iNGRESE SU CORREO Y CLAVE.</H4>
               <form class="form" role="form"  accept-charset="UTF-8" id="login-nav">
                  <div class="form-group">
                     <label class="sr-only" for="correo">Ingrese el correo</label>
                     <input type="email" class="form-control" id="correo" placeholder="Ingrese el Correo" required>
                  </div>
                  <div class="form-group">
                     <label class="sr-only" for="clave">Clave</label>
                     <input type="password" class="form-control" id="clave" placeholder="Ingrese la Clave" required>
                                           <div class="help-block text-right"><a href="">Olvide la contraseña?</a></div>
                  </div>
                  <div class="form-group">
                     <button type="submit" class="btn btn-primary btn-block" id="submit-ingreso-user">INGRESAR</button>
                  </div>
                  <div class="checkbox">
                     <label>
                     <input type="checkbox"> Mantenme conectado
                     </label>
                  </div>
                  <div class="resp-login"></div>
               </form>
            </div>
            <div class="bottom text-center">
              Nuevo aquí ? <a href="#" data-toggle="modal" data-target=".modal-register-user"><b>Unete a Nosotros</b></a>
            </div>
         </div>
      </li>
    </ul>
      </li>


    
  <?php  endif;?>


<?php endif; ?>
