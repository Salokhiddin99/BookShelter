"use strict";

const elForm = document.querySelector(".form");
const elUsernameInput = document.querySelector(".username-input");
const elPasswordInput = document.querySelector(".password-input");

elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const usernameValue = elUsernameInput.value;
    const passwordValue = elPasswordInput.value;

    fetch("https://reqres.in/api/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email: usernameValue,
                password: passwordValue,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.token) {
                window.localStorage.setItem("token", data.token);

                window.location.replace("home.html");
            } else {
                alert("parol yoki username xato!");
            }
        });
});