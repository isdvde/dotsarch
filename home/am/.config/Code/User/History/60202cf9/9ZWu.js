import Swal from "sweetalert2";
// import TomSelect from 'tom-select';

import moment from 'moment';

import * as $form from './form.js';
import { limpiar, clonarNodo } from "../../libs/utils.js";
import {DetallesViatico } from "../../components/x-viaticos-detalle.js";
import { Container } from "postcss";

let $container = document.getElementById("container");
let $$form = $form.$formTemplate.content.firstElementChild.cloneNode();

$form.$ficha_solicitud.addEventListener("change", async () => {
    imputacion_presupuestaria($form.$ficha_solicitud.value);
    await mostrarForm(null, false);
});

$form.$fecha_fin.addEventListener("change", async () => {
    if($form.$fecha_inicio.value !== ''){
        var fecha_inicio= moment($form.$fecha_inicio.value, 'YYYY/MM/DD');
        var fecha_fin= moment($form.$fecha_fin.value, 'YYYY/MM/DD');
        $form.$dias.value = fecha_fin.diff(fecha_inicio, 'days');
    }
});

$form.$fecha_inicio.addEventListener("change", async () => {
    if($form.$fecha_fin.value !== ''){
        var fecha_inicio= moment($form.$fecha_inicio.value, 'YYYY/MM/DD');
        var fecha_fin= moment($form.$fecha_fin.value, 'YYYY/MM/DD');
        $form.$dias.value = fecha_fin.diff(fecha_inicio, 'days');
    }
});

$form.$buscaBeneficiario.addEventListener("click", (event) => {
    event.preventDefault();  
    cargarDatosBeneficiario();
});

function cargarDatosBeneficiario(){
    console.log($form.$ficha_beneficiario.value)
    fetch(`/api/beneficiario/${$form.$ficha_beneficiario.value}`)
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
            $form.$nombre_beneficiario.value=parsedData.nombre;
            $form.$cargo_beneficiario.value=parsedData.cargo;
            $form.$cod_uni_ejec.value=parsedData.cod_unidad_ejecutora;
            $form.$dependencia.value=parsedData.dependencia;
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    })
    .catch((err) => {
        console.error("ERROR: ", err);
    });
}

$form.$cod_origen.addEventListener('input', function(e){
    if($form.$cod_origen.value === '') {
        $form.$cod_origen.style.display = 'none';
        $form.$cod_origen.value = '';
        $form.$cod_origen_busqueda.value = '';
        $form.$cod_origen_busqueda.style.display = '';

    }
});

$form.$cod_origen_select.addEventListener('change', function(e) {
    $form.$cod_origen_busqueda.style.display = 'none';
    $form.$cod_origen.style.display = '';
    $form.$cod_origen.value = $form.$cod_origen_select.value;
    $form.$cod_origen_busqueda.value = '';
    $form.$cod_origen_select.innerHTML = '';
    $form.$cod_origen_select.style.display = 'none';
});

$form.$cod_origen_busqueda.addEventListener("input", async () => {
    let val = $form.$cod_origen_busqueda.value;
    let opciones = []
    $form.$cod_origen_select.innerHTML = '';
    if(val !== '') {
        opciones = await fetch(`/api/buscar-ciudad/${$form.$cod_origen_busqueda.value}`)
        .then(res => res.json())
    }
    
    let opt = document.createElement("option");
    for (let op of opciones) {
        let opt2 = opt.cloneNode();
        opt2.textContent = op.codigo;
        $form.$cod_origen_select.appendChild(opt2);
    }
    
    if(opciones.length > 0) {
        $form.$cod_origen_select.style.display = ''
        $form.$cod_origen_select.size=opciones.length
    } else {
        $form.$cod_origen_select.style.display = 'none'
    }
});
///////////////////////////////////////////////////////////


$form.$cod_destino.addEventListener('input', function(e){
    if($form.$cod_destino.value === '') {
        $form.$cod_destino.style.display = 'none';
        $form.$cod_destino.value = '';
        $form.$cod_destino_busqueda.value = '';
        $form.$cod_destino_busqueda.style.display = '';

    }
});

