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
    img_enojado.src="resourse/enojado_b.png";
    img_triste.src="resourse/triste.png";     
    img_feliz.src="resourse/feliz.png";
});

img_triste.addEventListener('click', () => {
    nivel_satisfaccion = 2;
    img_triste.src="resourse/triste_b.png";
    img_feliz.src="resourse/feliz.png";      
    img_enojado.src="resourse/enojado.png";
});

img_feliz.addEventListener('click', () => {
    nivel_satisfaccion = 3;
    img_feliz.src="resourse/feliz_b.png";
    img_enojado.src="resourse/enojado.png";
    img_triste.src="resourse/triste.png"; 
});

btnBorrar.addEventListener('click', () => {
    nivel_satisfaccion = 0;
    img_enojado.src="resourse/enojado.png";
    img_feliz.src="resourse/feliz.png";	
    img_triste.src="resourse/triste.png";	
})

btnEnviar.addEventListener('click', () => {
    if(nivel_satisfaccion != 0){
        ajax({
					 url: "http://192.168.1.81:8070/satisfaction_survey/",
            method: "POST",
            success: (res) => resetearValores(),
            error: (err) =>  console.log("Error"),
            data: {
                "coment": txtComentario.value,
                "folio_ticket": txtFolio.value,
                "level_of_satisfaction": nivel_satisfaccion,
            }
        });        
    }else{
        alert('Por favor selecciona una carita.');
    }
    img_enojado.src="resourse/enojado.png";
    img_feliz.src="resourse/feliz.png";
    img_triste.src="resourse/triste.png";
});

function resetearValores(){
    nivel_satisfaccion = 0;
    txtFolio.value="";
    txtComentario.value="";
}
