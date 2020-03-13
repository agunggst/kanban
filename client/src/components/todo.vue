<template>
    <div>
        <div class="todo-list list" v-for="content in todo_content" v-bind:key="content.id">
            <div class="list-content" v-on:click="editTaskForm(content.id)">
                <p class="todo-list-title title">{{ content.title }}</p>
                <p>{{ content.description }}</p>
            </div>
            <div class="delete-btn">
                <i class="fa fa-trash" v-on:click="deleteTask(content.id)"></i>
            </div>
        </div>

        <!-- Edit Modal -->
        <transition name="bounce">
        <div class="editModal modal" v-if="editModal">
            <div class="modal-content">
                <div class="x" v-on:click="closeEditModal">+</div>

                <div class="box-title">
                    <h4 class="editModal-title">Edit Task</h4>
                </div>

                <form v-on:submit.prevent="editTask">
                    <div class="textbox">
                        <input type="text" id="editTask-title" placeholder="Title" v-model="editTask_title">
                    </div>
                    <div class="textbox">
                        <input type="text" id="editTask-desc" placeholder="Description" v-model="editTask_desc">
                    </div>
                    <div class="selectbox">
                        <label for="editTask-category">Category: </label>
                        <select id="editTask-category" v-model="editTask_category">
                            <option value="Backlog">Backlog</option>
                            <option value="Todo">Todo</option>
                            <option value="Done">Done</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <button id="editTask-submit" class="submit-btn">Edit</button>
                </form>
            </div>
        </div>
        </transition>

    </div>
</template>
<script>
import axios from 'axios'
export default {
    props:['todo_content'],
    data: function() {
        return {
            editModal: false,
            editTask_title: '',
            editTask_desc: '',
            editTask_category: '',
            editId: null
        }
    },
    methods: {
        deleteTask: function(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                console.log(id, 'id delete')
                if (result.value) {
                    axios({
                        method: 'delete',
                        url: `http://localhost:3000/tasks/${id}`,
                        headers: {
                            access_token: localStorage.getItem('access_token')
                        }
                    })
                    .then( result => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        this.$emit('deleteTask', id)
                    } )
                    .catch( err => {
                        console.log(err.response.data, 'error ')
                        this.$emit('errorHandler', err)
                    } )
                }
            })
        },
        editTaskForm: function(id) {
            console.log(id)
            axios({
                method: 'get',
                url: `http://localhost:3000/tasks/${id}`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then( result => {
                this.editTask_title = result.data.title,
                this.editTask_desc = result.data.description,
                this.editTask_category = result.data.category,
                this.editId = id
                this.editModal = true
            } )
            .catch( err => {
                console.log(err.response.data, 'error')
                this.$emit('errorHandler', err)
            } )
        },
        closeEditModal: function() {
            this.editModal = false
        },
        editTask: function() {
            let newData = {
                title: this.editTask_title,
                description: this.editTask_desc,
                category: this.editTask_category
            }
            axios({
                method: 'put',
                url: `http://localhost:3000/tasks/${this.editId}`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: newData
            })
            .then( result => {
                this.editModal = false
                this.$emit('editTask', {
                    id: this.editId,
                    data: newData
                })
            } )
            .catch( err => {
                console.log(err.response.data, 'error')
                this.$emit('errorHandler', err)
            } )
        }
    }
}
</script>