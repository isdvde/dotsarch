<div>

    {{-- Main Select Detalles  --}}

    @if ($status == 'TRANSCRITO')
        <div class="mt-4">
            <x-jet-label for="id_detalle" value="Detalles Nota de Entrega" />
        </div>

        <div class="mt-4 flex items-center gap-4">

            <div class="content-center">
                <select wire:model.lazy="id_detalle"
                    class=" block mt-1 w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm content-center">
                    <option value="null" default>Solicitud...</option>

                    @foreach ($solicitudes as $s)
                        <option value="{{ $s->id }}"> {{ $s->num_solicitud }} </option>
                    @endforeach

                </select>
            </div>

            @if (isset($id_detalle))
                <x-boton.boton-aceptar wire:click="increment({{ $id_detalle }})"> Añadir </x-boton.boton-aceptar>
            @endif
        </div>

    @endif

    {{-- Main Select Detalles  --}}

    {{-- Articulos dinamicos --}}

     <div class="mt-4 flex">

        <x-table.table class="table-fixed">

            @if (count($id_solicitudes) != 0 || isset($detalles))
                <x-table.table-header :encabezados="['Solicitudes',  'Borrar']" />
            @endif


            <tbody>

                {{-- Cargar lista de detalles ya creados --}}
                @isset($detalles)
                    @foreach ($detalles as $key => $dne)
                    {{ dd($dne) }}
                        <tr>
                            <td class="text-gray-900 text-center"> {{ $dne->articulo->descripcion }} </td>

                        </tr>
                    @endforeach
                @endisset
                {{-- Cargar lista de detalles ya creados --}}

                <hr>

                @foreach ($id_solicitudes as $index => $id_solicitud)

                    <tr>
                        <td class="text-gray-900 text-center"> {{ $id_solicitud->num_solicitud }} </td>

                        <x-table.td-action>
                            <x-boton.boton-action class="block mt-1 w-32 ml-4 icon-trash"
                                wire:click="decrement({{ $index }})">
                            </x-boton.boton-action>
                        </x-table.td-action>
                    </tr>
                @endforeach
            </tbody>

        </x-table.table>
    </div>



</div>
