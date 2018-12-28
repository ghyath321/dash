<template>
    <div class="parent">
        <h1 class="text-center is-size-4">{{data.title}}</h1>
        <div class="columns">
            <div class="column is-8 is-paddingless">
                <header class="bw">
                    <ul>
                        <li>
                            <span class="no-radius tag is-dark">
                               <i class="fas fa-map-marker-alt"></i>&nbsp
                               <b class="badge badge-success">{{data.city.slug}}</b>&nbsp
                               <span class="no-radius tag is-primary" v-if="data.village">
                                   <b>
                                       <span class="badge badge-info">{{data.village.slug}}</span>
                                   </b>
                                </span>
                            </span>
                        </li> 
                        <li>
                             <no-ssr><span class="time cgray"><i class="far fa-clock"></i> {{data.created_at | formatDate}}</span></no-ssr>
                        </li>
                    </ul>
                    <div class="is-clearfix"></div>
                </header>
                <no-ssr>
                    <div style="margin-bottom:10px">
                            <div class="row">
                             <div class="row item-img" v-for="(image, imageIndex) in data.images">
                              <div @click="index = imageIndex" class="columnt">
                                <img class="image" @click="index = imageIndex" :src="URL+image.img" :alt="data.title">
                              </div>
                            </div>
                            </div>
                            <div class="containert text-center">
                              <img id="expandedImg">
                            </div>
                    </div>
                    <div class="content bg-white">
                        <pre>{{data.description}}</pre>
                    </div>
                </no-ssr>
            </div>
            <div class="column bw is-4">
                
                <div class="information">
                 
                    <div class="column">
                        <span> <b>Category</b>:</span>  
                        <span class="cred">
                            <nuxt-link class="cred" :to="`${URL}/${data.category.slug}`">
                                <span class="badge badge-info">{{data.category.slug}}</span> 
                            </nuxt-link>
                            <nuxt-link v-if="data.section" class="cred" :to="`${URL}/${data.category.slug}&${data.section.slug}`">
                                <span class="badge badge-primary">{{data.section.slug}}</span>
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
                
                <template v-if="data.is_star">
                    <div class="column">
                        <span class="cgreen"><b>Featured</b></span>
                    </div>
                </template> 
                
                <hr />
                <div class="columns is-mobile">
                    <button @click="deleteAd(data.id)" class="btn btn-danger ">Delete</button>
                    <span @click="accept(data.id)" v-if="!data.is_accepted" class="btn btn-success">Accept</span>
                    <span @click="activation(data.id)" v-if="!data.active" class="btn btn-info">Active</span>
                    <span @click="activation(data.id)" v-if="data.active && data.is_accepted" class="btn btn-warning">Disabled</span>
                    <!--<div class="column is-3">-->
                    <!--    <nuxt-link :to="`/ad/edit/${data.id}`" class="button is-success">{{$t('adPage.editBtn')}}</nuxt-link>-->
                    <!--</div>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
          return{
              images:[]
          }  
        },
        watchQuery:['update'],
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
          routing(data = null){
             this.$router.push(
                    {
                        path:'',
                        query:{
                            update:(data.update)?data.update:undefined,
                        }
                        
                    }
                );
          },
          changeImg(imgs) {
                var expandImg = document.getElementById("expandedImg");
                expandImg.src = imgs.target.src;
                expandImg.parentElement.style.display = "block";
          },
          activation(id){
                this.$axios.post('/ad/activation',{id:id}).then(res=>{
                   this.routing({update:`${id}-update-${res.data.status}`});
                })
          },
          accept(id){
                this.$axios.post('/ad/accept',{id:id}).then(res=>{
                   this.routing({update:`${id}-accept`});
                })
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
                            _this.$router.go(-1);
                        }); 
                  }
                })
          }
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
        width:auto !important;
        max-width:inherit !important;
        margin:auto;
        height:auto !important;
        max-height:inherit !important;
    }
    .row.item-img{
      border:5px solid #eee;
      float: left;
      margin:10px;
      width: 25%;
      height: 150px;
      overflow: hidden;
    }
    
    .columnt{
        width: 100%;
        height: 150px;
        position:relative;
    }
    .columnt img {
        cursor: pointer; 
        opacity: 1;
        position:absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
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