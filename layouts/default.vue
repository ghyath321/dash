<template>
  <div id="main-wrapper">
    <navbar v-if="$auth.loggedIn"></navbar>
   
    <div >  <!--class="page-wrapper"-->
      <side-nav v-if="$auth.loggedIn" />
      <nuxt/>
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
        const channel = this.$Pusher.subscribe(`private-supports.${id}`);
        channel.bind('event',(e)=>{
          console.log(e);
        })
    }
  }
}
</script>

<style lang="css">
  @import '../static/css/lib/bootstrap/bootstrap.min.css';
  @import '../static/css/helper.css';
  @import '../static/css/style.css';
</style>