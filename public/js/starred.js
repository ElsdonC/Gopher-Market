document.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
  checkbox.addEventListener("change", async function () {
    if (this.checked) {
      await fetch(`https://gophermarket.onrender.com/starred/add/${id}`)
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
  await fetch(`https://gophermarket.onrender.com/starred/remove/${id}`);
  window.location.reload();
}
