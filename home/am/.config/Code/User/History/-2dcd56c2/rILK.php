<?php

namespace App\Http\Controllers\Viaticos\Api;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Traits\ApiResponse;
use Illuminate\Http\Request;
use App\Interfaces\BeneficiarioRepositoryInterface;

class ApiSolicitudViaticoController extends Controller
{
    private $CentroCostoRepository;
    use ApiResponse;

    public function __construct(BeneficiarioRepositoryInterface $BeneficiarioRepository)
    {
        $this->BeneficiarioRepository = $BeneficiarioRepository;
    }

    public function beneficiario($ficha){



    }


}