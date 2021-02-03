<template>
  <div class="col-md-9 data-div">
    <div class="user-title">
      <img src="@/assets/about_icon.png">
      <span>关于博主</span>
    </div>
    <div v-html="blogger.profile" class="info"></div>
  </div>
</template>

<script>
  import {getBlogger} from "@/api/api";

  export default {
    name: "AboutInfo",
    data() {
      return {
        blogger: {},
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
    },
  }
</script>

<style scoped>
  .data-div {
    border: 0.1rem #d5d5d5 solid;
    margin-top: 1rem;
  }
  .user-title {
    text-align: left;
    padding: 0.6rem;
    border-bottom: 0.1rem #d5d5d5 solid;
  }
  .user-title span {
    color: #333;
    font-size: 1rem;
    font-weight: bold;
    margin-left: 0.4rem;
    position: relative;
    top: 0.1rem;
  }
  .info{
    margin: 1rem 0;
  }
</style>