$form.$cod_destino_select.addEventListener('change', function(e) {
    $form.$cod_destino_busqueda.style.display = 'none';
    $form.$cod_destino.style.display = '';
    $form.$cod_destino.value = $form.$cod_destino_select.value;
    $form.$cod_destino_busqueda.value = '';
    $form.$cod_destino_select.innerHTML = '';
    $form.$cod_destino_select.style.display = 'none';
});

$form.$cod_destino_busqueda.addEventListener("input", async () => {
    let val = $form.$cod_destino_busqueda.value;
    let opciones = []
    $form.$cod_destino_select.innerHTML = '';
    if(val !== '') {
        opciones = await fetch(`/api/buscar-ciudad/${$form.$cod_destino_busqueda.value}`)
        .then(res => res.json())
    }
    
    let opt = document.createElement("option");
    for (let op of opciones) {
        let opt2 = opt.cloneNode();
        opt2.textContent = op.codigo;
        $form.$cod_destino_select.appendChild(opt2);
    }
    
    if(opciones.length > 0) {
        $form.$cod_destino_select.style.display = ''
        $form.$cod_destino_select.size=opciones.length
    } else {
        $form.$cod_destino_select.style.display = 'none'
    }
});

///////////////////////////////////////////////////////////

async function buscarDetallesNormales($$form){

    let datos = await fetch(`/api/concepto-tipo/NORMAL`)
    .then((response) => {
        if (response.ok) return response.json()
    })
        try {
        
            for(let data of datos.data){
                $$form.append( new DetallesViatico({
                    nombre: data.descripcion ,
                    monto: data.monto,
                    tipo_calculo: data.tipo_calculo,
                }));

            }
     
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
}


$form.$pasaje.addEventListener("change", async function(){

    let datos=[];
    let componentes=[];

    if($form.$pasaje.value !== ''){

        datos = await fetch(`/api/concepto-tipo/${$form.$pasaje.value}`)
         .then((response) => {
            if (response.ok) return response.json()
        })

        try {

            for(let data of datos.data){
              componentes.push(  new DetallesViatico({
                    nombre: data.descripcion ,
                    monto: data.monto,
                    tipo_calculo: data.tipo_calculo,
                }));

            }

            $form.$divPasaje.innerHTML='';

            for(let comp of componentes){
                $form.$divPasaje.append(comp);
            }

        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    }

});

async function mostrarForm(id = null, mostrarSoloFicha = false) {
    limpiar("container");
   
    if(id){
        cargarDatosBeneficiario();
    }

    if (mostrarSoloFicha) {
        $container.append($form.$ficha_solicitud);
        return;
    }
    //mostrar formulario
   

    const $footer = $form.$cloneForm.querySelector(".card-footer").cloneNode();

    //BOTON CANCELAR
    let $cancelarBtn = $form.$cloneForm.querySelector(".cancelar-btn").cloneNode(true);
    cancelar($cancelarBtn);

    //BOTON GUARDAR
    let $guardarBtn = $form.$cloneForm.querySelector(".guardar-btn").cloneNode(true);
    guardar($guardarBtn, id);
    $footer.append($cancelarBtn, $guardarBtn);
    
    $$form.append(
        $form.$ficha_solicitud,
        // $form.$ficha_beneficiario,
        // $form.$buscaBeneficiario,
        $form.$div_beneficiario,
        $form.$nombre_beneficiario,
        $form.$cargo_beneficiario,
        $form.$cod_uni_ejec,
        $form.$dependencia,
        $form.$numero_solicitud,
        $form.$cod_origen,
        $form.$cod_origen_busqueda,
        $form.$cod_origen_select,
        $form.$cod_destino,
        $form.$cod_destino_busqueda,
        $form.$cod_destino_select,
        $form.$fecha_inicio,
        $form.$fecha_fin,
        $form.$hora_inicio,
        $form.$hora_fin,
        $form.$dias,
        $form.$motivo,
        $form.$ficha_autorizado,
        $form.$status,
        $form.$cod_centro_costo,
        $form.$disponibilidad
       
    );
    await buscarDetallesNormales($$form);

    $$form.append($form.$pasaje);

    $$form.append($form.$divPasaje);
    $$form.append($footer);

    document.getElementById("container").append($$form);
}
    
const edit = async (id) => {
    try {
        const response = await fetch(`/api/solicitud-viatico/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            
            body: JSON.stringify({
             
                numero_solicitud: $form.$numero_solicitud.value,
                cod_origen: $form.$cod_origen.value,
                cod_destino: $form.$cod_destino.value,
                fecha_inicio: $form.$fecha_inicio.value,
                fecha_fin: $form.$fecha_fin.value,
                hora_inicio: $form.$hora_inicio.value,
                hora_fin: $form.$hora_fin.value,
                motivo: $form.$motivo.value,
                cod_centro_costo: $form.$cod_centro_costo.value,
                disponibilidad: $form.$disponibilidad.value,
                ficha_beneficiario: $form.$ficha_beneficiario.value,
                ficha_solicitud: $form.$ficha_solicitud.value,
                ficha_autorizado: $form.$ficha_autorizado.value,
                dias: $form.$dias.value,
                status: $form.$status.value,
            }),
            
        });

    } catch (error) {
        // Mostrar mensaje de error general
        console.error(error);
    }
};

function guardar(guardarBtn, id = null) {
    guardarBtn.addEventListener("click", async () => {
        limpiar("container");
        if (id) {
            await edit(id);
            console.log(id);
            tabla();
        } else {
            const formData = new FormData(document.getElementById("form"));
          
            formData.append('numero_solicitud',$form.$numero_solicitud.value); 
            formData.append('cod_origen',$form.$cod_origen.value); 
            formData.append('cod_destino',$form.$cod_destino.value); 
            formData.append('fecha_inicio',$form.$fecha_inicio.value);
            formData.append('fecha_fin',$form.$fecha_fin.value); 
            formData.append('hora_inicio',$form.$hora_inicio.value); 
            formData.append('hora_fin',$form.$hora_fin.value); 
            formData.append('motivo',$form.$motivo.value);
            formData.append('cod_centro_costo',$form.$cod_centro_costo.value); 
            formData.append('ficha_beneficiario',$form.$ficha_beneficiario.value); 
            formData.append('tipo_pasaje',$form.$pasaje.value); 
            formData.append('ficha_solicitud',$form.$ficha_solicitud.value); 
            formData.append('ficha_autorizado',$form.$ficha_autorizado.value);
            formData.append('dias',$form.$dias.value); 
            formData.append('status',$form.$status.value); 
            formData.append('disponibilidad',$form.$disponibilidad.value);
            console.log($form.$pasaje.value)
            let detalles_viaticos = document.querySelectorAll("x-viaticos-detalle");
            let detalles=[];

            for (let i = 0; i < detalles_viaticos.length; i++) {
    
                formData.append("detalles["+i+"][descripcion]", detalles_viaticos[i].querySelector(".nombre").textContent);
                formData.append("detalles["+i+"][total]", detalles_viaticos[i].querySelector(".total").value || 0);
                formData.append("detalles["+i+"][cantidad]", detalles_viaticos[i].querySelector(".cantidad").value || 0);                
             
            }
         
            await fetch("/api/solicitud-viatico", {
                method: "POST",
                body: formData,
            });
            tabla();
        }
    });
}

function cancelar(cancelarBtn) {
    cancelarBtn.addEventListener("click", async () => {
        tabla();
    });
}

function fichas_solicitud(){
    let fichas = $container.dataset.fichas;
    let json = JSON.parse(fichas);
    $form.$ficha_solicitud.appendChild(new Option("Seleccione una Ficha", ""));
    json.forEach((ficha) => {
        $form.$ficha_solicitud.appendChild(new Option(ficha, ficha));
    });
}


document.getElementById("agregar").addEventListener("click", async function () {
    $form.$ficha_solicitud.value = "";
    $form.$cod_centro_costo.value = "";
    
    fichas_solicitud();
    
    $form.$cod_uni_ejec.value = "";
    $form.$ficha_beneficiario.value = "";
    $form.$nombre_beneficiario.value = "";
    $form.$cargo_beneficiario.value = "";
    $form.$dependencia.value = "";
    $form.$disponibilidad.value = "";
    $form.$numero_solicitud.value = "";
    $form.$cod_origen.value = "";
    $form.$cod_destino.value = "";
    $form.$cod_origen_busqueda.value = "";
    $form.$cod_destino_busqueda.value = "";
    $form.$fecha_inicio.value = "";
    $form.$fecha_fin.value = "";
    $form.$hora_inicio.value = "";
    $form.$hora_fin.value = "";
    $form.$motivo.value = "";
    $form.$ficha_beneficiario.value = "";
    $form.$ficha_solicitud.value = "";
    $form.$ficha_autorizado.value = "";
    $form.$dias.value = "";
    $form.$status.value = "";
 
    await mostrarForm(null, true);
});

function imputacion_presupuestaria(ficha) {
    fetch(`/api/imputacion-presupuestaria/${ficha}`)
        .then((response) => {
            if (response.ok) return response.text();
            throw new Error(response.status);
        })
        .then((data) => {
            // Remove extra content before parsing (temporary solution)
            const startIndex = data.indexOf("{");
            const endIndex = data.lastIndexOf("}");
            const jsonData = data.substring(startIndex, endIndex + 1);

            try {
                const parsedData = JSON.parse(jsonData);
                $form.$cod_centro_costo.value = parsedData.centro_costo;
                $form.$disponibilidad.value = parsedData.disponibilidad;
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        })
        .catch((err) => {
            console.error("ERROR: ", err);
        });
}

function editar(id, editBtn) {
    editBtn.addEventListener("click", () => {
       
        fetch(`/api/solicitud-viatico/${id}`)
            .then((response) => {
                if (response.ok) return response.json();
                throw new Error(response.status);
            })
            .then(async (data) => {
                
                $form.$numero_solicitud.value = data.data.numero_solicitud;
                $form.$cod_origen_busqueda.value = data.data.cod_origen;
                $form.$cod_origen.value = data.data.cod_origen;
                $form.$cod_destino.value = data.data.cod_destino;
                $form.$cod_destino_busqueda.value = data.data.cod_destino;
                $form.$fecha_inicio.value = data.data.fecha_inicio;
                $form.$fecha_fin.value = data.data.fecha_fin;
                $form.$hora_inicio.value = data.data.hora_inicio;
                $form.$hora_fin.value = data.data.hora_fin;
                $form.$motivo.value = data.data.motivo;
                $form.$cod_centro_costo.value = data.data.cod_centro_costo;
                $form.$disponibilidad.value = data.data.disponibilidad;
                $form.$ficha_beneficiario.value = data.data.ficha_beneficiario;
                $form.$ficha_solicitud.value = data.data.ficha_solicitud;
                $form.$ficha_autorizado.value = data.data.ficha_autorizado;
                $form.$pasaje.value = data.data.tipo_pasaje;
                $form.$dias.value = data.data.dias;
                $form.$status.value = data.data.status;
                await mostrarForm(id, false);
            })
            .catch((err) => {
                console.error("ERROR: ", err.message);
            });
    });
}

function borrar(tbody, tr, id, deleteBtn) {
    deleteBtn.addEventListener("click", () => {
        Swal.fire({
            title: "¿Estás seguro de eliminar el concepto?",
            text: "Esta acción no se puede revertir.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                // Enviar la solicitud DELETE a la API
                deleteData(id);
                tbody.removeChild(tr);
            }
        });
    });
}

const deleteData = async (id) => {
    const response = await fetch(`/api/solicitud-viatico/${id}`, {
        method: "DELETE",
    });
};

function tabla() {
    limpiar("container");

    fetch("/api/solicitud-viatico")
        .then((response) => {
            if (response.ok) return response.text();
            throw new Error(response.status);
        })
        .then((data) => {
            const json = JSON.parse(data);

            let $tablaTemplate = document.getElementById("table-template");
            let $cloneTabla = $tablaTemplate.content.cloneNode(true);
            let $tabla =
                $tablaTemplate.content.firstElementChild.cloneNode();
            let tbody = $cloneTabla.querySelector("tbody").cloneNode();
            let thead = $cloneTabla.querySelector("thead").cloneNode();
            $tabla.append(thead, tbody);
            let tr = $cloneTabla.querySelector("tr").cloneNode();

            let numeroSolicitudTh = $cloneTabla
                .querySelector("th")
                .cloneNode();
            let numeroSolicitudThSpan = document.createElement("span");
            numeroSolicitudThSpan.innerHTML = "Número de Solicitud";
            numeroSolicitudTh.append(numeroSolicitudThSpan);

            let fechaInicioTh = $cloneTabla.querySelector("th").cloneNode();
            let fechaInicioThSpan = document.createElement("span");
            fechaInicioThSpan.innerHTML = "Fecha Inicio";
            fechaInicioTh.append(fechaInicioThSpan);

            let fechaFinTh = $cloneTabla.querySelector("th").cloneNode();
            let fechaFinThSpan = document.createElement("span");
            fechaFinThSpan.innerHTML = "Fecha Fin";
            fechaFinTh.append(fechaFinThSpan);

            let statusTh = $cloneTabla.querySelector("th").cloneNode();
            let statusThSpan = document.createElement("span");
            statusThSpan.innerHTML = "Status";
            statusTh.append(statusThSpan);

            let accionesTh = $cloneTabla.querySelector("th").cloneNode();
            let accionesThSpan = document.createElement("span");
            accionesThSpan.innerHTML = "Acciones";
            accionesTh.append(accionesThSpan);

            tr.appendChild(numeroSolicitudTh);
            tr.appendChild(fechaInicioTh);
            tr.appendChild(fechaFinTh);
            tr.appendChild(statusTh);
            tr.appendChild(accionesTh);
            thead.appendChild(tr);

            json.forEach((concepto) => {
                let tr = $cloneTabla.querySelector("tr").cloneNode();

                let numeroSolicitudTd = $cloneTabla
                    .querySelector("td")
                    .cloneNode();
                let numeroSolicitudSpan = document.createElement("span");
                numeroSolicitudSpan.innerHTML = concepto.numero_solicitud; // Obtener la descripción del objeto "concepto"
                numeroSolicitudTd.append(numeroSolicitudSpan);

                let fechaInicioTd = $cloneTabla
                    .querySelector("td")
                    .cloneNode();
                let fechaInicioSpan = document.createElement("span");
                fechaInicioSpan.innerHTML = concepto.fecha_inicio;
                fechaInicioTd.append(fechaInicioSpan);

                let fechaFinTd = $cloneTabla
                    .querySelector("td")
                    .cloneNode();
                let fechaFinSpan = document.createElement("span");
                fechaFinSpan.innerHTML = concepto.fecha_fin;
                fechaFinTd.append(fechaFinSpan);

                let statusTd = $cloneTabla.querySelector("td").cloneNode();
                let statusSpan = document.createElement("span");
                statusSpan.innerHTML = concepto.status;
                statusTd.append(statusSpan);

                let dropdownCell = $cloneTabla
                    .querySelector(".dropdown-container")
                    .cloneNode(true);

                let dropdownMenu =
                    dropdownCell.querySelector(".dropdown-menu");
                dropdownMenu.innerHTML = "";

                let editBtn = $cloneTabla
                    .querySelector(".editar-btn")
                    .cloneNode(true);
                editar(concepto.id, editBtn);

                let deleteBtn = $cloneTabla
                    .querySelector(".eliminar-btn")
                    .cloneNode(true);

                dropdownMenu.appendChild(editBtn);
                dropdownMenu.appendChild(deleteBtn);

                tr.appendChild(numeroSolicitudTd);
                tr.appendChild(fechaInicioTd);
                tr.appendChild(fechaFinTd);
                tr.appendChild(statusTd);
                tr.appendChild(dropdownCell);
                tbody.appendChild(tr);
                borrar(tbody, tr, concepto.id, deleteBtn);
            });
            document.getElementById("container").append($tabla);
        })
        .catch((err) => {
            console.log("ERROR: ", err);
        });
}

// Pintar la tabla al cargar la página
window.onload = tabla();