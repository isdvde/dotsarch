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
        Schema::create('ciudades', function (Blueprint $table) {
            $table->id();
            $table->string('descripcion', 255)->comment('Descripción de la cuidad');
            $table->string('codigo', 10)->unique()->comment('Código de la ciudad');
            $table->timestamps();
        });

        DB::connection->table('ciudades')->insert([
            ['nombre' => "marian",
            'usuario' => 'marian',
            'password' => Hash::make('marian'),
            'cedula' => 'V27936013',
            'email' => 'marian@gmail.com',
            'email_institucional' => 'marian@e.uneg.edu.ve',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()]
       ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ciudades');
    }
};
