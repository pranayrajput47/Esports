//toggle sidebar script
let btn = document.querySelector("#toggle-menu-btn");
let sidebar = document.querySelector(".main-wrapper .sidebar");
let searchBtn = document.querySelector(".search-btn");

btn.onclick = function () {
    sidebar.classList.toggle("active");
    if (btn.classList.contains("bg-less")) {
        btn.classList.replace("bg-less", "bg-expand");
    } else {
        btn.classList.replace("bg-expand", "bg-less");
    }
}


