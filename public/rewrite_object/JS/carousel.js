//动态获取轮播图
(function () {
  ajax({
    url: "/index/carousel",
    type: "get",
    dataType: "json"
  }).then((result) => {
    // 首页动态获取轮播图
    if(!result.code){
      var carouselPic = document.getElementsByClassName("carousel")[0];
      var carouselPointer = document.getElementsByClassName("carousel-pointer")[0];
      carouselPic.innerHTML="";
      carouselPointer.innerHTML="";
      console.log(result);
      for (var pic of result) {
        var { cid, img, title, href } = pic;
        var li = document.createElement("li");
        var li2 = document.createElement("li");
        if (cid == 1) {
          li.className = "carousel-item active";
          li2.className = "carousel-link active";
        } else {
          li.className = "carousel-item";
          li2.className = "carousel-link";
        }
        li2.dataset.target = cid - 1;
        li2.innerHTML = title;
        var imgtag = new Image();
        imgtag.src = img;
        li.appendChild(imgtag);
        carouselPic.appendChild(li);
        carouselPointer.appendChild(li2);
      }
    }
  });
})();



//轮播图手写尝试
window.onload = function () {
  var carousel = document.getElementsByClassName("carousel-bar")[0];
  var arr_pic = document.getElementsByClassName("carousel-item"), count = 0;
  var arr_pointer = document.getElementsByClassName("carousel-link");
  var next_btn = document.getElementsByClassName("next-btn")[0];
  var prev_btn = document.getElementsByClassName("prev-btn")[0];
  var box_width = carousel.offsetWidth;
  // 下一张图
  var setNext = function () {
    count++;
    if (count == arr_pic.length) {
      count = 0;
    }
    for (var i = 0; i < arr_pic.length; i++) {
      arr_pic[i].classList.remove("active");
      arr_pointer[i].classList.remove("active");
    }
    arr_pic[count].classList.add("active");
    arr_pointer[count].classList.add("active");
  }
  // 上一张图
  var setPrev = function () {
    count--;
    if (count == -1) {
      count = arr_pic.length - 1;
    }
    for (var i = 0; i < arr_pic.length; i++) {
      arr_pic[i].classList.remove("active");
      arr_pointer[i].classList.remove("active");
    }
    arr_pic[count].classList.add("active");
    arr_pointer[count].classList.add("active");
  }
  // 设置循环定时器
  var timer = setInterval(setNext, 2000);
  // 鼠标移动到轮播图上静止,离开时移动
  carousel.onmouseover =  function () {
    clearTimeout(timer);
  }
  carousel.onmouseout = function () {
    timer = setInterval(setNext, 2000);
  }
  // 移动端手指滑动操作轮播事件
  var startPoint = 0;
  var endPoint=0;
  carousel.addEventListener("touchstart",function(m){
    clearTimeout(timer);
    startPoint = m.changedTouches[0].pageX;
  });
  carousel.addEventListener("touchend", function (m) {
    timer = setInterval(setNext, 2000);
    endPoint = m.changedTouches[0].pageX;
    var currNum  = startPoint-endPoint;
    if(currNum<0){
      setNext();
    }else{
      setPrev();
    }
  });
  // 前后按钮的点击事件
  next_btn.addEventListener("click", setNext);
  prev_btn.addEventListener("click", setPrev);
  //移动端滑动事件

  // 导航被hover后跳转到目标图片
  for (var ele of arr_pointer) {
    ele.onmouseover = function () {
      var target = this.dataset.target;
      for (var i = 0; i < arr_pic.length; i++) {
        arr_pic[i].classList.remove("active");
        arr_pointer[i].classList.remove("active");
      }
      arr_pic[target].classList.add("active");
      arr_pointer[target].classList.add("active");
      count = target;
    }
  }
  arr_pic[0].parentElement.style.height = getComputedStyle(arr_pic[0]).height;
  // 窗口大小调整,自动调整轮播图大小
  window.addEventListener("resize", function () {
    var arr_pic = document.getElementsByClassName("carousel-item");
    arr_pic[0].parentElement.style.height = getComputedStyle(arr_pic[0]).height;
  });
}
/*//案例:
<div class="carousel-bar">
  <ul class="carousel">
    <li class="carousel-item active"><img src="image/pc/aspbb_kv_pc_pre_20190530.jpg" alt=""></li>
    <li class="carousel-item"><img src="image/pc/erx_su19_kv_pc_190606.jpg" alt=""></li>
    <li class="carousel-item"><img src="image/pc/pride_kv_pc_20190605.jpg" alt=""></li>
    <li class="carousel-item"><img src="image/pc/jp_gold_kv_pc_190426.jpg" alt=""></li>
  </ul>
  <ul class="carousel-pointer">
    <li data-target="0"class="carousel-link active">All Star</li>
    <li data-target="1"class="carousel-link">PRIDE</li>
    <li data-target="2"class="carousel-link">ERX</li>
    <li data-target="3"class="carousel-link">JP GOLD</li>
  </ul>
  <ul class="lrBtn">
    <li class = "next-btn"><span class="icon"></span></li>
    <li class = "prev-btn"><span class="icon"></span></li>
  </ul>
</div>
<script src = "js/carousel.js"></script>
  */