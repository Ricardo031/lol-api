import {
    getCampeon
} from './js/api.js';

obtenerCampeon();

function obtenerCampeon() {
    let random = numeroAleatorio(160) + 1; // Genera un número aleatorio para seleccionar un campeón

    let llamarcampeon = getCampeon(); //* Llama a la API
    llamarcampeon
        .then((res) => res.json())
        .then((res2) => {
            console.log(res2); // Imprime la respuesta de la API para ver toda la información

            const campeones = res2.data; // Obtiene los datos de los campeones
            const selectCampeon = Object.keys(campeones)[random]; // Selecciona un campeón aleatorio
            const campeon = campeones[selectCampeon]; // Accede al objeto del campeón seleccionado
            console.log(campeon);

            //* Llenar la información del campeón
            llenarInformacion(campeon.id, campeon.title, campeon.image, campeon.stats, campeon.tags, campeon.partype); //el id es lo mismo que el name
        });
}

//todo: Función para generar un número aleatorio
function numeroAleatorio(max) {
    return Math.floor(Math.random() * max);
}

//todo: Llenar información del campeón
function llenarInformacion(name, title, image, stats, tags, partype) {
    let input = document.getElementById('inputCampeon');
    input.value = name; //* Establece el valor del input al nombre del campeón
    let div = $('.estadisticas');
    div.empty(); 

    // Crear la primera tabla (estadísticas)
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

    // Agregar la parte "partype" directamente, ya que es un valor string
    tabla += `<tr>`;
    tabla += `<td>Partype</td>`;
    tabla += `<td>${partype}</td>`; // Simplemente mostrar el valor de partype
    tabla += `</tr>`;

    tabla += `</table>`;
    div.append(tabla); // Agrega la primera tabla al div de estadísticas

    // Crear la segunda tabla (tags)
    let tabla2 = `<table class="table"> <tr><th>Rol</th></tr>`; // Encabezado de la tabla

    // Iterar sobre el array de tags y crear una fila por cada uno
    for (let tag of tags) { 
        tabla2 += `<tr>`;
        tabla2 += `<td>${tag}</td>`; // Mostrar cada tag (como "Fighter", "tank" y etc)
        tabla2 += `</tr>`;
    }

    tabla2 += `</table>`;
    div.append(tabla2); 

    let imagen = document.getElementById('campeon_img')
    const splashUrl =`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_0.jpg`;
    imagen.src = splashUrl;
}
