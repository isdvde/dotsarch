import _ from 'lodash';

window._ = _;

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */
import axios from 'axios';

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });

const url_split = window.location.href.split("/");

/* Obtenemos la primera palabra de la url que contenga "sistemPrefix" de esta forma si la
url es "sistemPrefixalgo" igual lo va a capturar. */
const sistemPrefix = ''
const prefix = url_split.filter((el) => el.includes(sistemPrefix))[0];

const indice = url_split.indexOf(prefix);

if (prefix == undefined) {
    window.basePath = window.origin;
    window.prefixPath = "";
} else if (url_split[indice + 1].length >= 32) {
    window.basePath = window.origin;
    window.prefixPath = "";
} else {
    window.basePath = window.origin + "/" + prefix;
    window.prefixPath = `${prefix}/`;
    console.log(window.basePath)
}
