<template>
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey">Login</h3>
                    <p class="subtitle has-text-grey">Please login to access.</p>
                    <div class="box">
                        <form>
                            <div class="field">
                                <div class="control">
                                    <input v-model="login.email" class="input is-large" type="email" placeholder="Email" autofocus="">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input v-model="login.password" class="input is-large" type="password" placeholder="Password">
                                </div>
                            </div>
                         
                            <button @click.prevent="logIn()" class="button is-block is-info is-large is-fullwidth">Login</button>
                        </form>
                    </div>
                   
                </div>
            </div>
        </div>
</template>

<script>
    export default{
        data(){
            return{
                login:{
                    email:'',
                    password:''
                }
            }
        },
        methods:{
            async logIn(){
			      var data = await this.$auth.login({
			            data: this.login
			       }).then(()=>{
				       	this.$router.push({
				            path: '/'
				        });
				       	this.$toast.success('Logged In!')
			       })
			       
            }
        }
    }
</script>