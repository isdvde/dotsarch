
<?php

namespace App\Repositories;
use App\Interfaces\BeneficiarioRepositoryInterface;
use App\Models\Beneficiario;


class BeneficiarioRepository implements BeneficiarioRepositoryInterface 
{
    public function getNumeroBeneficiario($cedula) 
    {
        //buscar el numero de la solicitud de Beneficiario
        return Beneficiario::all();
    }

}