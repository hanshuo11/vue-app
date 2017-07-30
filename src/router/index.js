import Vue from "vue";
import Router from "vue-router";
// 引用页面模板->供路由使用
import article from "../pages/article.vue";
import news from "../pages/news.vue";

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: news
  },
    {
      path: '/article',
      name: 'article',
      component: article
    }
    // {
    //     path: '/btn',
    //     name: 'btn',
    //     component: pageQuiButton
    // },
    // {
    //     path: '/list',
    //     name: 'list',
    //     component: pageQuiList
    // },
    // {
    //     path: '/nav',
    //     name: 'nav',
    //     component: pageQuiNav
    // }
    // ,{
    //     path: '/blog',
    //     name: 'blog',
    //     component: Blog,
    //     children: [{
    //             path: '/',
    //             component: page1
    //         },
    //         {
    //             path: 'info',
    //             component: page2
    //         }
    //     ]
    // }
  ]
})
