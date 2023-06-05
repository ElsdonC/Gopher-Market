document.querySelectorAll(".bookmark").forEach((element) => {
    element.addEventListener("click", async function () {
        if (this.classList.contains("bi-bookmark-fill")) {
            $(`#unstarModal_${this.id}`).modal("show");
        } else {
            await fetch(`http://localhost:3000/bookmarked/add/${this.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }).catch((err) => {
                console.error(err);
            });
            window.location.reload();
        }
    });
});

async function unstar(id) {
    await fetch(`http://localhost:3000/bookmarked/remove/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    }).catch((err) => {
        console.error(err);
    });
    window.location.reload();
}
