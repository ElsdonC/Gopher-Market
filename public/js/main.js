// Changes Active NavLink on Page Referesh
$(function ($) {
    let url = window.location.href;
    $("nav li a").each(function () {
        if (this.href === url) {
            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }
    });
});

function textCounter(field, field2, maxlimit) {
    var countfield = document.getElementById(field2);
    if (field.value.length > maxlimit) {
        field.value = field.value.substring(0, maxlimit);
        return false;
    } else {
        countfield.innerText = maxlimit - field.value.length;
    }
}

document.querySelector(".searchInput").addEventListener("input", (e) => {
    const searchQuery = e.target.value;
    let items = [];
    document.querySelectorAll(".card-text").forEach((text) => {
        items.push(text.innerText);
    });
    if (searchQuery == "") {
        window.location.reload();
    }
    // Fetch items with search query
    fetch(`http://localhost:3000/items?q=${searchQuery}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            items: items,
        }),
    })
        .then((response) => response.text()) // convert response to text
        .then((html) => {
            // update the content of the page with the new items
            document.querySelector("#items").innerHTML = html;
        });
});

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
let allowedExtensions = [
    ".apng",
    ".avif",
    ".jpeg",
    ".jpg",
    ".png",
    ".svg+xml",
    ".webp",
];

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
