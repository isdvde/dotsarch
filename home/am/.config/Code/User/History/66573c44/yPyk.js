import { Pagination } from "./pagination.js";
import {$, $create} from '/js/libs/utils.js'

export class TableComponent extends HTMLElement {

	constructor(opts) {
		super();
		this.innerHTML = `
			<div class="card">
				<div class="card-header d-flex justify-content-between align-items-center">
					<div class="card-header__title"></div>
					<button class="btn btn-primary card-header__create-button">Agregar</button>
				</div>
					<div class="card-body">
						<div class="table-responsive">
							<table class="table">
								<thead class="text-center"></thead>
								<tbody class="text-center"></tbody>
							</table>
						</div>
					</div>
					<div class="card-footer text-center"></div>
				</div>
			</div>
		`;

		this.action_buttons_template = `
			<div class="btn-group btn-group-sm action" role="group">
				<button type="button" class="btn btn-success action__edit-button"><i class="fas fa-pencil-alt"></i></button>
				<button type="button" class="btn btn-danger action__delete-button"><i class="fas fa-trash-alt"></i></button>
			</div>
		`

		this.columns = opts.columns || '';
		this.title = opts.title || "";
		this.base_url = opts.base_url || "";
		this.boot = true;
		this.attrs = this.columns.toLowerCase().split(',');
		this.data = null;
		this.current_page = 1;
		this.opts = opts;


		this.$create_button = this.querySelector('.card-header__create-button');
	}

	render_table() {
		this.$table = this;
		this.$table.removeAttribute('style');
	}

	render_table_body() {
		this.$table_body = this.$table.querySelector('tbody');
		this.update_table_body();
	}

	update_table_body() {
		this.body = '';
		if(!this.data || this.data.status === 'error') {
			this.$table_body.innerHTML = "Error al cargar los datos";
		}

		let data = this.data.data.profesores;
		let $tr = $create('tr');
		let $td = $create('td');

		for(let i of data) {
			let tr = $tr.cloneNode(true);
			for(let j of this.attrs){
				let td = $td.cloneNode(true);
				td.textContent = i[j];
				tr.appendChild(td);
			}

			this.body += tr.outerHTML;
		}



		this.$table_body.innerHTML = this.body;

		if(this.opts.edit){
			this.action_buttons();
		}

	}

	action_buttons() {
		let profesores = this.data.data.profesores;
		let $trs = this.$table_body.querySelectorAll("tr");
		for (let [i, $tr] of $trs.entries()) {
			let $buttons = new DOMParser().parseFromString(this.action_buttons_template, 'text/html').querySelector('body').children[0];
			let $edit = $buttons.querySelector('.action__edit-button');
			let $delete = $buttons.querySelector('.action__delete-button');
			$edit.setAttribute('action-id', profesores[i].uuid);
			$delete.setAttribute('action-id', profesores[i].uuid);
			$tr.appendChild($buttons);

      // $delete.addEventListener("click", async function() {
      //   console.log("borrando");
      //   // await this.delete_item($delete.getAttribute('action-id'));
      //   await this.delete_item($delete.getAttribute('action-id'));
			// 	this.refresh();
      // });
			$delete.addEventListener('click', this.delete_item.bind(this));
		}

	}

	async delete_item(e){
		console.log(e);
		try {
			if (uuid) {
				let options = {
					method: "DELETE",
				};
				let res = await fetch(`${this.base_url}/${uuid}`, options).then((res) => res.json());
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

	async refresh() {
		await this.get_data();
		this.update_table_body();
		this.update_pagination();
	}

	render_pagination() {
		this.$pagination = new Pagination();
		this.$table_footer = this.$table.querySelector('.card-footer');
		this.$table_footer.appendChild(this.$pagination);
		this.$pagination = this.$table_footer.querySelector('.pagination');

		this.$pagination.querySelector('.prev').addEventListener('click', async () => {
			if(this.current_page > 1) {
				this.current_page--;
				await this.refresh();
			}
		});

		this.$pagination.querySelector('.next').addEventListener('click', async () => {
			if(this.current_page < this.data.pagination.pages) {
				this.current_page++;
				await this.refresh();
			}
		});
		
		this.$pagination.querySelector('.start').addEventListener('click', async () => {
			if(this.current_page !== 1) {
				this.current_page = 1;
				await this.refresh();
			}
		});
		
		this.$pagination.querySelector('.end').addEventListener('click', async () => {
			if(this.current_page !== this.data.pagination.pages) {
				this.current_page = this.data.pagination.pages;
				await this.refresh();
			}
		});

		this.update_pagination();
	}

	update_pagination() {
		let $start = this.$pagination.querySelector('.start');
		let $end = this.$pagination.querySelector('.end');
		let $current = this.$pagination.querySelector('.current');

		$start.textContent = "1";
		$end.textContent = this.data.pagination.pages;
		$current.textContent = '...';
		$start.classList.remove('active');
		$end.classList.remove('active');
		$current.classList.remove('active');

		if(this.data.pagination.page === 1) {
			$start.classList.add('active');
			$current.textContent = '...'
			return;
		}

		if(this.data.pagination.page === this.data.pagination.pages) {
			$end.classList.add('active');
			$current.textContent = '...'
			return;
		}

		$current.textContent = this.current_page;
		$current.classList.add('active');
	}

	get_url() {
		let page_query= `?page=${this.current_page}`;
		return `${this.base_url}${page_query}`;
	}

	async get_data() {
		try {
			this.data = await fetch(this.get_url()).then(res => res.json());
		} catch(e) {
			console.error(e);
			this.data = null;
		}
	}

	async render() {
		this.render_table();
		await this.get_data();
		this.render_table_body();
		this.render_pagination();
		this.boot = false;
	}

	connectedCallback() {
		// this.querySelector('.card-header').textContent = this.getAttribute('title');
		this.querySelector('.card-header__title').textContent = this.getAttribute('title');
		let columns = this.columns.split(',');
		this.$thead = this.querySelector('thead')
		this.$tr = document.createElement('tr');
		this.$th = document.createElement('th');
		this.$thead.appendChild(this.$tr)

		for(let item of columns) {
			let $th = this.$th.cloneNode('true');
			$th.textContent = item;
			this.$tr.appendChild($th);
		}
	}
}

customElements.define('x-table', TableComponent);