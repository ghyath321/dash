export default function ({store, app,redirect }) {
    app.$axios.onRequest((config) => {
          config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    })
    app.$axios.onError(error => {
         const code = parseInt(error.response && error.response.status)
         if(code == 401){
             store.$auth.logout();
             redirect('/auth/login')
         }
    })
    
}