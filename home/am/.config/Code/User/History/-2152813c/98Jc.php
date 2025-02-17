<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::connection(env('SCHEMA_SECURITY'))->create('fichas_user', function (Blueprint $table) {
            $table->id();
            $table->string('cedula', 11);
            $table->string('ficha');
            $table->string('clase_trab');
            $table->string('rel_laboral');
            $table->timestamps();

            $table->foreign('cedula')->references('cedula')->on(env('SCHEMA_SECURITY') . '.users')->onDelete('cascade')->onUpdate('cascade');
        });

        DB::connection(env('SCHEMA_SECURITY'))->table('fichas_user')->insert([
            ['cedula' => 'V00000000', 'ficha' => '12345', 'clase_trab' => 'ADMINISTRATIVO', 'rel_laboral' => 'FIJO']
        ]);

        DB::connection(env('SCHEMA_SECURITY'))->table('fichas_user')->insert([
            ['cedula' => 'V00000000', 'ficha' => '23456', 'clase_trab' => 'ADMINISTRATIVO', 'rel_laboral' => 'FIJO']
        ]);

        DB::connection(env('SCHEMA_SECURITY'))->table('fichas_user')->insert([
            ['cedula' => 'V27936013', 'ficha' => '54321', 'clase_trab' => 'ADMINISTRATIVO', 'rel_laboral' => 'FIJO']
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection(env('SCHEMA_SECURITY'))->dropIfExists('fichas_user');
    }
};
