document.querySelector(".demo-sign-in-button").addEventListener("click", async () => {
    await fetch("http://localhost:3000/auth/demo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": "demo",
            "password": "demo"
        })
    })
    window.location = '/'
})