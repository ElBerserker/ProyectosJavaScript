const documento = document,
$title = documento.querySelector(".crud-title"),
$table = documento.querySelector(".crud-table"),
$form = documento.querySelector(".crud-form"),
// En este caso  el elemento  se  selecciona mediente el id
// A diferencia de  los  anteriores  que era por la palabra 
// reservada class, asi mismo solo nos importa el contenido
// del template asi que por eso usamos content.
$template = documento.getElementById("crud-template").content,

// No es recomendable insertar elemento por elemento asi que por 
// eso guardamos todo el contenido  y una vez que este lleno  lo 
// se inserta en el DOM, veamoslo como una especia de ArrayList.
$fragment = documento.createDocumentFragment();
            
//funcion expresada (dentro de una constante), recibe un argumento "options"
const ajax = (options) => {
    //Desestructuracion del objeto option
    let { url, method, success, error, data}  = options;
    //Creacion de un objeto de tipo xml http request
    const xhr = new XMLHttpRequest();
    //Creacion de una arrow function que se activa cuando detecte un cambio
    xhr.addEventListener("readystatechange", e => {
        if (xhr.readyState !== 4) return;   

        if (xhr.status >= 200 && xhr.status < 300){
            //En caso de que la peticion sea correcta 
            //conversion de la respuesta de json a objeto js
            let parseoJsonAJS = JSON.parse(xhr.responseText);
            success(parseoJsonAJS);
        }else{
            //en caso de error.
            let message = xhr.statusText || "Ocurrio un error";
            error(`Error ${xhr.status}: ${message}`);
        }
    });
    // se inicia especificando el metodo, en este caso si el metodo  no se especifica 
    // se da por echo que el metodo
     //es get, se manda la url.
    xhr.open(method || "GET", url);
    // Antes de enviar la peticion se especifica el tipo de contenido que se envia 
    // y su codificacion, si no se especifica estariamos enviando texto plano
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    // Enviamos el objeto js data a objeto json  y se envia como argumento
    xhr.send(JSON.stringify(data));
}
//Esta funcion devuele todos los usuarios registrados.
const getAll = () =>{
//GET
    ajax({
        //Especificacion del metodo
        //method : "GET",
        //Url del metodo
        url: "http://192.168.1.81:8070/users/",
        //Se ejecuta en caso de que la operacion sea exitosa, trabaja con 
        //el objeto json
        success:(respuesta) => {
            console.log(respuesta);
            /*En esta seccion recorremos los objetos obtenidos como respuesta del servidor
            uno por uno y los enviamos al formulario mediante el template que creamos.*/
            respuesta.forEach(elemento => {
                $template.querySelector(".nombre").textContent = elemento.__data__.name_of_user;
                $template.querySelector(".contrasenia").textContent = elemento.__data__.password;
                $template.querySelector(".tipo").textContent = elemento.__data__.type_of_user;
                $template.querySelector(".estado").textContent = elemento.__data__.status;
                           
                $template.querySelector(".edit").dataset.nombre = elemento.__data__.name_of_user;
                $template.querySelector(".edit").dataset.contrenia = elemento.__data__.password;
                $template.querySelector(".edit").dataset.tipo = elemento.__data__.type_of_user;
                $template.querySelector(".edit").dataset.estado = elemento.__data__.status;

                $template.querySelector(".delete").dataset.nombre = elemento.__data__.name_of_user;

                let $clone = documento.importNode($template, true);
                $fragment.appendChild($clone);
            });
            $table.querySelector("tbody").appendChild($fragment);
        },
        //En caso de error se ejecuta 
        error: (error) => {
            console.warn(error);
            $table.insertAdjacentHTML("afterend", `<p><b>${error}</b></p>`);
        },
        data: null
    });
}

documento.addEventListener("DOMContentLoaded", getAll);

documento.addEventListener("submit", e => {
    if (e.target == $form) {
        e.preventDefault();

        if (!e.target.id.value) {
            //POST
            ajax({
                url: "http://192.168.1.81:8070/user/",
                method: "POST",
                success: (res) => location.reload(),
                error: (err) => $form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),

                data: {
                    name_of_user: e.target.nombre_usuario.value,
                    password: e.target.contrasenia_usuario.value,
                    type_of_user: e.target.tipo_usuario.value,
	                 status: e.target.estado_usuario.value
                }
            });
        } else {
            //PUT
            ajax({                            
                url: `http://192.168.1.81:8070/user_update/${e.target.id.value}`,
                method: "PUT", 
                success: (res) => location.reload(),
                error: (err) => $form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),

                data: {
                    name_of_user: e.target.nombre_usuario.value,
                    password: e.target.contrasenia_usuario.value,
                    type_of_user: e.target.tipo_usuario.value,
						  status	: e.target.estado_usuario.value
                }
            });
        }
    }
});

documento.addEventListener("click", e => {
    if(e.target.matches(".edit")){
        $title.textContent = "Editar usuario";
        //Guardamos los datos de cada registro en el boton de editar
        $form.nombre_usuario.value = e.target.dataset.nombre;
        $form.contrasenia_usuario.value = e.target.dataset.contrasenia;
        $form.tipo_usuario.value = e.target.dataset.tipo;
	     $form.estado_usuario.value = e.target.dataset.estado;		
        $form.id.value =e.target.dataset.nombre;
    }else if(e.target.matches(".delete")){
        //DELETE
        let eliminar = confirm(`Eliminar ${e.target.dataset.nombre}`);
        if(eliminar){
            ajax({
                url: `http://192.168.1.81:8070/user_delete/${e.target.dataset.nombre}`,
                method: "DELETE",
                success: (respuesta) => location.reload(),
                error: (error) => alert(error)
            });                    
        }
    }
}); //Final del evento.
