<template>
    <div class="all container is-fluid">
        <div class="columns">
            <div class="column is-3 has-text-centered">
                <div>
                    <h1 class="subtitle is-3 has-text-info"><b>{{feature.name}}</b></h1>
                    <img :src="URL+feature.logo" />
                </div>
            </div>
            <div class="column is-10 has-text-centered ">
                <h2 class="has-text-centered title">Information</h2>
                <hr/>
                <div class="columns column is-12 is-mobile">
                    <div class="column"><b>Phone</b></div>
                    <div class="column"><a :href="'tel:'+feature.phone">{{feature.phone}}</a></div>
                </div>
                <div class="columns column is-12 is-mobile">
                    <div class="column"><b>Address</b></div>
                    <div class="column">{{feature.address}}</div>
                </div>
                
                <div class="column">
                    <h3 class="subtitle">Description</h3>
                    <pre>{{feature.description}}</pre>
                </div>
            </div>
        </div>
        <button @click="Delete(feature.id,$event)" class="btn btn-danger">Delete</button>
        <button class="btn btn-success"><nuxt-link class="color-white" :to="`/features/edit/${feature.id}`">Edit</nuxt-link></button>
        <button @click="changeState(feature.id,$event)" v-if="feature.state" class="btn btn-info">Un active</button>
        <button @click="changeState(feature.id,$event)" v-else class="btn btn-primary">Active</button>
    </div>
</template>

<script>
    export default{
        async asyncData({app,params}){
            var res = await app.$axios.get(`/feature/show/${params.id}`);
            return {feature:res.data.feature}
        },
        watchQuery:['update'],
        head(){
            return{
              title:`${this.feature.name}`,
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
                   this.$router.go(-1);
                })
            }
        }
    }
</script>

<style scoped>
    .all{
        margin-top:10px !important;
    }
    pre{
        white-space:pre-wrap;
    }
</style>