/**
 * Created by Edmar on 7/06/2017.
 */


function register() {
    var reg = document.getElementById("register-form-link");
    var signin = document.getElementById("login-form-link");

    var btnRegister = document.getElementById("register-submit");
    var btnSignin = document.getElementById("login-submit");

    var email = document.getElementById("email");
    var pwd = document.getElementById("password");

    email.value = "";
    pwd.value = "";

    btnRegister.style.visibility = "visible";
    btnSignin.style.visibility = "hidden";

    reg.classList.add("active1");
    signin.classList.remove("active");

}

function signin() {
    var reg = document.getElementById("register-form-link");
    var signin = document.getElementById("login-form-link");

    var btnRegister = document.getElementById("register-submit");
    var btnSignin = document.getElementById("login-submit");

    var email = document.getElementById("email");
    var pwd = document.getElementById("password");

    email.value = "";
    pwd.value = "";


    btnRegister.style.visibility = "hidden";
    btnSignin.style.visibility = "visible";

    signin.classList.add("active");
    reg.classList.remove("active1");
}




