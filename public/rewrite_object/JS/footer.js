document.addEventListener("DOMContentLoaded", function () {
  ajax({
    url: "footer.html",
    type: "get"
  }).then((result) => {
    document.body.innerHTML = document.body.innerHTML+result;
    document.head.innerHTML = document.head.innerHTML + `  <link rel="stylesheet" href="css/footer.css">`
  });
});