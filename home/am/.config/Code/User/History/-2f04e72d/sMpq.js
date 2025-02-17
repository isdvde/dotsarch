import { $create, $qs, crudder } from '../libs/utils.js'

/*
TODO:

- terminar la funcion init_value
- decir a backend que permita consultar el id con el query param para cargar la data al editar
*/

export class SCSSelectSearch extends HTMLElement {

	constructor(opts) {
		super();
		this.innerHTML = `
			<div class="internal-input-cont">
			<div class="form-label mb-2"></div>
			<div class="d-flex">
				<input srch type="text" class="pl-2 py-2 text-gray-700 border h-10 border-gray-300 focus-visible:outline-none focus-visible:border-blue-600 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm w-100" placeholder="Buscar una opcion...">
				<button clean_button class="btn btn-danger btn-sm font-weight-bold">X</button>
			</div>
			<select class="form-select" multiple>
			</select>
			<input val type="hidden">
			<div class="invalid-feedback"></div>
			</div>
		`
		this.opts = opts;
		this.options = this.opts.options || {};
		this.style.position = 'relative';
		this.size = this.opts.size;
		this.url = new URL(`${basePath}/${this.opts.url}`);

		this.$label = $qs(this,'.form-label');
		this.$select = $qs(this,'select');
		this.$search = $qs(this,'[srch]');
		this.$value = $qs(this,'[val]');
		this.$button = $qs(this,'[clean_button]');
		this.$invalid = $qs(this,'.invalid-feedback');
		this.$button.addEventListener('click', function(e){
			e.preventDefault();
		});

		this.set_size();

		this.$value.setAttribute('name', this.opts.name || "");
		this.$label.textContent = this.opts.title || "";

		if('required' in  this.opts){
			let $span = $create('span');
			$span.textContent = '*';
			$span.style.color = "red";
			this.$label.append($span);
		}

		this.$select.addEventListener('change', function(e) {
			this.select_option(e.target.selectedOptions[0]);
		}.bind(this));
	}

	set_size(){
		this.classList.add('mb-6',`col-md-${this.size}`);
	}

	get_url() {
		let url = new URL(this.url);
		if(this.search_query) {
			url.searchParams.append('search', this.search_query);
		}
		return url.href;
	}

	get_search_url() {
		let search = `?search=${this.search_query}`;
		return `${this.opts.url}${search}`;
	}

	async get_data() {
		try {
			// this.data = await axios(this.get_url()).then(res => res.data);
			this.data = await crudder(this.get_url()).get();
		} catch(e) {
			console.error(e);
			this.data = null;
		}
	}

	create_option(opts) {
		let opt = $create('option');
		opt.setAttribute('value', opts.value || '');
		opt.textContent = opts.label || '';
		return opt;
	}

	toggle_element(el, show=false) {
		if(show) {
			el.style.display = '';
		} else {
			el.style.display = 'none';
		}
	}

	render_options(e) {
		this.$select.innerHTML = '';
		this.search_query = e;
		let $frag = new DocumentFragment();
		if (!this.search_query) {
			this.toggle_element(this.$select);
			return;
		}
		if (!this.data) { return; }

		for (let o of this.data.data) {
			let label = '';
			let value = '';
			value = o[this.opts.value];
			for (let l of this.opts.label) {
				label += `${o[l]} - `
			}
			label = label.trim().replace(/-$/, '');
			let opt = this.create_option({ value: value, label: label });
			$frag.append(opt);
			this.toggle_element(this.$select, true);
		}
		this.$select.append($frag);
	}

	select_option(e) {
		let op = e;
		this.toggle_element(this.$select);
		this.$search.value = op.textContent;
		this.$search.setAttribute('disabled',  '');
		this.$value.value = this.$select.value;
		this.value = this.$value.value;
		this.toggle_element(this.$button, true);

		this.$button.onclick = function(e) {
			this.render();
			this.value = '';
		}.bind(this);
	}

	reset_select(){
		this.$select.style.position = 'absolute';
		this.$select.style.minWidth = `${this.offsetWidth}px`;
		this.$select.style.display = 'none';
		this.$select.style.left = '0';
		this.$select.style.top = '100%';
		this.$select.style.zIndex = '1';
	}

	reset_button(){
		this.$button.style.display = 'none';
	}
	
	reset_search(){
		this.$search.style.display = '';
		this.$search.removeAttribute('disabled');
		this.$search.value = "";
	}

	reset_to_render(){
		this.reset_search();
		this.reset_button();
		this.reset_select();
	}

	render() {
		this.reset_to_render();
		this.$search.addEventListener('input', async function(e) {
			 let timer;
			 let val = e.target.value;
			 this.search_query = val;
			 clearTimeout(timer);
			 timer = setTimeout(async function(){
				await this.get_data();
				// await this.render_options(val);
				// this.render_options(val);
			//  }.bind(this), 500);
			 }.bind(this), 250);
			 this.render_options(this.search_query);
		}.bind(this));
	}

	connectedCallback() {
		this.render();
	}

	set_validation(validate = true, message = '') {
		return {
			validate: validate,
			message: message
		}
	}

	validate() {
		this.validation = this.set_validation();
		if (!this.opts.required) { return this.validation; }
		if (!this.value) {
			this.validation = this.set_validation(false, "Debe elegir una opcion");
		} 
		this.show_validation_error();
		return this.validation;
	}
	
	async init_value(val){
		let url = new URL(this.url);
		url.searchParams.append('id', val);
		let data = await axios(url.href).then(res=>res.data);
		// let data = await axios(`${this.url}/${val}`).then(res=>res.data);
		let label = '';
		let value = '';
		for (let l of this.opts.label) {
			label += `${data[l]} `
		}
		value = data[this.opts.value];
		this.toggle_element(this.$select);
		this.$value.value = value;
		this.value = value;
		this.$search.value = label;
		this.$search.setAttribute('disabled', '');
		this.toggle_element(this.$value, true);
		this.toggle_element(this.$button, true);

		this.$button.onclick = function(e) {
			this.render();
			this.value = '';
		}.bind(this);
	}

	show_validation_error() {
		if(!this.validation.validate) {
			this.$invalid.textContent = this.validation.message || '';
			this.$invalid.style.display = 'block';
			return this;
		}
		this.$invalid.style.display = "none";
		return this;
	}
}


customElements.define('scs-select-search', SCSSelectSearch);
