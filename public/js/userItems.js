// Confirm Delete
async function deleteItem(link) {
    await fetch(link, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
                alert(data.message)
            }
        });
    window.location.reload();
}

function showDeleteModal(id) {
    $(`#deleteModal_${id}`).modal("show");
}

// Bookmark
document.querySelectorAll(".bookmark").forEach((element) => {
    element.addEventListener("click", async function () {
        console.log(this);
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
        window.location.reload();
    });
});
