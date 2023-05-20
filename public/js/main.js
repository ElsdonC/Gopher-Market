// Changes Active NavLink on Page Referesh
$(function ($) {
    let url = window.location.href;
    $("nav li a").each(function () {
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
    let items = []
    document.querySelectorAll(".card-text").forEach((text)=> {
        items.push(text.innerText)
    })
    if (searchQuery == '') {
        window.location.reload()
    }
    // Fetch items with search query
    fetch(`http://localhost:3000/items?q=${searchQuery}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items,
        })
    })
        .then((response) => response.text()) // convert response to text
        .then((html) => {
            // update the content of the page with the new items
            document.querySelector("#items").innerHTML = html;
        });
});