<?php

namespace App\Http\Controllers\Compras\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ArticuloCreateRequest;
use App\Http\Requests\ArticuloEditRequest;
use App\Models\Compras\Articulo;
use App\Models\Compras\Linea;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class ApiArticuloController extends Controller
{
    use ApiResponse;

    public function index(Request $request)
    {

        $query_params = $request->query();
        if($query_params){
            dd($query_params);

        }
        

        if($request->search){

            $articulo = Articulo::join('unidades_medidas', 'unidades_medidas.id', '=', 'articulos.unidad_medida_id')
            ->join('lineas', 'lineas.id', '=', 'articulos.linea_id')
            ->select('articulos.*','unidades_medidas.descripcion AS unidad_medida','lineas.descripcion AS linea')
            ->where("articulos.codigo","ilike","%$request->search%")
            ->orWhere("articulos.descripcion","ilike","%$request->search%")
            ->paginate(10);
            return response()->json($articulo);

        }

        if($request->linea_codigo){
            dd('g');

            $articulo = Articulo::where("codigo","ilike","%$request->search%")
            ->orWhere("descripcion","ilike","%$request->search%")
            ->whereHas('linea', function ($query) use ($request) {
                $query->where('codigo', $request->linea_codigo);
            })
            ->with('unidadMedida')
            ->with('linea')
            ->paginate(10);

            return response()->json($articulo);

        }

        if($request->id) {
            
            $articulo = Articulo::join('unidades_medidas', 'unidades_medidas.id', '=', 'articulos.unidad_medida_id')
            ->join('lineas', 'lineas.id', '=', 'articulos.linea_id')
            ->select('articulos.*', 'unidades_medidas.descripcion AS unidad_medida', 'lineas.descripcion AS linea')
            ->where('articulos.id', $request->id)
            ->first();

            return response()->json($articulo);
        }
        $articulos = Articulo::join('unidades_medidas', 'unidades_medidas.id', '=', 'articulos.unidad_medida_id')
        ->join('lineas', 'lineas.id', '=', 'articulos.linea_id')
        ->select('articulos.*','unidades_medidas.descripcion AS unidad_medida','lineas.descripcion AS linea')
        ->paginate(10);
       
        return response()->json($articulos, 200);
    }

    public function generarCodigo($linea_id){

        $linea_codigo = Linea::where('id', $linea_id )->pluck('codigo')->first();

        //ultimo articulo creado con ese mismo codigo de linea
        $ultimoArticulo = Articulo::where('codigo', 'ilike', "%".$linea_codigo."%") 
        ->orderBy('codigo','desc')->pluck('codigo')
        ->first() ?? 0;
       
        return  $linea_codigo . str_pad(substr($ultimoArticulo, -4) + 1, 4, "0", STR_PAD_LEFT);
    }

    public function store(ArticuloCreateRequest $request)
    {

        $articulo = Articulo::create([
            'codigo' => $this->generarCodigo($request->linea_id),
            'descripcion' => $request->descripcion,
            'ultimo_precio' => $request->ultimo_precio,
            'linea_id' => $request->linea_id,
            'unidad_medida_id' => $request->unidad_medida_id,
            'user_id' => $request->user_id,
            'codigo_art_ccce' => $request->codigo_art_ccce,
            'codigo_ocepre' => $request->codigo_ocepre,
            'codigo_cnu' => $request->codigo_cnu,
            'status' => $request->status,
        ]);
        return $this->successMessage(message:'Artículo creado.', data:$articulo, code:201);
    }

    public function show($uuid)
    {
        // $articulo = Articulo::where('uuid',$uuid)->first();
        $articulo = Articulo::join('unidades_medidas', 'unidades_medidas.id', '=', 'articulos.unidad_medida_id')
        ->join('lineas', 'lineas.id', '=', 'articulos.linea_id')
        ->select('articulos.*', 'unidades_medidas.descripcion AS unidad_medida', 'lineas.descripcion AS linea')
        ->where('articulos.uuid', $uuid)
        ->first();

        if (!$articulo) {
            return $this->errorMessage(message:'Artículo no encontrado.',code:404);
        }

        return $this->successMessage(message:'Artículo encontrado.', data:$articulo, code:200);

    }

    public function update(ArticuloEditRequest $request, $uuid)
    {
        $articulo = Articulo::where('uuid',$uuid)->first();

        if (!$articulo) {
            return $this->errorMessage(message:'Artículo no encontrado.', code:404);
        }

        $articulo->update($request->all());
        
        return $this->successMessage(message:'Artículo editado.', data:$articulo, code:200);
    }

    public function destroy($uuid)
    {
     
        $articulo = Articulo::where('uuid',$uuid)->first();

        if (!$articulo) {
            return $this->errorMessage(message:'Artículo no encontrado.', code:404);
        }

        $articulo->delete();

        return $this->successMessage(message:'Artículo eliminado.', code:200);
    }
}
