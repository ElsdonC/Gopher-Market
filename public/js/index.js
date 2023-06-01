const minValue = document.querySelector("#min_value");
const maxValue = document.querySelector("#max_value");

minValue.textContent = document.querySelector("#min_input").value;
maxValue.textContent = document.querySelector("#max_input").value;

document
    .querySelector("#min_input")
    .addEventListener("input", async (event) => {
        minValue.textContent = event.target.value;
    });
document
    .querySelector("#max_input")
    .addEventListener("input", async (event) => {
        maxValue.textContent = event.target.value;
    });

document.querySelector("#filterBtn").addEventListener("click", async () => {
    let url = 'http://localhost:3000/filter'
    let filters = []
    if ($('input[name="category"]:checked').val()) {
        filters.push(`?category=${$('input[name="category"]:checked').val()}`)
    }
    if ($('input[name="location"]:checked').val()) {
        filters.push(`?location=${$('input[name="location"]:checked').val()}`)
    }
    if ($(".searchInput").val() != "") {
        filters.push(`?q=${$(".searchInput").val()}`)
    }
    filters.push(`?minPrice=${minValue.textContent}`)
    filters.push(`?maxPrice=${maxValue.textContent}`)
    const newUrl = url + filters.join('&')
    await fetch(newUrl)
});

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
