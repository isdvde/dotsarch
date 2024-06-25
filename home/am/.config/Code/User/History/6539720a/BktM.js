export class DetallesViatico extends HTMLElement{

  constructor(opciones){

    	super();

    	this.innerHTML = `
			<div class="form-group row">
			<label for="staticEmail" class="nombre col-sm-4 col-form-label text-center"></label>
			<div class="col-sm-3">
				<input type="number" class="cantidad form-control text-center" value="">
			</div>  
			<div class="col-sm">
				<input type="number" readonly class="monto form-control-plaintext text-center" value="">
			</div> 
			<div class="col-sm">
				<input type="number" readonly class="total form-control-plaintext text-center" value="">
			</div> 
			`
			this.opciones = opciones;
			this.$nombre = this.querySelector('.nombre');
			this.$cantidad = this.querySelector('.cantidad');
			this.$monto = this.querySelector('.monto');
			this.$total = this.querySelector('.total');
			this.$cantidad.addEventListener('change', this.update_total.bind(this));

  }

	connectedCallback() {
		this.$nombre.textContent = this.opciones.nombre;
		this.$cantidad.setAttribute('value', this.opciones.cantidad);
		this.$monto.setAttribute('value', this.opciones.monto);
		this.$total.setAttribute('value', this.opciones.total);
		
	}

	update_total(){
		let total = this.$cantidad.value * this.$monto.value; 

		this.$total.setAttribute('value', total );

	}





}

customElements.define("x-viaticos-detalle", DetallesViatico);