import https from 'https';
export default function ({store, app,redirect }) {
    const agent = new https.Agent({  
        rejectUnauthorized: false
     });  
    app.$axios.onRequest((config) => {
          config.httpsAgent = agent;
          config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    })
    app.$axios.onError(error => {
         const code = parseInt(error.response && error.response.status)
         if(code == 401){
             store.$auth.logout();
             redirect('/login')
         }
    })
    
}