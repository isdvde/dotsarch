
<?php

namespace App\Repositories;
use App\Interfaces\BeneficiarioRepositoryInterface;

class BeneficiarioRepository implements BeneficiarioRepositoryInterface 
{
    public function getBeneficiario($ficha) 
    {
        //nombre, cargo, unidad_ejecutora, dependencia

        if($ficha == '12345'){
            $imputacion = [
                'disponibilidad'=>12345,
                'centro_costo'=>'contabilidad'
            ];
        }else{
            $imputacion = [
                'disponibilidad'=>23456,
                'centro_costo'=>'DTI'
            ];

        }
        
    }

}