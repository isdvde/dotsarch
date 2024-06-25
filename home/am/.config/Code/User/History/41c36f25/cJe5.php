<?php

namespace App\Repositories;
use App\Interfaces\CentroCostoRepositoryInterface;

class CentroCostoRepository implements CentroCostoRepositoryInterface 
{
    public function getCentroCosto($ficha) 
    {
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
        
        return $imputacion;

    }

}