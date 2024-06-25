<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Viaticos\Api\ApiConceptoController;
use App\Http\Controllers\Viaticos\Api\ApiCiudadController;
use App\Http\Controllers\Viaticos\Api\ApiSolicitudViaticoController;
use App\Http\Controllers\Viaticos\Api\ApiKilometroController;
use App\Http\Controllers\Viaticos\Api\ApiBeneficiarioController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('concepto', ApiConceptoController::class);
Route::apiResource('ciudad', ApiCiudadController::class);
Route::apiResource('kilometro', ApiKilometroController::class);
Route::apiResource('solicitud-viatico', ApiSolicitudViaticoController::class);
Route::get('fichas', [ApiSolicitudViaticoController::class, 'userFichas']);
Route::get('imputacion-presupuestaria/{ficha}', [ApiSolicitudViaticoController::class, 'imputacion_presupuestaria']);

Route::get('beneficiario/{ficha}', [ApiBeneficiarioController::class, 'beneficiario']);

Route::get('buscar-ciudad/{data}', [ApiCiudadController::class, 'buscarCiudad']);