const EmailRegister = document.querySelector(".input-register-username");
const PasswordRegister = document.querySelector(".input-register-password");
const btnRegister = document.querySelector(".register-registerButton");

btnRegister.addEventListener("click", function(e){
    e.preventDefault();

    if(EmailRegister.value === "" || PasswordRegister.value=== ""){
        alert("please enter Email or Password")
    }

    else{
        const user = {
            username: EmailRegister.value,
            password: PasswordRegister.value
        }

        let json = JSON.stringify(user);

        localStorage.setItem(EmailRegister.value, json);
        window.location.href = "login.html";
        
    }

})


