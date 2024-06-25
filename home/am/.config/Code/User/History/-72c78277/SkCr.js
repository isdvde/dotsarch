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
