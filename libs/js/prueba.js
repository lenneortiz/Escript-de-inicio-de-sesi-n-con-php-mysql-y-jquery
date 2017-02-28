 $("#foto").fileinput({
    'language': "es",
    'showRemove':false,
    'showUpload':false, 
    'previewFileType':'any',
    'showCaption': false,
    resizeImage: true,
    maxImageWidth: 200,
    maxImageHeight: 200,
    resizePreference: 'width',
    defaultPreviewContent: '<img src="upload/avatar.png" alt="Tu Avatar" style="width:100%;height:100%">',
    
  });
    loadData();//cargamos los datos en la tabla
    guardar();//función para crear un nuevo registo
        $("#table-user").delegate('.delete-user','click',function(event){
          event.stopPropagation();;
         
          $('#modal-dialog-confirm').dialog('open').html("Esta seguro de realizar esta acción?");
         
        });

        $("#table-user").delegate('.update-user','click',function(event){
          event.preventDefault();
          var Id = $(this).attr('data-id');
          $("#modal-edit-user").load('controller/usuarioController.php?action=ver_user&id='+Id,function(){
            $("#get-foto").fileinput({
              'language': "es",
              'showRemove':false,
              'showUpload':false, 
              'previewFileType':'any',
              'showCaption':false,
              resizeImage: true,
              maxImageWidth: 200,
              maxImageHeight: 200,
              

            });
           
            $('#modal-edit-user').modal('show');//mostramos la modal con lo datos del usuario



            $("#edit-user").on('click',function(event){
              event.stopPropagation();
              $('#loading').show();

                //var data = $("#form-edit-user").serialize();
                var formData = new FormData(document.getElementById("form-edit-user"));

                formData.append("dato", "valor");
                var id = $('#id-user').val();
                var nombre = $('#get-nombre').val();
                var apellido = $('#get-apellido').val();
                var correo = $('#get-correo').val();
                var fotoUser = $('#foto-user').val();

                formData.append('id',id);
                formData.append('nombre',nombre);
                formData.append('apellido',apellido);
                formData.append('correo',correo);
                formData.append('foto-user',fotoUser);


                ///////////////ajax////////////////

                $.ajax({
                 url: "controller/usuarioController.php?action=update_user",        
                 type: "POST", 
                 dataType: "json",     
                 data: formData,       
                 contentType: false, 
                 cache: false,            
                 processData:false, 
                 beforeSend:function(){
                           //$('#loading').show();
                         },      
                         success: function(resp)   
                         {

                             if(resp[0]==1){

                               loadData();
                               $("#form-user").each (function() { this.reset(); });
                               $('#modal-edit-user').modal('toggle'); 
                               $('#loading').hide();
                               $('#modal-dialog-mensaje').dialog('open');
                               $('.msj').text('El usuario ha sido actualizado');


                               
                             }else if(resp[0]==2){

                              $('#loading').hide();
                              $('#modal-dialog-mensaje').dialog('open');
                              $('.msj').text('Disculpe el correo ingresado ya se encuentra asignado a un usuario');


                            }else if(resp[0]==3){

                              $('#loading').hide();
                              $('#modal-dialog-mensaje').dialog('open');
                              $('.msj').text('no se pudo actualizar la imagen el usuario');

                            }else if(resp[0]==4){

                             $('#loading').hide();
                             $('#modal-dialog-mensaje').dialog('open');
                             $('.msj').text('Disculpe los campos con el asterisco son requeridos,Por favor compruebe que todos los campos este completos');

                           }
                           else if(resp[0]==5){
                            $('#loading').hide();
                            $('#modal-dialog-mensaje').dialog('open');
                            $('.msj').text('Disculpe solo se permite la subida de imagenes con la extenciones png, jpg y jpeg.Por favor compruebe que sean las extenciones correctas y que no esten escritas en mayusculas');
                          }else if(resp[0]==6){
                            $('#loading').hide();
                            $('#modal-dialog-mensaje').dialog('open');
                                 //$(".ui-button:first").css('display','none');
                                 //$(".ui-button:nth-child(1)").css('display','none');
                                 //$(".ui-button:nth-child(2)").text('Aceptar');
                                 $('.msj').text('Disculpe solo se permite la subida de imagenes con un tamaño maximo de 3 megabyte ');
                               }
                           
                             console.log(resp);
                           },
                           complete:function(){
                             $("input:file").val('');
                              $("input:file").get(0).name = 'get-foto';


                           }

                         });

                /////////////////end ajax/////////////////////

               
            });


        //////////////////////exportr a pdf los datos del usuario seleccionado//////////////////////////////
        $("#expt-pdf").on('click',function(event){
          event.stopPropagation();
          var id = $(this).data("id");
          
        if(id.length === 0)
          {
           $('#modal-dialog-invalid').dialog('open')
            .html('Debe seleccionar al menos un registro para ser exportado a un archivo PDF');
          }
          else{
          window.location='controller/reportPdfController.php?id='+id;
          }
        });
      //////////////////////end exportr a pdf//////////////////////////////

          });
          
          //alert(Id);

          event.stopImmediatePropagation();

        });


        


        $("#refrescar").click(function(event) {
          event.preventDefault();
          loadData();


        });

        $("#delete-multiple").on('click',function(event){
          event.stopPropagation();
          //alert();
          var row_id = [];
          $(':checkbox:checked').each(function(i){
           
            row_id[i] = $(this).val();

          });

          if(row_id.length === 0)
          {
           $('#modal-dialog-invalid').dialog('open')
            .html('Debe seleccionar al menos un registro');
              //alert('Debe seleccionar al menos un registro');


          }
          else{
            $.ajax({
              url: 'controller/usuarioController.php?action=delete_multiple',
              method: 'POST',
              data : {id:row_id},
              success: function(resp)
              {
                    loadData();
                    $('#modal-dialog-mensaje').dialog('open');
                    $('.msj').text('Se han eliminado');
                    console.log(resp);
              }



            });
          }


        });


        /////////////////export////////////////////////////

        $("#expt-pdf-checkbox").on('click',function(event){
          event.stopPropagation();
          //alert();
          var id = [];
          $(':checkbox:checked').each(function(i){
           
            id[i] = $(this).val();

          });

          if(id.length === 0)
          {
           $('#modal-dialog-invalid').dialog('open')
            .html('Debe seleccionar al menos un registro');
              //alert('Debe seleccionar al menos un registro');


          }
          else{

            window.location='controller/reportPdfController.php?id='+id;

            $("input:checkbox").prop('checked', false);

          }


        });

        /////////////////////////////////////7


        /////////////////export excel////////////////////////////

        $("#export-exel-checkbox").on('click',function(event){
          event.stopPropagation();
          
          var id = [];
          $(':checkbox:checked').each(function(i){
           
            id[i] = $(this).val();

          });

          if(id.length === 0)
          {
           $('#modal-dialog-invalid').dialog('open')
            .html('Debe seleccionar al menos un registro');
           
          }
          else{

            window.location='controller/reportExcelController.php?id='+id;
            $("input:checkbox").prop('checked', false);

          }


        });

        /////////////////end export excel////////////////////////////
       

        $('#modal-dialog-mensaje').dialog({
          title:'Mensaje',
          autoOpen: false,
          modal: true,
          width: 400,
          resizable:false,
          buttons: {


            "Cerrar": function (event) {
              $(this).dialog("close");
              event.stopImmediatePropagation();
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

        $('#modal-dialog-confirm').dialog({
          title:'Mensaje',
          autoOpen: false,
          modal: true,
          width: 400,
          resizable:false,
          buttons: {
            "Aceptar": function (peticion) {
              
              var Id = $(".delete-user").data('id');
              var image= $(".delete-user").data('img');
              eliminarUser(Id,image);//función que elimina un registro
            },
            "Cancelar": function (event) {

              $(this).dialog("close");
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

        $('#modal-dialog-invalid').dialog({
          title:'Mensaje',
          autoOpen: false,
          modal: true,
          width: 400,
          resizable:false,
          buttons: {


            "Cerrar": function (event) {
              $(this).dialog("close");
              event.stopImmediatePropagation();
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


