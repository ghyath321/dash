<template>
	<div class="container-fluid p-2">
		<h4 class="text-center" v-if="mode=='create'">Add New Category</h4>
		<h4 class="text-center" v-else>Update Category</h4>
		
		<div class="row">

		    <div class="col">
		      <label for="inputCity">Name</label>
		      <input v-model="newsCats.category.name" type="text" class="form-control" id="inputCity">
		    </div>
		     <div class="col">
		       <label for="inputZip">New Row</label>
		       <button @click="addSection()" class="btn btn-success form-control"><i class="fa fa-plus"></i></button>
		    </div>

		</div>

		<div class="row w-100 float-right" v-for="section in newsCats.category.sections">
		    <div class="col-md-4">
		      <label for="inputCity">Section Name</label>
		      <input v-model="section.name" type="text" class="form-control" id="inputCity">
		    </div>
		</div>

		<div> <button v-if="mode=='create'" @click="submit()" class="btn m-4 btn-primary">Submit</button></div>
		<template v-if="mode=='update'">
			<button @click="submit()" class="btn m-4 btn-info">Update</button>
			<button @click="mode = 'create'" class="btn m-4 btn-primary float-right">New Category</button>
		</template>
		
		<hr/>

		<div class="container-fluid" v-if="categories.length > 0">
			  <div class="card" v-for="category in categories">
			    <div class="card-header">
			      <h5 class="has-text-centered" >
			      
			        <h6 class="has-text-centered is-6">
			          {{category.name}}
			        </h6>
			       	<span >
			        	<i @click="confirm(category.id)" class="color-danger fa fa-trash"></i>
			        	<i @click="fetch(category)" class="color-success fa fa-edit"></i>
			    	</span>
			      </h5>
			    </div>

			    <div>
			      	<div class="card-body" style="padding-top:5px">
						 <span style="margin:5px" v-for="section in category.sections" class="badge badge-success">{{(section.name!='')?section.name:''}}</span>
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
					category:{sections:[{name:''}]}					
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
				this.newsCats.category = {sections:[{name:''}]};
			},
			fetch(category){
				this.mode = 'update';
				this.newsCats.category = category;
				window.scrollTo(0,0);
			},
			addSection(){
				this.newsCats.category.sections.splice(this.newsCats.category.sections.length-1, 0,{name:''});
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
		    return {categories:res.data};
		}
	}
</script>
