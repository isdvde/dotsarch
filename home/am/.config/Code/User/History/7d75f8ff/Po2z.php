<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
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
        Schema::connection(env('SCHEMA_SECURITY'))->create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('usuario')->unique();
            $table->string('password')->nullable();
            $table->string('cedula')->unique();
            $table->timestamp('ultima_conexion')->nullable();
            $table->timestamp('fecha_sesiones_fallidas')->nullable();
            $table->unsignedTinyInteger('nro_sesiones_fallidas')->nullable()->default(0);
            $table->string('email')->nullable();
            $table->string('email_institucional')->unique();
            $table->enum('status_password', ['DISPONIBLE', 'BLOQUEADO', 'CAMBIAR'])->default('DISPONIBLE');
            $table->ipAddress('ultima_conexion_ip')->nullable();
            $table->string('profile_photo_path', 2048)->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->text('two_factor_secret')->nullable();
            $table->text('two_factor_recovery_codes')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });

        DB::connection(env('SCHEMA_SECURITY'))->table('users')->insert([
             ['nombre' => "Webmaster",
             'usuario' => 'webmaster',
             'password' => Hash::make('webmaster'),
             'cedula' => 'V00000000',
             'email' => 'vmdesarrollo202@gmail.com',
             'email_institucional' => 'dti-cdms@e.uneg.edu.ve',
             'created_at' => Carbon::now(),
             'updated_at' => Carbon::now()]
        ]);

        DB::connection(env('SCHEMA_SECURITY'))->table('users')->insert([
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
        Schema::connection(env('SCHEMA_SECURITY'))->dropIfExists('users');
    }
};
