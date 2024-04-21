export function limpiar(id) {
    document.getElementById(id).innerHTML = "";
}

export function clonarNodo($root, tipo, full=false) {
  return $root.getElementById(tipo).cloneNode(full);
}

export function limpiar(id) {
    document.getElementById(id).innerHTML = "";
}