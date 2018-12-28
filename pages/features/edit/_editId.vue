<template>
    <div class="container">
        <div class="col-8">
            <div class="field">
              <label >Name</label>
              <div class="control">
                <input v-model="feature.name" class="form-control" placeholder="Business name" type="text">
              </div>
            </div>
        </div>
         <div class="col-8 is-center">
            <div class="card">
              <label >Logo</label>
                <div class="card-body">
                  <label class="col-12">
                    <input class="hide" @change="setImg($event)" type="file">
                    <img class="is-rounded" style="max-height:40%;max-width:40%" v-if="logo != ''" :src="URL+logo" id="logo">
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label">
                        Choose a file…
                      </span>
                    </span>
                    <span class="file-name">
                      {{logoName}}
                    </span>
                  </label>
                </div>
            </div>
        </div>
        
            <div class="col-8">
                 <div class="field">
                  <label >Phone Number</label>
                  <div class="control">
                    <input v-model="feature.phone" class="form-control" type="text" placeholder="Phone Number">
                  </div>
                </div>
            </div>
            <div class="col-8">
                 <div class="field">
                  <label >Email Address</label>
                  <div class="control">
                    <input v-model="feature.email" class="form-control" type="text" placeholder="Email Address">
                  </div>
                </div>
            </div>
           <div class="col-8">
                 <div class="field">
                  <label >Address</label>
                  <div class="control">
                    <input v-model="feature.address" class="form-control" type="text" placeholder="Address">
                  </div>
                </div>
            </div>
        
         <div class="col-8">
            <div class="field">
              <label >Description</label>
              <div class="control">
                <textarea placeholder="Description" v-model="feature.description" class="form-control"></textarea>
              </div>
            </div>
        </div><br />
        
         <div class="col-8">
            <div class="field">
              <div class="control">
                <a @click="update()" class="btn btn-info" style="color:white">Update</a>
              </div>
            </div>
        </div>
        
    </div>
</template>
<script>
    export default{
        middleware:'auth',
        data(){
            return{
                feature:{
                    name:'',
                    description:'',
                    phone:'',
                    address:''
                },
                logo:'',
                logoName:''
            }
        },
        async asyncData({app,params}){
            var res = await app.$axios.get('/feature/show/'+params.editId);
            return {feature:res.data.feature,logo:res.data.feature.logo};
        },
        methods:{
            update(){
                var formData = new FormData();
                formData.append('logo',this.logo);
                formData.append('feature',JSON.stringify(this.feature));
                this.$axios.post('/feature/edit',formData).then(res=>{
                    this.$router.push({path:'/features'})
                });  
            },
            setImg(e){
           	 var e = e.target.files[0];
       		 if (e) {
       		 	var _size = (e.size / 1048576);
       		 	if(_size <= 5 && e.type.match('image.*')){
					this.logo = e;
					this.logoName = e.name
		            var reader = new FileReader();
		            reader.onload = function (e) {
		            	$('#logo').attr('src',e.target.result);
		            }
		            reader.readAsDataURL(e);
       		 	}
	          }
           }
        }
    }
</script>

<style>
    label.is-centered{
        margin:auto;
    }
    textarea{
        min-height:300px;
        min-width:300px;
    }
</style>