document.addEventListener("DOMContentLoaded",function () {
  ajax({
    url: "header.html",
    type: "get"
  }).then((result) => {
    document.body.innerHTML = result + document.body.innerHTML;
    document.head.innerHTML = document.head.innerHTML + `  <link rel="stylesheet" href="css/header.css">`
    // 注册部分正则验证
    var signRst = [];
    var $signOnTop = document.getElementsByClassName("sign_on_top")[0];
    if ($signOnTop) {
      var inputs = $signOnTop.getElementsByClassName("form_input");
      // 正则验证函数用 call
      var reCheck = function (re, val) {
        if (re.test(val)) {
          return true;
        } else {
          return false;
        }
      }
      // 根据正则显示msg函数
      var onMsg = function (re) {
        var result = reCheck(re, this.value);
        if (!result || this.value == "") {
          this.nextElementSibling.style.visibility = "visible";
        } else {
          this.nextElementSibling.style.visibility = "hidden";
          signRst[this.previousElementSibling.textContent] = true;
        }
      }
      // 用户名验证
      inputs[0].onblur = onMsg.bind(inputs[0], /^1((3[\d])|(4[5,6,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[1-3,5-8])|(9[1,8,9]))\d{8}$/);
      // 邮箱验证
      inputs[3].onblur = onMsg.bind(inputs[3], /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
      // 密码验证
      inputs[1].onblur = onMsg.bind(inputs[1], /^\w{6,20}$/);
      inputs[4].onblur = function () {
        if (inputs[1].value == "") {
          this.nextElementSibling.style.visibility = "hidden";
          inputs[1].nextElementSibling.style.visibility = "visible";
          this.value = "";
        } else if (this.value == "") {
          inputs[1].nextElementSibling.style.visibility = "hidden";
          this.nextElementSibling.style.visibility = "visible";
          this.nextElementSibling.innerHTML = "请再次输入密码"
        } else if (this.value != inputs[1].value) {
          this.nextElementSibling.style.visibility = "visible";
          this.nextElementSibling.innerHTML = "输入的密码不一致"
        } else {
          this.nextElementSibling.style.visibility = "hidden";
          signRst[this.previousElementSibling.textContent] = true;
        }
      };
      //登录展开栏
      (function () {
        //登陆注册的按钮(有active时出现下三角箭头)
        var t_li_login = document.getElementsByClassName("top_login");
        //展开栏(有active时展开)
        var r_expand = document.getElementsByClassName("expand_box");
        //登陆的a标签
        var $sign_in = document.getElementById("sign_in");
        //注册的a标签
        var $sign_on = document.getElementById("sign_on");
        //登录表单栏(active时显示)
        var $sign_in_top = document.getElementsByClassName("sign_in_top");
        //注册表单栏(active时显示)
        var $sign_on_top = document.getElementsByClassName("sign_on_top");
        //搜索的按钮(有active时出现下三角箭头)
        var $top_search = document.getElementsByClassName("top_search")[0];
        //搜索的表单栏(active时显示)
        var $search_bar = document.getElementsByClassName("search_bar")[0];
        //进入注册展开栏的按钮 sign_on_btn
        var $sign_on_btn = document.getElementsByClassName("sign_on_btn")[0];
        //登录注册按钮后的精灵图(点击时toggle r_expand 的 active)
        var $logo_before = document.getElementsByClassName("before")[0];
        //下拉展开菜单
        var $dropdown_item = document.getElementsByClassName("dropdown-item");
        var dark = document.getElementsByClassName("dark")[0];
        var shrink_dropdown = function () {
          for (var ele of $dropdown_item) {
            ele.classList.contains("active") ? ele.classList.remove("active") : null;
          }
        }
        // 展开登录注册栏目
        function opensign() {
          $search_bar.classList.remove("active");
          $top_search.classList.remove("active");
          shrink_dropdown();
          r_expand[0].classList.add("active");
        }
        // 判断要不要小三角
        function sign_li() {
          if (r_expand[0].classList.contains("active")) {
            t_li_login[0].classList.add("active");
          } else {
            t_li_login[0].classList.remove("active");
          }
        }
        dark.onclick = function () {
          r_expand[0].classList.remove("active");
          $search_bar.classList.remove("active");
          $top_search.classList.remove("active");
          this.classList.remove("active");
          sign_li()
        }
        t_li_login[0].onclick = function () {
          sign_li();
          shrink_dropdown();
          if(this.classList.contains("active")){
            dark.style.height = document.body.clientHeight + "px";
            dark.style.opacity= "0.5";
          }else{
            dark.style.height = "0px";
            dark.style.opacity = "0";
          }
        }
        $logo_before.onclick = function () {
          r_expand[0].classList.contains("active") ?
            r_expand[0].classList.remove("active") :
            r_expand[0].classList.add("active");
          $sign_in_top[0].classList.add("active");
          $sign_on_top[0].classList.remove("active");
        }
        $sign_in.onclick = function () {
          opensign();
          $sign_in_top[0].classList.add("active");
          $sign_on_top[0].classList.remove("active");
        }
        $sign_on.onclick = $sign_on_btn.onclick = function () {
          opensign();
          $sign_in_top[0].classList.remove("active");
          $sign_on_top[0].classList.add("active");
        }
        //搜索栏
        var $go_close = document.getElementsByClassName("go_close")[0];
        $top_search.onclick = function () {
          $top_search.classList.toggle("active");
          shrink_dropdown();
          r_expand[0].classList.remove("active");
          t_li_login[0].classList.remove("active");
          $search_bar.classList.toggle("active");
          if(this.classList.contains("active")){
            dark.style.height = document.body.clientHeight + "px";
            dark.style.opacity= "0.5";
          }else{
            dark.style.height = "0px";
            dark.style.opacity = "0";
          }
        }
        $go_close.onclick = function () {
          $top_search.classList.toggle("active");
          $search_bar.classList.toggle("active");
          dark.style.height = document.body.clientHeight + "px";
          dark.style.opacity = "0.5";
        }
      })();
      window.addEventListener("scroll", function () {
        var scroll_t = document.documentElement.scrollTop;
        var $header = document.getElementsByTagName("header")[0];
        var $top_func_bar = document.getElementsByClassName("top_func_bar")[0];
        var $top_nav_bar = document.getElementsByClassName("top_nav_bar")[0];
        var $getChat = document.getElementsByClassName("getChat")[0];
        if (scroll_t >= 130) {
          $top_func_bar.style.height = "50px";
          $top_func_bar.style.lineHeight = "50px";
          $top_nav_bar.classList.add("is_scroll");
        } else {
          $top_func_bar.style.height = "80px";
          $top_func_bar.style.lineHeight = "80px";
          $top_nav_bar.classList.remove("is_scroll");
        }
        // 聊聊吧悬浮框的飘动样式
        $getChat.style.top = scroll_t + 230 + "px";
      });
      (function () {//导航栏向下展开  控制器
        var $link_drop = document.getElementsByClassName("link_drop");
        var $dropdown_item = document.getElementsByClassName("dropdown-item");
        var r_expand = document.getElementsByClassName("expand_box");
        var $search_bar = document.getElementsByClassName("search_bar")[0];
        var dark = document.getElementsByClassName("dark")[0];
        // var drop= function (x) {
        //   var arr = [0,1,2];
        //   arr.splice(x,1);
        //   return function(){
        //     if(!$search_bar.classList.contains("active") && !r_expand[0].classList.contains("active")){
        //       $dropdown_item[x].classList.add("active");
        //       $dropdown_item[arr[0]].classList.remove("active");
        //       $dropdown_item[arr[1]].classList.remove("active");
        //     }else{
        //       
        //     }
        //   }
        // };
        for (var i = 0; i < 3; i++) {
          // $link_drop[i].onmouseover = drop(i);
          $link_drop[i].onmouseover = function () {
            var target = document.getElementById(this.dataset.target);
            if (!$search_bar.classList.contains("active") && !r_expand[0].classList.contains("active")) {
              for (var ele of $dropdown_item) {
                ele.classList.remove("active");
              }
              target.classList.add("active");
              dark.style.height = document.body.clientHeight + "px";
              dark.style.opacity = "0.5";
              target.firstElementChild.onmouseleave = function () {
                dark.style.height = "0px";
                dark.style.opacity = "0";
                target.classList.remove("active");
              }
            } else {
              target.classList.remove("active");
            }
          };
        }
      })();
    }
  });
});