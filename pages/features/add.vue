<template>
    <div class="columns is-multiline is-centered">
        <div class="column is-8">
            <div class="field">
              <label >Name</label>
              <div class="control">
                <input v-model="feature.name" class="input is-primary" type="text" placeholder="Primary input">
              </div>
            </div>
        </div>
        
         <div class="column is-5 has-text-centered">
            <div class="field">
              <label >Logo</label>
              <div class="control has-text-centered">
                <div class="file has-name is-boxed">
                  <label class="file-label is-centered">
                    <input class="file-input" @change="setImg($event)" type="file">
                    <img class="is-rounded" width="100%" v-if="logo != ''" id="logo">
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
        </div>
        
        <div class="column columns is-8">
            <div class="column">
                 <div class="field">
                  <label >Phone Number</label>
                  <div class="control">
                    <input v-model="feature.phone" class="input is-primary" type="text" placeholder="Primary input">
                  </div>
                </div>
            </div>
           <div class="column">
                 <div class="field">
                  <label >Address</label>
                  <div class="control">
                    <input v-model="feature.address" class="input is-primary" type="text" placeholder="Primary input">
                  </div>
                </div>
            </div>
        </div>
        
         <div class="column is-8">
            <div class="field">
              <label >Description</label>
              <div class="control">
                <textarea v-model="feature.description" class="input is-primary"></textarea>
              </div>
            </div>
        </div>
        
         <div class="column is-8">
            <div class="field">
              <div class="control">
                <a @click="create()" class="button is-info">Create</a>
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
        methods:{
            create(){
                var formData = new FormData();
                formData.append('logo',this.logo);
                formData.append('feature',JSON.stringify(this.feature));
                this.$axios.post('/feature/add',formData).then(res=>{
                    console.log(res);
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