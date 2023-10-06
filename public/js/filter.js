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
    // Filter DeliveryMethod
    const deliveryMethodCheckboxes = document.querySelectorAll('input[name="deliveryMethod"]:checked');
    if (deliveryMethodCheckboxes.length > 0) {
        const deliveryMethods = Array.from(deliveryMethodCheckboxes).map(checkbox => checkbox.value);
        filters.push(`deliveryMethod=${deliveryMethods.join(",")}`);
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
                if (!e.target.parentNode.id.includes("$") && !e.target.parentNode.id.includes("search") && !e.target.parentNode.id.includes("delivery")) {
                    return element
                } else {
                    if (e.target.parentNode.id.includes("$") && !element.includes("Price")) {
                        return element
                    } else if (e.target.parentNode.id.includes("search") && !element.includes("q=")) {
                        return element
                    } else if (e.target.parentNode.id.includes("delivery") && !element.includes("deliveryMethod")) {
                        return element
                    }
                }
            }
        })
        redirect(window.location.href, `${newFilters.join('&')}`)
    })
})

// Mobile Filter
const filterButton = document.getElementById("filterButton");
const filterContent = document.querySelector(".filter-content");

filterButton.addEventListener("click", () => {
    filterContent.classList.toggle("show-filter-content");
    document.querySelector(".filter").classList.toggle("filter-active");
})