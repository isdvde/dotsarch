@extends('./layouts/app')

@section('titulo', ' - Solicitud')

@section('titulo-pagina', 'Solicitud')

@section('descripcion-pagina', '')

@section('contenido')

  @csrf

@endsection

@push('scripts')
  @vite(['resources/js/compras/solicitud.js'])
@endpush

