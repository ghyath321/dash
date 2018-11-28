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
                                    <input @keyup.enter="filterUsers()" v-model="search.name" type="search" aria-controls="example23">
                                </label>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Created At</th>
                                                <th>Status</th>
                                                <th>Options</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="user in data.users.data">
                                                <td>
                                                    <div class="round-img">
                                                        <img v-if="user.pic" :src="URL+user.pic">
                                                    </div>
                                                </td>
                                                <td>{{user.name}}</td>
                                                <td><span>{{user.email}}</span></td>
                                                <td><span>{{user.created_at}}</span></td>
                                                <td>
                                                    <span v-if="user.active" class="badge badge-success">Active</span>
                                                    <span v-else class="badge badge-danger">Disabled</span>
                                                </td>
                                                <td>
                                                    <span @click="activation(user.id)" v-if="!user.active" class="btn btn-info">Active</span>
                                                    <span @click="activation(user.id)" v-else class="btn btn-danger">Disabled</span>
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
                         <paginations :limit="3" :data="data.users" @pagination-change-page="actionPage($event)"></paginations>
                    </nav>
                  </div>
                 <div class="is-clearfix"></div>
    </section>
</template>


<script>
    export default{
        watchQuery:['page','name','status','update'],
        async asyncData({app,query}){
            var page = 1;
            var search = {
                name:'',
                status:''
            };
            if(typeof query.name != undefined){
                search.name = query.name
            }
            if(typeof query.status != undefined){
                search.status = query.status
            }
            if(typeof query.page != undefined && query.page != 1){
                page = query.page
            }
            var res = await app.$axios.get('/user/all?page='+page,{params:{search:search}});
            return {
                data:res.data,
                search,
                page
                
            };
        },
        methods:{
            actionPage(page){
                this.$router.push({path:'',query:{status:this.search.status,name:this.search.name,page:page}});
            },
            filterUsers(){
                this.$router.push({path:'',query:{status:this.search.status,name:this.search.name,page:1}});
            },
            activation(id){
              this.$axios.post('/user/activation',{id:id}).then(res=>{
                  this.$router.push({path:'',query:{status:this.search.status,name:this.search.name,page:1,update:id+'-changed-'+res.data.status}});
              });
           }
        }
       
    }
</script>

<style>
    .user-card{
        max-height:280px;
        min-height:280px;
    }
    .card-image img{
        margin:auto;
        width:100px;
        padding: 6px;
        box-sizing: content-box;
    }
</style>