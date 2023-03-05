<?php

namespace App\Http\Livewire\Scs\Almacen\Transferencias;

use App\Models\Scs\Almacen\DetalleTransferencia;
use App\Models\Scs\Almacen\Inventario;
use App\Models\Scs\Almacen\Transferencia;
use App\Models\Compras\Articulo;
use App\Models\Personal\Personal;
use App\Models\Planificacion\UnidadEjecutora;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;
use Illuminate\Support\Facades\DB;
use App\Models\Scs\Almacen\Almacen;

class TransferenciasFormComponent extends Component
{

    public $id_centro_costo_1 = null, $id_centro_costo_2 = null, $nota, $fecha, $id_almacenista, $user_id;
    public $id_almacen_origen, $id_almacen_destino;

    public $transferenciaId, $id_transferencia, $cantidad = [], $cantidad_dt = [], $id_inventarios = [], $detalles = null, $id_detalle;
    public $items = [], $i = 0, $mostrar = 0, $num_transferencia;
    public $usuario, $transferencia;
    public  $centro_costo_1, $centro_costo_2;

    protected $listeners = [
        'actualizar' => '$refresh',
        'detalleTransferencia:deleteData' => 'deleteData',
    ];

    public function render()
    {

        if($this->id_centro_costo_1 == null || $this->id_centro_costo_1 == -1){
            $this->id_centro_costo_2 = null;
        }

        $centroCostosOrigen = UnidadEjecutora::all();
        if(isset($this->id_centro_costo_1) || $this->id_centro_costo_1 != -1) {
            if($this->id_almacen_origen == $this->id_almacen_destino){
                $centroCostosDestino = UnidadEjecutora::where("id", "!=", $this->id_centro_costo_1)->get();
            } else {
                $centroCostosDestino = UnidadEjecutora::all();
            }
        } else {
            $centroCostosDestino = null;
        }

        if(empty($this->id_inventarios) && !isset($this->detalles)) {
            $inventario = Inventario::where('id_centro_costo', '=', $this->id_centro_costo_1)->where('id_almacen', $this->id_almacen_origen)->get();
        } else if(!empty($this->id_inventarios) && !isset($this->detalles)){
            $inventario = Inventario::where('id_centro_costo', '=', $this->id_centro_costo_1)->where('id_almacen', $this->id_almacen_origen)->get()->filter(function($item){
                return  ! in_array($item, $this->id_inventarios);
            });
        } else if(empty($this->id_inventarios) && isset($this->detalles)){
            $inventario = Inventario::where('id_centro_costo', '=', $this->id_centro_costo_1)->where('id_almacen', $this->id_almacen_origen)->get()->filter(function($item){
                foreach($this->detalles as $detalle) {
                    return $detalle->id_articulo == $item->id_articulo ? false : true;
                }
            });
        } else {
            $inventario = Inventario::where('id_centro_costo', '=', $this->id_centro_costo_1)->where('id_almacen', $this->id_almacen_origen)->get()->filter(function($item){
                foreach($this->detalles as $detalle) {
                    return (! in_array($item, $this->id_inventarios)) &&
                        ($detalle->id_articulo == $item->id_articulo ? false : true);
                }
            });
        }

        $almacenOrigen = Almacen::where('status',"ACTIVO")->get();
        $almacenDestino = Almacen::where('status', "ACTIVO")->get();

        return view('livewire.scs.almacen.transferencias.transferencias-form-component')
            ->with('centrosCosto1', $centroCostosOrigen)
            ->with('centrosCosto2', $centroCostosDestino)
            ->with('almacenOrigen', $almacenOrigen)
            ->with('almacenDestino', $almacenDestino)
            ->with('inventario', $inventario);
    }

    public function mount()
    {
        $this->fecha = date('Y-m-d');
        $this->num_transferencia = $this->numTransferencia();
        if (isset($this->transferenciaId)) {
            $this->cargar($this->transferenciaId);
        }
    }

    public function verificarCantidad() {
        foreach($this->cantidad as $index => $cant){
            if($cant > $this->id_inventarios[$index]->cantidad_actual){
                $this->addError("cantidad".$index, "El valor del Articulo " . $index+1 . " no puede ser mayor a la cantidad actual");
            } else if ($cant <= 0) {
                $this->addError("cantidad".$index, "El valor del Articulo " . $index+1 . " no puede ser menor o igual a 0");
            }
        }
    }

    public function numTransferencia()
    {
        $year = date('Y');
        $t = Transferencia::where('num_transferencia', 'ilike', "${year}%")->orderBy('id', 'desc')->first();
        if ($t == null) return $year . "00001";
        return strval(intval($t->num_transferencia) + 1);
    }

