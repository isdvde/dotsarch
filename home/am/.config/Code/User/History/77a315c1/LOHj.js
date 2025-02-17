import { Validator } from "../libs/validator.js";
import { $create } from '../libs/utils.js'

export class SelectSearchComponent extends HTMLElement {

	constructor(opts) {
		super();
		this.innerHTML = `
			<div class="internal-input-cont">
			<label class="form-label"></label>
			<div class="d-flex">
				<input type="text" class="form-control value" name="value" readonly>
				<button type="submit" class="btn btn-danger float-left clean-button">x</button>
			</div>
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

	async render_options(e) {
		this.$select.innerHTML = '';
		this.search_query = e.target.value;
		await this.get_data();
		if(this.search_query){
			if(this.data){
				for(let o of this.data.data){
					let label = '';
					let value = '';
					value = o[this.opts.value];
					for(let l of this.opts.label){
						label += `${o[l]} `
					}
					let opt = this.create_option({value: value, label: label});
					this.$select.append(opt);
					this.toggle_element(this.$select, true);
				}
			}
		} else {
			this.toggle_element(this.$select);
		}
	}

	select_option(e) {
		let op = e.target.selectedOptions[0];
		this.toggle_element(e.target);
		this.$value.value = op.textContent;
		this.$value.setAttribute('action-id', op.value);
		this.toggle_element(this.$search);
		this.$search.value = '';
		this.toggle_element(this.$value, true);
		this.toggle_element(this.$button, true);

		this.$button.onclick = function(e) {
			this.render();

		}.bind(this);

	}

	render() {
		this.$value.style.display = 'none';
		this.$button.style.display = 'none';
		this.$select.style.display = 'none';

		this.$search.oninput = async function(e) {
				await this.render_options(e);
		}.bind(this);

		this.$select.onchange = function(e) {
			this.select_option(e);
		}.bind(this);
	}

	connectedCallback() {
		this.$select = this.querySelector('select');
		this.$search = this.querySelector('.search');
		this.$value = this.querySelector('.value');
		this.$button = this.querySelector('.clean-button');

		this.$invalid = this.querySelector('.invalid-feedback');

		// this.$select.setAttribute('name', this.opts.name || '');
		// this.$select.append(this.create_deafult_option());

		// this.$value.style.display = 'none';
		// this.$button.style.display = 'none';
		// this.$select.style.display = 'none';

		// this.$search.oninput = async function(e) {
		// 		await this.render_options(e);
		// }.bind(this);

		// this.$select.onchange = function(e) {
		// 	this.select_option(e);
		// }.bind(this);
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
