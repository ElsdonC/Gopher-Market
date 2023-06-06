// Confirm Delete
async function deleteItem(id) {
    await fetch(`http://localhost:3000/delete/${id}`, {
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