
<?php

namespace App\Repositories;
use App\Interfaces\BeneficiarioRepositoryInterface;

class BeneficiarioRepository implements BeneficiarioRepositoryInterface 
{
    public function getNumeroBeneficiario($cedula) 
    {
        
        return Beneficiario::all();
    }

}