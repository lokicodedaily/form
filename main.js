import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDPfIQwU0GQlPgStnE-plboro5J0kxmAHY",
  authDomain: "userdetailsform.firebaseapp.com",
  databaseURL:
    "https://userdetailsform-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "userdetailsform",
  storageBucket: "userdetailsform.appspot.com",
  messagingSenderId: "690603100036",
  appId: "1:690603100036:web:b8ef269af88f5ccc183fd1",
  databaseURL:
    "https://userdetailsform-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function savingUserDetails(
  userId,
  name,
  email,
  password,
  number,
  date,
  location,
  color
) {
  const userDetails = ref(database, "userDetails/" + userId);
  set(userDetails, {
    username: name,
    email: email,
    password: password,
    number: number,
    date: date,
    currentLocation: location,
    colorPicked: color,
  });
}

let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let phone = document.getElementById("phone");
let date = document.getElementById("date");
let locationValue = document.getElementById("location");
let color = document.getElementById("color");
let successfulMsgElement = document.getElementById("successful-msg");

// removing successful msg
[...document.getElementsByTagName("input")].forEach((input) => {
  input.addEventListener("focus", () => {
    if (successfulMsgElement.classList.contains("msg")) {
      successfulMsgElement.classList.remove("msg");
      successfulMsgElement.innerText = "";
    }
  });
});

//date limit set
let todayDate = new Date().getDate();
if (todayDate < 10) {
  todayDate = "0" + todayDate;
}
let todayMonth = new Date().getMonth();
if (todayMonth < 10) {
  todayMonth = "0" + todayMonth;
}
let todayYear = new Date().getFullYear();
let maxDate = `${todayYear}-${todayMonth}-${todayDate}`;
date.setAttribute("max", maxDate);

//validation
//name validation
function nameValidation() {
  let username = document.getElementById("name").value.trim();

  //validation for length
  if (username.length <= 2 || username.length > 30) {
    return false;
  }

  //validation for 2 spaces between name
  if (username.includes("  ")) {
    return "Enter your name in valid format";
  }

  //validation if it only contains characters and space
  let validChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
  for (let ch of validChar) {
    if (!validChar.includes(ch)) {
      return false;
    }
  }

  //validation if the length of name is not less than 2
  let splitNames = username.split(" ");
  for (let name of splitNames) {
    if (name.length < 2) {
      return false;
    }
  }
  return true;
}

//emailValidation
function emailValidation() {
  let email = document.getElementById("email").value.trim();
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return false;
  }
  return true;
}

//password validation
function passwordValidation() {
  let password = document.getElementById("password").value;

  //length of password validation
  if (password.length < 8 || password.length > 20) {
    return false;
  }

  let nums = "0123456789";
  let specicalChar = "!@#$%^&*";
  let upperCaseAplha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let lowerCaseAlpha = "abcdefghijklmnopqrstuvwxyz";

  let numCount = 0;
  let specicalCharCount = 0;
  let upperCaseAplhaCount = 0;
  let lowerCaseAlphaCount = 0;

  // to validate if password contains numbers
  for (let char of nums) {
    if (password.includes(char)) {
      numCount++;
    }
  }

  // to validate if password contains special characters
  for (let char of specicalChar) {
    if (password.includes(char)) {
      specicalCharCount++;
    }
  }

  // to validate if password contains upppercase alphabet
  for (let char of upperCaseAplha) {
    if (password.includes(char)) {
      upperCaseAplhaCount++;
    }
  }

  // to validate if password contains lowercase alphabet
  for (let char of lowerCaseAlpha) {
    if (password.includes(char)) {
      lowerCaseAlphaCount++;
    }
  }

  //to check the count of each character if 0 then throws error
  if (
    numCount === 0 ||
    specicalCharCount === 0 ||
    upperCaseAplhaCount === 0 ||
    lowerCaseAlphaCount === 0 ||
    password.includes(" ")
  ) {
    return false;
  }
  return true;
}

//phone number validation
function phoneValidation() {
  let phone = document.getElementById("phone").value.trim();

  if (phone.length !== 10) {
    return false;
  }

  for (let char of phone) {
    if (!"0987654321".includes(char)) {
      return false;
    }
  }
  return true;
}

//date validation
function dateValidation() {
  let date = document.getElementById("date").value;
  if (date.length === 0) {
    return false;
  }
  return true;
}

//getting form submit element
let formSubmit = document.getElementById("basic-form");

// listening for form submission event
formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();

  //checking for name validation
  let isNameValid = nameValidation();
  if (!isNameValid) {
    document.getElementsByClassName("name-error-msg")[0].innerText =
      "Name is not in a valid format";
  } else {
    document.getElementsByClassName("name-error-msg")[0].innerText = "";
  }

  //checking for email validation
  let isEmailValid = emailValidation();
  if (!isEmailValid) {
    document.getElementsByClassName("email-error-msg")[0].innerText =
      "Email is not in a valid format";
  } else {
    document.getElementsByClassName("email-error-msg")[0].innerText = "";
  }

  //checking for password validation
  let isPasswordValid = passwordValidation();
  if (!isPasswordValid) {
    document.getElementsByClassName("password-error-msg")[0].innerText =
      "Password is not in a valid format";
  } else {
    document.getElementsByClassName("password-error-msg")[0].innerText = "";
  }

  //checking for phone number validation
  let isPhoneValid = phoneValidation();
  if (!isPhoneValid) {
    document.getElementsByClassName("phone-error-msg")[0].innerText =
      "Phone number is not in a valid format";
  } else {
    document.getElementsByClassName("phone-error-msg")[0].innerText = "";
  }

  //checking for date validation
  let isDateValid = dateValidation();
  if (!isDateValid) {
    document.getElementsByClassName("date-error-msg")[0].innerText =
      "Please choose a date";
  } else {
    document.getElementsByClassName("date-error-msg")[0].innerText = "";
  }

  if (
    isNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isPhoneValid &&
    isDateValid
  ) {
    let userId = `${name.value}${phone.value}`;
    savingUserDetails(
      userId,
      name.value,
      email.value,
      password.value,
      phone.value,
      date.value,
      locationValue.value === "" ? "US" : locationValue.value,
      color.value
    );

    successfulMsgElement.classList.add("msg");
    document.getElementsByClassName("msg")[0].innerText =
      "You details have been saved";

    clearForm(e);
  }
});

let formClearElement = document.getElementById("form-clear-btn");
formClearElement.addEventListener("click", clearForm);

function clearForm(e) {
  e.preventDefault();
  name.value = "";
  email.value = "";
  password.value = "";
  phone.value = "";
  date.value = "";
  locationValue.value = "";
  color.value = "#000";
}
