$(document).on('ready',function(){

 

  $('body').keydown(function(e){ 

    var kc = e.keyCode?e.keyCode:e.which;
     var sk = e.shiftKey?e.shiftKey:((kc == 20)?true:false);
     if(((kc >= 21 && kc <= 90) && !sk)||((kc >= 97 && kc <= 122) && sk))
      $(".alert-info").hide();
     else
      $(".alert-info").show();




  });


  $("#close-form-register").on('click',function(){
    $(".alert-danger").empty();
  });
   

   $("#add-user").on('click',function(event){

    event.preventDefault();

    var nombre          = $.trim( $('#reg_nombre').val() );
    var correo          = $.trim( $('#reg_correo').val() );  
    var password        = $.trim( $('#reg_password').val() );
    var repit_password  = $.trim( $('#reg_repit_password').val() );
    //var recordar        = $.trim( $('#reg_recordar').val() );

    //alert(nombre);

     if(ValidaCampoRegistroUser()== false){
          event.stopPropagation();
          return false;

    }else{

      //alert('datos correctos');
      $.ajax({

              url:'controller/usuarioController.php?action=adduser',
              data:{nombre:nombre, correo:correo, password:password},
              method:"POST", 
              dataType: "json",
              cache:false,
              async:true,
              contenType:'aplication/x-www-form-urlencoded',

              beforeSend:function(){
                 $('#add-user').val("Enviando..."); 
              },

              errorfunction(XMLHttpRequest, textStatus, errorThrown){
                 $('.resp__create__user').text('Error! ' + textStatus + ' ' + errorThrown  + ' ' + 'Por favor intente de nuevo!');
                 console.log(error);
              },

              success:function(resp){

                  //$('.resp__create__user').text(resp);
                  if(resp[0]==1){

                    $('.modal-register-user').modal('toggle'); 
                    $("#modal-confirm-registro").dialog('open');
                    $("#modal-confirm-registro").text('Se ha registrado con exito su sesión sera iniciada de manera automatica. En caso contrario porfavor dirigase al formulario de inicio de sesión para inicar su sesión con su correo y contraseña');
                    $("#register-user-modal").each (function() { this.reset(); });
                    $('#add-user').val("REGISTRARME");
                    $('.resp__create__user').empty();

                    

                   //$('.resp__create__user').text('registrado');
                   setTimeout(
                   function(){
                     $("#area-sesion-user").load("views/sesion-user.php",function(){

                          $('body').delegate('#logout','click',function(event){
                            event.preventDefault();
                            var token = $("#logout").data('token');
                            window.location='controller/usuarioController.php?action=logout'+token;
                          });
                      
                     });
                   }, 3000);
                
                     
                  }else if(resp[0]==2){

                    $('#add-user').val("REGISTRARME"); 
                     $('.resp__create__user').text('los campos son requeridos');
                     
                    
                  }else if(resp[0]==3){

                    $('#add-user').val("REGISTRARME"); 
                     $('.resp__create__user').text('El correo ingresado ya  pertenece a un usuario');
                     
                    
                  }else if(resp[0]==4){

                        $("#modal-confirm-registro").dialog('open');
                        $("#modal-confirm-registro").text('Se ha registrado con exito pero la sesión no ha podido se iniciada de manera automatica,por favor inicie sesión por el menu');
                        $("#register-user-modal").each (function() { this.reset(); });
                        $('#add-user').val("REGISTRARME");
                        $('.resp__create__user').empty();

                  }
                  console.log(resp);
              },

              complete:function(){

                
              }

            });

    }

   

    
});


var time = 9000;
    $("#login").on('click',function(){

        var correo    = $.trim($('#correo').val() );  
        var password  = $.trim($('#password').val() );
        var recordar  = $.trim($('#recordar').val() );

        
        if($.trim(correo).length > 0 && $.trim(password).length > 0)  
        {  
          


          ////////////////////////////////////////////////////////////////////////////////////////

          var time= 9000;

             $.ajax({

             url:'controller/usuarioController.php?action=login',
             data:{correo:correo, password:password,recordar:recordar},
             method:"POST", 
             dataType: "json",
             cache:false,
             async:true,
             contenType:'aplication/x-www-form-urlencoded',
             beforeSend:function(){
                $('#login').val("conect..."); 
             },
             errorfunction(XMLHttpRequest, textStatus, errorThrown){
                $('.resp-login').text('Error! ' + textStatus + ' ' + errorThrown  + ' ' + 'Por favor intente de nuevo!');
                console.log(error);
             },
             success:function(resp){
                 

                if(resp[0]==1){

                  //cargamos la pagina de login
                  $("#area-sesion-user").load("views/sesion-user.php");
                   
                }else if(resp[0]==8){

                  $('#login').val("INGRESAR"); 
                   
                   $('.resp-login').html('Usuario no encontrado');
                   
                }else if(resp[0]==2){

                   $('#login').val("INGRESAR"); 
                   
                   $('.resp-login').html('Los Datos son requeridos');
                   
                }else if(resp[0]==3){

                   $('#login').val("INGRESAR"); 
                   
                   $('.resp-login').html('!CUIDADO¡ contraseña invalida Despues de 5 intentos fallidos tu cuenta sera bloqueada temporalmente.');
                   
                }else if(resp[0]==4){

                   $('#login').val("INGRESAR"); 
                   
                   $('.resp-login').html('!TE LO ADVERTI¡se ha excedido de intentos fallidos su cuenta ha sido bloqueada.');
                   
                }else if(resp[0]==5){

                   $('#login').val("INGRESAR"); 
                   
                   $('.resp-login').html('EL correo ingresado no se encuentra asignado a ningun usuario.');
                   
                }
                else if(resp[0]==34){

                                   $('#login').val("INGRESAR"); 
                                   
                                   $('.resp-login').html('Ha ocurrido un error fatal,se han ingresado datos que no pueden ser procesados por motivos de seguridad.QUE INTENTA HACER?.');
                                   
                                }
                    console.log(resp);
               //$('.resp-login').html(resp);
             },
             complete:function(){

              

             }
          });


          //////////////////////////////////////////////////////////////7

        }else{

         $('.resp-login').html("Por favor complete todos los campos");
        }



$('body').delegate('#logout','click',function(event){
  event.preventDefault();
  var token = $("#logout").data('token');

  //alert(token);
  window.location='controller/usuarioController.php?action=logout&token='+token;
});








    }); 


    $('#modal-confirm-registro').dialog({
      title:'Mensaje',
      autoOpen: false,
      modal: true,
      width: 400,
      resizable:false,
      buttons: {


        "Cerrar": function (event) {
          $(this).dialog("close");
          //event.stopImmediatePropagation();
        }

      },
      show:{
        effect:"explode",
        duration:900,
      },
      hide:{
        effect:"explode",
        duration:900,
      }
    });

});