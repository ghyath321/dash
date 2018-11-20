<template>
    <section>
       <div class="columns is-multiline">
          <div class="column is-4 user-card"  v-for="user in data.users.data">
              <div class="card">
                  <div class="card-image has-text-centered">
                    <figure style="width:100%" class="image">
                      <img v-if="user.pic" style="margin:auto;width:100px" class="display-d is-rounded" :src="URL+user.pic">
                      <i v-else style="color:#00d1b2" class="fa-7x fas fa-user-circle"></i>
                    </figure>
                  </div>
                  <div class="card-content">
                    <div class="media">
                      <div class="media-content">
                        <p class="title is-4">{{user.name}}</p>
                        <p class="subtitle is-6">{{user.created_at}}</p>
                      </div>
                    </div>
                
                    <div class="content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                      <a href="#">#css</a> <a href="#">#responsive</a>
                      <br>
                      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                    </div>
                  </div>
                   <footer class="card-footer">
                    <a href="#" class="card-footer-item">Save</a>
                    <a href="#" class="card-footer-item">Edit</a>
                    <a href="#" class="card-footer-item">Delete</a>
                  </footer>
                </div>
          </div>
       </div>
        <div class="is-clearfix"></div>
          <div>
            <nav class="pagination columns is-centered bw" role="navigation" aria-label="pagination">
                 <paginations :limit="3" :data="data.users" @pagination-change-page="actionPage($event)"></paginations>
            </nav>
          </div>
         <div class="is-clearfix"></div>
      </section>
</template>


<script>
    export default{
        data(){
            return {
            }
        },
        async asyncData({app,query}){
            var page = 1;
            if(typeof query.page != undefined){
                page = query.page
            }
            var res = await app.$axios.get('/user/all?page='+page);
            console.log(res.data.users.data)
            return {data:res.data};
        },
        methods:{
            actionPage(page){
                this.$router.push(`/users?page=${page}`);
                this.$axios.get(`/user/all?page=${page}`).then(res=>{
                    this.data = res.data;
                });
            }
        }
    }
</script>

<style>
    .user-card{
        height:auto;
    }
</style>