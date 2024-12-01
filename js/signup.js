//*vars
let nameInput = document.getElementById('Name');
let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');
let confirmPasswordInput = document.getElementById('confirmPassword');
let signUpBtn = document.querySelector('.signUpBtn');
let signInAnchor = document.querySelector('.signInAnchor');
let emailExistsAlert = document.querySelector('.emailExistsAlert');
let showPassIconOne = document.querySelector('.showPassIconOne');
let showPassIconTwo = document.querySelector('.showPassIconTwo');
let innerBox = document.getElementById('out-inner-box');
let closeBtn = document.getElementById('closeBtn');

let userList = JSON.parse(localStorage.getItem('signUp')) || [];

//*Events

//^ sign up
signUpBtn.addEventListener('click', signUp);

//^ signin
signInAnchor.addEventListener('click', function() {
    window.location.href = 'file:///D:/Route/Tasks/11-Smart%20Login%20System/index.html';
});

//^ show & hide pass
showPassIconOne.addEventListener('click', function() {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

showPassIconTwo.addEventListener('click', function() {
    confirmPasswordInput.type = confirmPasswordInput.type === "password" ? "text" : "password";
});

//^ validation
nameInput.addEventListener('input', validationName);

emailInput.addEventListener('input', validationEmail);

passwordInput.addEventListener('input', validationPass);

//^ close inner box
closeBtn.addEventListener('click', closeInnerBox);

//*functions

//^ Check for Empty Inputs
function emptyInputs() {
    if (nameInput.value.length === 0 && emailInput.value.length === 0 && passwordInput.value.length === 0 && confirmPasswordInput.value.length === 0) {
        emailExistsAlert.classList.remove('d-none');
        emailExistsAlert.textContent = "All Inputs Are Required";
        return false;
    } else if (nameInput.value.length === 0) {
        emailExistsAlert.classList.remove('d-none');
        emailExistsAlert.textContent = "Name is Required";
        return false;
    } else if (emailInput.value.length === 0) {
        emailExistsAlert.classList.remove('d-none');
        emailExistsAlert.textContent = "Email is Required";
        return false;
    } else if (passwordInput.value.length === 0) {
        emailExistsAlert.classList.remove('d-none');
        emailExistsAlert.textContent = "Password is Required";
        return false;
    } else if (confirmPasswordInput.value.length === 0) {
        emailExistsAlert.classList.remove('d-none');
        emailExistsAlert.textContent = "Confirm Password is Required";
        return false;
    }
    return true;
}

//^ Validate Inputs
function validateInputs() {
    let isNameValid = validationName();
    let isEmailValid = validationEmail();
    let isPassValid = validationPass();

    if (!isNameValid) {
        emailExistsAlert.classList.remove('d-none');
        emailExistsAlert.textContent = "Invalid Name Format";
        innerBox.classList.remove('d-none'); 
        return false;
    } else if (!isEmailValid) {
        emailExistsAlert.classList.remove('d-none');
        emailExistsAlert.textContent = "Invalid Email Format";
        innerBox.classList.remove('d-none'); 
        return false;
    } else if (!isPassValid) {
        emailExistsAlert.classList.remove('d-none');
        emailExistsAlert.textContent = "Invalid Password Format";
        innerBox.classList.remove('d-none'); 
        return false;
    } else if (passwordInput.value !== confirmPasswordInput.value) {
        emailExistsAlert.classList.remove('d-none');
        emailExistsAlert.textContent = "Passwords do not match!";
        return false;
    } else if (emailExists(emailInput.value)) {
        emailExistsAlert.classList.remove('d-none');
        emailExistsAlert.textContent = "This email already exists and has an account!";
        return false;
    }

    emailExistsAlert.classList.add('d-none');
    innerBox.classList.add('d-none');
    return true;
}

//^ Sign Up
function signUp() {
    if (!emptyInputs()) return;

    if (!validateInputs()) return;

    let user = {
        name: nameInput.value,
        email: emailInput.value,
        pass: passwordInput.value,
        confirmpass: confirmPasswordInput.value
    };

    userList.push(user);
    localStorage.setItem('signUp', JSON.stringify(userList));
    clearInputs();
    window.location.href = 'file:///D:/Route/Tasks/11-Smart%20Login%20System/index.html';
}

//^ Email Exists?
function emailExists(email) {
    let users = JSON.parse(localStorage.getItem('signUp')) || [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].email.toLowerCase() === email.toLowerCase()) {
            return true;
        }
    }
    return false;
}

//^ Clear Inputs
function clearInputs() {
    nameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
}

//^ Close Inner Box
function closeInnerBox() {
    innerBox.classList.add('d-none');
}

//* Validation
function validationName() {
    var nameRegex = /^[A-Za-z'-]+$/;
    var nameText = nameInput.value;

    if (nameRegex.test(nameText)) {
        nameInput.classList.add('is-valid');
        nameInput.classList.remove('is-invalid');
        return true;
    } else {
        nameInput.classList.remove('is-valid');
        nameInput.classList.add('is-invalid');
        return false;
    }
}

function validationEmail() {
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var emailText = emailInput.value;

    if (emailRegex.test(emailText)) {
        emailInput.classList.add('is-valid');
        emailInput.classList.remove('is-invalid');
        return true;
    } else {
        emailInput.classList.remove('is-valid');
        emailInput.classList.add('is-invalid');
        return false;
    }
}

function validationPass() {
    var passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    var passText = passwordInput.value;

    if (passRegex.test(passText)) {
        passwordInput.classList.add('is-valid');
        passwordInput.classList.remove('is-invalid');
        return true;
    } else {
        passwordInput.classList.remove('is-valid');
        passwordInput.classList.add('is-invalid');
        return false;
    }
}
