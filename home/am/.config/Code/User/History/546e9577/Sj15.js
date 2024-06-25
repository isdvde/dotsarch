export class SCSNotification extends HTMLElement {
  constructor(opts){
    super();

    this.innerHTML = `
			<div card>
				<div class="card-body">
				</div>
			</div>
    `
    this.opts = opts;
    this.data = this.opts.data;
		this.classList.add('fixed', 'z-1', 'shadow-md');
		this.style.maxWidth = '60%';
		this.style.borderRadius = '1rem';
		this.style.top = '5rem';
		this.style.right = '3rem';
    this.style.fontSize = "0.8em";
		this.style.backgroundColor = '#fff';

    this.addEventListener('click', function(e){
      this.remove();

    }.bind(this))
    this.add_text();
  }

  add_text() {
    let types = {
      'array': function(){this.parse_array()},
      'object': this.parse_object,
    }

    try {
      return types[typeof(this.data)]();
    } catch {
      return this.data;
    } 
  }

  parse_array() {
    console.log(this.data);
  }




}

customElements.define('scs-notification', SCSNotification);