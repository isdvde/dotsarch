<?php

namespace App\Http\Requests;

use App\Models\Compras\Articulo;
use App\Models\Compras\UnidadMedida;
use App\Traits\ApiResponse;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class SolicitudCreateRequest extends FormRequest
{
    use ApiResponse;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'fecha' => ['required', 'date'],
            'codigo_dependencia_solicitante' => ['required', 'string', 'max:10'],
            'codigo_linea_servicio' => ['required', 'string', 'max:10'],
            'trimestre' => ['nullable', 'integer', 'between:1,4'],
            'fecha_enviado' => ['nullable', 'date'],
            'prioridad' => ['required', 'in:NORMAL,URGENTE'],
            'justificacion' => ['required', 'string'],
            'status' => ['required', 'in:TRANSCRITO,APROBADA,ANULADA,CERRADA,ELIMINADA'],
            'tipo' => ['required', 'in:BIENES,SERVICIOS'],
            'detalles' => ['required', 'array'],
            'detalles.*.descripcion' => ['nullable', 'string', 'max:255'],
            'detalles.*.articulo_id' => ['nullable', Rule::exists(Articulo::class, 'id')],
            'detalles.*.cantidad' => ['required', 'numeric', 'min:1'],
            'detalles.*.unidad_medida_id' => ['required', Rule::exists(UnidadMedida::class, 'id')],
        ];
    }

    protected function failedValidation(Validator $validator) {

        throw new HttpResponseException($this->errorMessage(message:'Error de validación.',data: $validator->errors() , code: 422), 422);
    }
}
