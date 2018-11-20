<template>
    <section>
       <div class="columns is-multiline">
          <div class="column is-4 ad-card"  v-for="ad in data.ads.data">
              <div class="ad">
                  <h3 class="title is-3">{{ad.title}}</h3>
              </div>
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
    export default{
        async asyncData({app,query}){
             var page = 1;
            if(typeof query.page != undefined){
                page = query.page
            }
            var res = await app.$axios.get('/ad/all?page='+page);
            return {data:res.data};
        },
         methods:{
            actionPage(page){
                this.$router.push(`/ads?page=${page}`);
                this.$axios.get(`/ad/all?page=${page}`).then(res=>{
                    this.data = res.data;
                });
            }
        }
    }
</script>

<style>
    
</style>