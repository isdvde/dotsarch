import { $create } from '../libs/utils.js'

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
			<label class="form-label mb-2"></label>
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
		console.log(this.url);

		this.$label = this.querySelector('.form-label');
		this.$select = this.querySelector('select');
		this.$search = this.querySelector('[srch]');
		this.$value = this.querySelector('[val]');
		this.$button = this.querySelector('[clean_button]');
		this.$invalid = this.querySelector('.invalid-feedback');
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
		// let url = `${this.opts.url}?`;
		let url = `${this.url}`;
		if(this.search_query) {
			// url = `${url}search=${this.search_query}&`
			url.searchParams.append('search', this.search_query);
		}
		console.log(url)
		return `${url}`;
	}

	get_search_url() {
		let search = `?search=${this.search_query}`;
		return `${this.opts.url}${search}`;
	}

	async get_data() {
		try {
			// this.data = await fetch(this.get_url()).then(res => res.json());
			console.log('select url', this.get_url());
			this.data = await axios(this.get_url()).then(res => res.data);
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
		if (this.search_query) {
			if (this.data) {
				for (let o of this.data.data) {
					let label = '';
					let value = '';
					value = o[this.opts.value];
					for (let l of this.opts.label) {
						label += `${o[l]} - `
					}
					label = label.trim().replace(/-$/, '');
					let opt = this.create_option({ value: value, label: label });
					this.$select.append(opt);
					this.toggle_element(this.$select, true);
				}
			}
		} else {
			this.toggle_element(this.$select);
		}
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

	render() {
		this.$search.style.display = '';
		this.$search.removeAttribute('disabled');
		this.$search.value = "";
		this.$button.style.display = 'none';
		this.$select.style.position = 'absolute';
		this.$select.style.minWidth = `${this.offsetWidth}px`;
		this.$select.style.display = 'none';
		this.$select.style.left = '0';
		this.$select.style.top = '100%';
		this.$select.style.zIndex = '1';

		this.$search.addEventListener('input', async function(e) {
			 let timer;
			 let val = e.target.value;
			 this.search_query = val;
			 console.log('select value', val)
			 clearTimeout(timer);
			 timer = setTimeout(async function(){
				await this.get_data();
				// await this.render_options(val);
				this.render_options(val);
			//  }.bind(this), 500);
			 }.bind(this), 10);
		}.bind(this));
	}

	connectedCallback() {
		this.render();
	}

	validate() {
		if (this.opts.required) {
			if (!this.value) {
				this.validation = {
					validate: false,
					message: 'Debe elegir una opcion'
				}
			} else {
				this.validation = {
					validate: true,
					message: ''
				}
			}

			this.show_validation_error();
			return this.validation;
		}
		this.validation = {
			validate: true,
			message: ''
		}
		return this.validation;
	}
	
	async init_value(val){
		// let data = await fetch(`${this.opts.url}?id=${val}`).then(res=>res.json());
		let data = await axios(`${this.opts.url}?id=${val}`).then(res=>res.data);
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
