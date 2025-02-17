import { $qs } from "../libs/utils";

export class Pagination extends HTMLElement {

	constructor() {
		super();
		this.innerHTML = `
			<nav aria-label="Pagination">
				<ul class="pagination justify-content-center">
					<li class="page-item"><button class="page-link prev">Anterior</button></li>
					<li class="page-item"><button class="page-link start"></button></li>
					<li class="page-item"><button class="page-link current"></button></li>
					<li class="page-item"><button class="page-link end"></button></li>
					<li class="page-item"><button class="page-link next">Siguiente</button></li>
				</ul>
			</nav>
		`
	}

	set_active(el, active=true) {
		if(active) {
			el.style.backgroundColor = "#007bff";
			el.style.color = "#fff";
			return;
		}

		el.style = "";
	}

	// update(pagination) {
	// 	this.$start.textContent = "1";
	// 	this.$end.textContent = pagination.last_page;
	// 	this.$current.textContent = '...';

	// 	this.set_active(this.$start, false);
	// 	this.set_active(this.$end, false);
	// 	this.set_active(this.$current, false);

	// 	if(pagination.current_page === 1) {
	// 		this.set_active(this.$start);
	// 		this.$current.textContent = '...'
	// 		return;
	// 	}

	// 	if(pagination.current_page === pagination.last_page) {
	// 		this.set_active(this.$end);
	// 		this.$current.textContent = '...'
	// 		return;
	// 	}

	// 	this.$current.textContent = pagination.current_page;
	// 	this.set_active(this.$current);
	// }

	update_actions(pagination) {
		let actions = {};
		 let init = 1;

		actions[init] = function(){
			console.log("1")
			this.set_active(this.$start);
			this.$current.textContent = '...'
		}.bind(this);

		actions[pagination.last_page] = function(){
			console.log("last page")
			this.set_active(this.$end);
			this.$current.textContent = '...'
		}.bind(this);

		actions["default"] = function(){
			console.log("default")
			this.$current.textContent = pagination.current_page;
			this.set_active(this.$current);
		}.bind(this)

		return actions;
	}

	update(pagination) {
		console.log("pagination", pagination)
		this.$start.textContent = "1";
		this.$end.textContent = pagination.last_page;
		this.$current.textContent = '...';

		this.set_active(this.$start, false);
		this.set_active(this.$end, false);
		this.set_active(this.$current, false);

		this.update_actions(pagination)[pagination.current_page.toString()]() 
		|| this.update_actions(pagination)["default"]();
	}

	connectedCallback() {
		this.querySelector('button').addEventListener('click', e => {
			e.preventDefault();
		})

		this.$prev = $qs(this,'.prev');
		this.$next = $qs(this,'.next');
		this.$start = $qs(this,'.start');
		this.$current = $qs(this,'.current');
		this.$end = $qs(this,'.end');
	}
}

customElements.define('x-pagination', Pagination);
