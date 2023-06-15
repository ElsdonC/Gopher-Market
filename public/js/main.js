let baseURL = 'http://localhost:3000/'
let bookmarkURL = 'http://localhost:3000/bookmarked/'
let profileURL = 'http://localhost:3000/userItems/'

function redirect(url, query) {
    if (url.includes("bookmarked")) {
        window.location = `${bookmarkURL}?${query}`
    } else if (url.includes("userItems")) {
        window.location = `${profileURL}?${query}`
    } else {
        window.location = `${baseURL}?${query}`
    }
}

// Search
document.querySelector(".searchInput").addEventListener("keyup", function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
        const searchQuery = e.target.value;
        let items = [];
        document.querySelectorAll(".card-text").forEach((text) => {
            items.push(text.innerText);
        });
        if (searchQuery == "") {
            window.location.reload();
        }
        redirect(window.location.href, `q=${searchQuery}`)
    }
});
document.querySelector(".searchInput").addEventListener("input", function (e) {
    if (document.querySelector(".searchInput").value == "") {
        window.location.reload()
    }
})
document.querySelector(".searchBtn").addEventListener("click", function (e) {
    const searchQuery = document.querySelector(".searchInput").value;
    let items = [];
    document.querySelectorAll(".card-text").forEach((text) => {
        items.push(text.innerText);
    });
    if (searchQuery == "") {
        window.location.reload();
    }
    redirect(window.location.href, `q=${searchQuery}`)
});

// Sell
function textCounter(field, field2, maxlimit) {
    var countfield = document.getElementById(field2);
    if (field.value.length > maxlimit) {
        field.value = field.value.substring(0, maxlimit);
        return false;
    } else {
        countfield.innerText = maxlimit - field.value.length;
    }
}

let imgFileName = "";
let imgInput = document.getElementById("image");
let allowedExtensions = [".apng",".avif",".jpeg",".jpg",".png",".svg+xml",".webp"];

imgInput.addEventListener("change", function () {
    let file = this.files[0];
    let fileReader = new FileReader();
    fileReader.onloadend = function () {
        let arrayBuffer = new Uint8Array(fileReader.result).subarray(0, 4);
        let header = "";
        for (let i = 0; i < arrayBuffer.length; i++) {
            header += arrayBuffer[i].toString(16);
        }
        let fileType = getFileType(header);
        console.log(fileType);
        if (fileType && allowedExtensions.includes(fileType)) {
            imgFileName = file.name;
        } else {
            imgInput.value = "";
            alert("unsupported image uploaded, try again");
        }
    };
    fileReader.readAsArrayBuffer(file);
});
// Check File Type
function getFileType(header) {
    switch (header) {
        case "89504e47":
            return ".png";
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
            return ".jpg";
        case "47494638":
            return ".gif";
        case "25504446":
            return ".pdf";
        case "49492a00":
        case "4d4d002a":
            return ".tiff";
        case "52494646":
            return ".webp";
        default:
            return null;
    }
}

// Show Bookmark On Item Hover
document.querySelectorAll(".itemCard").forEach((card) => {
    const bookmarkAnchor = card.querySelector(".bookmarkAnchor");
    card.addEventListener("mouseover", () => {
        bookmarkAnchor.style.display = "inline-flex";
    });
    card.addEventListener("mouseout", () => {
        bookmarkAnchor.style.display = "none";
    });
});

