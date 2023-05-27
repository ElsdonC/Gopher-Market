// document.querySelectorAll(".bookmark").forEach((element) => {
//     element.addEventListener("click", async function () {
//         if (this.classList.contains("bi-bookmark-fill")) {
//             $(`#unstarModal_${this.id}`).modal("show");
//         } else {
//             await fetch(`http://localhost:3000/starred/add`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ id: this.id }),
//             })
//                 .then((res) => res.json())
//                 .then((data) => {
//                     console.log(data.message);
//                 })
//                 .catch((err) => {
//                     console.error(err);
//                 });
//                 window.location.reload();
//         }
//     });
// });

// async function unstar(id) {
//     await fetch(`http://localhost:3000/starred/remove`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id: id }),
//     })
//         .then((res) => res.json())
//         .then((data) => {
//             console.log(data.message);
//         })
//         .catch((err) => {
//             console.error(err);
//         });
//     window.location.reload();
// }
