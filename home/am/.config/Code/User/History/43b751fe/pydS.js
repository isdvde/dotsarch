import { ButtonComponent } from './scs-button';

export class FormComponent extends HTMLElement {
	constructor(opts) {
		super();
		this.innerHTML = `
			<div>
				<div class="card-header"></div>
				<div class="card-body">
					<form class="needs-validation" novalidate accept-charset="utf-8">
					<div class="row g-2 form-body mb-6">
					</div>
					<div class="d-flex justify-content-around align-items-center">
						<button class="btn btn-danger float-right footer__cancel"><i class="fas fa-times-circle"></i> Cancelar</button>
						<button type="submit" class="btn btn-primary float-left footer__submit"><i class="fas fa-save"></i> Guardar</button>
					</div>
					</form>
				</div>
			</div>
		`
		this.opts = opts;
		this.$form_title = this.querySelector('.card-header');
		this.$form = this.querySelector('form');
		this.$submit = this.querySelector('.footer__submit');
		this.$cancel = this.querySelector('.footer__cancel');
		this.$form_body = this.querySelector('.form-body');
		this.title = this.opts.title || "Form";
		this.url = this.opts.url || '';
		this.$inputs = [];
		this.callbacks = [];
		this.data = {};
		this.ready = true;

		this.$submit.addEventListener('click', this.submit.bind(this))
		this.$cancel.addEventListener('click', function(e) {
			e.preventDefault();

		})
	}

	async load_data_to_edit(uuid) {
		let res = await fetch(`${this.url}/?uuid=${uuid}`)
		.then(res => res.json());
		this.edit_data = res.data[0];
	}

	connectedCallback(){
		this.$form_title.textContent = this.title;
	}

	append_to_body($node) {
		this.$form_body.appendChild($node);
		return this;
	}

	add_input($input) {
		this.$inputs.push($input);
		this.append_to_body($input);
		return this;
	}

	add_post_submit_callback(callback) {
		this.callbacks.push(callback)
		return this;
	}
	
	async load_to_edit(uuid) {
		this.edit_uuid = uuid;
		await this.load_data_to_edit(uuid);
		if(this.edit_data) {
			for(let [key, val] of Object.entries(this.edit_data)) {
				// this.querySelector(`input[name=${key}]`).value = val;
				let inp = this.querySelector(`input[name=${key}],select[name=${key}]`);
				if(inp && val){
					if(inp.type === 'date') {
						inp.value = val.slice(0, 10);
					} else {
						inp.value = val;
					}
				} 
			}
		}

	}


	async submit(e) {
		this.ready = true;
		e.preventDefault();
		for(let inp of this.$inputs) {
			let result = inp.validate();
			if(!result.validate) {
				inp.show_validation_error();
				this.ready = false;
				// return;
			}

			let $internal_input = inp.querySelector('input') || inp.querySelector('select');
			if($internal_input.value !== ''){
				this.data = {...this.data, [$internal_input.name]: $internal_input.value }
			}
		}
		if(!this.ready) return;
		let method = this.edit_uuid ? 'PUT' : 'POST'; 
		let url = this.edit_uuid ? `${this.url}/${this.edit_uuid}` : this.url;
		let action = this.edit_uuid ? "editado" : "agregado";
		try {
			if (this.data) {
				let options = {
					// method: "POST",
					method: method,
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(this.data),
				};
				// let res = await fetch(this.url, options).then((res) => {
				let res = await fetch(url, options).then((res) => {
				  return res.json()
				})
				if(res.status === 'error'){
					window.alert(`${res.message}`)
					console.error(res);
					return;
				} else {
					window.alert(`Elemento ${action} correctamente`);
				}
			} 
		} catch (e) {
			console.error(e);
		}

		for(let f of this.callbacks){
			f();
		}
	}
}

customElements.define('scs-form', FormComponent);
