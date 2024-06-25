import { Validator } from "../libs/validator.js";
import { $create } from '../libs/utils.js'

export class SelectSearchComponent extends HTMLElement {

	constructor(opts) {
		super();
		this.innerHTML = `
			<div class="internal-input-cont">
			<label class="form-label"></label>
			<input type="text" class="form-control value" name="value">
			<input type="text" class="form-control search" name="search" placeholder="">
			<select class="form-select" multiple>
			</select>
			<div class="invalid-feedback"></div>
			</div>
		`
		this.opts = opts;
		this.options = this.opts.options || {};
	}


	get_url() {
		let url = `${this.opts.url}?`;
		if(this.search_query) {
			url = `${url}search=${this.search_query}&`
		}
		return `${url}`;
	}

	get_search_url() {
		let search = `?search=${this.search_query}`;
		return `${this.opts.url}${search}`;
	}

	async get_data() {
		try {
			this.data = await fetch(this.get_url()).then(res => res.json());
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

	async render_options() {
		this.$select.innerHTML = '';
		await this.get_data();
		if(this.data){
			let label = '';
			let value = '';

			for(let o of this.data.data){
				value = o[this.opts.value];
				for(let l of this.opts.label){
					console.log(l)
					label += `${this.data.data[l]} `
				}
				let opt = this.create_option({value: value, label: label});
				this.$select.append(opt);
				this.toggle_element(this.$select, true);
      }

		}
	}

	connectedCallback() {
		this.$select = this.querySelector('select');
		this.$search = this.querySelector('.search');
		this.$value = this.querySelector('.value');
		this.$invalid = this.querySelector('.invalid-feedback');

		// this.$select.setAttribute('name', this.opts.name || '');
		// this.$select.append(this.create_deafult_option());

		this.$value.style.display = 'none';
		this.$select.style.display = 'none';

		this.$search.oninput = async function(e) {
			let $srch = e.target;
			this.search_query = $srch.value;

			if($srch.value.length > 3) {
				await this.render_options();
			}
		}.bind(this);
	}

	validate() {
		if(!this.$select.value) {
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


customElements.define('x-select-search', SelectSearchComponent);
