localStorage.setItem('access_token', 'abcd')
var app = new Vue({
    el: '#app',
    data: {
        name: 'John Doe',
        task: [
            {
                title: 'Membuat Todo Backlog',
                category: 'Backlog',
                description: 'Mebuat SPA TodoApp buat tugas portfolio minggu 1 Backlog'
            },
            {
                title: 'Membuat Todo Todo',
                category: 'Todo',
                description: 'Mebuat SPA TodoApp buat tugas portfolio minggu 1 Todo'
            },
            {
                title: 'Membuat Todo Done',
                category: 'Done',
                description: 'Mebuat SPA TodoApp buat tugas portfolio minggu 1 Done'
            },
            {
                title: 'Membuat Todo Completed',
                category: 'Completed',
                description: 'Mebuat SPA TodoApp buat tugas portfolio minggu 1 Completed'
            },
            {
                title: 'Membuat Todo Backlog',
                category: 'Backlog',
                description: 'Mebuat SPA TodoApp buat tugas portfolio minggu 1 Backlog'
            },
            {
                title: 'Membuat Todo Done',
                category: 'Done',
                description: 'Mebuat SPA TodoApp buat tugas portfolio minggu 1 Done'
            }
        ],
        isLogin: (localStorage.getItem('access_token')?true:false),
        regis_login: true
    },
    methods: {
        showRegister: function() {
            console.log(this.isLogin)
            this.regis_login = false
        },
        showLogin: function() {
            this.regis_login = true
        },
        logout: function() {
            localStorage.removeItem('access_token'),
            this.isLogin = false
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
    }
})