function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");

        const userName = document.querySelector("#signupUsername");
        const email = document.querySelector("#signupEmail");
        const passWord = document.querySelector("#passWord");
        const passWordConfirm = document.querySelector("#passWordConfirm");
        const add = document.querySelector("#add");

        add.addEventListener("click",addItem);

        function addItem(y){
            sessionStorage.setItem(1,userName.value);
            sessionStorage.setItem(2,email.value);
            sessionStorage.setItem(3,passWord.value);
            sessionStorage.setItem(4,passWordConfirm.value);
        }
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();


        setFormMessage(loginForm, "error", "Geçersiz kullanıcı adı/şifre! Tekrar deneyin!");
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id == "signupUsername" && e.target.value.length > 0 && e.target.value.length < 6) {
                setInputError(inputElement, "Kullanıcı adınız en az 6 karakter uzunluğunda olmalı");
            }
        });
        
        inputElement.addEventListener("blur", e => {
            var regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+.)+([.])+[a-zA-Z0-9.-]{2,4}$/;
            if (e.target.id == "signupEmail" && regex.test(e.target.value) != true) {
                setInputError(inputElement, "Geçersiz email adresi!!");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});
