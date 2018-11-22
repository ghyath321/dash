<template>
  <section>
    <div class="columns">
      
      <div class="column">
         <div class="columns column is-mobile is-multiline">
             
           <div class="column is-12-touch">
             <div class="has-background-primary has-text-white has-text-centered">
               <h5 class="is-size-5">Users</h5>
               <p>{{info.users.all}}</p>
             </div>
           </div>
           
           <div class="column is-6-touch">
             <div class="has-background-info has-text-white has-text-centered">
               <h5 class="is-size-5">Ads Posted</h5>
               <p>{{info.ads.all - info.ads.not_accepted}}</p>
             </div>
           </div>
           
           <div class="column is-6-touch">
             <div class="has-background-danger has-text-white has-text-centered">
               <h5 class="is-size-5">Ads In Review</h5>
               <p>{{info.ads.not_accepted}}</p>
             </div>
           </div>
           
         </div>
         
         <div class="columns column is-mobile">
           <div class="column is-6-touch">
             <div class="has-background-success has-text-white has-text-centered">
               <h5 class="is-size-5">Features Ads</h5>
               <p>{{info.ads.star_ads}}</p>
             </div>
           </div>
           
           <div class="column is-6-touch">
             <div class="has-background-success has-text-white has-text-centered">
               <h5 class="is-size-5">Features Top Side</h5>
               <p>{{info.features.all}}</p>
             </div>
           </div>
           
         </div>
      </div>
      
    </div>
  </section>
</template>

<script>
import sideNav from '~/components/templates/sidebar.vue';
export default {
  middleware:'auth',
  components:{
    sideNav
  },
  mounted(){
    console.log(this.info);  
  },
  async asyncData({app}){
      var info = await app.$axios.get('/get_info');
      return {info:info.data};
  }
}
</script>

<style>
  .boxes{
    margin-top:10px;
  }
</style>