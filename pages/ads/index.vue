<template>
    <section>
       <div class="columns">
            <div class="column is-12">
                <each-ad v-for="ad in data.ads.data" :ad="ad" :key="ad.id"></each-ad>
            </div>
       </div>
        <div class="is-clearfix"></div>
          <div>
            <nav class="pagination columns is-centered bw" role="navigation" aria-label="pagination">
                 <paginations :limit="3" :data="data.ads" @pagination-change-page="actionPage($event)"></paginations>
            </nav>
          </div>
         <div class="is-clearfix"></div>
      </section>
</template>

<script>
import eachAd from '~/components/eachAd.vue';
    export default{
        watchQuery:['page'],
        async asyncData({app,query}){
             var page = 1;
            if(typeof query.page != undefined){
                page = query.page
            }
            var res = await app.$axios.get('/ad/all?page='+page);
            console.log(res.data)
            return {data:res.data};
        },
        components:{
           eachAd,
        },
        methods:{
            actionPage(page){
                this.$router.push(`/ads?page=${page}`);
            }
        }
    }
</script>

<style>
    
</style>