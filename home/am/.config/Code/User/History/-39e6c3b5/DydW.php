<?php

namespace App\Http\Controllers\Viaticos\Api;
use App\Models\Concepto;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\ConceptoRequest;
use App\Http\Traits\ApiResponse;

class ApiConceptoController extends Controller
{
    use ApiResponse;
     
    public function index()
    {
        return response()->json(Concepto::all(), 200);
    }

    public function store(ConceptoRequest $request)
    {
        $concepto = Concepto::create($request->all());
        return $this->successMessage(message:'Concepto creado.', data:$concepto, code:201);
    }

    public function buscarPorTipo($tipo)
    {

        $concepto = Concepto::where('tipo',$tipo)->get();

        if (!$concepto) {
            return $this->errorMessage(message:'Conceptos no encontrado.',code:404);
        }

        return $this->successMessage(message:'Conceptos encontrado.', data:$concepto, code:200);

    }

    public function show($id)
    {
        $concepto = Concepto::find($id);

        if (!$concepto) {
            return $this->errorMessage(message:'Concepto no encontrado.',code:404);
        }

        return $this->successMessage(message:'Concepto encontrado.', data:$concepto, code:200);

    }

    public function update(ConceptoRequest $request, $id)
    {
        $concepto = Concepto::find($id);
       
        if (!$concepto) {
            return $this->errorMessage(message:'Concepto no encontrado.', code:404);
        }

        $concepto->update($request->all());

        return $this->successMessage(message:'Concepto editado.', data:$concepto, code:200);
    }

    public function destroy($id)
    {
        $concepto = Concepto::find($id);

        if (!$concepto) {
            return $this->errorMessage(message:'Concepto no encontrado.', code:404);
        }

        $concepto->delete();

        return $this->successMessage(message:'Concepto eliminado.', code:200);
    }
}
