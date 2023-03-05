<div>

    <x-jet-validation-errors class="mt-4 mx-4 mb-2" />

    @if (session('success'))
        <x-session-alert type="success">
            {{ session('success') }}
        </x-session-alert>
    @endif


    <table class="table table-responsive w-100 d-block d-md-table table-hover">

        <x-table.table-header :encabezados="['Fecha', ' Número Nota de Entrega', ' Status ']" />

        <tbody>
            <tr>
                <td class="text-gray-900 text-center">
                    <x-jet-input wire:model.defer="fecha_doc" id="fecha_doc" class="mt-1 w-auto" type="date"
                        name="fecha_doc" />
                </td>
                <td class="text-gray-900 text-center"> {{ $num_doc }} </td>
                <td class="text-gray-900 text-center"> {{ $status }} </td>
            </tr>
        </tbody>

    </table>

    <div class="mt-4">
        <x-jet-label for="id_almacen" value="Almacenes" />
        <select wire:model="id_almacen"
           class="block mt-1 w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm">

                @if($editar )

                    <option value="{{ $almacen->id }}">{{ $almacen->descripcion }} </option>

                @else
                    <option value="-1" default>Almacenes...</option>

                    @foreach ($almacenes as $a)
                        <option value="{{ $a->id }}"> {{ $a->descripcion }} </option>
                    @endforeach

                @endif

        </select>
    </div>


    @if(isset($id_almacen) && $id_almacen != -1)

    <div wire:ignore class="mt-4">
        <x-jet-label for="id_centro_costo" value="Unidad Administrativa" />
        <select wire:model="id_centro_costo"
            class="block mt-1 w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm">
            @if ($editar)

                <option value="{{ $centroCosto->id }}"> {{ $centroCosto->descripcion }} </option>
            @else
                <option value="-1" default>Unidad Administrativa...</option>

                @foreach ($centrosCosto as $c)
                    <option value="{{ $c->id }}"> {{ $c->descripcion }} </option>
                @endforeach

            @endif

        </select>
    </div>


    @if(isset($id_centro_costo) && $id_centro_costo != -1)

    @include('livewire.scs.almacen.notas-entrega.notas-entrega-select-solicitud')

    <div class="mt-4">
        <x-jet-label for="nota" value="Nota" />
        <textarea wire:model.lazy="nota" id="nota" name="nota" rows="5" cols="112"
            class="block mt-1 w-full pl-2 py-2 text-gray-700 border h-13 border-gray-300 focus-visible:outline-none focus-visible:border-blue-600 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
            :value="old('nota')" required @if ($status != 'TRANSCRITO') disabled @endif autofocus>
            </textarea>
    </div>

    <div class="card-footer flex justify-between mt-4">
        <x-boton.boton-cancelar wire:click="home">Cancelar</x-boton.boton-cancelar>
        @if ($editar)

            @if ($status == 'APROBADO')
                <x-boton.boton-aceptar wire:click="reversar"> Reversar </x-boton.boton-aceptar>

                <x-boton.boton-aceptar  class="fa fa-print" wire:click="imprimir({{ $entregaId }},2)"> Imprimir
                </x-boton.boton-aceptar>
            @else
                <x-boton.boton-aceptar wire:click="aprobar"> Aprobar </x-boton.boton-aceptar>
                <x-boton.boton-aceptar wire:click="editar"> Guardar </x-boton.boton-aceptar>
            @endif
        @else
            <x-boton.boton-aceptar wire:click="crear"> Guardar </x-boton.boton-aceptar>
        @endif
    </div>

    @endif

    @endif

</div>
