document.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
  checkbox.addEventListener("change", async function () {
    if (this.checked) {
      await fetch(`https://gophermarket.onrender.com/starred/add/${this.id}`);
      window.location.reload();
    } else {
      await fetch(`https://gophermarket.onrender.com/starred/remove/${this.id}`);
      window.location.reload();
    }
  });
});