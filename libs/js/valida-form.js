var letras=  /^[a-zñáéíóúA-ZÑÁÉÍÓÚ\s]+$/;
 var espacios = /\s/;
 var email =/^[_a-zA-Z0-9-_]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,3})+$/;

function ValidaCampoRegistroUser(){

	if($.trim($("#reg_nombre").val())=="" || $.trim($("#reg_nombre").val()).match(espacios) || $.trim($("#reg_nombre").val()).length < 2 || $.trim($("#reg_nombre").val()).length > 20 ){
	    
	    $('.alert-danger').text('El nombre es requerido y debe de tener un minimo de 2 caracteres y un máximo de 20,sin caracteres numéricos ni espacios en blanco....');
	   
	    return false;
	}

	if($("#reg_correo").val()=="" || !email.test($("#reg_correo").val() )  ){
	    
	    $('.alert-danger').text('Debe agregar una dirección de correo valida.');
	   
	    return false;
	}

	if($.trim($("#reg_password").val())=="" || $.trim($("#reg_password").val()).match(espacios) || $.trim($("#reg_password").val()).length < 6 || $.trim($("#reg_password").val()).length > 20 ){
	    
	    $('.alert-danger').text('La contraseña es requerida y debe de tener un minimo de 6 caracteres y un máximo de 20,sin espacios en blanco....');
	   
	    return false;
	}

	if($.trim($("#reg_repit_password").val())=="" || $.trim($("#reg_repit_password").val()).match(espacios) || $.trim($("#reg_repit_password").val()).length < 6 || $.trim($("#reg_repit_password").val()).length > 20 ){
	    
	    $('.alert-danger').text('Por favor repita la contraseña y esta debe de tener un minimo de 6 caracteres y un máximo de 20,sin espacios en blanco....');
	   
	    return false;
	}

	if($.trim($("#reg_password").val()) != $.trim($("#reg_repit_password").val())  ){

		 $('.alert-danger').text('las contraseñas no coinciden.Porfavor intente de nuevo');

		return false;
	}


}