import { Pagination } from "./pagination.js";
import {$, $create, $qs, $qsa, crudder} from '../libs/utils.js'
import { SCSDropdown } from "./scs-dropdown.js";

export class TableComponent extends HTMLElement {

	/*
	Atributos recibidos:
	  columns: Nombres de Columnas a mostrarse en el header de la tabla
    attrs: nombre de atributos que extraera de la api para mostrar en tabla
    title: titulo de la tabla
    base_url: url de la api a consultar
    edit: habilita su mostrar o no los botones de accion
	*/
	constructor(opts) {
		super();
		this.innerHTML = `
			<div>
				<div class="card-header d-flex gap-6 justify-content-between align-items-center">
				<div></div>

					<input type="text" class="w-75 pl-2 py-2 text-gray-700 border h-10 border-gray-300 focus-visible:outline-none focus-visible:border-blue-600 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-smform-control w-75 mx-3" name="search" placeholder="Buscar">

					<div header__button_container >
						<button is="scs-button" header__create-button>
							<span class="font-sans text-base pl-1">Agregar</span>
						</button>
					</div>

				</div>
					<div class="card-body">
						<div class="table-responsive">
							<table class="table table-responsive w-100 d-block d-md-table table-hover">
								<thead class="bg-primary-gradient thead"></thead>
								<tbody class="text-center"></tbody>
							</table>
						</div>
					</div>
					<div class="card-footer text-center"></div>
				</div>
			</div>
		`;

		this.columns = opts.columns || '';
		this.title = opts.title || "";
		this.base_url = new URL(`${basePath}/${opts.base_url}`) || "";
		this.boot = true;
		this.attrs = opts.attrs.split(',');
		this.data = null;
		this.current_page = 1;
		this.opts = opts;

		this.$table_body = $qs(this,'tbody');
		this.$create_button = $qs(this,'[header__create-button]');
		this.$table_footer = $qs(this,'.card-footer');
		this.$search = $qs(this,'input[name=search]');
		this.$button_container = $qs(this,'[header__button_container]');
		this.$action_container = $qs(this,'[action_container]');
		this.$thead = $qs(this,'.thead')

		this.$tr = $create('tr');
		this.$th = $create('th');
		this.$th.classList.add('text-white','text-center','font-bold','tracking-wider');
		this.$th_action = this.$th.cloneNode('true');
		this.$create_button.textContent = "Agregar";

		this.$search.addEventListener('input', function(e){
			e.target.value = e.target.value.toUpperCase();
		});
	}

	generate_header_columns(columns){
		let $frag = new DocumentFragment();
		for (let item of columns) {
			let $th = this.$th.cloneNode('true');
			$th.textContent = item;
			$frag.append($th);
		}
		return $frag;
	}

	render_header() {
		let columns = this.columns.split(',');

		this.$thead.appendChild(this.$tr)
		this.$th_action.textContent = "Acciones";
		this.$tr.appendChild(this.generate_header_columns(columns));
		this.$tr.appendChild(this.$th_action);
	}
	
	generate_body_td(data){
		let $frag = new DocumentFragment();
		for(let attr of this.attrs){
			let td = $create('td');
			td.textContent = data[attr];
			$frag.appendChild(td);
		}
		return $frag;
	}

	render_table_body() {
		let body = '';
		if(!this.data || this.data.status === 'error') {
			this.$table_body.innerHTML = "Error al cargar los datos";
		}

		let data = this.data.data;

		for(let i of data) {
			let tr = $create('tr');
			tr.append(this.generate_body_td(i));
			body += tr.outerHTML;
		}


		this.$table_body.innerHTML = body;

		if(this.opts.edit){
			this.action_buttons();
		}
	}


	update_table_body() {
		this.render_table_body();
	}

