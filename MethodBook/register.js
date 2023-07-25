"use strict";

const $ = selector => document.querySelector(selector);

const displayErrorMsgs = msgs => {
    alert(msgs);
}

const processEntries = () => {
    const email = $("#email");
    const confirm = $("#confirm_email");
    const first_name = $("#first_name");
    const instrument = $("#instrument");
    const terms = $("#terms");

    let msgs = "";

    if (email.value == "") {
        msgs += "Email address is required.\n";
    }
    if (confirm.value == "") {
        msgs += "Please confirm your email address.\n";
    }
    if (email.value != confirm.value) {
        msgs += "Email addresses do not match.\n";
    }
    if (first_name.value = "") {
        msgs += "First name is required.\n";
    }
    if (instrument.value == "") {
        msgs += "Please choose an instrument.\n";
    }
    if (terms.checked == false) {
        msgs += "You must indicate you've read the studio policies.\n";
    }
    if (msgs.length == 0) {
        // $("form").submit;
        alert("Thanks! Login in for you first shed session.");
    }
    else {
        displayErrorMsgs(msgs);
    }
};

const resetForm = () => {
    $("form").reset();
    $("#email").focus();
};

document.addEventListener("DOMContentLoaded", () => {
    $("#sign_up").addEventListener("click", processEntries);
    $("#clear").addEventListener("click", resetForm);
    $("#email").focus();

});
