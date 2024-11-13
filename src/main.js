import {
    getCampeon
} from './js/api.js';

//todo: Evento boton
const btnBuscar = document.getElementById('btn-buscar');
const inputBuscador = document.getElementById('inputCampeon'); // Obtener el input

btnBuscar.addEventListener('click', buscarCampeon);
inputBuscador.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') { // Verifica si la tecla presionada es Enter
        event.preventDefault(); // Previene el reinicio de la página
        buscarCampeon();
    }
});

function buscarCampeon(){
    //* Obtener el valor ingresado por el usuario y eliminar espacios
    let nombre = inputBuscador.value.trim()

    if (!nombre) {
        alert("Por favor, introduce un nombre de campeón."); 
        return;
    }

    //* Llama a la API para obtener los campeones
   getCampeon()
        .then((res) => res.json())
        .then((res2) => {
            const campeones = res2.data;

            //* Busca el campeón por nombre(en este caso id porque son lo mismo)
            const campeon = Object.values(campeones).find(c => c.id.toLowerCase() === nombre.toLowerCase());

            if (!campeon) {
                alert("Campeón no encontrado."); 
                return;
            }

            //* Llenar la información del campeón
            llenarInformacion(campeon.id, campeon.title, campeon.image, campeon.stats, campeon.tags, campeon.partype);
        })
        .catch(error => console.error("Error al obtener datos del campeón:", error));
};


//todo: Llenar información del campeón
function llenarInformacion(name, title, image, stats, tags, partype) {
    let input = document.getElementById('inputCampeon');
    input.value = name; 
    let div = $('.estadisticas');
    div.empty();

    //* Crear la primera tabla (estadísticas)
    let tabla = `<table class="table"> <tr><th>Estadística</th><th>Valor</th></tr>`;

    const estadisticasDeseadas = [
        'hp',
        'movespeed',
        'armor',
        'spellblock',
        'attackdamage',
        'attackspeed'
    ];

    for (let stat of estadisticasDeseadas) {
        tabla += `<tr>`;
        tabla += `<td>${stat}</td>`;
        tabla += `<td>${stats[stat]}</td>`;
        tabla += `</tr>`;
    }

    //* Agregar la parte "partype" directamente, ya que es un valor string
    tabla += `<tr>`;
    tabla += `<td>Partype</td>`;
    tabla += `<td>${partype}</td>`; // Simplemente mostrar el valor de partype
    tabla += `</tr>`;

    tabla += `</table>`;
    div.append(tabla); // Agrega la primera tabla al div de estadísticas

    //* Crear la segunda tabla (tags)
    let tabla2 = `<table class="tablerol"> <tr><th class="titlerol">Rol</th></tr>`; // Encabezado de la tabla

    //* Iterar sobre el array de tags y crear una fila por cada uno
    for (let tag of tags) {
        tabla2 += `<tr class="">`;
        tabla2 += `<td>${tag}</td>`; // Mostrar cada tag (como "Fighter", "tank" y etc)
        tabla2 += `</tr>`;
    }

    tabla2 += `</table>`;
    div.append(tabla2);

    //todo: llenar visualizacion
    let imagen = document.getElementById('campeon_img')
    const splashUrl = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_0.jpg`;
    imagen.src = splashUrl;

    //todo: Titulos y nombres del campeon
    let tituloChamp= document.getElementById('title')
    let nameChamps = document.getElementById('name')

    tituloChamp.textContent = title
    
    nameChamps.textContent = input.value
}