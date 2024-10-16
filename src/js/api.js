import { api_lol } from "./url.js";

export function getCampeon() {
    return fetch(api_lol);  // No se pasa parametro si no es necesario
}
