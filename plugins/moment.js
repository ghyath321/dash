import Vue from 'vue';
import moment from 'moment'

export default (({store})=>{
    Vue.filter('formatDate', function(value) {
      if (value) {
        return moment(String(value)).add(-44, 'seconds').fromNow();
      }
    })
})
