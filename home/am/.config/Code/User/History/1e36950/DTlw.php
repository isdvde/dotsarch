<?php

namespace App\Http\Livewire\Scs\Almacen\NotasEntrega;
use App\Models\Scs\Almacen\DetalleMovimiento;
use App\Models\Scs\Almacen\Movimiento;
use App\Models\Scs\Almacen\SolicitudMaterial;
use App\Models\Scs\Almacen\DetalleSolicitudMaterial;
use App\Models\Scs\Almacen\Inventario;
use App\Models\Personal\Personal;
use App\Models\Planificacion\UnidadEjecutora;
use App\Models\Scs\Almacen\Almacen;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;
use Illuminate\Support\Facades\DB;

class NotasEntregaFormComponent extends Component
{
    public $num_doc, $fecha_doc, $status, $id_almacenista, $user_id, $nota, $id_tipo_documento, $id_documento_ref, $id_centro_costo, $centroCosto;
    public $editar = 0, $usuario, $id_almacen, $almacen;
    public $solicitud, $detalleSolicitud, $entrega;

    public $entregaId, $detalles = null, $id_detalle, $id_solicitud = [];
    public $items = [], $i = 0;
    public $id_solicitudes = [];

    protected $rules = [

        'num_doc' => 'requited',
        'fecha_doc' => 'required',
        'num_doc_origen' => 'required',
        'num_origen' => 'requited',
        'nota' => 'nullable',
        'id_almacenista' => 'required',
        'id_documento_ref' => 'requited'
    ];

    protected $listeners = [
        'entrega:deleteData' => 'deleteData',
        'actualizar' => '$refresh',
        'cargarDatos' => 'cargar',
    ];


    public function render()
    {
        if ($this->editar) {
            $this->status = $this->entrega->status;
        }
        return view('livewire.scs.almacen.notas-entrega.notas-entrega-form-component')
            ->with('solicitudes', SolicitudMaterial::where('status', '=', 'RECEPCIONADO')
            ->where('id_centro_costo', '=', $this->id_centro_costo)
            ->where('id_almacen', '=', $this->id_almacen)->get())
            ->with('centrosCosto', UnidadEjecutora::all())
            ->with('almacenes',  Almacen::where('status',"ACTIVO")->get());
    }

    public function mount()
    {
        $this->fecha_doc = date('Y-m-d');
        $this->status = 'TRANSCRITO';
        $this->num_doc = $this->numEntrega();
        if (isset($this->entregaId)) {
            $this->cargar($this->entregaId);
        }
    }

    public function numEntrega()
    {
        $year = date('Y');
        $s = Movimiento::where('num_doc', 'ilike', "${year}%")->where('id_tipo_documento', '=', 4)->orderBy('id', 'desc')->first();
        if ($s == null) return $year . "00001";
        return strval(intval($s->num_doc) + 1);
    }

    public function deleteConfirm($id)
    {
        $this->dispatchBrowserEvent('deleteConfirm', [
            'title' => '¿Estas seguro?',
            'message' => 'Que quieres eliminar',
            'id' => $id,
            'modulo' => 'entrega'
        ]);
    }

    public function deleteData($id)
    {
        //acomodar
        $e= $this->entrega->detalleMovimientos->where('id_documento_ref', '=', $id);

        for($i=0; $i<count($e); $i++ ){

            $e[$i]->delete();
        }

        //DB::table('almacen.detalle_movimientos')->where('id', $id)->delete();
        $this->cargar($this->entregaId);
    }

    public function limpiar()
    {
        $this->num_doc = '';
        $this->fecha_doc = '';
        $this->nota = '';
        $this->id_almacenista = '';
        $this->id_documento_ref = '';
        $this->detalles = [];
    }

