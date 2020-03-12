<template>
    <div>
        <i class="fa fa-plus-circle add-btn" style="font-size: 50px;" v-if="isLogin" v-on:click="addTaskForm"></i>
    </div>
</template>
<script>
export default {
    props: ['isLogin'],
    data: function() {
        return {

        }
    },
    methods: {
        addTaskForm: function() {
            this.$emit('showAddTaskModal')
        }
    }
}
</script>