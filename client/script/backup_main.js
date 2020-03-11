localStorage.setItem('access_token', 'abcd')
var app = new Vue({
    el: '#app',
    data: {
        login_box: (localStorage.getItem('access_token')?false:true),
        no_token: (localStorage.getItem('access_token')?false:true),
        register_box: false,
        user_info_box: (localStorage.getItem('access_token')?true:false),
        kanban_box: (localStorage.getItem('access_token')?true:false),
        yes_token: (localStorage.getItem('access_token')?true:false),
        isLogin: (localStorage.getItem('access_token')?false:true)
    },
    methods: {
        showRegister: function() {
            this.user_info_box = false
            this.kanban_box = false
            this.login_box = false
            this.register_box = true
        },
        showLogin: function() {
            this.user_info_box = false
            this.kanban_box = false
            this.register_box = false
            this.login_box = true
        },
        logout: function() {
            localStorage.removeItem('access_token')
            this.no_token = true
            this.yes_token = false
            this.user_info_box = false
            this.kanban_box = false
            this.register_box = false
            this.login_box = true
        }
    }
})