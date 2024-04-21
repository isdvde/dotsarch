<?php

namespace App\Http\Controllers\Viaticos\Api;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Traits\ApiResponse;
use Illuminate\Http\Request;
use App\Interfaces\BeneficiarioRepositoryInterface;

class ApiSolicitudViaticoController extends Controller
{
    private $beneficiarioRepository;
    use ApiResponse;

    public function __construct(BeneficiarioRepositoryInterface $BeneficiarioRepository)
    {
        $this->beneficiarioRepository = $BeneficiarioRepository;
    }

    public function beneficiario($ficha){

        

    }


}