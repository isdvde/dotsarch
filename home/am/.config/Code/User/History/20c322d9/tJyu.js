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

	update_pagination(data) {

		this.$start.textContent = "1";
		this.$end.textContent = data.pagination.pages;
		this.$current.textContent = '...';
		this.$start.classList.remove('active');
		this.$end.classList.remove('active');
		this.$current.classList.remove('active');

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
