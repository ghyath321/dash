import Cookies from 'js-cookie';
import Vue from 'vue';
import pusher from 'pusher-js';
export default ({ app }) => {
    const token = Cookies.get('auth._token.local');
    Vue.prototype.$Pusher = new pusher(process.env.pusherKey, {
          authEndpoint: `${process.env.apiUrl}/api/broadcast/auth` ,
          auth: {
            headers: {
              'Authorization': token
            }
          },
          cluster: 'ap2',
          encrypted: true
    })
}