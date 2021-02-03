<template>
  <div class="container">
    <index-title></index-title>
    <div class="row">
      <router-view></router-view>
      <div class="col-md-3 info-div">
        <div class="info-user">
          <div class="user-title">
            <img src="@/assets/user_icon.png"><span>博主信息</span>
          </div>
          <div class="user-img">
            <img :src="blogger.img">
          </div>
          <div class="user-sign">
            <p>{{blogger.nickname}}</p>
            <p>{{blogger.sign}}</p>
          </div>
        </div>
        <div class="info-type">
          <div class="user-title">
            <img src="@/assets/type_icon.png"><span>博客类别</span>
          </div>
          <div>
            <ul>
              <li v-for="(item, index) in types" :key="index"><router-link :to="{name:'IndexList', params: {id: item.type_id}}">{{item.b_name}}（{{item.b_count}}）</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 right">
        <p>Power by xjs</p>
      </div>
    </div>
  </div>
</template>

<script>
  import IndexTitle from '@/components/IndexTitle'
  import {getBlogger, getTypes} from "@/api/api";

  export default {
    name: "Index",
    components: {IndexTitle},
    data() {
      return {
        blogger: {},
        types: [],
        type_id: 0,
      }
    },
    mounted() {
      getBlogger().then(res => {
        if(res.data.code == 0) {
          this.blogger = res.data.data;
          this.blogger.img = process.env.BASE_API + this.blogger.img;
        } else {
          console.log(res.data);
        }
      }).catch( e => {
        console.log(e)
      });
      getTypes().then(res => {
        if(res.data.code == 0) {
          this.types = res.data.data;
        } else {
          console.log(res.data);
        }

      }).catch( e => {
        console.log(e);
      })
    },
    methods: {
      typeClick(val) {
        if(this.type_id != val) {
          this.type_id = val;
          context.$emit('type_change', this.type_id);
        }
      }
    }
  }
</script>

<style scoped>
  .info-div{
    margin-top: 1rem;
    padding: 0;
  }
  .info-user{
    border: 0.1rem #d5d5d5 solid;
    margin-left: 1rem;
    text-align: center ;
    padding: 1rem;
  }
  .user-title {
    text-align: left;
    padding-bottom: 0.6rem;
    border-bottom: 0.1rem #d5d5d5 solid;
  }
  .user-title span {
    color: #333;
    font-size: 1rem;
    margin-left: 0.4rem;
    position: relative;
    top: 0.1rem;
  }
  .user-img img{
    width: 200px;
    margin: 0.5rem 0;
  }
  .user-sign {
    font-size: 0.9rem;
    color: #333;
  }
  .user-sign p{
    padding: 0;
  }
  .info-type{
    margin-top: 1rem;
    border: 0.1rem #d5d5d5 solid;
    margin-left: 1rem;
    padding: 1rem;
  }
  .info-type ul {
    list-style: none;
    padding: 0 0 0 1.5rem;
    margin: 1rem 0;
  }
  .info-type li {
    margin: 0.4rem 0;
    font-size: 1rem;
  }
  .info-type a{
    color: #333;
  }
  .right{
    text-align: center;
    margin-top: 5rem;
  }
  .right p{
    color: #666;
    padding: 0;
  }
</style>
