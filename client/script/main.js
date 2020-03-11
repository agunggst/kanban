// localStorage.setItem('access_token', 'abcd')
var app = new Vue({
    el: '#app',
    data: {
        login_box: (localStorage.getItem('access_token')?false:true),
        no_token: (localStorage.getItem('access_token')?false:true),
        register_box: false,
        user_info_box: (localStorage.getItem('access_token')?true:false),
        kanban_box: (localStorage.getItem('access_token')?true:false),
        yes_token: (localStorage.getItem('access_token')?true:false),
        message: 'aaaaaaa'
    },
    methods: {
        showRegister: () => {
            this.app.login_box = false
            this.app.register_box = true
        },
        showLogin:() => {
            this.app.register_box = false
            this.app.login_box = true
        }
    }
})