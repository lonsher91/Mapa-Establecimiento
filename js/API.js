class API {

    async obtenerDatos() {

        const total = 100;
        //obtener datos desde la API
        const datos = await fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`);

        //Retornar datos como json
        const respuestaJSON = await datos.json();

        return {
            respuestaJSON
        }
    }
}