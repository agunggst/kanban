<template>
    <div>
        <header>
            <h4>K4NBAN</h4>
                <nav>
                    <ul class="nav_link">
                        <li><button class="button-li" id="login-btn" v-if="!isLogin"
                                v-on:click="showLogin">Login</button></li>
                        <li><button class="button-li" id="register-btn" v-if="!isLogin"
                                v-on:click="showRegister">Register</button></li>
                        <li><button class="button-li" id="logout-btn" v-if="isLogin" v-on:click="logout">Logout</button>
                        </li>
                    </ul>
                </nav>
        </header>
        
        <regislogin v-bind:isLogin="isLogin" v-bind:regis_login="regis_login" v-on:fillContent="login" v-on:errorHandler="errorHandler($event)"></regislogin>

        <div class="user_info-container box" v-if="isLogin">
            <h4 class="user_name box-title" id="user_name"> Your Kanban! </h4>
        </div>
        
        <div class="flex-container box" v-if="isLogin">
            <div class="kanban-box backlog">
                <h5>Backlog</h5>
                <div class="backlog-content content">
                    <!-- Isi BackLog -->
                    <backlog v-bind:backlog_content="backlog_content" v-on:deleteTask="deleteTask($event)" v-on:editTask="editTask($event)" v-on:errorHandler="errorHandler($event)"></backlog>
                </div>
            </div>
            <div class="kanban-box todo">
                <h5>Todo</h5>
                <div class="todo-content content">
                    <!-- Isi Todo -->
                    <todo v-bind:todo_content="todo_content" v-on:deleteTask="deleteTask($event)" v-on:editTask="editTask($event)" v-on:errorHandler="errorHandler($event)"></todo>
                </div>
            </div>
            <div class="kanban-box done">
                <h5>Done</h5>
                <div class="done-content content">
                    <!-- Isi done -->
                    <done v-bind:done_content="done_content" v-on:deleteTask="deleteTask($event)" v-on:editTask="editTask($event)" v-on:errorHandler="errorHandler($event)"></done>
                </div>
            </div>
            <div class="kanban-box completed">
                <h5>Completed</h5>
                <div class="completed-content content">
                    <!-- Isi completed -->
                    <completed v-bind:completed_content="completed_content" v-on:deleteTask="deleteTask($event)" v-on:editTask="editTask($event)" v-on:errorHandler="errorHandler($event)"></completed>
                </div>
            </div>

        </div>

        <!-- Add Task Modal -->
        
        <transition name="bounce">
        <div class="addModal modal" v-if="addModal">
            <div class="modal-content">
                <div class="x" v-on:click="closeAddModal">+</div>

                <div class="box-title">
                    <h4 class="addTask-title">Add Task</h4>
                </div>

                <form v-on:submit.prevent="addTask">
                    <div class="textbox">
                        <input type="text" id="addTask-title" placeholder="Title" v-model="addTask_title">
                    </div>
                    <div class="textbox">
                        <input type="text" id="addTask-desc" placeholder="Description" v-model="addTask_desc">
                    </div>
                    <div class="selectbox">
                        <label for="addTask-category">Category: </label>
                        <select id="addTask-category" v-model="addTask_category">
                            <option value="Backlog">Backlog</option>
                            <option value="Todo">Todo</option>
                            <option value="Done">Done</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <button id="addTask-submit" class="submit-btn">Add</button>
                </form>
            </div>
        </div>
        </transition>

        <addForm v-bind:isLogin="isLogin" v-on:showAddTaskModal="showAddTaskModal"></addForm>
    </div>
</template>
<script>
import axios from 'axios'
import backlog from './components/backlog'
import todo from './components/todo'
import done from './components/done'
import completed from './components/completed'
import addForm from './components/addTaskForm'
import regislogin from './components/regis_login'
const rootUrl = 'http://localhost:3000'
let socket = io.connect(rootUrl)

export default {
    components: {
        backlog,
        todo,
        done,
        completed,
        addForm,
        regislogin
    },
    data: function() {
        return {
            name: '',
            task: [],
            isLogin: (localStorage.getItem('access_token')?true:false),
            regis_login: true,
            addModal: false,
            addTask_title: '',
            addTask_desc: '',
            addTask_category: ''
        }
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
                text: `${(Array.isArray(error.response.data.message))?error.response.data.message.join(' And '):error.response.data.message}`
            })
        },
        showAddTaskModal: function() {
            this.addModal = true
        },
        closeAddModal: function() {
            this.addModal = false
        },
        addTask: function() {
            let newData = {
                title: this.addTask_title,
                description: this.addTask_desc,
                category: this.addTask_category
            }
            axios({
                method: 'post',
                url: `${rootUrl}/tasks`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: newData
            })
            .then( result => {
                this.addTask_title = ''
                this.addTask_desc = ''
                this.addTask_category = ''
                this.addModal = false
                this.task.push(result.data.data)
                socket.emit('shoot', this.task)
            } )
            .catch( err => {
                this.errorHandler(err)
            } )
        },
        editTask: function(obj){
            for(let i=0; i<this.task.length; i++){
                if(this.task[i].id == obj.id){
                    this.task[i].title = obj.data.title
                    this.task[i].category = obj.data.category
                    this.task[i].description = obj.data.description
                }
            }
            socket.emit('shoot', this.task)
        },
        fillContent: function() {
            axios({
                method: 'get',
                url: `${rootUrl}/tasks`,
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
        login: function(){
            this.isLogin = true
            this.fillContent()
        },
        logout: function() {
            localStorage.removeItem('access_token'),
            this.isLogin = false
        },
        deleteTask: function(id){
            let temp = []
            this.task.forEach(element => {
                if(element.id != id){
                    temp.push(element)
                }
            })
            this.task = temp
            socket.emit('shoot', this.task)
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
    },
    mounted: function() {
        socket.on('shootBack', (data) => {
            this.fillContent()
        })
    }
}
</script>