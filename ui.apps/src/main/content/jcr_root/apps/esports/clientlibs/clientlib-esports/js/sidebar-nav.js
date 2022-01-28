let btn = document.querySelector("#toggle-menu-btn");
let sidebar = document.querySelector(".main .sidebar");

btn.onclick = function () {
    sidebar.classList.toggle("active");
    if (btn.classList.contains("bg-less")) {
        btn.classList.replace("bg-less", "bg-expand");
    } else {
        btn.classList.replace("bg-expand", "bg-less");
    }
}