import { API } from './api.js';
import * as UI from './interfaz.js';

UI.formBuscar.addEventListener('submit', (e) => {
    e.preventDefault();

    //Obtener datos del formulario
    const artista = document.querySelector('#artista').value,
        cancion = document.querySelector('#cancion').value;

    if (artista === '' || cancion === '') {
        //Si el usuario deja los campor vacios mostrar el error 3 segundos
        UI.divMensajes.innerHTML = 'Error... Todos los campos son obligatorios';
        UI.divMensajes.classList.add('error');
        setTimeout(() => {
            UI.divMensajes.innerHTML = '';
            UI.divMensajes.classList.remove('error');
        }, 3000);
    } else {
        // El formulario esta completo realizar consulta a la API
        const api = new API(artista, cancion);
        api.consultarAPI()
            .then(data => {
                if (data.respuesta.lyrics) {
                    // La cancion existe
                    const letra = data.respuesta.lyrics;
                    UI.divResultado.textContent = letra;
                } else {
                    // La cancion no existe
                    UI.divMensajes.innerHTML = 'La canción no existe, prueba con otra búsqueda';
                    UI.divMensajes.classList.add('error');
                    setTimeout(() => {
                        UI.divMensajes.innerHTML = '';
                        UI.divMensajes.classList.remove('error');
                        UI.formBuscar.reset();
                    }, 3000);
                }
            });
    }
})