<template>
    <div class="has-text-centered container">
        <h1 class="title">Features</h1>
        <h2 class="subtitle">All</h2>
        <hr />
        
    <div class="col-xs-12">
      <div class="table-responsive">
        <table summary="This table shows how to create responsive tables using Bootstrap's default functionality" class="table table-bordered table-hover">
          <thead>
             <tr>
                <td>#</td>
                <td>Name</td>
                <td>Address</td>
                <td>Phone Number</td>
                <td>State</td>
                <td>Options</td>
             </tr>
          </thead>
          <tbody>
            <tr v-for="feature in features">
                <td>{{feature.id}}</td>
                <td><nuxt-link :to="`/features/${feature.id}`">{{feature.name}}</nuxt-link></td>
                <td>{{feature.address}}</td>
                <td>{{feature.phone}}</td>
                <td>
                    <i :style="{color:(feature.state)?'green':'gray'}" class="fas fa-circle"></i>
                </td>
                <td>
                    <button @click="Delete(feature.id,$event)" class="btn btn-danger">Delete</button>
                    <button class="btn btn-success"><nuxt-link class="color-white" :to="`/features/edit/${feature.id}`">Edit</nuxt-link></button>
                    <button @click="changeState(feature.id,$event)" v-if="feature.state" class="btn btn-info">Un active</button>
                    <button @click="changeState(feature.id,$event)" v-else class="btn btn-primary">Active</button>
                </td>
              </tr>
          </tbody>
        </table>
      </div><!--end of .table-responsive-->
    </div>
    </div>
</template>

<script>
    export default{
        watchQuery:['update'],
        async asyncData({app,error}){
            var res = await app.$axios.get('/feature/all').catch(err=>{
                return error(err.response);
            });
            return {
                features:Object.values(res.data.features.active).concat(Object.values(res.data.features.not))
            }
        },
        methods:{
            changeState(id,event){
                $(event.target).addClass('is-loading');
                this.$axios.post('/feature/change_state',{id:id}).then(res=>{
                    $(event.target).removeClass('is-loading');
                    this.$router.push({path:'',query:{update:id+'-changed-'+res.data.state.state}})
                })
            },
            Delete(id,event){
                $(event.target).addClass('is-loading');
                this.$axios.post('/feature/delete',{id:id}).then(res=>{
                    $(event.target).removeClass('is-loading');
                    // this.features = _.filter(this.features, function(currentObject) {
                    //     return currentObject.id != id;
                    // });
                    this.$router.push({path:'',query:{update:id+'-deleted'}})
                })
            }
        }
    }
</script>