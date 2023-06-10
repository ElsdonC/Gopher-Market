// Bookmark
document.querySelectorAll(".bookmark").forEach((element) => {
    element.addEventListener("click", async function () {
        console.log(this);
        if (this.classList.contains("bi-bookmark-fill")) {
            await fetch(`http://localhost:3000/bookmarked/remove/${this.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }).catch((err) => {
                console.error(err);
            });
        } else {
            await fetch(`http://localhost:3000/bookmarked/add/${this.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }).catch((err) => {
                console.error(err);
            });
        }
        window.location.reload();
    });
});
