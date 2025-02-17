export class SCSNotification extends HTMLElement {
  constructor(opts){
    super();

    this.innerHTML = `
			<div card>
				<div class="card-body">
        ldksajfñldskjfñdsafkjsdalfsdlkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkflsajfalskdfjlsadkj
				</div>
			</div>
    `
		this.classList.add('fixed', 'z-1', 'shadow-md');
		// this.style.width = '20rem';
		this.style.maxWidth = '60%';
		this.style.borderRadius = '1rem';
		this.style.top = '5rem';
		this.style.right = '3rem';
    this.style.fontSize = "0.8em";
		// this.style.overflowY = 'scroll';
		this.style.backgroundColor = '#fff';

    this.addEventListener('click', function(e){
      this.remove();

    }.bind(this))
  }
}

customElements.define('scs-notification', SCSNotification);