<template>
  <div>
    <navbar></navbar>
    <div class="columns">
       <div class="column is-3">
           <side-nav />
       </div>
       <div class="column">
          <nuxt/>
       </div>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/templates/header.vue';
import sideNav from '~/components/templates/sidebar.vue';
export default{
  components:{
      Navbar,
      sideNav
  },
  mounted(){
    if(this.$auth.loggedIn){
        var id = this.$auth.user.id;
        const channel = window.Pusher.subscribe(`private-supports.${id}`);
        channel.bind('event',(e)=>{
          console.log(e);
        })
    }
  }
}
</script>