const $formTemplate = document.getElementById("form-template");
// const $formTemplate = document.getElementById("form-template");
const $form = $formTemplate.content.cloneNode(true);

function generarNodo(tipo, root=$form) {
    return root.getElementById(tipo).cloneNode();
}

// el numero se va a generar cuando se guarde la solicitud 
// const numero_solicitud = $form.getElementById("input").cloneNode();
const $numero_solicitud = generarNodo('input');
$numero_solicitud.placeholder = "Numero solicitud";

//select que seleccione la ciudad destino y origen
// const cod_origen = $form.getElementById("input").cloneNode();
const $cod_origen = generarNodo("input")
$cod_origen.placeholder = "Codigo origen";
$cod_origen.setAttribute('list', 'cods_origen');

$cod_origen.addEventListener("input", async () => {
    
    let val = cod_origen.value;
    let opciones = []
    cod_origen_select.innerHTML = '';
    if(val !== '') {
        opciones = await fetch(`/api/buscar-ciudad/${cod_origen.value}`)
        .then(res => res.json())
    }
    
    let opt = document.createElement("option");
    for (let op of opciones) {
        let opt2 = opt.cloneNode();
        opt2.textContent = op.descripcion;
        cod_origen_select.appendChild(opt2);
    }
    
    if(opciones.length > 0) {
        cod_origen_select.style.display = ''
        cod_origen_select.size=opciones.length
    } else {
        cod_origen_select.style.display = 'none'
    }
    
    
    // let fichas = container.dataset.fichas;
    // let json = JSON.parse(fichas);
    // select_ficha.appendChild(new Option("Seleccione una Ficha", ""));
    // json.forEach(ficha => {
    //     select_ficha.appendChild(new Option(ficha, ficha));
    // });
    
});

// let cods_origen = document.createElement('datalist')
// cods_origen.setAttribute('id', 'cods_origen')
// const $cod_origen_select = $form.getElementById("select").cloneNode();
const $cod_origen_select = generarNodo("select");
$cod_origen_select.setAttribute('id', 'cods_origen')
$cod_origen_select.setAttribute('multiple', '')
$cod_origen_select.style.display = 'none'

// const cod_destino = $form.getElementById("input").cloneNode();
const $cod_destino = generarNodo("input");
$cod_destino.placeholder = "Codigo destino";

//imputacion presupuestaria 
// const $cod_centro_costo = $form.getElementById("input").cloneNode();
const $cod_centro_costo = generarNodo("input");
$cod_centro_costo.placeholder = "centro costo";

const $disponibilidad = generarNodo("input");
$disponibilidad.placeholder = "disponibilidad";
$disponibilidad.type = "number";

const $select_ficha = generarNodo("select");
$select_ficha.addEventListener("change", () => {
    imputacion_presupuestaria(select_ficha.value);
    mostrarForm(null, false);
});

const $fecha_inicio = generarNodo("input");
$fecha_inicio.min = new Date().toISOString().split("T")[0];
$fecha_inicio.type = "date";

const $fecha_fin = generarNodo("input");
$fecha_fin.min = new Date().toISOString().split("T")[0];
$fecha_fin.placeholder = "fecha Inicio";
$fecha_fin.type = "date";

const $hora_inicio = generarNodo("input");
$hora_inicio.type = "time";
$hora_inicio.placeholder = "Hora Inicio";

const $hora_fin = generarNodo("input");
$hora_fin.type = "time";
$hora_fin.placeholder = "Hora Inicio";

const $motivo = generarNodo("textarea");
$motivo.placeholder = "Motivo de la Solicitud";

//select ficha_beneficiario
const $ficha_beneficiario = generarNodo("input");
$ficha_beneficiario.placeholder = "ficha beneficiario";
$ficha_beneficiario.classList.remove('w-full')

const $nombre_beneficiario = generarNodo("input");
$nombre_beneficiario.placeholder = "nombre beneficiario";
$nombre_beneficiario.setAttribute("disabled","")

const $cargo_beneficiario = generarNodo("input");
$cargo_beneficiario.placeholder = "cargo beneficiario";
$cargo_beneficiario.setAttribute("disabled","")

const $cod_uni_ejec = generarNodo("input");
$cod_uni_ejec.placeholder = "codigo unidad ejecutora";
$cod_uni_ejec.setAttribute("disabled","")

const $dependencia = generarNodo("input");
$dependencia.placeholder = "dependencia";
$dependencia.setAttribute("disabled","")

const $buscaBeneficiario = document.createElement("button");
$buscaBeneficiario.classList.add("btn","btn-primary","btn-border","btn-round","border","px-4","py-2","guardar-btn")
$buscaBeneficiario.textContent = 'Buscar'

$buscaBeneficiario.addEventListener("click", (event) => {
    event.preventDefault()    
    
    console.log(  ficha_beneficiario.value)
    fetch(`/api/beneficiario/${ficha_beneficiario.value}`)
    .then((response) => {
        if (response.ok) return response.text();
        throw new Error(response.status);
    })
    .then((data) => {
        // Remove extra content before parsing (temporary solution)
        const startIndex = data.indexOf('{');
        const endIndex = data.lastIndexOf('}');
        const jsonData = data.substring(startIndex, endIndex + 1);
        
        try {
            const parsedData = JSON.parse(jsonData);
            nombre_beneficiario.value=parsedData.nombre;
            cargo_beneficiario.value=parsedData.cargo;
            cod_uni_ejec.value=parsedData.cod_unidad_ejecutora;
            dependencia.value=parsedData.dependencia;
            console.log(parsedData)
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    })
    .catch((err) => {
        console.error("ERROR: ", err);
    });
    
});

const $ficha_solicitud = generarNodo("input");
$ficha_solicitud.placeholder = "ficha solicitud";

const $ficha_autorizado = generarNodo("input");
$ficha_autorizado.placeholder = "ficha autorizado";

const $pernoctas = generarNodo("input");
$pernoctas.placeholder = "pernoctas";
$pernoctas.type = "number";

const $dias = generarNodo("input");
$dias.placeholder = "dias";
$dias.type = "number";
//se va a mandar transcrito
const $status = generarNodo("input");
$status.placeholder = "status";