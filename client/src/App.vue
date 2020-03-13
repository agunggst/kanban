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
        
        <div class="box login-box user-access" v-if="!isLogin && regis_login">
            <div class="box-title">
                <h4 class="login-title">Login</h4>
            </div>
            <form v-on:submit.prevent="login">
                <div class="textbox">
                    <input type="text" id="login-email" placeholder="Email Address" v-model="login_email">
                </div>
                <div class="textbox">
                    <input type="password" id="login-password" placeholder="Password" v-model="login_password">
                </div>
                <button id="login-submit" class="submit-btn">Sign In</button>
            </form>
            <div class="action-button">
                <span v-on:click="showRegister">Click Here to Register</span>
                <span>Click Here to Sign In with Google</span>
                <!-- <button id="login-submit" class="login-btn">Sign In</button> -->
            </div>
        </div>

        <div class="box register-box user-access" v-if="!isLogin && !regis_login">
            <div class="box-title">
                <h4 class="register-title">Register</h4>
            </div>
            <form v-on:submit.prevent="register">
                <div class="textbox">
                    <input type="text" id="register-name" placeholder="Name" v-model="register_name">
                </div>
                <div class="textbox">
                    <input type="text" id="register-email" placeholder="Email Address" v-model="register_email">
                </div>
                <div class="textbox">
                    <input type="password" id="register-password" placeholder="Password"
                        v-model="register_password">
                </div>
                <button id="register-submit" class="submit-btn">Sign Up</button>
            </form>
            <div class="action-button">
                <span v-on:click="showLogin">Click Here to Login</span>
                <span>Click Here to Sign In with Google</span>
                <!-- <button id="login-render" class="login-btn">Login</button> -->
                <!-- <button id="login-submit" class="login-btn">Sign In</button> -->
            </div>
        </div>

        <div class="user_info-container box" v-if="isLogin">
            <h4 class="user_name box-title" id="user_name"> Your Kanban! </h4>
        </div>
        
        <div class="flex-container box" v-if="isLogin">
            <div class="kanban-box backlog">
                <h5>Backlog</h5>
                <div class="backlog-content content">
                    <!-- Isi BackLog -->
                    <backlog v-bind:backlog_content="backlog_content" v-on:deleteTask="deleteTask($event)" v-on:editTask="editTask($event)"></backlog>
                </div>
            </div>
            <div class="kanban-box todo">
                <h5>Todo</h5>
                <div class="todo-content content">
                    <!-- Isi Todo -->
                    <todo v-bind:todo_content="todo_content" v-on:deleteTask="deleteTask($event)" v-on:editTask="editTask($event)"></todo>
                </div>
            </div>
            <div class="kanban-box done">
                <h5>Done</h5>
                <div class="done-content content">
                    <!-- Isi done -->
                    <done v-bind:done_content="done_content" v-on:deleteTask="deleteTask($event)" v-on:editTask="editTask($event)"></done>
                </div>
            </div>
            <div class="kanban-box completed">
                <h5>Completed</h5>
                <div class="completed-content content">
                    <!-- Isi completed -->
                    <completed v-bind:completed_content="completed_content" v-on:deleteTask="deleteTask($event)" v-on:editTask="editTask($event)"></completed>
                </div>
            </div>

        </div>

        <!-- Add Task Modal -->
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

export default {
    components: {
        backlog,
        todo,
        done,
        completed,
        addForm
    },
    data: function() {
        return {
            name: '',
            task: [],
            isLogin: (localStorage.getItem('access_token')?true:false),
            regis_login: true,
            addModal: false,
            login_email: '',
            login_password: '',
            register_name: '',
            register_email: '',
            register_password: '',
            addTask_title: '',
            addTask_desc: '',
            addTask_category: ''
            // showModal: false
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
                url: 'http://localhost:3000/tasks',
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
                this.task.push(newData)
            } )
            .catch( err => {
                this.errorHandler(err)
            } )
        },
        editTask: function(obj){
            console.log('masuk')
            for(let i=0; i<this.task.length; i++){
                if(this.task[i].id == obj.id){
                    this.task[i].title = obj.data.title
                    this.task[i].category = obj.data.category
                    this.task[i].description = obj.data.description
                }
            }
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
        deleteTask: function(id){
            let temp = []
            this.task.forEach(element => {
                if(element.id != id){
                    temp.push(element)
                }
            })
            this.task = temp
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
}
</script>