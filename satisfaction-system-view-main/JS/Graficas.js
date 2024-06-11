import {ajax} from "./AJAX.js"
let numero_encuestas_felices = 0;
let numero_encuestas_tristes = 0;
let numero_encuestas_enojados = 0;
const canva_grafica = document.getElementById('miGrafica').getContext('2d');

const obtenerNivelesDeSatisfaccion = () => {
    ajax({
        url: "http://192.168.1.81:8070/surveys/",
        method: "GET",
        success:(respuesta) => {
            console.log(respuesta);
            respuesta.forEach(encuestas_registradas => {
                if(encuestas_registradas.__data__.level_of_satisfaction == 3){
                    numero_encuestas_felices += 1;
                }else if (encuestas_registradas.__data__.level_of_satisfaction == 2){
                    numero_encuestas_tristes += 1;
                }else if (encuestas_registradas.__data__.level_of_satisfaction == 1){  
                    numero_encuestas_enojados += 1;
                }       
        }); 
        
        const name = ['feliz', 'triste', 'enojado'];
        const niveles_de_satisfaccion = [numero_encuestas_felices, numero_encuestas_tristes, numero_encuestas_enojados];

        const grafica_char = new Chart(canva_grafica,{
            type: 'pie',
            data:{
                labels: name, 
                datasets: [{
                    label: 'Niveles de satisfaccion',
                    data: niveles_de_satisfaccion, 

                    backgroundColor: [
                        'rgba(241, 196, 15, 0.95)', 
                        'rgba(21, 67, 96, 0.95)',
                        'rgba(100, 30, 22, 0.95)',
                    ],
                    borderColor:[
                        'rgba(23, 32, 42)', 
                        'rgba(23, 32, 42)',
                        'rgba(23, 32, 42)',
                    ],
                    borderWidth: 1
                }],
            },  
        });
        }
    });
}

document.addEventListener("DOMContentLoaded", obtenerNivelesDeSatisfaccion);