    public function crear()
    {
        $this->usuario = Auth::user();
        $this->id_almacenista = Personal::where('cedula', '=', $this->usuario->cedula)->first();

        $m = Movimiento::create([
            'num_doc' => $this->num_doc,
            'fecha_doc' => $this->fecha_doc,
            'status' => 'TRANSCRITO',
            'nota' => $this->nota,
            'id_almacen' =>$this->id_almacen,
            'id_tipo_documento' => 4,
            'id_almacenista' => $this->id_almacenista->id,
            'user_id' => $this->usuario->id,
            'nota' => $this->nota,
        ]);

        for ($i = 0; $i < count($this->id_solicitudes); $i++) {
            $detalleSolicitud = DetalleSolicitudMaterial::where('id_solicitud', '=', $this->id_solicitudes[$i]['id'])->get();

            for ($j = 0; $j < count($detalleSolicitud); $j++) {

                if (isset($detalleSolicitud[$j])) {
                    DetalleMovimiento::create([
                        'id_movimiento' => $m->id,
                        'id_documento_ref' => $this->id_solicitudes[$i]['id'],
                        'id_detalle_documento_ref' => $detalleSolicitud[$j]->id,
                        'id_articulo' => $detalleSolicitud[$j]->id_articulo,
                        'cantidad' =>  $detalleSolicitud[$j]->cantidad,
                        'conforme' => null,
                    ]);
                }
            }
        }

        return redirect(route('notas-entrega'));
    }

    public function  hydrateIdSolicitudes() {
        foreach($this->id_solicitudes as $index => $idSolicitudes){
            if(is_array($idSolicitudes)) {
                $this->id_solicitudes[$index] = SolicitudMaterial::find($idSolicitudes["id"]);
            }
        }
    }

    public function validarDisponible($solicitud){

        $union = array_merge($this->id_solicitudes,$this->id_solicitud);

        foreach( $solicitud->detalleSolicitudesMaterial as $d){
            $cantidad_inventario=Inventario::where('id_articulo', '=',  $d->id_articulo)
            ->where('id_centro_costo', '=', $this->id_centro_costo)
            ->where('id_almacen', $this->id_almacen)->first()->cantidad_actual;

            if(! empty($union)) {
                $acum = $d->cantidad;

                foreach($union as $solicitudUnion){

                    $detalleSolicitudMaterial = DetalleSolicitudMaterial::where('id_solicitud', $solicitudUnion->id)->get();

                    foreach($detalleSolicitudMaterial as $detalle){
                        if($d->id_articulo == $detalle->id_articulo){
                           $acum += $detalle->cantidad;

                           if($acum > $cantidad_inventario){
                            return false;
                           }
                        }
                    }
                }
            } else {
                if($d->cantidad > $cantidad_inventario){
                    return false;
                   }
            }

            return true;
       }


    }

    public function increment($id = null)
    {
        if (isset($id)) {
            $solicitud = SolicitudMaterial::find($id);

            if( $this->validarDisponible($solicitud)){

                $this->id_solicitudes[] = $solicitud;
                $this->id_detalle = null;

            }
            else{

                $this->addError("cantidad", " No se puede agregar esta solicitud ya que no hay cantidad suficiente en el inventario");
            }



        }
    }

    public function decrement($index)
    {
        unset($this->id_solicitudes[$index]);
        $this->id_solicitudes = array_values($this->id_solicitudes);
        $this->id_detalle = null;
    }

    public function cargar($id)
    {
        $this->entrega = Movimiento::find($id);
        $this->detalles = $this->entrega->detalleMovimientos;
        $this->num_doc = $this->entrega->num_doc;
        $this->fecha_doc = $this->entrega->fecha_doc;
        $this->nota = $this->entrega->nota;

        $this->id_almacen = $this->entrega->id_almacen;
        $this->almacen = Almacen::find( $this->entrega->id_almacen);
        $id_solicitudes = DetalleMovimiento::distinct()->select('id_documento_ref')->where('id_movimiento', '=', $this->entrega->id)->get();


        foreach ($id_solicitudes as $i => $val) {
            $this->id_solicitud[$i] = SolicitudMaterial::find($id_solicitudes[$i])->first();
        }

        $this->centroCosto = UnidadEjecutora::find($this->id_solicitud[0]->id_centro_costo);
        $this->id_centro_costo = $this->id_solicitud[0]->id_centro_costo;
        $this->id_tipo_documento =  $this->entrega->id_tipo_documento;

        $this->editar = 1;
    }

