//index.vue
<template>
  <div>
    <header class="header">
      <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
          <div class="row">
            <div v-show="show" id="bolog" class="col-xs-4 col-sm-7">
              <p class="navbar-brand"><strong>HsNews</strong></p>
            </div>
            <div class="padding_9 col-xs-8 col-sm-3">
              <form class="form-inline">
                <label class="searchi glyphicon glyphicon-search" for="search"></label>
                <input id="search" v-on:blur="lose_focus" v-on:focus="get_focus" v-model="msg" type="text"
                       class="form-control" placeholder="搜索">
              </form>
            </div>
            <div v-show="cancel" class="cancel_font col-xs-2">
              取消
            </div>
          </div>
        </div>
      </nav>
      <div style="overflow: hidden; position: absolute;">
        <div id="news_classes">
          <ul>
            <li :class="{ 'click_class': class_name.folg}" class="class" v-for="(class_name,index) in classes_name"
                @click="choose_class(index)">
              {{class_name.name}}
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="loosen">
      <p class="alert1">松开加载更多...</p>
    </div>
    <div class="wait_box">
      <img class="wait" src="static/images/wait.gif" alt="">
    </div>
    <div class="article">
      <ul class="articles">
        <li v-for="(article,index) in news_arr">
          <router-link to="article" class="a_touch" @click.native="openNews(article.id,index)">
            <img class="articls_imgs" :src="article.imgurl"> {{article.title}}
          </router-link>
        </li>
      </ul>
    </div>
    <footer>
      <div class="footer">
        <div class="home">
          <a :class="{active:isActive1}" class="glyphicon glyphicon-home"></a>
        </div>
        <div class="user">
          <a :class="{active:isActive2}" class="glyphicon glyphicon-user"></a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'pageQuiNav',
    data() {
      return {
        logos: 'no',
        page: 1,
        msg: '',
        show: true,
        cancel: false,
        isActive1: true,
        isActive2: false,
        isActive: null
      }
    },
    computed: {
      news_arr: function () {
        return this.$store.state.news_arr;
      },
      classes_name: function () {
        return this.$store.state.classes_name;
      }
    },
    methods: {
      openNews: function (article_id, index) {
        $('.a_touch:eq(' + index + ')').css('color', '#777');
        this.$store.commit("open_new", article_id);
      },
      join_article_compent: function () {

      },
      get_focus: function () {
        var _this = this;
        this.show = false;
        _this.cancel = true;
        $('div.padding_9').removeClass('col-xs-8');
        $('div.padding_9').addClass('col-xs-10');
      },
      lose_focus: function () {
        this.show = true;
        this.cancel = false;
        $('div.padding_9').removeClass('col-xs-12');
        $('div.padding_9').addClass('col-xs-8');
      },
      choose_class: function (class_id) {
        this.$store.commit("change_class", class_id);
        this.$store.commit("change_class_css", class_id);
        this.$store.commit("delete_news");
        this.$store.commit("news");
        $('.a_touch').css('color', 'black');
      },
      // 左右移动新闻类别条的滑动
      initial: function () {
        var _this = this;
        var oMove = document.getElementById('news_classes');
        var dx, nx, x;
        $('.glyphicon-home').on('click', function () {
          _this.isActive2 = false;
          _this.isActive1 = true;
        });
        $('.glyphicon-user').on('click', function () {
          _this.isActive1 = false;
          _this.isActive2 = true;
        });
        $('#news_classes').on('touchstart', function () {
          var touch;
          if (event.touches) {
            touch = event.touches[0];
          } else {
            touch = event;
          }
          x = touch.clientX;
          dx = oMove.offsetLeft;
          nx = x - dx;
          $('#news_classes').on('touchmove', function (event) {
            var touch = event.touches[0];
            var y = touch.clientY;
            var oMove_w = oMove.offsetWidth;
            var Bw = document.body.offsetWidth;
            var a = touch.clientX - nx;
            if (a > 0) {
              a = 0;
            } else if (a < -(oMove_w - Bw)) {
              a = -(oMove_w - Bw);
            }
            oMove.style.left = a + 'px';
            return false;
          });
        });

      },
      // 下拉加载更多
      get_more_news: function () {

        var start_y = 0;
        var end_y = 0;
        var Bflog = true;
        var that = this;

        function pull(event) {
          if (Bflog) {
            var touch = event.targetTouches[0];
            start_y = touch.pageY;
          }
        }

        function remove(event) {
          if (Bflog) {
            var touch = event.targetTouches[0];
            end_y = start_y - touch.pageY;
            if (end_y < -150) {
              console.log('小于-150')
              $('.loosen').css('display', 'block');
              $('.loosen').height(20 - end_y / 4);
              $('.article').css('margin-top', '10px');
            } else {
              end_y = 0;
            }
          }
        }

        $('.article').on("touchstart", pull);
        $('.article').on('touchmove', remove);
        $('.article').on('touchend', function () {

          if (end_y >= 0) {
          } else {
            if (Bflog) {
              Bflog = false;
            }
            if (end_y < -150) {
              var _this = this;
              $('.loosen').css('display', 'none');
              $('.wait_box').css('display', 'block');
              // 难点所在
              setTimeout(function () {
                that.$store.commit("change_page");
                that.$store.commit("news");
                $('.wait_box, .alert2').slideUp(400, function () {
                  Bflog = true;
                });
                $('.article').animate({
                  marginTop: '+=50'
                }, 400);
              }, 1500);
              end_y = 0;
            }
          }
        });
      }
    },
    mounted: function () {
      this.$store.commit("news");
      // this.$forceUpdate();
      this.initial();
      this.get_more_news();
      this.$store.commit("news");
      this.$forceUpdate();
    }
  }
</script>

<style scoped>
  @import '../assets/css/news_page.css';

</style>
