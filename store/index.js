export const state = () => ({
  URL:'',
  CATEGORIES:[],
  CITIES:[],
  FEATURES:[]
});

export const mutations = {
  setURL(state, value) {
    state.URL = value
  },
  SET_CITIES(state,value){
    state.CITIES = value;
  },
  SET_CATEGORIES(state,value){
    state.CATEGORIES = value;
  },
  SET_FEATURES(state,value){
    state.FEATURES = value;
  }
  
};
export const getters = {
    url (state) {
        return state.URL;
    },
    categories (state){
      return state.CATEGORIES;
    },
    cities (state){
      return state.CITIES;
    },
    features(state){
      return state.FEATURES;
    }
}

export const actions = {
  
   async nuxtServerInit({ commit },{app}) {
      commit('setURL', process.env.apiUrl)
    //   await app.$axios.get('/get-cities/1').then(res=>{
    //           commit('SET_CITIES', res.data)
    //   })
    //   await app.$axios.get('/get-categories').then(res=>{
    //           commit('SET_CATEGORIES', res.data)
    //   }) 
  }
}
