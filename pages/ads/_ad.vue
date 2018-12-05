<template>
    <div class="parent" :class="{'rtl':rtl}">
        <h1 class="title bw is-size-4">{{data.title}}</h1>
        <div class="columns">
            <div class="column is-8 is-paddingless">
                <header class="bw">
                    <ul :class="{'is-pulled-right':(rtl),'is-pulled-left':(!rtl)}">
                        <li>
                             <nuxt-link :to="'/?places='+data.city.slug">
                                <span class="no-radius tag is-dark">
                                   <i class="fas fa-map-marker-alt"></i>&nbsp
                                   <b>{{data.city.slug}}</b>&nbsp
                                   <span class="no-radius tag is-primary" v-if="data.village">
                                       <b>
                                           <span>{{data.village.slug}}</span>
                                       </b>
                                    </span>
                                </span>
                              
                             </nuxt-link>
                        </li> 
                        <li>
                             <no-ssr><span class="time cgray">{{data.created_at}}</span></no-ssr>
                        </li>
                    </ul>
                    <div class="is-clearfix"></div>
                </header>
                <no-ssr>
                    <div style="margin-bottom:10px">
                         <vue-gallery :images="images" :index="index" @close="index = null"></vue-gallery>
                        
                            <div class="row">
                              <div class="columnt" v-for="(image, imageIndex) in images">
                                <img class="image" :src="image" :alt="data.title" style="width:90%" @click="changeImg($event,imageIndex)">
                              </div>
                            </div>
                            
                            <div class="containert has-text-centered">
                              <img id="expandedImg" @click="index = showimg" >
                            </div>
    
                    </div>
                    <div class="bw content"><pre>{{data.description}}</pre></div>
                </no-ssr>
            </div>
            <div class="column bw is-4">
                
                <div class="columns is-mobile">
                    <div class="column is-1">
                        <span class="tag is-info is-medium is-rounded">+{{data.rates.length}}</span>
                    </div>
                    <div class="column">
                        <no-ssr>
                            <star-rating :increment="0.05" :read-only="true" :rating="fetchRates(data.rates)" @rating-selected="setRating($event,data.id)" :star-size="25" :rtl="rtl"></star-rating>
                        </no-ssr>
                    </div>
                </div>
                <div class="information">
                 
                    <div class="column">
                        <span> <b>Category</b>:</span>  
                        <span class="cred">
                            <nuxt-link class="cred" :to="`${URL}/${data.category.slug}`">
                                <span class="tag is-info">{{data.category.slug}}</span> 
                            </nuxt-link>
                            <nuxt-link v-if="data.section" class="cred" :to="`${URL}/${data.category.slug}&${data.section.slug}`">
                                <span class="tag is-link">{{data.section.slug}}</span>
                            </nuxt-link>
                        </span>
                    </div>
                    <template >
                        <div class="column">
                            <span> <b>Username</b>:</span>  
                            <span class="cred">{{data.user.name}}</span>
                        </div>
                         <div class="column">
                            <span> <b>Phone Number</b>:</span>
                            <span class="cred"><a :href="'tel:'+data.user.phone">{{data.user.phone}}</a></span>
                        </div>
                    </template>
                </div>
                <hr />
                <template v-for="rater in data.rates">
                     <b>{{rater.user.name}}</b>
                     <no-ssr><star-rating  :read-only="true" :active-color="'gray'" :rating="rater.rate" :star-size="18" :rtl="rtl"></star-rating></no-ssr>
                     <p class="cgray"><pre v-if="rater.content">{{rater.content}}</pre></p>
                     <hr />
                </template>
