document.querySelector("#demo-login-btn").addEventListener("click", async () => {
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

document.querySelector("#google-login-btn").addEventListener("click", async () => {
    window.location = "/auth/google"
})