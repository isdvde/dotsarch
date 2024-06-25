export class DetallesViatico extends HTMLElement{

  constructor(opciones){

    super();

    	this.innerHTML = `
			<div class="form-group row">
			<label for="staticEmail" class="nombre col-sm-2 col-form-label text-center"></label>
			<div class="col-sm-2">
				<input type="number" class="cantidad form-control text-center" value="30">
			</div>  
			<div class="col-sm">
				<input type="number" readonly class="monto form-control-plaintext text-center" value="30">
			</div> 
			<div class="col-sm">
				<input type="number" readonly class="total form-control-plaintext text-center" value="250">
			</div> 
			`


			this.opciones = opciones;
			this.$nombre = this.querySelector('.nombre');
			this.$cantidad


  }

}

customElements.define("x-viaticos-detalle", DetallesViatico);