<!--star ad-->  
                
                <template v-if="data.is_star">
                    <div class="column">
                        <span class="cgreen"><b>{{$t('words.featured')}}</b></span>
                    </div>
                </template> 
                
                <hr />
                <div class="columns is-mobile" v-if="$auth.loggedIn && $auth.user.id == data.user_id">
                    <div class="column is-3">
                        <button @click="deleteAd(data.id)" class="button is-danger ">{{$t('adPage.deleteBtn')}}</button>
                    </div>
                    <div class="column is-3">
                        <nuxt-link :to="`/ad/edit/${data.id}`" class="button is-success">{{$t('adPage.editBtn')}}</nuxt-link>
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
                images:[],
                index:null,
                showimg:''
            }
        },
        mounted(){
            for(var i of this.data.images){
                this.images.push(this.URL+i.img)
            }
        },
        async asyncData({params,app,error}){
            var id = params.ad;
            const data = await app.$axios.get(`/ad/${id}`).catch((err) => {
                return error({ statusCode: err.response.state, message: err.response.message });
            });
            return {data:data.data.ad,isFav:data.data.is_fav};
        },
        head(){
            return{
              title:`${this.data.title}`,
            }
        },
        methods:{
          changeImg(imgs,imageIndex) {
                var expandImg = document.getElementById("expandedImg");
                expandImg.src = imgs.target.src;
                this.showimg = imageIndex;
                expandImg.parentElement.style.display = "block";
          },
          deleteAd(id){
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
                            _this.router.go(-1);
                            _this.$toast.success('Deleted!')
                        }); 
                  }
                })
          },
        //   submitCoup(){
        //     var _this = this;
        //     this.coupon.ad_id = this.data.id;
        //     this.$axios.post('/submit-coupon',this.coupon)
        //     .then((res)=>{
        //         if(res.data.status){
        //             this.$swal({
        //               position: 'center',
        //               type: 'success',
        //               title: _this.$t('adPage.featuredAd',{day:res.data.for}),
        //               showConfirmButton: false,
        //               timer: 3000
        //             })
        //             this.enterCoupon = false;
        //             this.getAd();
        //         }
        //     })
        //     .catch(err=>{
        //         this.$swal({
        //           type: 'error',
        //           title: 'Oops...',
        //           text: 'Does not Exsist',
        //         })
        //     })
        //   },
        //   setRating(rating){
        //       this.rate.rate = rating;
        //   },
        //   sendRating(id){
        //       this.rate.ad_id = id;
        //       if(this.rate.rate != ''){
        //           this.$axios.post('/set-rating',this.rate).then(res=>{
        //               this.rate.content = '';
        //               this.getAd();
        //           })  
        //       }
        //   },
          fetchRates(rates){
            if(rates.length > 0){
              var storage = [];
              for(var v in rates){
                storage.push(rates[v].rate)
              }
              return this.avarig(storage,rates.length);
              
            }
          },
          getSum(total, num) {
              return total + num;
          },
          avarig(rates,length){
            return rates.reduce(this.getSum) / length;
          },
          ratingCurrentUser(){
              if(this.$auth.loggedIn){
                  if(this.$auth.user.rates.length > 0){
                      for(var rate of this.$auth.user.rates){
                          if(rate.ad_id == this.data.id){
                              return rate;
                          }
                      }
                  }
                  return {rate:0,content:''};
              }
          },
        //   addFav(id){
        //       if(this.$auth.loggedIn){
        //           this.inSending = true;
        //           this.$axios.post('/ad/fav',{id:id}).then(res=>{
        //               this.isFav = true;
        //               this.inSending = false
        //           }).catch(err=>{
        //               this.isFav = false;
        //               this.inSending = false
        //           })
        //       }
        //   },
        //   removeFav(id){
        //       if(this.$auth.loggedIn){
        //           this.inSending = true;
        //           this.$axios.post('/remove-fav',{id:id}).then(res=>{
        //               this.isFav = false;
        //               this.inSending = false
        //           }).catch(err=>{
        //               this.inSending = false
        //           })
        //       }
        //   }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Amiri|Cairo|Source+Sans+Pro');
    
    textarea{
        padding:10px;
        max-width:100%;
        width:90%;
        height:100px;
    }
    p.gray{
        font-family:'Cairo', tahoma;
    }
    pre{
        width:92%;
        font-size:16px;
        white-space: pre-line !important;
        overflow-wrap: break-word;
        height:auto;
        overflow:hidden;
    }
    h1.title{
        color:#5a939e;
        margin-bottom:10px;
        padding:15px;
        font-family: 'Source Sans Pro', sans-serif;
        text-align:center;
    }
    div.column,div.parent{
        margin:10px;
    }
    div.column header ul{
        padding:10px;
    }
    div.column header{
        margin-bottom:10px;
    }
    div.content{
        text-align:center;
        font-family: 'Cairo', sans-serif;
        padding:10px;
        font-size:14px;
    }
    span.price{
        height:100%;
        padding:21px;
        font-size:20px;
    }
    img.image{
        width:50%;
        margin:auto;
    }
 
.columnt {
    float: left;
    width: 25%;
    padding: 10px;
}

/* Style the images inside the grid */
.columnt img {
    opacity: 0.8; 
    cursor: pointer; 
}

.columnt img:hover {
    opacity: 1;
}

/* Clear floats after the columns */
.row:after {
    content: "";
    display: table;
    clear: both;
}

/* The expanding image container */
.containert {
    margin:auto;
    position: relative;
    display: none;
}

/* Expanding image text */
#imgtext {
    position: absolute;
    bottom: 15px;
    left: 15px;
    color: white;
    font-size: 20px;
}

/* Closable button inside the expanded image */
.closebtn {
    position: absolute;
    top: 10px;
    right: 15px;
    color: white;
    font-size: 35px;
    cursor: pointer;
}
</style>