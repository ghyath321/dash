<template>
    <div class="has-text-centered">
        <h1 class="title">Features</h1>
        <h2 class="subtitle">All</h2>
        <hr />
        
        <div class="column is-10">
            <div class="table__wrapper">
              <table class="table is-bordered is-fullwidth">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Name</td>
                        <td>Address</td>
                        <td>Phone Number</td>
                        <td>State</td>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="feature in features">
                    <td>{{feature.id}}</td>
                    <td>{{feature.name}}</td>
                    <td>{{feature.address}}</td>
                    <td>{{feature.phone}}</td>
                     <td>
                        <i v-if="feature.state" :class="{'has-text-primary':feature.state}" class="fas fa-circle"></i>
                        <i v-else class="fas fa-circle"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        async asyncData({app,error}){
            var res = await app.$axios.get('/features').catch(err=>{
                return error(err.response);
            });
            return {
                features:Object.values(res.data.features.active).concat(Object.values(res.data.features.not))
            }
        }
    }
</script>