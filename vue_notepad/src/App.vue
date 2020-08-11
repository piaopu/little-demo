<template>
  <div id="vue-meomo">
      <nav class="navbar">
        <div class="navbar-container">
            <div class="navbar-name">
                vue-memo
            </div>
            <div class="navbar-menu">
                <ul class="menu-ul">
                    <li class="menu-li" @click="createMemo">
                        <a>新建</a>
                    </li>
                    <li class="menu-li">
                        <a>笔记分类
                            <span class="count">{{ memosFiltered.length }}</span>
                        </a>
                        <ul class="menu-ul-ul">
                            <li class="menu-li-li">
                                <a>工作</a>
                                <span class="count li-c">{{ memosInWorkCate.length }}</span>
                            </li>
                            <li class="menu-li-li">
                                <a>生活</a>
                                <span class="count li-c">{{ memosInLivingCate.length }}</span>
                            </li>
                            <li class="menu-li-li">
                                <a>学习</a>
                                <span class="count li-c">{{ memosInStudyCate.length }}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
                <input type="text" placeholder="查询">
            </div>
        </div>
    </nav>
      <div class="memos">
          <div id="meomolist">
             <memo-item v-for=" memo in memosFiltered" :key="memo.id" :memo="memo"></memo-item>
          </div>
      </div>

<!--        编辑器-->
      <memo-editor id="new-layer" v-show="isShow" ></memo-editor>

  </div>
</template>

<script>
import memoItem from "@/components/memoItem";
import storeUtil from "@/storage/memolist";
import memoEditor from "@/components/memoEditor";

let store = storeUtil.memostore;

export default {
    data() {
      return {
          isShow:false,
          memosFiltered: store.memos,
      };
  },
    components: {
      memoEditor,
      memoItem
  },
    computed:{
        memosInWorkCate(){
            return this.memosFiltered.filter((itme) => {
                return itme.categoryId == 1;
            })
        },
        memosInLivingCate(){
            return this.memosFiltered.filter((itme) => {
                return itme.categoryId == 2;
            })
        },
        memosInStudyCate(){
            return this.memosFiltered.filter((itme) => {
                return itme.categoryId == 3;
            })
        }
    },
    methods:{
        createMemo(){
            this.isShow = !this.isShow;
            window.scrollTo(0,0);
            document.body.style.overflow='hidden';
            let newMemo = document.getElementById('new-layer');
            newMemo.childNodes[0].style.display = 'block';
            newMemo.childNodes[1].style.display = 'none';
        }
    }
}
</script>

<style>
@import "style/main.css";
</style>
