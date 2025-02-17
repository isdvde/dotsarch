@extends('./layouts/app')

@section('titulo', ' - Requisicion')

@section('titulo-pagina', 'Requisicion')

@section('descripcion-pagina', '')

@section('contenido')

  @csrf
  <p>after csrf</p>

@endsection

@push('scripts')
  @vite(['resources/js/compras/requisicion.js'])
@endpush

