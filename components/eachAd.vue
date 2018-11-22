<template>
        <div class="card column">
            <header class="card-header">
              <p class="card-header-title">
                {{ad.user.name}} {{ ad.id }}
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
                <br>
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
            <footer class="card-footer">
              <a @click="accept(ad.id)" v-if="!ad.is_accepted" class="card-footer-item">Accept</a>
              <a @click="deleteAd(ad.id)" class="card-footer-item">Delete</a>
            </footer>
        </div>
</template>

<script>
    export default{
        props:['ad'],
        
        methods:{
           async accept(id){
              var res = await this.$axios.post('/ad/accept',{id:id});
              console.log(res.data);
           },
           async deleteAd(id){
             var res = await this.$axios.post('/ad/delete',{id:id});
             console.log(res)
           }
        }
    }
</script>

<style scoped>
 @import url('https://fonts.googleapis.com/css?family=Amiri|Cairo|Source+Sans+Pro');
hr{margin:0}
.card-footer{
  padding-bottom:0;
}
.star-ad{
    width: 30%;
    margin: auto;
    text-align: center;
    padding: 20px;
}
header{
  border-top:2px gray solid;
  overflow:hidden;
}
.card-header-title{
  flex-grow: 0;
  padding:5px !important;
}
a.first.card-footer-item{
  height:46px;
  margin-top:10px;
}
img{
  max-height:100px;
  margin:auto;
}
pre.pre{
    white-space: pre-wrap;
    height:40px;
    padding:10px;
    font-size:15px;
    font-family:'Cairo', tahoma;
    overflow:hidden;
    box-sizing:content-box;
    text-overflow: ellipsis;
}
strong{
    padding: 0 10px;
}
.time{
  color:gray;
  font-size:10px;
}
.user-pic{
    width:50px;
    height:50px;
    display:block;
}
.user-pic img{
    border-radius:50%;
    width:100%;
    height:100%;
}
div.padding{
  padding:0.75rem;
  padding-top:0;
}
.card{
    padding:0;
    overflow:hidden;
}

.price{
  padding: 15px 40px 15px 20px;
  color:#32a2ec;
  position:relative;
}

.title-each{
     padding: 5px 1px 5px 1px;
}
div.content{
  /*height:300px;*/
  max-height:300px;
}
div.star_ad:hover{
  background:transparent !important;
}
div.star_ad{
  color:#23d160 !important;
  font-weight:bold;  
}
</style>