//Creacion y asigancion de objetos.
 const btnEnviar = document.getElementById('inicio');
 const txtUsuario = document.getElementById('usuario');
 const txtContrasenia = document.getElementById('contrasenia');
 

 let jsonResponseServer;

 btnEnviar.addEventListener('click', () => {            
     let xhr = new XMLHttpRequest();

     //Existen 4 estados de respuesta
     xhr.addEventListener("readystatechange", () =>{
         //Si el estado de respuesta no es 4 entonces no restornes nada.
         if (xhr.readyState != 4) return;                    
         //Siempre y cuando el estado de la respues sea satisfactorio
         if(xhr.status >= 200 && xhr.status < 300){
             // Convertimos la respuesta que viene en formato json a un 
             // objeto de tipo js.
             jsonResponseServer = JSON.parse(xhr.responseText);
             //console.log(typeof jsonResponseServer.nombre_usuario);
             //console.log(typeof txtUsuario.value);
             validarDatos();
         }else{
             console.log("error");
         }
     });
     xhr.open('GET', `http://192.168.1.81:8070/user/${txtUsuario.value}`);

     xhr.addEventListener('load', (data) => {
         console.log(JSON.parse(data.target.response));
     });

     xhr.send();
 });
 
 function validarDatos(){
     if (txtUsuario.value == jsonResponseServer.__data__.name_of_user){
         if(txtContrasenia.value == jsonResponseServer.__data__.password){
             if( jsonResponseServer.__data__.type_of_user == "ADMINISTRATOR"){
                 window.location = "MenuAdministrador.html";
             }else{
                 window.location = "Encuesta.html"
             }    
         }else{
             alert("Contrasenia incorrecta");
         }    
     }else{
         alert("Usuario incorrecto");
     }
}
