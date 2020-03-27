import Vue from 'vue'
import App from './App.vue'
const rootUrl = 'http://localhost:3000'
let socket = io.connect(rootUrl)

new Vue({
    el: '#app',
    render: createElement => createElement(App)
})