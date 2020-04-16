class UI {
    constructor() {

        //Instanciar API
        this.api = new API();

        //Crear makers con layerGroup
        this.markers = new L.LayerGroup();

         // Iniciar el mapa
         this.mapa = this.inicializarMapa();
    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
         const map = L.map('mapa').setView([19.4284706, -99.1276627], 6);
         const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
         L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);
         
         return map;
    }

    mostrarEstablecimiento() {

        this.api.obtenerDatos()
            .then(datos => {
                //Extrae los resultados de la respuesta JSON
                const resultado = datos.respuestaJSON.results;

                //Ejecuta la funcion para mostrar  los pines en el mapa
                this.mostrarPines(resultado);
            });

    }

    mostrarPines(datos) {
        
        //Limpia los makers cuando se manda a llamar
        this.markers.clearLayers();

        //Recorremos los establecimientos
        datos.forEach(establecimiento => {
            
            //Destructuring
            const {latitude, longitude, calle, regular, premium} = establecimiento;

            //Crear PopUp
            const optionPopUp = L.popup().setContent(
                `
                <p> ${calle}</p>
                <p>Precio <b>regular:</b> $ ${regular}</p>
                <p>Precio <b>Premium:</b> $ ${premium}</p>
                `
            );

            //Agregar Pin
            const marker = new L.marker([ parseFloat(latitude), parseFloat(longitude) ]).bindPopup(optionPopUp);
            
            //Agregamos cada Pin a la capa de markers
            this.markers.addLayer(marker);
        });

        //Agregamos la capa al mapa
        this.markers.addTo(this.mapa);

    }

    //Buscador
    obtenerSugerencias(aBuscar) {

        this.api.obtenerDatos()
            .then(datos => {

                //obtener los establecimientos
                const resultados = datos.respuestaJSON.results;
                
                //Enviar JSON y el elemento a buscar para realizar el filtrado

                this.filtrarSugerencias(resultados, aBuscar);
            })
    }

    //Filtrar sugerencias
    filtrarSugerencias(resultado, aBuscar) {

        //Filtrar con .filter
        const filtro = resultado.filter(filtro => filtro.calle.indexOf(aBuscar) !== -1);
        console.log(filtro);
        //Mostrar los pines
    }
}