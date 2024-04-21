
<?php

namespace App\Repositories;
use App\Interfaces\ViaticoRepositoryInterface;
use App\Models\Viatico;


class ViaticoRepository implements ViaticoRepositoryInterface 
{
    public function getNumeroViatico($cedula) 
    {
        //buscar el numero de la solicitud de viatico
        return Viatico::all();
    }

}