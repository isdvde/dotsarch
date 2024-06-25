export class DetallesViatico extends HTMLElement{

  constructor(opciones){

    	super();

		if(opciones.tipo_calculo == 'MULTIPLICAR'){

			this.crear_detalle_multiplicar();
		}
		if(opciones.tipo_calculo == 'FIJO'){

			this.crear_detalle_fijo();

		}
		if(opciones.tipo_calculo == 'LIBRE'){

			this.crear_detalle_libre();

		}
		this.opciones = opciones;

  }

	connectedCallback() {
		if(this.opciones.tipo_calculo == 'MULTIPLICAR'){

			this.$nombre.textContent = this.opciones.nombre;
			this.$cantidad.setAttribute('value', this.opciones.cantidad);
			this.$monto.setAttribute('value', this.opciones.monto);
			this.$total.setAttribute('value', this.opciones.total);
			

		}
		if(this.opciones.tipo_calculo == 'FIJO'){

			this.$nombre.textContent = this.opciones.nombre;
			this.$total.setAttribute('value', this.opciones.monto);

		}
		if(this.opciones.tipo_calculo == 'LIBRE'){

			this.$nombre.textContent = this.opciones.nombre;
			this.$total.setAttribute('value', this.opciones.monto);

		}
		
	}

	update_total(){
		let total = this.$cantidad.value * this.$monto.value; 
		this.$total.setAttribute('value', total );

	}

	crear_detalle_multiplicar(){

		this.innerHTML = `
		<div class="form-group row">
		<label for="staticEmail" class="nombre col-sm-3 col-form-label text-center"></label>
		<div class="col-sm-3">
			<input type="number" class="cantidad form-control text-center" value="">
		</div>  
		<div class="col-sm-3">
			<input type="number" readonly class="monto form-control-plaintext text-center" value="">
		</div> 
		<div class="col-sm-3">
			<input type="number" readonly class="total form-control-plaintext text-center" value="">
		</div> 
		`
		this.$nombre = this.querySelector('.nombre');
		this.$cantidad = this.querySelector('.cantidad');
		this.$monto = this.querySelector('.monto');
		this.$total = this.querySelector('.total');
		this.$cantidad.addEventListener('input', this.update_total.bind(this));


	}


	crear_detalle_fijo(){

		this.innerHTML = `
		<div class="form-group row">
		<label for="staticEmail" class="nombre col-sm-3 col-form-label text-center"></label>
		<div class="col-sm-3">
		</div>  
		<div class="col-sm-3">
		</div> 
		<div class="col-sm-3">
			<input type="number" readonly class="total form-control-plaintext text-center" value="">
		</div> 
		`
		this.$nombre = this.querySelector('.nombre');
		this.$total = this.querySelector('.total');
	}


	crear_detalle_libre(){

		this.innerHTML = `
		<div class="form-group row">
		<label for="staticEmail" class="nombre col-sm-3 col-form-label text-center"></label>
		<div class="col-sm-3">
		</div>  
		<div class="col-sm-3">
		</div> 
		<div class="col-sm-3">
		<input type="number" class="total form-control text-center" value="">
		</div> 
		`
		this.$nombre = this.querySelector('.nombre');
		this.$total = this.querySelector('.total');
	}

}

customElements.define("x-viaticos-detalle", DetallesViatico);