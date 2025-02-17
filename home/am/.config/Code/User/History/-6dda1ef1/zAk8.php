@extends('./layouts/app')

@section('titulo', ' - Unidad Medida')

@section('titulo-pagina', 'Unidad Medida')

@section('descripcion-pagina', '')

@section('contenido')

@endsection

@push('scripts')
@vite(['resources/js/compras/modules/scs-jefe-linea.js'])
@endpush

