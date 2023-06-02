// Search
$(".searchInput").on("keyup", function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
        const searchQuery = e.target.value;
        let items = [];
        $(".card-text").forEach((text) => {
            items.push(text.innerText);
        });
        if (searchQuery == "") {
            window.location.reload();
        }
        fetch(`http://localhost:3000/filter?q=${searchQuery}`)
        window.location = `http://localhost:3000?q=${searchQuery}`;
    }
});
$(".searchInput").on("input", function (e) {
    if ($(".searchInput").val() == "") {
        window.location.reload()
    }
})
$(".searchBtn").on("click", function (e) {
    const searchQuery = $(".searchInput").val();
    let items = [];
    $(".card-text").forEach((text) => {
        items.push(text.innerText);
    });
    if (searchQuery == "") {
        window.location.reload();
    }
    fetch(`http://localhost:3000/filter?q=${searchQuery}`)
    window.location = `http://localhost:3000?q=${searchQuery}`;
});

// Filter
const minValue = $("#min_value");
const maxValue = $("#max_value");
minValue.textContent = $("#min_input").value;
maxValue.textContent = $("#max_input").value;
$("#min_input").addEventListener("input", async (event) => {
    minValue.textContent = event.target.value;
});
$("#max_input").addEventListener("input", async (event) => {
    maxValue.textContent = event.target.value;
});
$("#filterBtn").addEventListener("click", async () => {
    let url = 'http://localhost:3000?'
    let filters = []
    if ($('input[name="category"]:checked').val()) {
        filters.push(`category=${$('input[name="category"]:checked').val()}`)
    }
    if ($('input[name="location"]:checked').val()) {
        filters.push(`location=${$('input[name="location"]:checked').val()}`)
    }
    if ($(".searchInput").val() != "") {
        filters.push(`q=${$(".searchInput").val()}`)
    }
    console.log(minValue.textContent)
    filters.push(`minPrice=${minValue.textContent}`)
    filters.push(`maxPrice=${maxValue.textContent}`)
    const newUrl = url + filters.join('&')
    window.location = newUrl
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