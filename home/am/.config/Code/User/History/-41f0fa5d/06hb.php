@extends('./layouts/app')

@section('titulo', ' - Unidad Medida')

@section('titulo-pagina', 'Unidad Medida')

@section('descripcion-pagina', '')

@section('contenido')

@endsection

@push('scripts')
@vite(['resources/js/compras/modules/unidad_medida.js'])
@endpush

