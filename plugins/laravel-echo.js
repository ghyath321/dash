import Cookies from 'js-cookie'
export default ({ app }) => {
    const token = Cookies.get('auth._token.local');
    var Pusher = require('pusher-js');
    window.Pusher = new Pusher(process.env.pusherKey, {
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