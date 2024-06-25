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
        Schema::create('conceptos', function (Blueprint $table) {
            $table->id();
            $table->string('descripcion', 255)->unique()->comment('Descripción del concepto');
            $table->enum('tipo_calculo', ['MULTIPLICAR', 'FIJO' , 'LIBRE'])->comment('Tipo de pago del concepto, DIARIO:El monto se paga por dia, FIJO:El monto se paga una sola vez');
            $table->enum('tipo', ['AEREO', 'TERRESTRE', 'NORMAL'])->comment('Tipo de concepto');
            $table->decimal('monto', 16, 4)->nullable()->comment('Monto del concepto');
            $table->timestamps();
        });

         
        DB::table('conceptos')->insert([
            'descripcion' => 'Pernoctas',
            'tipo_calculo' => 'MULTIPLICAR',
            'tipo' => 'NORMAL',
            'monto' =>10,
        ]);

         
        DB::table('conceptos')->insert([
            'descripcion' => 'Desayuno',
            'tipo_calculo' => 'MULTIPLICAR',
            'tipo' => 'NORMAL',
            'monto' =>10,
        ]);

        DB::table('conceptos')->insert([
            'descripcion' => 'Almuerzo',
            'tipo_calculo' => 'MULTIPLICAR',
            'tipo' => 'NORMAL',
            'monto' =>15,
        ]);

        DB::table('conceptos')->insert([
            'descripcion' => 'Cena',
            'tipo_calculo' => 'MULTIPLICAR',
            'tipo' => 'NORMAL',
            'monto' =>10,
        ]);

        DB::table('conceptos')->insert([
            'descripcion' => 'Valor Boleto Aereo',
            'tipo_calculo' => 'LIBRE',
            'tipo' => 'AEREO',
        ]);

        DB::table('conceptos')->insert([
            'descripcion' => 'Equipaje',
            'tipo_calculo' => 'FIJO',
            'tipo' => 'AEREO',
            'monto' =>10,
        ]);

        DB::table('conceptos')->insert([
            'descripcion' => 'Km',
            'tipo_calculo' => 'MULTIPLICAR',
            'tipo' => 'TERRESTRE',
            'monto' =>10,
        ]);
       
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('conceptos');
    }
};
