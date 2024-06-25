<?php

namespace App\Http\Controllers\Compras\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LineaCreateRequest;
use App\Http\Requests\LineaEditRequest;
use App\Models\Compras\Linea;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class ApiLineaController extends Controller
{
    use ApiResponse;
     
    public function index(Request $request)
    {
        if($request->search){

            $linea = Linea::where("descripcion","ilike","%$request->search%")
            ->orWhere("status","ilike","%$request->search%")
            ->paginate(10);
            return response()->json($linea);

        }

        if($request->id){
            $linea = Linea::where("id", "=", $request->id)->first();
            return response()->json($linea);
        }

        return response()->json(Linea::paginate(10), 200);
    }

    public function store(LineaCreateRequest $request)
    {
        $linea = Linea::create($request->all());
        return $this->successMessage(message:'Linea creada.', data:$linea, code:201);
    }

    public function show($uuid)
    {
        $linea = Linea::where('uuid',$uuid)->first();

        if (!$linea) {
            return $this->errorMessage(message:'Linea no encontrada.',code:404);
        }

        return $this->successMessage(message:'Linea encontrada.', data:$linea, code:200);

    }

    public function update(LineaEditRequest $request, $uuid)
    {
       
        $linea = Linea::where('uuid',$uuid)->first();
     
        if (!$linea) {
            return $this->errorMessage(message:'Linea no encontrada.', code:404);
        }

        $linea->update([
            'descripcion' => $request->descripcion,
            'status' => $request->status,
            'tipo' => $request->tipo,  
        ]);

        return $this->successMessage(message:'Linea editada.', data:$linea, code:200);
    }

    public function destroy($uuid)
    {
     
        $linea = Linea::where('uuid',$uuid)->first();

        if (!$linea) {
            return $this->errorMessage(message:'Linea no encontrada.', code:404);
        }

        $linea->delete();

        return $this->successMessage(message:'Linea eliminada.', code:200);
    }

}
