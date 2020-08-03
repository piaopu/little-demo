<template>
    <li>
        <input id="complete" type="checkbox" >
        <label for="complete">{{content}}</label>
        <button class="delete" v-on:click="handleDelte">删除</button>
    </li>

</template>

<script>
    export default {
// //  父子组件传值如此通信
// //  子组件通过props接收父组件传来的值

        props:['content','index'],

        methods:{
            handleDelte(){
                // console.log(this.index);
                //  子组件触发了事件出去,父组件那边需要监听并处理
                this.$emit('delete',this.index);
            },
            completeItem(){
                this.$emit('change',this.item,this.index);
            }
        }
    }
</script>

<style scoped>
    li {
        list-style-type: none;
        margin: 10px;
        display: flex;
        line-height: 30px;
        align-content: center;
        height: 30px;
    }
    .delete{
        width: 80px;
        height: 30px;
        color: red;
        background-color: transparent;
        border-radius: 5px;
        outline: none;
        position: absolute;
        margin-left: 236px;
    }
    #complete{
        height: 18px;
        width: 18px;
        vertical-align:middle;
        margin-top:5px;
    }
    input:checked+label{
        text-decoration: line-through;
    }
</style>