<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class SolicitudViaticoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            // 'numero_solicitud' => 'required|string|max:20|unique:solicitudes_viaticos,numero_solicitud',
            'numero_solicitud' => 'required|string|max:20',
            'cod_origen' => 'required|string|max:10|exists:ciudades,codigo',
            'cod_destino' => 'required|string|max:10|exists:ciudades,codigo',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after:fecha_inicio',
            'hora_inicio' => 'required|date_format:H:i',
            'hora_fin' => 'required|date_format:H:i|after:hora_inicio',
            'motivo' => 'required|string|max:255',
            'cod_centro_costo' => 'required|string|max:10',
            'ficha_beneficiario' => 'required|string|max:7',
            'ficha_solicitud' => 'required|string|max:7',
            'ficha_autorizado' => 'required|string|max:7',
            'pernoctas' => 'required|numeric|min:0',
            'dias' => 'required|numeric|min:1',
            'status' => 'required|in:TRANSCRITO,COMPROMETIDO,PAGADO',
            // 'detalles' => 'required|array',
            // 'detalles.*.id_concepto' => 'required|exists:conceptos,id',
            // 'detalles.*.monto' => 'required|numeric|min:0',
        ];
    }

    protected function failedValidation(Validator $validator) {

        throw new HttpResponseException(response()->json($validator->errors(), 422));
    
    }

    public function messages()
    {
        return [
            'numero_solicitud.required' => 'El número de solicitud es obligatorio.',
            'numero_solicitud.string' => 'El número de solicitud debe ser una cadena de texto.',
            'numero_solicitud.max' => 'El número de solicitud no debe superar los 20 caracteres.',
            // 'numero_solicitud.unique' => 'El número de solicitud ya existe.',

            'cod_origen.required' => 'El código de origen es obligatorio.',
            'cod_origen.string' => 'El código de origen debe ser una cadena de texto.',
            'cod_origen.max' => 'El código de origen no debe superar los 10 caracteres.',
            'cod_origen.exists' => 'El código de origen no existe en la lista de ciudades.',

            'cod_destino.required' => 'El código de destino es obligatorio.',
            'cod_destino.string' => 'El código de destino debe ser una cadena de texto.',
            'cod_destino.max' => 'El código de destino no debe superar los 10 caracteres.',
            'cod_destino.exists' => 'El código de destino no existe en la lista de ciudades.',

            'fecha_inicio.required' => 'La fecha de inicio es obligatoria.',
            'fecha_inicio.date' => 'La fecha de inicio debe tener un formato válido.',

            'fecha_fin.required' => 'La fecha de fin es obligatoria.',
            'fecha_fin.date' => 'La fecha de fin debe tener un formato válido.',
            'fecha_fin.after' => 'La fecha de fin debe ser posterior a la fecha de inicio.',

            'hora_inicio.required' => 'La hora de inicio es obligatoria.',
            'hora_inicio.date_format' => 'La hora de inicio debe tener un formato válido (HH:MM).',

            'hora_fin.required' => 'La hora de fin es obligatoria.',
            'hora_fin.date_format' => 'La hora de fin debe tener un formato válido (HH:MM).',
            'hora_fin.after' => 'La hora de fin debe ser posterior a la hora de inicio.',

            'motivo.required' => 'El motivo del viaje es obligatorio.',
            'motivo.string' => 'El motivo del viaje debe ser una cadena de texto.',
            'motivo.max' => 'El motivo del viaje no debe superar los 255 caracteres.',

            'cod_centro_costo.required' => 'El código del centro de costo es obligatorio.',
            'cod_centro_costo.string' => 'El código del centro de costo debe ser una cadena de texto.',
            'cod_centro_costo.max' => 'El código del centro de costo no debe superar los 10 caracteres.',

            'ficha_beneficiario.required' => 'La ficha del beneficiario es obligatoria.',
            'ficha_beneficiario.string' => 'La ficha del beneficiario debe ser una cadena de texto.',
            'ficha_beneficiario.max' => 'La ficha del beneficiario no debe superar los 7 caracteres.',

            'ficha_solicitud.required' => 'La ficha del solicitante es obligatoria.',
            'ficha_solicitud.string' => 'La ficha del solicitante debe ser una cadena de texto.',
            'ficha_solicitud.max' => 'La ficha del solicitante no debe superar los 7 caracteres.',

            'ficha_autorizado.required' => 'La ficha del autorizador es obligatoria.',
            'ficha_autorizado.string' => 'La ficha del autorizador debe ser una cadena de texto.',
            'ficha_autorizado.max' => 'La ficha del autorizador no debe superar los 7 caracteres.',

            'pernoctas.required' => 'El número de pernoctas es obligatorio.',
            'pernoctas.numeric' => 'El número de pernoctas debe ser un número.',
            'pernoctas.min' => 'El número de pernoctas no puede ser negativo.',

            'dias.required' => 'El número de días del viaje es obligatorio.',
            'dias.numeric' => 'El número de días del viaje debe ser un número.',
            'dias.min' => 'El número de días del viaje no puede ser inferior a 1.',

            'status.required' => 'El estado de la solicitud es obligatorio.',
            'status.in' => 'El estado de la solicitud debe ser TRANSCRITO',
        ];
    }
}
