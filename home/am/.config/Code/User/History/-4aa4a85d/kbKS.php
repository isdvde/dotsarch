<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Route;


Route::prefix('compras')->group(function() {
  Route::view('/requisicion', 'compras.requisicion');
  Route::view('/solicitud', 'compras.solicitud');
  Route::view('/articulo', 'compras.articulo');
  Route::view('/linea', 'compras.linea');
  Route::view('/unidad-medida', 'compras.unidad_medida');
  Route::view('/proveedor', 'compras.proveedor');
  Route::view('/jefe-linea', 'compras.jefe-linea');
});