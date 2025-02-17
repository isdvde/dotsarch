export class DetallesViatico extends HTMLElement{

  constructor(){

    super();

    	this.innerHTML = `
			<div class="form-group row">
			<label for="staticEmail" class="col-sm-2 col-form-label">Pernoctas</label>
			<div class="col-sm-2">
				<input type="number" class="form-control" value="email@example.com">
			</div>  
			<div class="col-sm">
				<input type="number" readonly class="form-control-plaintext" value="30">
			</div> 
			<div class="col-sm">
				<input type="number" readonly class="form-control-plaintext" value="250">
			</div> 
		`
  }

}

customElements.define("x-viaticos-detalle", DetallesViatico);