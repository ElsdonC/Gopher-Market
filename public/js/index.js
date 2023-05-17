document.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
  checkbox.addEventListener("change", async function () {
    if (this.checked) {
      await fetch(`http://localhost:3000/starred/add/${this.id}`);
      window.location.reload();
    } else {
      await fetch(`http://localhost:3000/starred/remove/${this.id}`);
      window.location.reload();
    }
  });
});