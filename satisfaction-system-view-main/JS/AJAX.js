export const ajax = (options) => {
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
    xhr.open(method, url);
    // Antes de enviar la peticion se especifica el tipo de contenido que se envia 
    // y su codificacion, si no se especifica estariamos enviando texto plano
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    // Enviamos el objeto js data a objeto json  y se envia como argumento
    xhr.send(JSON.stringify(data));
}
