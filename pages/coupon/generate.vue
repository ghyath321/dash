<template>
    <div class="columns is-multiline">
        <div class="column is-3">
            <div class="field">
              <label >Expire Days</label>
              <div class="control">
                <input v-model="coupon.expired" class="input is-primary" type="number" placeholder="Primary input">
              </div>
            </div>
        </div>
        <div class="column is-3">
            <div class="field">
              <label >Length Code</label>
              <div class="control">
                <input v-model="coupon.length" class="input is-primary" type="number" placeholder="Primary input">
              </div>
            </div>
        </div>
         <div class="column is-2">
            <div class="field">
              <label style="margin:5px"> </label>  
              <div class="control">
                <button @click="generate()" class="button is-success">Generate</button>
              </div>
            </div>
        </div>
         <div class="column is-10">
           <pre>{{couponCode.coupon_code}}</pre>
        </div>
        <div class="column is-10">
            <div class="table__wrapper">
              <table class="table is-bordered is-fullwidth">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Code</td>
                        <td>Expire At (Per Day)</td>
                        <td>State</td>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="coupon in coupons" class="is-danger">
                    <td>{{coupon.id}}</td>
                    <td>{{coupon.coupon_code}}</td>
                    <td>{{coupon.expired_at}}</td>
                    <td>
                        <i v-if="coupon.status" :class="{'has-text-primary':coupon.status}" class="fas fa-circle"></i>
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
        data(){
            return{
                coupon:{
                    expired:1,
                    length:15
                },
                couponCode:''
            }
        },
        async asyncData({app}){
          var res = await app.$axios.get('/coupon/get');
          return {
              coupons:Object.values(res.data.coupons.coupons).concat(Object.values(res.data.coupons.used))
          }
        },
        methods:{
            generate(){
                this.$axios.post('/coupon/generate',this.coupon).then(res=>{
                    res.data.coupon.status = 1;
                    this.couponCode = res.data.coupon;
                    this.coupons.unshift(res.data.coupon)
                });
            }
        }
    }
</script>

<style>
    .table__wrapper{
        height:400px;
        overflow:auto;
    }
</style>