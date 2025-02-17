export function $(sel) {
	return document.querySelector(sel);
}

export function $create(el) {
	return document.createElement(el);
}

export function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
};

export function get_current_date() {
	let date = new Date();
	return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}

export async function do_fetch(opts) {
	let methods = {
		get: "GET",
		post: "POST",
		put: "PUT",
		delete: "DELETE",
		default: "GET"
	};

	if(opts.method !== 'get' || opts.method === ""){
		let options = {
			method: methods[opts.method] || methods['default'],
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(opts.data),
		};
		let res = await fetch(opts.url, options).then((res) => {
			return res.json()
		});

		return res
	}
}
 export function get_quarter(date) {
	console.log(date);


 }
