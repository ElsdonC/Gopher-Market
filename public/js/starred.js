document.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
  checkbox.addEventListener("change", async function () {
    if (this.checked) {
      await fetch(`http://localhost:3000/starred/add/${id}`)
      window.location.reload();
    } else {
      $(`#unstarModal_${this.id}`).modal("show");
    }
  });
});

function keepChecked(id) {
  document.getElementById(id).checked = true;
  window.location.reload();
}

async function unstar(id) {
  await fetch(`http://localhost:3000/starred/remove/${id}`);
  window.location.reload();
}
