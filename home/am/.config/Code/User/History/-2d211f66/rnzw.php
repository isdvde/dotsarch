
<?php

namespace App\Repositories;
use App\Interfaces\BeneficiarioRepositoryInterface;

class BeneficiarioRepository implements BeneficiarioRepositoryInterface 
{
    public function getBeneficiario($ficha) 
    {
        //nombre, cargo, unidad_ejecutora, dependencia
        return Beneficiario::all();
    }

}