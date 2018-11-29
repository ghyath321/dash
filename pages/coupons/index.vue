<template>
     <div class="container-fluid">
                
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-title">
                                <h4>Coupons</h4>
                            </div>
                            <div class="row mb-4">
                                <div>
                                    <label for="">Expired</label>
                                    <input type="text" class="form-control" v-model="coupon.expired">
                                </div>
                                
                                <div>
                                    <label for="">Length</label>
                                    <input type="text" class="form-control" v-model="coupon.length">
                                </div>
                                <div class="col-3"><label>Submit</label><input type="button" class="form-control btn btn-info" value="Generate" @click.prevent="generate()"></div>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Code</th>
                                                <th>Expired At (per day)</th>
                                                <th>Status</th>
                                                <th>Ad</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="coupon in coupons">
                                                <th scope="row">{{coupon.id}}</th>
                                                <td>{{coupon.coupon_code}}</td>
                                                <td>{{coupon.expired_at}}</td>
                                                <td>
                                                    <span v-if="coupon.status" class="badge badge-success">Active</span>
                                                    <span v-if="!coupon.status" class="badge badge-info">Used</span>
                                                </td>
                                                <td class="color-primary">{{coupon.ad_id}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
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