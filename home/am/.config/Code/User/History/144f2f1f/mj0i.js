import { limpiar, clonarNodo } from "../../libs/utils.js";

export const $formTemplate = document.getElementById("form-template");
export const $cloneForm = $formTemplate.content.cloneNode(true);
// el numero se va a generar cuando se guarde la solicitud 
export const $numero_solicitud = clonarNodo($cloneForm, 'input');
$numero_solicitud.placeholder = "Numero solicitud";
//select que seleccione la ciudad destino y origen
export const $cod_origen = clonarNodo($cloneForm, 'input');
$cod_origen.placeholder = "Codigo origen";
$cod_origen.setAttribute('list', 'cods_origen');
// let cods_origen = document.createElement('datalist')
// cods_origen.setAttribute('id', 'cods_origen')
export const $cod_origen_select = cloneForm.getElementById("select").cloneNode();
$cod_origen_select.setAttribute('id', 'cods_origen')
$cod_origen_select.setAttribute('multiple', '')
$cod_origen_select.style.display = 'none'



export const $cod_destino = clonarNodo($cloneForm, 'input');
$cod_destino.placeholder = "Codigo destino";
//imputacion presupuestaria 
export const $cod_centro_costo = clonarNodo($cloneForm, 'input');
$cod_centro_costo.placeholder = "centro costo";
export const $disponibilidad = clonarNodo($cloneForm, 'input');
$disponibilidad.placeholder = "disponibilidad";
$disponibilidad.type = "number";
export const $select_ficha = cloneForm.getElementById("select").cloneNode();

export const $fecha_inicio = clonarNodo($cloneForm, 'input');
$fecha_inicio.min = new Date().toISOString().split("T")[0];
$fecha_inicio.type = "date";

export const $fecha_fin = clonarNodo($cloneForm, 'input');
$fecha_fin.min = new Date().toISOString().split("T")[0];
$fecha_fin.placeholder = "fecha Inicio";
$fecha_fin.type = "date";

export const $hora_inicio = clonarNodo($cloneForm, 'input');
$hora_inicio.type = "time";
$hora_inicio.placeholder = "Hora Inicio";
export const $hora_fin = clonarNodo($cloneForm, 'input');
$hora_fin.type = "time";
$hora_fin.placeholder = "Hora Inicio";
export const $motivo = cloneForm.getElementById("textarea").cloneNode();
$motivo.placeholder = "Motivo de la Solicitud";

//select ficha_beneficiario
export const $ficha_beneficiario = clonarNodo($cloneForm, 'input');
$ficha_beneficiario.placeholder = "ficha beneficiario";
$ficha_beneficiario.classList.remove('w-full')

export const $nombre_beneficiario = clonarNodo($cloneForm, 'input');
$nombre_beneficiario.placeholder = "nombre beneficiario";
$nombre_beneficiario.setAttribute("disabled","")

export const $cargo_beneficiario = clonarNodo($cloneForm, 'input');
$cargo_beneficiario.placeholder = "cargo beneficiario";
$cargo_beneficiario.setAttribute("disabled","")

export const $cod_uni_ejec = clonarNodo($cloneForm, 'input');
$cod_uni_ejec.placeholder = "codigo unidad ejecutora";
$cod_uni_ejec.setAttribute("disabled","")

export const $dependencia = clonarNodo($cloneForm, 'input');
$dependencia.placeholder = "dependencia";
$dependencia.setAttribute("disabled","")

export const $buscaBeneficiario = document.createElement("button");
$buscaBeneficiario.classList.add("btn","btn-primary","btn-border","btn-round","border","px-4","py-2","guardar-btn")
$buscaBeneficiario.textContent = 'Buscar'

export const $ficha_solicitud = clonarNodo($cloneForm, 'input');
$ficha_solicitud.placeholder = "ficha solicitud";

export const $ficha_autorizado = clonarNodo($cloneForm, 'input');
$ficha_autorizado.placeholder = "ficha autorizado";

export const $pernoctas = clonarNodo($cloneForm, 'input');
$pernoctas.placeholder = "pernoctas";
$pernoctas.type = "number";

export const $dias = clonarNodo($cloneForm, 'input');
$dias.placeholder = "dias";
$dias.type = "number";
//se va a mandar transcrito
export const $status = clonarNodo($cloneForm, 'input');
$status.placeholder = "status";