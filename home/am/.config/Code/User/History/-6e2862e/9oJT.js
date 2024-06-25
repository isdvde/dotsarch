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

	update(pagination) {
		this.$start.textContent = "1";
		// this.$end.textContent = pagination.pages;
		this.$end.textContent = pagination.last_page;
		this.$current.textContent = '...';
		// this.$start.classList.remove('active');
		// this.$end.classList.remove('active');
		// this.$current.classList.remove('active');

		this.set_active(this.$start, false);
		this.set_active(this.$end, false);
		this.set_active(this.$current, false);

		// if(pagination.page === 1) {
		if(pagination.current_page === 1) {
			// this.$start.classList.add('active');
			this.set_active(this.$start);
			this.$current.textContent = '...'
			return;
		}

		// if(pagination.page === pagination.pages) {
		if(pagination.current_page === pagination.last_page) {
			// this.$end.classList.add('active');
			this.set_active(this.$end);
			this.$current.textContent = '...'
			return;
		}

		// this.$current.textContent = pagination.page;
		this.$current.textContent = pagination.current_page;
		// this.$current.classList.add('active');
		this.set_active(this.$current);
	}

	connectedCallback() {
		this.querySelector('button').addEventListener('click', e => {
			e.preventDefault();
		})

		this.$prev = this.querySelector('.prev');
		this.$next = this.querySelector('.next');
		this.$start = this.querySelector('.start');
		this.$current = this.querySelector('.current');
		this.$end = this.querySelector('.end');
	}
}

customElements.define('x-pagination', Pagination);
