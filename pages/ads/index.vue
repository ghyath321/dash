<template>
    <section>
        <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-title">
                                <h4>Recent Orders </h4>
                            </div>
                            <div id="example23_filter" class="dataTables_filter">
                                <label>Search:
                                    <input @keyup.enter="filterAds()" v-model="search.word" type="search" aria-controls="example23">
                                </label>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>City</th>
                                                <th>Category</th>
                                                <th>Status</th>
                                                <th>Options</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="ad in data.ads.data">
                                                <td>
                                                   {{ad.id}}
                                                </td>
                                                <td><nuxt-link :to="`ads/${ad.id}`">{{ad.title.substr(0,15)}}...</nuxt-link></nuxt-link></td>
                                                <td><span>{{ad.city.name}}</span></td>
                                                <td>
                                                    <span class="badge badge-primary">{{ad.category.name}}</span>
                                                    <span v-if="ad.section" class="badge badge-info">{{ad.section.name}}</span>
                                                </td>
                                                <td>
                                                    <span v-if="ad.active  && ad.is_accepted" class="badge badge-success">Active</span>
                                                    <span v-if="!ad.is_accepted" class="badge badge-info">Pending</span>
                                                    <span v-if="!ad.active" class="badge badge-danger">Disabled</span>
                                                </td>
                                                <td>
                                                    <span @click="accept(ad.id)" v-if="!ad.is_accepted" class="btn btn-success">Accept</span>
                                                    <span @click="activation(ad.id)" v-if="!ad.active" class="btn btn-info">Active</span>
                                                    <span @click="activation(ad.id)" v-if="ad.active && ad.is_accepted" class="btn btn-warning">Disabled</span>
                                                    <span @click="Delete(ad.id)" class="btn btn-danger">Delete</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
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
import eachAd from '~/components/eachAd.vue';
    export default{
        middleware:'auth',
        watchQuery:['page','category','place','type','q','update','status','is'],
        async asyncData({app,query}){
            var page = 1;
            var search={word:undefined,place:undefined,category:undefined,type:[],status:undefined,is:undefined}; 
            if(typeof query.q != 'undefined'){
               search.word = query.q;
            } 
            if(typeof query.is != 'undefined'){
               search.is = query.is;
            }
            if(typeof query.status != 'undefined'){
               search.status = query.status;
            }
            if(typeof query.category != 'undefined'){
               search.category = query.category;
            }
            if (typeof query.place != 'undefined') {
              search.place = query.place;
            }
            if (typeof query.type != 'undefined') {
              search.type = (query.type+'').split(",");
            }
            if(typeof query.page != 'undefined'){
                page = query.page;
            }
            var res = await app.$axios.get('/ad/all?page='+page,{params:{search:search}});
            return {
                page,
                data:res.data,
                search
            };
        },
        components:{
           eachAd,
        },
        methods:{
            routing(data = null){
                 var types = this.search.type.join();
                 this.$router.push(
                        {
                            path:'',
                            query:{
                                q:this.search.word,
                                category:this.search.category,
                                place:this.search.place,
                                type:(types.length > 0)?types:undefined,
                                status:this.search.status,
                                is:this.search.is,
                                update:(data.update)?data.update:undefined,
                                page:(data.page)?data.page:(this.page > 1)?this.page:undefined
                            }
                            
                        }
                    );
            },
            accept(id){
                this.$axios.post('/ad/accept',{id:id}).then(res=>{
                   this.routing({update:`${id}-accept`});
                })
            },
            actionPage(page){
               this.routing({page});
            },
            filterAds(){
               this.routing();
            },
            activation(id){
                this.$axios.post('/ad/activation',{id:id}).then(res=>{
                   this.routing({update:`${id}-update-${res.data.status}`});
                })
            },
            Delete(id){
                var _this = this;
                this.$swal({
                      title: 'Are you sure?',
                      text: 'Do you want to delete this forever?',
                      type: 'warning',
                      showCancelButton: true,
                      confirmButtonText: 'Delete',
                      cancelButtonText: 'Cancel',
                      reverseButtons: true
                }).then((result) => {
                  if (result.value) {
                        _this.$axios.post('/ad/delete',{id:id}).then(res=>{
                            _this.routing({update:`${id}-deleted`});
                            _this.$toast.success('Deleted!')
                        }); 
                  }
                })
            }
        }
    }
</script>

<style>
    
</style>