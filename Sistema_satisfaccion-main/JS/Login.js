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
     xhr.open('GET', `http://192.168.0.101:4040/usuario/${txtUsuario.value}`);

     xhr.addEventListener('load', (data) => {
         console.log(JSON.parse(data.target.response));
     });

     xhr.send();
 });
 
 function validarDatos(){
     if (txtUsuario.value === jsonResponseServer.nombre_usuario){
         if(txtContrasenia.value === jsonResponseServer.contrasenia_usuario){
             if( jsonResponseServer.tipo_usuario === "administrador"){
                 window.location = "/ProyectoLynx/MenuAdministrador.html";
             }else{
                 window.location = "/ProyectoLynx/Encuesta.html"
             }    
         }else{
             alert("Contrasenia incorrecta");
         }    
     }else{
         alert("Usuario incorrecto");
     }
 }
