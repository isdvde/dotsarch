<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleViatico extends Model
{
    use HasFactory;
    protected $table = 'detalle_viaticos';

    protected $fillable = [
        'id_solicitud_viatico',
        'id_concepto',
        'cantidad',
        'monto',
    ];

    public function solicitudViatico()
    {
        return $this->belongsTo(SolicitudViatico::class);
    }

    public function concepto()
    {
        return $this->belongsTo(Concepto::class);
    }
}
