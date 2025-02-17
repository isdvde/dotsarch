@extends('./layouts/app')

@section('titulo', ' - Linea')

@section('titulo-pagina', 'Linea')

@section('descripcion-pagina', '')

@section('contenido')

@endsection

@push('scripts')
@vite(['resources/js/compras/modules/linea.js'])
@endpush

