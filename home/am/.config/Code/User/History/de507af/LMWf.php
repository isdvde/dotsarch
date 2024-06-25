<?php

namespace App\Http\Controllers\Viaticos\Api;
use App\Http\Controllers\Controller;
use App\Models\SolicitudViatico;
use App\Models\DetalleViatico;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\SolicitudViaticoRequest;
use App\Http\Traits\ApiResponse;
use Illuminate\Http\Request;
use App\Models\Concepto;
use App\Interfaces\CentroCostoRepositoryInterface;

class ApiSolicitudViaticoController extends Controller
{
    private $CentroCostoRepository;
    use ApiResponse;

    public function __construct(CentroCostoRepositoryInterface $CentroCostoRepository)
    {
        $this->CentroCostoRepository = $CentroCostoRepository;
    }

    public function index()
    {
        return response()->json(SolicitudViatico::all(), 200);
    }

    public function detalleSolicitud($detalles,$id_solicitud)
    {
        foreach($detalles as $detalle){
           
            $id = Concepto::where('descripcion',$detalle["descripcion"])->pluck('id');
            DetalleViatico::Create([
                'id_solicitud_viatico' => $id_solicitud,
                'id_concepto' => $id,
                'monto' => $detalle["total"],
            ]);
            
        }
    }

    public function store(SolicitudViaticoRequest $request)
    {
        $solicitud = SolicitudViatico::create($request->all());

        $this->detalleSolicitud($request->detalles, $solicitud->id);
        return $this->successMessage(message:'Solicitud creada.', data:$solicitud, code:201);

    }

    public function show($id)
    {
        $solicitud = SolicitudViatico::find($id);

        if (!$solicitud) {
            return $this->errorMessage(message:'Solicitud no encontrada.',code:404);
        }

        return $this->successMessage(message:'Solicitud encontrada.', data:$solicitud, code:200);

    }

    public function update(SolicitudViaticoRequest $request, $id)
    {
        $solicitud = SolicitudViatico::find($id);

        if (!$solicitud) {
            return $this->errorMessage(message:'Solicitud no encontrada.', code:404);
        }

        $solicitud->update($request->all());

        return $this->successMessage(message:'Solicitud editada.', data:$solicitud, code:200);
    }

    public function destroy($id)
    {
        $solicitud = SolicitudViatico::find($id);

        if (!$solicitud) {
            return $this->errorMessage(message:'Solicitud no encontrada.', code:404);
        }

        $solicitud->delete();

        return $this->successMessage(message:'Solicitud eliminada.', code:200);
    }

   

    public function imputacion_presupuestaria($ficha){
        return $this->CentroCostoRepository->getCentroCosto($ficha);
    }

}
