import {ajax} from "./AJAX.js"

let nivel_satisfaccion = 0;
//Objetos de tipo imagen.
const img_feliz = document.getElementById('img_feliz');
const img_triste = document.getElementById('img_triste');
const img_enojado = document.getElementById('img_enojado');
//Objetos de tipo text.
const txtComentario = document.getElementById('txtComentario');
const txtFolio = document.getElementById('txtFolio');
//Objeto tipo boton.
const btnEnviar = document.getElementById('btnEnviar');
const btnBorrar = document.getElementById('btnNuevo');

let jsonResponse;

img_enojado.addEventListener('click', () => {
    nivel_satisfaccion = 1;
});

img_triste.addEventListener('click', () => {
    nivel_satisfaccion = 2;
});

img_feliz.addEventListener('click', () => {
    nivel_satisfaccion = 3;
});
btnBorrar.addEventListener('click', () => {
    nivel_satisfaccion = 0;
})

btnEnviar.addEventListener('click', () => {
    if(nivel_satisfaccion != 0){
        ajax({
	    url: "http://192.168.0.100:4040/nivel_satifaccion/nuevo_nivel_satifaccion",
            method: "POST",
            success: (res) => resetearValores(),
            error: (err) =>  console.log("Error"),
            data: {
                "comentario_satisfaccion": txtComentario.value,
                "folio_ticket": txtFolio.value,
                "nivel_satisfaccion": nivel_satisfaccion
            }
        });        
    }else{
        alert('Por favor selecciona una carita.');
    }
});

function resetearValores(){
    nivel_satisfaccion = 0;
    txtFolio.value="";
    txtComentario.value="";
}