	action_buttons() {
		let data = this.data.data;
		let $trs = $qsa(this.$table_body, 'tr');
		for (let [i, $tr] of $trs.entries()) {
			let td = $create('td');
			let $buttons = new SCSDropdown({
				title: ""
			});
			let $edit = $buttons.add_item({
				title: "Editar"
			})

			let $delete = $buttons.add_item({
				title: "Eliminar"
			})

			$edit.setAttribute('action-id', data[i].uuid);
			$delete.setAttribute('action-id', data[i].uuid);

			$delete.addEventListener('click', async function(e) {
				await this.delete_item(e);
			}.bind(this));

      $edit.addEventListener('click', async function(e) {
        let $form = this.edit_action();
        await $form.load_to_edit(e.target.closest('[action-id]').getAttribute('action-id'));
      }.bind(this));

			td.appendChild($buttons);
			$tr.appendChild(td);
		}
	}

	async delete_item(e){
		let uuid = e.target.closest('[action-id]').getAttribute('action-id');
		let confirm = window.confirm('Desea eliminar este elemento?')
		if(confirm){
			try {
				if(uuid) {
					let crud = crudder(`${this.base_url.href}/${uuid}`)
					let res = await crud.delete();
					console.log(res)
					// let options = {
					// 	method: "DELETE",
					// 	url: `${this.base_url.href}/${uuid}`
					// };
					// // let res = await fetch(`${this.base_url}/${uuid}`, options).then((res) => res.json());
					// let res = await axios(options).then((res) => res.data);
					if(res.status === 'error'){
						console.error(res.description.errors);
					} else {
						window.alert('Elemento eliminado correctamente');
						await this.refresh();
					}
				}
			} catch (e) {
				console.error(e);
			}
		}
	}

	render_pagination() {
		this.$pagination = new Pagination();
		this.$table_footer.appendChild(this.$pagination);

		this.$pagination.$prev.addEventListener('click', async function(e) {
			if(this.current_page > 1) {
				this.current_page--;
				await this.refresh();
			}
		}.bind(this));

		this.$pagination.$next.addEventListener('click', async function(e) {
			// if(this.current_page < this.data.pagination.pages) {
			if(this.current_page < this.data.last_page) {
				this.current_page++;
				await this.refresh();
			}
		}.bind(this));
		
		this.$pagination.$start.addEventListener('click', async function(e) {
			if(this.current_page !== 1) {
				this.current_page = 1;
				await this.refresh();
			}
		}.bind(this));
		
		this.$pagination.$end.addEventListener('click', async function(e) {
			if(this.current_page !== this.data.last_page) {
				this.current_page = this.data.last_page;
				await this.refresh();
			}
		}.bind(this));

		this.update_pagination();
	}

	update_pagination() {
		this.$pagination.update(this.data);
	}


	get_url() {
		let url = new URL(this.base_url);
		if(this.search_query) {
			url.searchParams.append('search', this.search_query);
		}
		url.searchParams.append('page', this.current_page);
		return	url.href; 
	}

	get_search_url() {
		let url = new URL(this.base_url);
		url.searchParams.append('search', this.search_query);
		return url.href;
	}

	async get_data() {
		let crud = crudder(this.get_url());
		try {
			// this.data = await fetch(this.get_url()).then(res => res.json());
			// this.data = await axios(this.get_url()).then(res => res.data);
			this.data = await crud.get();
		} catch(e) {
			console.error(e);
			this.data = null;
		}
	}

	async render() {
		this.render_header();
		await this.get_data();
		this.render_table_body();
		this.render_pagination();
		this.boot = false;
	}

	async refresh() {
		await this.get_data();
		this.update_table_body();
		this.update_pagination();
	}

	async update_search(e) {
		this.current_page = 1;
		let $input = e.target;
		this.search_query = $input.value;
		await this.refresh();
	}

	connectedCallback() {
		
		this.$search.addEventListener('input', async function(e) {
			await this.update_search(e);
		}.bind(this));
	}
}

customElements.define('scs-table', TableComponent);