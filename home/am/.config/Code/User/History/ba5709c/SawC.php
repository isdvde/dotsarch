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
        Schema::create('solicitudes_viaticos', function (Blueprint $table) {
            $table->id();
            $table->string('numero_solicitud', 20)->unique()->comment('Número único de la solicitud');
            $table->string('cod_origen', 10)->comment('Código de la ciudad de origen');
            $table->string('cod_destino', 10)->comment('Código de la ciudad de destino');
            $table->date('fecha_inicio')->comment('Fecha de inicio del viaje');
            $table->date('fecha_fin')->comment('Fecha de fin del viaje');
            $table->time('hora_inicio')->format('H:i')->comment('Hora de salida');
            $table->time('hora_fin')->format('H:i')->comment('Hora de regreso');
            $table->text('motivo')->comment('Motivo del viaje');
            $table->string('cod_centro_costo')->comment('Código del centro de costo');
            $table->string('disponibilidad')->comment('disponibilidad');
            $table->string('ficha_beneficiario', 7)->comment('ficha del beneficiario del viático (a quien va dirigido el viático)');
            $table->string('ficha_solicitud', 7)->comment('ficha del empleado que solicita el viático');
            $table->string('ficha_autorizado', 7)->comment('ficha del autorizador de la solicitud');
            // $table->unsignedTinyInteger('pernoctas')->comment('Número de noches de pernocta');
            $table->unsignedTinyInteger('dias')->comment('Cantidad de días del viaje');

            $table->enum('tipo_pasaje', ['AEREO', 'TERRESTRE'])->comment('Tipo de pasaje');

            $table->enum('status', ['TRANSCRITO', 'COMPROMETIDO', 'PAGADO'])->default('transcrito')->comment('Estado de la solicitud');
            $table->timestamps();
            
            // **Claves foráneas**

            $table->foreign('cod_origen')->references('codigo')->on('ciudades')->comment('Relaciona con la tabla ciudades (origen)');
            $table->foreign('cod_destino')->references('codigo')->on('ciudades')->comment('Relaciona con la tabla ciudades (destino)');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('solicitudes_viaticos');
    }
};