// Save/Unsave items 
document.querySelectorAll(".bookmark").forEach((element) => {
    element.addEventListener("click", async function () {
        if (this.classList.contains("bi-bookmark-fill")) {
            $(`#unstarModal_${this.id}`).modal("show");
        } else {
            await fetch(`http://localhost:3000/bookmarked/add/${this.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }).catch((err) => {
                console.error(err);
            });
            window.location.reload();
        }
    });
});
async function unstar(id) {
    await fetch(`http://localhost:3000/bookmarked/remove/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    }).catch((err) => {
        console.error(err);
    });
    window.location.reload();
}

// Filter
document.getElementById("min_value").value = document.getElementById("min_input").value;
document.getElementById("max_value").value = document.getElementById("max_input").value;
document.getElementById("min_input").addEventListener("input", (event) => {
  document.getElementById("min_value").value = event.target.value;
});
document.getElementById("max_input").addEventListener("input", (event) => {
  document.getElementById("max_value").value = event.target.value;
});
document.getElementById("filterBtn").addEventListener("click", async () => {
    let filters = []
    // Filter Category
    if (document.querySelector('input[name="category"]:checked')) {
        filters.push(`category=${document.querySelector('input[name="category"]:checked').value}`)
    }
    // Filter Location
    if (document.querySelector('input[name="location"]:checked')) {
        filters.push(`location=${document.querySelector('input[name="location"]:checked').value}`)
    }
    // Filter Search Query
    if (document.querySelector(".searchInput").value != "") {
        filters.push(`q=${document.querySelector(".searchInput").value}`)
    }
    // Filter Price
    if (document.getElementById("min_value").value != "0" || document.getElementById("max_value").value != "1000") {
        filters.push(`minPrice=${document.getElementById("min_value").value}`)
        filters.push(`maxPrice=${document.getElementById("max_value").value}`)
    }
    // Filter Condition
    const conditionCheckboxes = document.querySelectorAll('input[name="condition"]:checked');
    if (conditionCheckboxes.length > 0) {
        const conditions = Array.from(conditionCheckboxes).map(checkbox => checkbox.value);
        filters.push(`condition=${conditions.join(",")}`);
    }
    redirect(window.location.href, `${filters.join('&')}`)
});
document.getElementById("min_value").addEventListener("input", (event) => {
    if (event.target.value == '') {
        document.getElementById("min_input").value = 0
    } else {
        document.getElementById("min_input").value = event.target.value;
    }
});
document.getElementById("max_value").addEventListener("input", (event) => {
    if (event.target.value == '') {
        document.getElementById("max_input").value = 0
    } else {
        document.getElementById("max_input").value = event.target.value;
    }
});
document.getElementById("resetFilterBtn").addEventListener("click", () => window.location = window.location.href.split("?")[0]);

// Filter Tags
document.querySelectorAll(".fa-circle-xmark").forEach((element) => {
    // Hover Effect for filter tags
    element.addEventListener("mouseover", (e) => {
        e.target.classList.replace("fa-regular", "fa-solid")
    })
    element.addEventListener("mouseout", (e) => {
        e.target.classList.replace("fa-solid", "fa-regular")
    })
    // Dismiss filters with filter tags
    element.addEventListener("click", (e) => {
        let currFilters = window.location.href.split('?')[1].split("&")
        let newFilters = currFilters.filter((element) => {
            if (!element.includes(e.target.parentNode.id)) {
                if (!e.target.parentNode.id.includes("$") && !e.target.parentNode.id.includes("search")) {
                    return element
                } else if (e.target.parentNode.id.includes("$")){
                    if (!element.includes("Price")) {
                        return element
                    }
                } else if (e.target.parentNode.id.includes("search")) {
                    if (!element.includes("q=")) {
                        return element
                    }
                }
            }
        })
        redirect(window.location.href, `${newFilters.join('&')}`)
    })
})

// Validate Form Submissions
function validateForm() {
    let name = document.getElementById("name").value.replace(/\s/g, "");
    if (name == "") {
        let nameField = document.getElementById("name");
        let nameError = document.createElement("div");
        nameError.className = "error-message";
        nameError.textContent = "Please fill out this field";
        nameField.insertAdjacentElement("afterend", nameError);
        nameField.focus();
        return false;
    }
    let description = document
        .getElementById("description")
        .value.replace(/\s/g, "");
    if (description == "") {
        let descField = document.getElementById("description");
        let descError = document.createElement("div");
        descError.className = "error-message";
        descError.textContent = "Please fill out this field";
        descField.insertAdjacentElement("afterend", descError);
        descField.focus();
        return false;
    }
    let category = document.getElementById("category").value;
    if (category == "") {
        let categoryField = document.getElementById("category");
        let categoryError = document.createElement("div");
        categoryError.className = "error-message";
        categoryError.textContent = "Please fill out this field";
        categoryField.insertAdjacentElement("afterend", categoryError);
        categoryField.focus();
        return false;
    }
    let location = document.getElementById("location").value;
    if (location == "") {
        let locationField = document.getElementById("location");
        let locationError = document.createElement("div");
        locationError.className = "error-message";
        locationError.textContent = "Please fill out this field";
        locationField.insertAdjacentElement("afterend", locationError);
        locationField.focus();
        return false;
    }
    if (imgFileName == "") {
        let imageField = document.getElementById("image");
        let imageError = document.createElement("div");
        imageError.className = "error-message";
        imageError.textContent = "Please upload an image";
        imageField.insertAdjacentElement("afterend", imageError);
        imageField.focus();
        return false;
    }
}

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