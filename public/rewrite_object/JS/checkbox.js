// 记住用户名选中
document.addEventListener("DOMContentLoaded",function(){
  var $checkbox = document.getElementsByClassName("checkbox");
  function check() {
    this.classList.toggle("checked");
  };
  for (var i = 0; i < $checkbox.length; i++) {
    $checkbox[i].onclick = check.bind($checkbox[i]);
  }
});
/* <div class="checkbox">
  记住用户名
</div> */