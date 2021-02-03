<template>
  <div class="col-md-9">
    <div class="data-div">
      <ul class="data-list">
        <li v-for="(item, index) in blogs" :key="index">
          <p class="title-p"><router-link :to="{name: 'ShowBlog', params: {id: item.id}}">{{item.title}}</router-link></p>
          <p class="content">
            <router-link :to="{name: 'ShowBlog', params: {id: item.id}}">{{item.summary.substring(0, 100)}}...</router-link>
          </p>
          <p class="info">发表于 {{item.add_time}} 阅读({{item.click_hit}}) </p>
        </li>
      </ul>
    </div>
    <div class="page">
      <pagenation :pagenation="pagenation" @pageChange="pageNumChange"></pagenation>
    </div>
  </div>
</template>

<script>
  import Pagenation from "@/components/Pagenation";
  import {blogList} from "@/api/api";

  export default {
    name: "IndexList",
    components: {Pagenation},
    data() {
      return {
        pagenation: {
          total: 1,
          pageSize: 10,
          pageNum: 1,
        },
        blogs: [],
        typeId: 0
      }
    },
    watch: {
      '$route' (to, from) {
        let toId = to.params.id ? to.params.id : 0;
        let fromId = from.params.id ? from.params.id : 0;
        if(toId != fromId){
          this.typeId = toId;
          this.loadData()
        }

      }
    },
    mounted() {
      this.typeId = this.$route.params.id == undefined ? 0 : parseInt(this.$route.params.id);
      this.loadData();
    },
    methods: {
      pageNumChange(val) {
        this.pagenation.pageNum = val;
        this.loadData();
      },

      loadData(){
        let data = {page: this.pagenation.pageNum, size: this.pagenation.pageSize};
        if(this.typeId != 0 ) data['type_id'] = this.typeId;
        blogList(data).then( res => {
          if(res.data.code == 0) {
            this.pagenation.total = res.data.count
            this.blogs = res.data.data;
          } else {
            console.log(res.data)
          }
        }).catch( e => {
          console.log(e);
        })
      }

    }

  }
</script>

<style scoped>
  .data-div {
    border: 0.1rem #d5d5d5 solid;
    margin-top: 1rem;
    padding: 0 1rem;
  }

  .data-list {
    list-style: none;
    padding-left: 0;
  }

  .data-list li {
    border-bottom: 0.1rem #999 dashed;
    padding: 1rem 0.6rem;
  }

  .title-p a {
    font-size: 1.3rem;
    color: #333;
    font-weight: bold;
  }

  .content a{
    font-size: 0.8rem;
    color: #000;
  }

  .info {
    font-size: 0.8rem;
    color: #666;
  }

  p {
    margin: 0;
    padding: 0.2rem 0;
  }

  .page {
    margin-top: 2rem;
  }
</style>
