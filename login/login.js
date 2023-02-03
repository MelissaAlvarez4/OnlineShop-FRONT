(() => {

    const onLogin = (event) => {
        event.preventDefault();

        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        fetch('http://localhost:9988/login', {
            headers: { 
                "Content-Type": "application/json; charset=utf-8"
            },
            method: 'POST',
            body: JSON.stringify({
                email: login,
                password: password
            })
        })
            .then(response=>response.json())
            .then((response) => {
                localStorage.setItem("authtoken", response);

                window.location = './products';
            })
            .catch((error) => {
                console.error(error);

                document.getElementById('loginErrorMessage').style = 'display: block';
            });
    }

    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', onLogin);
})()