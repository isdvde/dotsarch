@extends('./layouts/app')

@section('titulo', ' - Articulo')

@section('titulo-pagina', 'Articulo')

@section('descripcion-pagina', '')

@section('contenido')

@endsection

@push('scripts')
@vite(['resources/js/compras/modules/scs-articulo.js'])
@endpush

