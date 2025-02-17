@extends('./layouts/app')

@section('titulo', ' - Requisicion')

@section('titulo-pagina', 'Requisicion')

@section('descripcion-pagina', '')

@section('contenido')

  @csrf

@endsection

@push('scripts')
  @vite(['resources/js/compras/modules/requisicion.js'])
@endpush

