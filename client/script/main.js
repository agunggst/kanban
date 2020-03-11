var app = new Vue({
    el: '#app',
    data: {
        name: null,
        task: [],
        isLogin: (localStorage.getItem('access_token')?true:false),
        regis_login: true,
        login_email: null,
        login_password: null,
        register_name: null,
        register_email: null,
        register_password: null,
        showModal: false
    },
    methods: {
        showRegister: function() {
            this.regis_login = false
        },
        showLogin: function() {
            this.regis_login = true
        },
        errorHandler: function(error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `${error.response.data.message}`
            })
        },
        fillContent: function() {
            axios({
                method: 'get',
                url: 'http://localhost:3000/tasks',
                headers:{
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then( result => {
                this.task = result.data
            } )
            .catch( err => {
                this.errorHandler(err)
            } )
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
                this.isLogin = true
                this.login_email = null
                this.login_password = null
                localStorage.setItem('access_token', result.data.access_token)
                this.fillContent()
            } )
            .catch( err => {
                this.errorHandler(err)
            } )
        },
        logout: function() {
            localStorage.removeItem('access_token'),
            this.isLogin = false
        },
        register: function() {
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
                this.isLogin = true
                this.register_name = null
                this.register_email = null
                this.register_password = null
                localStorage.setItem('access_token', result.data.access_token)
                this.fillContent()
            } )
            .catch( err => {
                this.errorHandler(err)
            } )
        },
        fcshowModal: function() {
            this.showModal = !this.showModal
        }
    },
    computed: {
        backlog_content() {
            return this.task.filter( (data) => data.category == 'Backlog' )
        },
        todo_content() {
            return this.task.filter( (data) => data.category == 'Todo' )
        },
        done_content() {
            return this.task.filter( (data) => data.category == 'Done' )
        },
        completed_content() {
            return this.task.filter( (data) => data.category == 'Completed' )
        }
    },
    created: function() {
        if(localStorage.getItem('access_token')){
            this.fillContent()
        }
    }
})