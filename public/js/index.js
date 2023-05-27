document.querySelectorAll(".bookmark").forEach((element) => {
    element.addEventListener("click", async function () {
        if (this.classList.contains("bi-bookmark-fill")) {
            this.classList.replace("bi-bookmark-fill", "bi-bookmark");
            await fetch(`http://localhost:3000/starred/remove/${this.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.message);
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            this.classList.replace("bi-bookmark", "bi-bookmark-fill");
            await fetch(`http://localhost:3000/starred/add/${this.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.message);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
        
    });
});
