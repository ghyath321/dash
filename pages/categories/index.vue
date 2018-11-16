<template>
	<div class="container is-fluid pt-1">
		<h4 class="has-text-centered" v-if="mode=='create'">Add New Category</h4>
		<h4 class="has-text-centered" v-else>Update Category</h4>
		<div class="columns">

		    <div class="column">
		      <label for="inputCity">Name</label>
		      <input v-model="newsCats.category.name" type="text" class="input" id="inputCity">
		    </div>
		    <div class="column">
		      <label for="inputZip">Icon</label>
		      <input v-model="newsCats.category.icon" type="text" class="input" id="inputZip">
		    </div>
		     <div class="column">
		       <label class="is-block" for="inputZip">New Row</label>
		       <button @click="addSection()" class="button is-success"><i class="fa fa-plus"></i></button>
		    </div>

		</div>

		<div class="columns w-100 float-right" v-for="section in newsCats.category.sections">
		    <div class="column col-md-4">
		      <label for="inputCity">Section Name</label>
		      <input v-model="section.name" type="text" class="input" id="inputCity">
		    </div>
		    <div class="column col-md-4">
		      <label for="inputZip">Icon</label>
		      <input v-model="section.icon" type="text" class="input" id="inputZip">
		    </div>
		</div>

		<button v-if="mode=='create'" @click="submit()" class="button is-primary">Submit</button>
		<template v-if="mode=='update'">
			<button @click="submit()" class="button is-info">Update</button>
			<button @click="mode = 'create'" class="button is-primary float-right">New Category</button>
		</template>
		
		<hr/>

		<div id="accordion" class="container is-fluid" v-if="categories.length > 0">
			  <div :id="'heading'+category.id" class="card is-pulled-left is-desktop-3 column is-tablet-4" v-for="category in categories">
			    <div class="card-header" data-toggle="collapse" :data-target="'#collapse'+category.id" aria-expanded="true" :aria-controls="'collapse'+category.id">
			      <h5 class="has-text-centered" >
			      
			        <h6 class="has-text-centered is-6">
			          {{category.name}}
			        </h6>
			       	<span >
			        	<i @click="confirm(category.id)" class="has-text-danger fa fa-trash"></i>
			        	<i @click="fetch(category)" class="has-text-success fa fa-edit"></i>
			    	</span>
			      </h5>
			    </div>

			    <div :id="'collapse'+category.id" class="collapse" :aria-labelledby="'heading'+category.id" data-parent="#accordion">
			      	<div class="card-body" style="padding-top:5px">
						 <span style="margin:5px" v-for="section in category.sections" class="tag is-info">{{(section.name!='')?section.name:''}}</span>
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
				mode:'create',
				newsCats:{
					category:{sections:[{name:'',icon:''}]}					
				}
			}
		},
		watch:{
			mode:function(val){
				if(val == 'create'){
					this.reset();
				}
			}
		},
		methods:{
			reset(){
				this.newsCats.category = {sections:[{name:'',icon:''}]};
			},
			fetch(category){
				this.mode = 'update';
				this.newsCats.category = category;
			},
			addSection(){
				this.newsCats.category.sections.splice(this.newsCats.category.sections.length-1, 0,{name:'',icon:''});
			},
			submit(){
				this.$axios.post('/category/add',{mode:this.mode,cats:this.newsCats}).then(res=>{
					this.reset();
					this.mode = 'create';
				})
			},
			delete(id){
				if(this.newsCats.category.id == id){
					this.mode = 'create';
					this.reset();
				}
				this.$axios.post('/category/delete',{id:id}).then((res)=>{
					this.categories = this.categories.filter( category => category.id != id );
				})
			},
			confirm(id){
				var conf = confirm('Are You Sure You Want delete it.');
				if(conf){
                  this.delete(id);
				}
			},
		},
		async asyncData({app}){
		    var res = await app.$axios.get('/category/get-all');
		    console.log(res.data);
		    return {categories:res.data};
		}
	}
</script>
