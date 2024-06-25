export class DetallesViatico extends HTMLElement{

  constructor(opciones){

    super();

    	this.innerHTML = `
			<div class="form-group row">
			<label for="staticEmail" class="col-sm-2 col-form-label text-center">Pernoctas</label>
			<div class="col-sm-2">
				<input type="number" class="form-control text-center" value="email@example.com">
			</div>  
			<div class="col-sm">
				<input type="number" readonly class="form-control-plaintext text-center" value="30">
			</div> 
			<div class="col-sm">
				<input type="number" readonly class="form-control-plaintext text-center" value="250">
			</div> 
		`
  }

}

customElements.define("x-viaticos-detalle", DetallesViatico);