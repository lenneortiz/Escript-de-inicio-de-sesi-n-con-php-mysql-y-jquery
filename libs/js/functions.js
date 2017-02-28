/*function HacerAlgo() {
   alert('hola');
   setTimeout('HacerAlgo()',10000);
 }*/
 var letras=  /^[a-zñáéíóúA-ZÑÁÉÍÓÚ\s]+$/;
 var espacios = /\s/;
 var email =/^[_a-zA-Z0-9-_]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,3})+$/;
 function ValidaCampoRegistro(){

    if($("#nombre").val()=="" || $("#nombre").val().match(espacios) || $("#nombre").val().length < 2 || $("#nombre").val().length > 20 || !$("#nombre").val().match(letras)){
        $('#modal-dialog-mensaje').dialog('open');
        $('.msj').text('El nombre es requerido y debe de tener un minimo de 2 caracteres y un máximo de 20,sin caracteres numéricos ni espacios en blanco....');
       
        return false;
    }
    if($("#apellido").val()=="" || $("#apellido").val().match(espacios) || $("#apellido").val().length < 2 || $("#apellido").val().length > 20 || !$("#apellido").val().match(letras)){
        $('#modal-dialog-mensaje').dialog('open');
        $('.msj').text('El apellido es requerido y debe de tener un minimo de 2 caracteres y un máximo de 20,sin caracteres numéricos ni espacios en blanco....');
       
        return false;
    }
    if($("#correo").val()=="" || !email.test($("#correo").val() )  ){
        $('#modal-dialog-mensaje').dialog('open');
        $('.msj').text('Debe agregar una dirección de correo valida.');
       
        return false;
    }

 }
 function ValidaCampoUpdate(){

    if($("#get-nombre").val()=="" || $("#get-nombre").val().match(espacios) || $("#get-nombre").val().length < 2 || $("#get-nombre").val().length > 20 || !$("#get-nombre").val().match(letras)){
        $('#modal-dialog-mensaje').dialog('open');
        $('.msj').text('El nombre es requerido y debe de tener un minimo de 2 caracteres y un máximo de 20,sin caracteres numéricos ni espacios en blanco....');
       
        return false;
    }
    if($("#get-apellido").val()=="" || $("#get-apellido").val().match(espacios) || $("#get-apellido").val().length < 2 || $("#get-apellido").val().length > 20 || !$("#get-apellido").val().match(letras)){
        $('#modal-dialog-mensaje').dialog('open');
        $('.msj').text('El apellido es requerido y debe de tener un minimo de 2 caracteres y un máximo de 20,sin caracteres numéricos ni espacios en blanco....');
       
        return false;
    }
    if($("#get-correo").val()=="" || !email.test($("#get-correo").val() )  ){
        $('#modal-dialog-mensaje').dialog('open');
        $('.msj').text('Debe agregar una dirección de correo valida.');
       
        return false;
    }

 }
 function loadData(){
   var url ='controller/usuarioController.php?action=get_data';
   $("#table-user tbody").html("");
   $.getJSON(url,function(usuarios){

    $.each(usuarios, function(i,usuario){
      var newRow =
      "<tr id="+usuario.id+">"
      +'<td><input id="'+i+'" class="checked" type="checkbox"  value="'+usuario.id+'"></td>'
      +"<td>"+usuario.id+"</td>"
      +"<td><img class='img-user' src='upload/"+usuario.foto+"'></td>"
      +"<td>"+usuario.nombre+"</td>"
      +"<td>"+usuario.apellido+"</td>"
      +"<td>"+usuario.correo+"</td>"
      +'<td><a  href="javascript:void(0);" class="update-user btn  btn-info" data-id="'+usuario.id+'">Editar</a></td>'
      +'<td><a href="javascript:void(0);" class="delete-user btn btn-danger" data-id="'+usuario.id+'" data-img="'+usuario.foto+'">Eliminar</a></td>'
      +"</tr>";
      $(newRow).appendTo("#table-user tbody");

    });

    var table = $("#table-user").dataTable({
     'sScrollY':300,
     'sPaginationType':'full_numbers',
             "iDisplayLength": 15,//cantidad de filas a mostrar
             "bSort": true,
             "ordering": true,
             "order": [[ 1, "desc" ]],

             "bPaginate": true,
             "bLengthChange": false,
             "bFilter": true,
             "bSort": true,
             "bInfo": false,
             "bRetrieve": true, 
             "bProcessing": true,
             "bDestroy": true,
             "bStateSave": true,
             "bAutoWidth": false,
             'language':{
              'url':'libs/jquery-ui-bootstrap/assets/js/dataTables.spanish.json'//traductor de la tabla
            }
          })




  });
 }
//inicio de la función guardar
function guardar(){

  $("#registrar-user").on("click", function(event){
   
     if(ValidaCampoRegistro()== false){
          event.stopPropagation();
          return false;

    }else{

        $('#loading').show();
        var f = $(this);
        var formData = new FormData(document.getElementById("form-user"));
        formData.append("dato", "valor");
        var nombre = $('#nombre').val();
        var apellido = $('#apellido').val();
        var correo = $('#correo').val();

        formData.append('nombre',nombre);
        formData.append('apellido',apellido);
        formData.append('correo',correo);


        $.ajax({
         url: "controller/usuarioController.php?action=guardar",        
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
                     $('#modal-user').modal('toggle'); 
                     $('#loading').hide();
                     $('#modal-dialog-mensaje').dialog('open');
                     $('.msj').text('Se registrado un nuevo usuario con exito');
                     
                     $("div.kv-avatar:first").append('<img src="upload/avatar.png" alt="Tu Avatar" style="width:160px">');
                     
                   }else if(resp[0]==2){

                    $('#loading').hide();
                    $('#modal-dialog-mensaje').dialog('open');
                    $('.msj').text('Disculpe el correo ingresado ya se encuentra asignado a un usuario');


                  }else if(resp[0]==3){

                    $('#loading').hide();
                    $('#modal-dialog-mensaje').dialog('open');
                    $('.msj').text('no se pudo guardar la imagen para el nuevo usuario');

                  }else if(resp[0]==4){

                   $('#loading').hide();
                   $('#modal-dialog-mensaje').dialog('open');
                   $('.msj').text('Disculpe todos los campos con asterisco son requeridos,Por favor compruebe que todos los campos este completos');

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
                     $("input:file").get(0).name = 'foto';


                   }

                 });

    }
                                  
  
 });
}//fin  de la función guardar

//inicio de la función eliminar
function eliminarUser(Id,image){


  $.ajax({

    url:'controller/usuarioController.php?action=delete_user',
    data:
    {
      'image':image,
      'id': Id
      
    },
    type:'POST',
    dataType:'json',
    contenType:'x-www-form-urlencoded',
    async:true,
    cache:false,
    success:function(resp){

     if(resp[0]==1){

      loadData();
      $('#modal-dialog-confirm').dialog('close');
      $('#modal-dialog-mensaje').dialog('open');
      $('.msj').text('el registro ha sido eliminado');

    }else if(resp[0]==2){ 

      $('#modal-dialog-mensaje').dialog('open');
      $('.msj').text('El registro no pudo ser elimindo');
      
    }else if(resp[0]==3){

      $('#loading').hide();
      $('#modal-dialog-mensaje').dialog('open');
      $('.msj').text('No se ha enviado ningun dato para realizar esta operación');

    }
    
    console.log(resp);
  }
});

  }//fin de la función eliminar