    public function crear()
    {
        $this->verificarCantidad();
        if(! $this->getErrorBag()->messages() > 0) {
            $this->usuario = Auth::user();
            $this->id_almacenista = Personal::where('cedula', '=', $this->usuario->cedula)->first();

            $t = Transferencia::create([
                'id_almacen_origen' => $this->id_almacen_origen,
                'id_almacen_destino' => $this->id_almacen_destino,
                'id_centro_costo_1' => $this->id_centro_costo_1,
                'id_centro_costo_2' => $this->id_centro_costo_2,
                'num_transferencia' => $this->num_transferencia,
                'nota' => $this->nota,
                'fecha' => $this->fecha,
                'id_almacenista' => $this->id_almacenista->id,
                'user_id' => $this->usuario->id
            ]);

            foreach ($this->id_inventarios as $index => $val) {

                $inventario = Inventario::find($this->id_inventarios[$index]['id']);

                $detalleTransferencia = DetalleTransferencia::create([
                    'id_transferencia' => $t->id,
                    'id_articulo' => $inventario->id_articulo,
                    'cantidad' => $this->cantidad[$index],
                ]);

                $registro = Inventario::where('id_articulo', '=', $inventario->id_articulo)->where('id_centro_costo', '=', $this->id_centro_costo_2)->first();

                if (isset($registro)) {

                    $registro->update([
                        'cantidad_actual' =>  $registro->cantidad_actual +  $detalleTransferencia->cantidad,
                    ]);

                    $inventario->update([
                        'cantidad_actual' =>   $inventario->cantidad_actual -  $detalleTransferencia->cantidad,

                    ]);
                } else {

                    Inventario::create([

                        'anno_ppto' => '2022',
                        'id_centro_costo' => $this->id_centro_costo_2,
                        'id_almacen' => $this->id_almacen_destino,
                        'id_ubicacion' => $this->id_almacen_destino,
                        'id_articulo' => $detalleTransferencia->id_articulo,
                        'user_id' =>  $this->usuario->id,
                        'cantidad_inicial' => $detalleTransferencia->cantidad,
                        'cantidad_actual' => $detalleTransferencia->cantidad,
                    ]);

                    $inventario->update([
                        'cantidad_actual' =>  $inventario->cantidad_actual -  $detalleTransferencia->cantidad,

                    ]);
                }
            }

            return redirect(route('transferencia'));
        }
    }

    public function  hydrateIdInventarios() {
        foreach($this->id_inventarios as $index => $idInventario){
            if(is_array($idInventario)) {
                $this->id_inventarios[$index] = Inventario::find($idInventario["id"]);
            }
        }
    }

    public function updated() {
        $this->verificarCantidad();
    }

    public function increment($id = null)
    {
        if (isset($id)) {
            $inventario = Inventario::find($id);
            $this->id_inventarios[] = $inventario;
            $this->cantidad[] = '';
            $this->id_detalle = null;
        }
    }

    public function decrement($index)
    {
        unset($this->id_inventarios[$index]);
        $this->id_inventarios = array_values($this->id_inventarios);
        unset($this->cantidad[$index]);
        $this->cantidad = array_values($this->cantidad);
        $this->id_detalle = null;
    }

    public function cargar($id)
    {
        $this->transferencia = Transferencia::find($id);
        $this->fecha = $this->transferencia->fecha;
        $this->centro_costo_1 =  UnidadEjecutora::find($this->transferencia->id_centro_costo_1);
        $this->centro_costo_2 =  UnidadEjecutora::find($this->transferencia->id_centro_costo_2);
        $this->id_almacen_origen = $this->transferencia->id_almacen_origen;
        $this->id_almacen_destino = $this->transferencia->id_almacen_destino;
        $this->id_centro_costo_1 =  $this->centro_costo_1->id;
        $this->id_centro_costo_2 =  $this->centro_costo_2->id;
        $this->user_id = $this->transferencia->user_id;
        $this->nota = $this->transferencia->nota;

        $this->detalles = $this->transferencia->detallesTransferencia;

        $this->cantidad_dt = [];
        foreach ($this->detalles as $dt) {
            array_push($this->cantidad_dt, $dt->cantidad);
        }

        $this->mostrar = 1;
    }

    public function deleteData($id)
    {
        DB::table('almacen.detalle_transferencias')->where('id', $id)->delete();
        $this->cargar($this->transferenciaId);
    }

    public function home()
    {
        return redirect(route('transferencia'));
    }

    public function imprimir($id)
    {
        return redirect(route('transferencia.pdf', $id));
    }
}
