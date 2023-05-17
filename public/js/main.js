// Changes Active NavLink on Page Referesh
$(function ($) {
    let url = window.location.href;
    $("nav a").each(function () {
        if (this.href === url) {
            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }
    });
});

function textCounter(field, field2, maxlimit) {
    var countfield = document.getElementById(field2);
    if (field.value.length > maxlimit) {
        field.value = field.value.substring(0, maxlimit);
        return false;
    } else {
        countfield.innerText = maxlimit - field.value.length;
    }
}

document.querySelector(".searchInput").addEventListener("input", (e) => {
    const searchQuery = e.target.value;
    // Fetch items with search query
    fetch(`http://localhost:3000/items?q=${searchQuery}`)
        .then((response) => response.text()) // convert response to text
        .then((html) => {
            // update the content of the page with the new items
            document.querySelector("#items").innerHTML = html;
        });
});

document.querySelectorAll(".itemLink").forEach((link) => {
    link.addEventListener("mouseover", (e) => {
        e.currentTarget.children[0].style.display = "block";
        console.log("making visible")
    })
    link.addEventListener("mouseleave", (e) => {
        e.currentTarget.children[0].style.display = "none";
        console.log("making invisible")
    })
})

document.querySelectorAll(".view").forEach((view) => {
    view.addEventListener("mouseover", (e) => {
      e.currentTarget.parentElement.querySelector(".card-img-top").style.filter = "brightness(30%)";
      console.log("making image normal");
    });
    view.addEventListener("mouseleave", (e) => {
      e.currentTarget.parentElement.querySelector(".card-img-top").style.filter = "";
      console.log("making image darker");
    });
  });