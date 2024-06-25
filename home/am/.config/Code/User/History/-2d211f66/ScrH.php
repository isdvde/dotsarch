
<?php

namespace App\Repositories;
use App\Interfaces\BeneficiarioRepositoryInterface;

class BeneficiarioRepository implements BeneficiarioRepositoryInterface 
{
    public function getNumeroBeneficiario($cedula) 
    {
        //nombre, cargo, unidad_ejecutora, dependencia
        return Beneficiario::all();
    }

}