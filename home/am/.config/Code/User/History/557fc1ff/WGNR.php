@extends('./layouts/app')

@section('titulo', ' - Proveedores')

@section('titulo-pagina', 'Proveedores')

@section('descripcion-pagina', '')

@section('contenido')

@endsection

@push('scripts')
@vite(['resources/js/compras/modules/proveedor.js'])
@endpush

