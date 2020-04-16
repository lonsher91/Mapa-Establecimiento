const ui = new UI(); 

//?Evento

document.addEventListener('DOMContentLoaded', () => {
    ui.mostrarEstablecimiento();
})

//Buscar establecimientos
const buscador = document.querySelector('#buscar input');

buscador.addEventListener('input', () => {
    
    if (buscador.value.length >= 3) {
        
        //Buscar en la API
        ui.obtenerSugerencias(buscador.value);
    }
});