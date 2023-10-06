// Search
document.querySelector(".searchInput").addEventListener("keyup", function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
        const searchQuery = e.target.value;
        let items = [];
        document.querySelectorAll(".card-text").forEach((text) => {
            items.push(text.innerText);
        });
        redirect(window.location.href, `q=${searchQuery}`)
    }
});

document.querySelector(".searchBtn").addEventListener("click", function (e) {
    const searchQuery = document.querySelector(".searchInput").value;
    let items = [];
    document.querySelectorAll(".card-text").forEach((text) => {
        items.push(text.innerText);
    });
    if (searchQuery == "") {
        window.location.reload();
    }
    redirect(window.location.href, `q=${searchQuery}`)
});
