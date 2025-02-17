import { $qs, $qsa, crudder } from "../libs/utils";
import { SCSNotification } from "./scs-notification";

export class SCSForm extends HTMLElement {
	constructor(opts) {
		super();
		this.innerHTML = `
			<div card>
				<div class="card-header"></div>
				<div class="card-body">
					<form autocomplete="off" class="needs-validation" novalidate accept-charset="utf-8">
					<div class="row g-2 form-body mb-6">
					</div>
					<div class="d-flex justify-content-around align-items-center">
						<button class="btn btn-danger btn-border btn-round border px-4 py-2 footer__cancel"><i class="fas fa-times-circle"></i> Cancelar</button>
						<button type="submit" class="btn btn-primary btn-border btn-round border px-4 py-2 footer__submit"><i class="fas fa-save"></i> Guardar</button>
					</div>
					</form>
				</div>
			</div>
		`
		this.opts = opts;
		this.$form_title = $qs(this,'.card-header');
		this.$form = $qs(this,'form');
		this.$submit = $qs(this,'.footer__submit');
		this.$cancel = $qs(this,'.footer__cancel');
		this.$form_body = $qs(this,'.form-body');

		this.title = this.opts.title || "Form";
		// this.url = this.opts.url || '';
		this.url = new URL(`${basePath}/${opts.url}`) || "";
		this.$inputs = [];
		this.callbacks = [];
		this.data = {};
		this.ready = true;

		this.$submit.addEventListener('click', this.submit.bind(this));
		this.$cancel.addEventListener('click', function(e) {
			e.preventDefault();
		});
	}

	async load_data_to_edit(uuid) {
		// let res = await fetch(`${this.url}/${uuid}`)
		// let res = await axios(`${this.url}/${uuid}`)
		// let res = await axios(`${this.url.href}/${uuid}`)
		// .then(res => res.data);

		this.edit_data = (await crudder(`${this.url.href}/${uuid}`).get()).data;
	}

	connectedCallback(){
		this.$form_title.textContent = this.title;
		// let $inputs = this.querySelectorAll('input,textarea');
		let $inputs = $qsa(this, 'input,textarea');
		for(let inp of $inputs) {
			inp.addEventListener('input', function(e){
				e.target.value = e.target.value.toUpperCase();
			})
		}
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
	
	get_input_value() {
		return {
			date: function(inp, val){
				inp.value = val.slice(0,10);
			},
			// "select-multiple": async function(inp, val){
			// 	await inp.closest('scs-select-search').init_value(val);
			// },
			"hidden": async function(inp, val){
				let parent = inp.closest('scs-select-search') || inp.closest('scs-input-price');
        if(parent){
          await parent.init_value(val);
          return;
        }
        inp.value = val;
			},
			default: function(inp, val){
				inp.value = val; 
			}
		}
	}

	async load_to_edit(uuid) {
		this.edit_uuid = uuid;
		await this.load_data_to_edit(uuid);
		console.log('edit data',this.edit_data)
		if(this.edit_data) {
			for(let [key, val] of Object.entries(this.edit_data)) {
				// this.querySelector(`input[name=${key}]`).value = val;
				let inp = $qs(this, `input[name=${key}],select[name=${key}]`);
				if(inp && val){
					try {
						this.get_input_value()[inp.type](inp, val);
					} catch {
						this.get_input_value()["default"](inp, val);
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

			let $internal_input = inp.querySelector('input[name]') || inp.querySelector('select[name]');
			if($internal_input.value !== ''){
				this.data = {...this.data, [$internal_input.name]: $internal_input.value }
			}
		}
		if(!this.ready) return;
		let method = this.edit_uuid ? 'PUT' : 'POST'; 
		// let url = this.edit_uuid ? `${this.url}/${this.edit_uuid}` : this.url;
		let url = this.edit_uuid ? `${this.url.href}/${this.edit_uuid}` : this.url.href;
		let action = this.edit_uuid ? "editado" : "agregado";
		try {
			if (this.data) {
				// let options = {
				// 	method: method,
				// 	headers: {
				// 		"Content-Type": "application/json",
				// 	},
				// 	body: JSON.stringify({...this.data, uuid: this.edit_uuid}),
				// };
				let options = {
					method: method,
					url: url,
					data: {...this.data, uuid: this.edit_uuid},
				};
				// let res = await fetch(url, options).then((res) => {
				//   return res.json()
				// })
				let res = await axios(options).then((res) => res.data).catch(res => res.response.data);
				if(res.status === 'error'){
					// window.alert(`${res.message}`)
					console.error(res);
					let $notification = new SCSNotification({
						data: res.data
					})
					this.append($notification);
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

customElements.define('scs-form', SCSForm);
