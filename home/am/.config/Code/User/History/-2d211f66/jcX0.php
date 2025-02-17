
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
                'cod_unidad_ejecutora'=>'12345',
                'dependencia'=>'admin',
            ];
        }else{
            $imputacion = [
                'nombre'=>'marian garcia',
                'cargo'=>'programador',
                'cod_unidad_ejecutora'=>'12345',
                'dependencia'=>'DTI',
            ];

        }
        
    }

}