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
                                                <th>Created At</th>
                                                <th>Status</th>
                                                <th>Options</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="ad in data.ads.data">
                                                <td>
                                                   {{ad.id}}
                                                </td>
                                                <td>{{ad.title.substr(0,10)}}...</td>
                                                <td><span>{{ad.city.name}}</span></td>
                                                <td>
                                                    <span>
                                                        {{ad.category.name}}
                                                        {{(ad.section)?'->'+ad.section.name:''}}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span v-if="ad.active" class="badge badge-success">Active</span>
                                                    <span v-else class="badge badge-danger">Disabled</span>
                                                </td>
                                                <td>
                                                    <span @click="accept(ad.id)" v-if="!ad.is_accepted" class="btn btn-success">Accept</span>
                                                    <span @click="activation(ad.id)" v-if="!ad.active" class="btn btn-info">Active</span>
                                                    <span @click="activation(ad.id)" v-else class="btn btn-danger">Disabled</span>
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
        watchQuery:['page','category','places','type','q','update'],
        async asyncData({app,query}){
            var page = 1;
            var search={word:undefined,places:[],category:undefined,type:[0,1]}; 
            if(typeof query.q != 'undefined'){
               search.word = query.q;
            }
            if(typeof query.category != 'undefined'){
               search.category = query.category;
            }
            if (typeof query.places != 'undefined') {
              search.places = (query.places);
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
            accept(id){
                // var type     = (this.search.type.length > 0) ? this.search.type.join() : undefined;
                // var category = (this.search.category) ? this.search.category : undefined;
                // var places   = (this.search.places.length > 0) ? this.search.places.join() : undefined;
                // var word     = (this.search.word) ? this.search.word : undefined;
                this.$axios.post('/ad/accept',{id:id}).then(res=>{
                    this.$router.push(
                        {
                            path:'',
                            query:{
                                q:this.search.word,
                                category:this.search.category,
                                places:this.search.places,
                                type:this.search.type.join(),
                                page:this.page
                            }
                            
                        }
                    );
                })
            },
            actionPage(page){
                // var type     = (this.search.type.length > 0) ? this.search.type.join() : undefined;
                // var category = (this.search.category) ? this.search.category : undefined;
                // var places   = (this.search.places.length > 0) ? this.search.places.join() : undefined;
                // var word     = (this.search.word) ? this.search.word : undefined;
                this.$router.push(
                    {
                        path:'',
                        query:{
                            q:this.search.word,
                            category:this.search.category,
                            places:this.search.places,
                            type:this.search.type.join(),
                            page:this.page
                        }
                        
                    }
                );
            },
            filterAds(){
                // var type     = (this.search.type.length > 0) ? this.search.type.join() : undefined;
                // var category = (this.search.category) ? this.search.category : undefined;
                // var places   = (this.search.places.length > 0) ? this.search.places.join() : undefined;
                // var word     = (this.search.word) ? this.search.word : undefined;
                this.$router.push(
                    {
                        path:'',
                        query:{
                            q:this.search.word,
                            category:this.search.category,
                            places:this.search.places,
                            type:this.search.type.join(),
                            page:this.page
                        }
                        
                    }
                );
            },
            activation(id){
                
            }
        }
    }
</script>

<style>
    
</style>