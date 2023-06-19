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

var loadSellImage = function(event) {
    var output = document.getElementById('sell-form-image');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
  };

var loadEditImage = function(event) {
    var output = document.getElementById('edit-form-image');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
        URL.revokeObjectURL(output.src)
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