export function limpiar(el) {
    //document.getElementById(id).innerHTML = "";
    document.querySelector(el).innerHTML = "";
}

export function clonarNodo($root, tipo, full=false) {
  return $root.getElementById(tipo).cloneNode(full);
}