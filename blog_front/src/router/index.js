import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import IndexList from '@/components/IndexList'
import AboutInfo from "@/components/AboutInfo";
import ShowBlog from "@/components/ShowBlog";

Vue.use(Router);

const routerPush = Router.prototype.push;

Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
};

const routerReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
  return routerReplace.call(this, location).catch(err => err);
};

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'index/:id?',
          name: 'IndexList',
          component: IndexList
        },
        {
          path: 'about',
          name: 'AboutInfo',
          component: AboutInfo,
        },
        {
          path: 'show/:id',
          name: 'ShowBlog',
          component: ShowBlog,
        },
        {
          path: '*',
          redirect: '/index'
        }
      ]
    },
  ]
});

export default router;
