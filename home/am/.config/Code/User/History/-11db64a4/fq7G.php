<?php

namespace App\Http\Controllers\Viaticos\Api;
use App\Http\Controllers\Controller;
use App\Models\Ciudad;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\CiudadRequest;
use App\Http\Traits\ApiResponse;
use Illuminate\Http\Request;

class ApiCiudadController extends Controller
{
    use ApiResponse;
     
    public function index()
    {
        return response()->json(Ciudad::all(), 200);
    }

    public function store(CiudadRequest $request)
    {
        $ciudad = Ciudad::create($request->all());
        return $this->successMessage(message:'Ciudad creada.', data:$ciudad, code:201);
    }

    public function show($id)
    {
        $ciudad = Ciudad::find($id);

        if (!$ciudad) {
            return $this->errorMessage(message:'Ciudad no encontrada.',code:404);
        }

        return $this->successMessage(message:'Ciudad encontrada.', data:$ciudad, code:200);

    }

    public function update(CiudadRequest $request, $id)
    {
        $ciudad = Ciudad::find($id);

        if (!$ciudad) {
            return $this->errorMessage(message:'Ciudad no encontrada.', code:404);
        }

        $ciudad->update($request->all());

        return $this->successMessage(message:'Ciudad editada.', data:$ciudad, code:200);
    }

    public function destroy($id)
    {
        $ciudad = Ciudad::find($id);

        if (!$ciudad) {
            return $this->errorMessage(message:'Ciudad no encontrada.', code:404);
        }

        $ciudad->delete();

        return $this->successMessage(message:'Ciudad eliminada.', code:200);
    }

    public function buscarCiudad(){

    }
}
