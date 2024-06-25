<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detalle_viaticos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_solicitud_viatico')->comment('Identificador de la solicitud de viático');
            $table->unsignedBigInteger('id_concepto')->comment('Identificador del tipo de viático');
           // $table->integer('cantidad')->comment('Cantidad');
            $table->decimal('monto', 16, 4)->comment('Monto del detalle de viático');
            $table->timestamps();
            
            // **Claves foráneas**
            
            $table->foreign('id_solicitud_viatico')->references('id')->on('solicitudes_viaticos')->comment('Relaciona con la tabla solicitudes_viaticos');
            $table->foreign('id_concepto')->references('id')->on('conceptos')->comment('Relaciona con la tabla concepto');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detalle_viaticos');
    }
};