    public function editar()
    {

        Movimiento::find($this->entregaId)->update([
            'fecha_doc' => $this->fecha_doc,
            'nota' => $this->nota,

        ]);


        //Agregar nuevos detalles
        for ($i = 0; $i < count($this->id_solicitudes); $i++) {
            // $solicitud = SolicitudMaterial::find($this->id_solicitudes[$i]);
            $detalleSolicitud = DetalleSolicitudMaterial::where('id_solicitud', '=', $this->id_solicitudes[$i]->id)->get();



            for ($j = 0; $j < count($this->id_solicitudes[$i]->detalleSolicitudesMaterial); $j++) {

                if (isset($detalleSolicitud[$j])) {
                    DetalleMovimiento::create([
                        'id_movimiento' => $this->entregaId,
                        'id_documento_ref' => $this->id_solicitudes[$i]->id,
                        'id_detalle_documento_ref' => $detalleSolicitud[$j]->id,
                        'id_articulo' => $detalleSolicitud[$j]->id_articulo,
                        'cantidad' =>  $detalleSolicitud[$j]->cantidad,
                        'conforme' => null,
                    ]);
                }
            }
        }

        return redirect(route('notas-entrega'));
    }

    public function  hydrateIdSolicitud() {
        foreach($this->id_solicitud as $index => $idSolicitud){
            if(is_array($idSolicitud)) {
                $this->id_solicitud[$index] = SolicitudMaterial::find($idSolicitud["id"]);
            }
        }
    }

    public function aprobar()
    {

        //$this->editar();



        foreach($this->id_solicitud as $i => $val){


            $solicitud = SolicitudMaterial::find($this->id_solicitud[$i]->id);

            if( $this->validarDisponible($solicitud)){

                $this->entrega->update([
                    'status' => 'APROBADO',

                ]);



                $solicitud->update([

                    'status' => 'ENTREGADO',

                 ]);

            $detallesSolicitud = DetalleSolicitudMaterial::where('id_solicitud', '=', $this->id_solicitud[$i]->id)->get();

            foreach ($detallesSolicitud as $dsm) {

                $registro = Inventario::where('id_articulo', '=',  $dsm->id_articulo)
                ->where('id_centro_costo', '=', $this->id_solicitud[$i]['id_centro_costo'])
                ->where('id_almacen', $this->id_almacen)->first();

                $registro->update([

                    'cantidad_actual' =>  $registro->cantidad_actual -  $dsm->cantidad,

                ]);
            }
          }
        }

        //aqui debo validar que ninguna solicitud tenga otro status
        //si alguna de las solicitudes tiene un status diferente a recepcionado no se aprueba
    }


    public function reversar()
    {
        $this->entrega->update([
            'status' => 'TRANSCRITO',

        ]);

        foreach ($this->detalles as $dne) {

            $registro = Inventario::where('id_articulo', '=',  $dne->id_articulo)
            ->where('id_centro_costo', '=', $this->centroCosto->id)
            ->where('id_almacen', $this->id_almacen)->first();

            if (isset($registro) ) {

                Inventario::find($registro->id)->update([
                    'cantidad_actual' => $registro->cantidad_actual + $dne->cantidad,
                ]);
            }
        }

        foreach($this->id_solicitud as $i => $val){

            $solicitud = SolicitudMaterial::find($this->id_solicitud[$i]['id']);

            $solicitud->update([

                'status' => 'RECEPCIONADO',

            ]);

        }
    }

    public function home()
    {
        return redirect(route('notas-entrega'));
    }

    public function imprimir($id)
    {
        return redirect(route('notas-entrega.pdf', $id));


    }
}
