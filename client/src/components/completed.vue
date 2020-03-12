<template>
    <div>
        <div class="completed-list list" v-for="content in completed_content" v-bind:key="content.id">
            <div class="list-content">
                <p class="completed-list-title title">{{ content.title }}</p>
                <p>{{ content.description }}</p>
            </div>
            <div class="delete-btn">
                <i class="fa fa-trash" v-on:click="deleteTask(content.id)"></i>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props: ['completed_content'],
    data: function() {
        return {
            
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
                        console.log(err, 'error ')
                    } )
                }
            })
        }
    }
}
</script>