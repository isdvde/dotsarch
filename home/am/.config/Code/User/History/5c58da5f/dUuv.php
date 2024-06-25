<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SolicitudViatico extends Model
{
    use HasFactory;
    protected $table = 'solicitudes_viaticos';

    protected $fillable = [
        'numero_solicitud',
        'cod_origen',
        'cod_destino',
        'fecha_inicio',
        'fecha_fin',
        'hora_inicio',
        'hora_fin',
        'motivo',
        'cod_centro_costo',
        'disponibilidad',
        'ficha_beneficiario',
        'ficha_solicitud',
        'ficha_autorizado',
        'tipo_pasaje',
        'dias',
        'status',
    ];

    public function ciudadOrigen()
    {
        return $this->belongsTo(Ciudad::class, 'cod_origen');
    }

    public function ciudadDestino()
    {
        return $this->belongsTo(Ciudad::class, 'cod_destino');
    }

    public function detalles()
    {
        return $this->hasMany(DetalleViatico::class);
    }
}
