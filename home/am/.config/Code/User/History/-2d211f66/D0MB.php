
<?php

namespace App\Repositories;
use App\Interfaces\BeneficiarioRepositoryInterface;

class BeneficiarioRepository implements BeneficiarioRepositoryInterface 
{
    public function getBeneficiario($ficha) 
    {
        //nombre, cargo, unidad_ejecutora, dependencia

        if($ficha == '12345' || $ficha == '23456'){
            $imputacion = [
                'nombre'=>'webmaster',
                'cargo'=>'Administrador',
                'unidad_ejecutora'=>'DTI',
                'dependencia'=>'',
            ];
        }else{
            $imputacion = [
                'disponibilidad'=>23456,
                'centro_costo'=>'DTI'
            ];

        }
        
    }

}