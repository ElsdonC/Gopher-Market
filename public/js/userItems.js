async function deleteItem(link) {
    const res = await fetch(link, {
        method: "DELETE"
    })
    window.location.reload()
}

function showDeleteModal(id) {
    $(`#deleteModal_${id}`).modal('show');
}