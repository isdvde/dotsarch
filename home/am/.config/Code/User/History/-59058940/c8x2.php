<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    
        DB::unprepared('
        drop schema if exists segurity cascade ;
        CREATE SCHEMA segurity authorization am;
        drop schema if exists compras cascade ;
        CREATE SCHEMA compras authorization am;

    ');

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

       DB::unprepared('
        drop schema if exists segurity cascade ;
        drop schema if exists compras cascade ;
        
       ');
    }
};
