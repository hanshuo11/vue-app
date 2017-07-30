import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex)

const state = {
  classes_name: [{
    name: '军事',
    id: 'war',
    folg: true
  }, {
    name: '体育',
    id: 'sport',
    folg: false
  }, {
    name: '科技',
    id: 'tech',
    folg: false
  }, {
    name: '教育',
    id: 'edu',
    folg: false
  }, {
    name: '娱乐',
    id: 'ent',
    folg: false
  }, {
    name: '财经',
    id: 'money',
    folg: false
  }, {
    name: '股票',
    id: 'gupiao',
    folg: false
  }, {
    name: '旅游',
    id: 'travel',
    folg: false
  }, {
    name: '女人',
    id: 'lady',
    folg: false
  }],
  news_arr: [],
  page: 1,
  new_class: 'war',
  article: "",
  article_judge: true,
  article_id: 0
}

const mutations = {
  news: function (state) {
    var request = require('superagent');
    request('get', 'http://wangyi.butterfly.mopaasapp.com/news/api')
      .query({
        type: state.new_class,
        page: state.page,
        limit: '6'
      })
      .then(function (res) {
        var arr = JSON.parse(res.text).list;
        for (var i = 0; i < arr.length; i++) {
          state.news_arr.unshift(arr[i])
        }
        ;
      });
  },
  change_class: function (state, class_id) {
    state.new_class = state.classes_name[class_id].id;
    // console.log(state.new_class);
  },
  change_class_css: function (state, class_id) {
    for (var i = 0; i < state.classes_name.length; i++) {
      state.classes_name[i].folg = false;
    }
    state.classes_name[class_id].folg = true;
    console.log(state.classes_name[class_id].folg);
  },
  change_page: function (state) {
    state.page++;
    // console.log(state.page);
  },
  delete_news: function (state) {
    state.news_arr = [];
  },
  open_new: function (state, article_id) {
    state.article = "";
    var request = require('superagent');
    request('get', 'http://wangyi.butterfly.mopaasapp.com/detail/api')
      .query({
        simpleId: article_id
      })
      .then(function (res) {
        var article = JSON.parse(res.text).content;
        // 过滤img标签中的style内的属性
        function formatImg(html) {
          var newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
            var match = match.replace(/style=\"(.*)\"/gi, 'class="img-responsive"');
            var result = match.replace(/alt="([^"]*)"(?=\s+)/gi, 'class="img-responsive"');
            // /class="[^"]*?"/g
            return result;
          });
          return newContent;
        }

        var str = "<img class='li' style='width:100px;'>"
        state.article = formatImg(article);
        console.log(state.article);
      });
  },
  get_article: function (state) {

  }
}

const actions = {}

const getters = {}


export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
