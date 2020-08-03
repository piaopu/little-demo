<template>
    <div>
        <div id="head">ToDoList</div>
        <div class="submit">
            添加任务
            <input type="text" v-model="inputValue">
            <button class="add" v-on:click="handleSubmit">提交</button>
        </div>
        <div id="list">
            <ul >
                <todo-item v-for="(item,index) of list"
                           :index="index" :key="index" :content="item.title"
                           @delete="handleDelete">

                </todo-item>
            </ul>
        </div>

    </div>
</template>

<script>
    // //导入componets下的组件todoItem.vue
    import todoItem from "@/components/todoItem";
    // //局部组件的注册和声明,之后在本页面使用局部组件todo-item
    export default {
        components:{
            'todo-item':todoItem,
        },
        data(){

            return {
                list:[
                    {
                        id: 0,
                        title: 'Do the dishes'
                    },
                    {
                        id: 1,
                        title: 'Take out the trash'
                    },
                    {
                        id: 2,
                        title: 'Mow the lawn'
                    }
                ],
                nextid:3,
                inputValue:""
            }
        },
        methods:{
            handleSubmit(){
                if(this.inputValue)
                {
                    this.list.push(
                        {
                            id:this.nextid++,
                            title:this.inputValue,
                        }
                    )
                }
                this.inputValue=''
            },
            // //点击ul下的li,删除对应的项,通过index标识
            handleDelete(index){
                // console.log(index);
                this.list.splice(index,1)
            },

        }
    }
</script>

<style scoped>
    #head{
        background: #696969;
        font-size: larger;
        font-weight: bold;
        text-align: center;
        color:white;
        line-height: 50px;
    }
    .submit{
        line-height: 100px;
        text-align: center;
        font-size: 20px;
    }
    ul {
        margin: 0 auto;
        border: 1px solid gray;
        border-radius: 10px;
        width: 320px;
        padding: 20px;
    }
    .add{
        width: 80px;
        height: 30px;
        color: red;
        background-color: transparent;
        border-radius: 5px;
        margin-left: 20px;
        outline: none;
    }
    input{
        height: 22px;
    }
</style>