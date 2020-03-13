<template>
    <div>

        <!-- Login -->
        <div class="box login-box user-access" v-if="!isLogin && regis_login">
            <div class="box-title">
                <h4 class="login-title">Login</h4>
            </div>
            <form v-on:submit.prevent="login">
                <div class="textbox">
                    <input type="email" id="login-email" placeholder="Email Address" v-model="login_email">
                </div>
                <div class="textbox">
                    <input type="password" id="login-password" placeholder="Password" v-model="login_password">
                </div>
                <button id="login-submit" class="submit-btn">Sign In</button>
            </form>
            <div class="action-button">
                <span v-on:click="showRegister">Click Here to Register</span>
                <span v-google-signin-button="clientId" class="google-signin-button">Click Here to Sign In with Google</span>
            </div>
        </div>

        <!-- Register -->
        <div class="box register-box user-access" v-if="!isLogin && !regis_login">
            <div class="box-title">
                <h4 class="register-title">Register</h4>
            </div>
            <form v-on:submit.prevent="register">
                <div class="textbox">
                    <input type="text" id="register-name" placeholder="Name" v-model="register_name">
                </div>
                <div class="textbox">
                    <input type="email" id="register-email" placeholder="Email Address" v-model="register_email">
                </div>
                <div class="textbox">
                    <input type="password" id="register-password" placeholder="Password"
                        v-model="register_password">
                </div>
                <div class="textbox">
                    <input type="password" id="register-password" placeholder="Confirm Password"
                        v-model="register_password_confirm">
                </div>
                <button id="register-submit" class="submit-btn">Sign Up</button>
            </form>
            <div class="action-button">
                <span v-on:click="showLogin">Click Here to Login</span>
                <span v-google-signin-button="clientId" class="google-signin-button">Click Here to Sign In with Google</span>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios'
import GoogleSignInButton from 'vue-google-signin-button-directive'

export default {
    props: ['isLogin', 'regis_login'],
    directives: {
        GoogleSignInButton
    },
    data: function() {
        return {
            login_email: '',
            login_password: '',
            register_name: '',
            register_email: '',
            register_password: '',
            register_password_confirm: '',
            clientId: `1036611868844-eeg4u6apapgg0uf5kigabq4f5k37tv91.apps.googleusercontent.com`
        }
    },
    methods: {
        showRegister: function() {
            this.regis_login = false
        },
        showLogin: function() {
            this.regis_login = true
        },
        login: function() {
            axios({
                method: 'post',
                url: 'http://localhost:3000/users/login',
                data: {
                    email: this.login_email,
                    password: this.login_password
                }
            })
            .then( result => {
                this.login_email = ''
                this.login_password = ''
                localStorage.setItem('access_token', result.data.access_token)
                this.$emit('fillContent')
            } )
            .catch( err => {
                this.$emit('errorHandler', err)
            } )
        },
        register: function() {
            if(this.register_password == this.register_password_confirm){
                axios({
                    method: 'post',
                    url: 'http://localhost:3000/users/register',
                    data: {
                        name: this.register_name,
                        email: this.register_email,
                        password: this.register_password
                    }
                })
                .then( result => {
                    this.register_name = ''
                    this.register_email = ''
                    this.register_password = ''
                    this.register_password_confirm = ''
                    localStorage.setItem('access_token', result.data.access_token)
                    this.$emit('fillContent')
                } )
                .catch( err => {
                    this.$emit('errorHandler', err)
                } )
            }else{
                let error = {
                    response: {
                        data: {
                            message: 'Password Does\'nt Match'
                        }
                    }
                }
                this.$emit('errorHandler', error)
            }
        },
        OnGoogleAuthSuccess: function(idToken) {
            axios({
                method: 'post',
                url: 'http://localhost:3000/users/googleLogin',
                data: {
                    token: idToken
                }
            })
            .then( result => {
                localStorage.setItem('access_token', result.data.access_token)
                this.$emit('fillContent')
            } )
            .catch( err => {
                this.$emit('errorHandler', err)
            } )
        },
        OnGoogleAuthFail: function(error) {
            this.$emit('errorHandler', error)
        }
    }
}
</script>