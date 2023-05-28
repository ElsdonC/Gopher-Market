document.querySelectorAll(".bookmark").forEach((element) => {
    element.addEventListener("click", async function () {
        if (this.classList.contains("bi-bookmark-fill")) {
            await fetch(`http://localhost:3000/starred/remove/${this.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }).catch((err) => {
                console.error(err);
            });
        } else {
            await fetch(`http://localhost:3000/starred/add/${this.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }).catch((err) => {
                console.error(err);
            });
        }
        window.location.reload()
    });
});
