//*vars
let emailInput = document.getElementById('email');
let passInput = document.getElementById('password');
let alertParag = document.querySelector('.alertParag');
let loginBtn = document.querySelector('.loginBtn');
let showPassIcon = document.querySelector('.showPassIcon');
let radioBtn = document.getElementById('radioBtn');
let changeBtn = document.querySelector('.changeBtn');
let signUpAnchor = document.querySelector('.signUpAnchor');
let userList = JSON.parse(localStorage.getItem('logIn')) || [];
let innerBox = document.getElementById('out-inner-box'); // Reference to the inner box
let closeBtn = document.getElementById('closeBtn');

//*Events

//^ validation
emailInput.addEventListener('input', validationEmail);
passInput.addEventListener('input', validationPass);

//^show & hide pass
showPassIcon.addEventListener('click', function() {
    passInput.type = passInput.type === "password" ? "text" : "password";
});

//^change pass
radioBtn.addEventListener('click', function() {
    changeBtn.classList.remove('d-none');
});

changeBtn.addEventListener('click', function() {
    let userEmail = emailInput.value;
    sessionStorage.setItem('email', userEmail); 
    window.location.href = 'file:///D:/Route/Tasks/11-Smart%20Login%20System/pass.html';
});

//^login
loginBtn.addEventListener('click', logIn);

//^sign up
signUpAnchor.addEventListener('click', function() {
    // window.open('file:///D:/Route/Tasks/11-Smart%20Login%20System/signup.html');
    window.location.href = 'file:///D:/Route/Tasks/11-Smart%20Login%20System/signup.html';
});

//^ close inner box
closeBtn.addEventListener('click', closeRules);

//*functions

//^ Email Exists?
function emailExists(email) {
    if (localStorage.getItem('signUp') !== null) { 
        let users = JSON.parse(localStorage.getItem('signUp')); 
        for (let i = 0; i < users.length; i++) { 
            if (users[i].email.toLowerCase() === email.toLowerCase()) { 
                return true; 
            } 
        } 
    } 
    return false;
}

//^ Correct Pass?
function passMatchesEmail(email, pass) {
    if (localStorage.getItem('signUp') !== null) { 
        let users = JSON.parse(localStorage.getItem('signUp')); 
        for (let i = 0; i < users.length; i++) { 
            if (users[i].email.toLowerCase() === email.toLowerCase() && users[i].pass === pass) { 
                return true; 
            } 
        } 
    } 
    return false;
}

//^ Check Input Lengths
function checkInputLengths(emailValue, passValue) {
    if (emailValue.length === 0 && passValue.length === 0) {
        alertParag.classList.remove('d-none');
        alertParag.textContent = "All Inputs Are Required";
        return false;
    } else if (emailValue.length === 0) {
        alertParag.classList.remove('d-none');
        alertParag.textContent = "Email is Required";
        return false;
    } else if (passValue.length === 0) {
        alertParag.classList.remove('d-none');
        alertParag.textContent = "Password is Required";
        return false;
    }
    return true;
}

//^ Validate Inputs
function validateInputs() {
    let isEmailValid = validationEmail();
    let isPassValid = validationPass();

    if (!isEmailValid) {
        alertParag.classList.remove('d-none');
        alertParag.textContent = "Invalid Email Format";
        innerBox.classList.remove('d-none'); 
        return false;
    } else if (!isPassValid) {
        alertParag.classList.remove('d-none');
        alertParag.textContent = "Invalid Password Format";
        innerBox.classList.remove('d-none'); 
        return false;
    }
    return true;
}

//^ login
function logIn() {
    let emailValue = emailInput.value;
    let passValue = passInput.value;

    if (!checkInputLengths(emailValue, passValue)) return;

    if (!validateInputs()) return;

    innerBox.classList.add('d-none'); 
    alertParag.classList.add('d-none'); 
    if (emailExists(emailValue) && passMatchesEmail(emailValue, passValue)) {
        alertParag.classList.add('d-none');
        let user = { 
            email: emailValue, 
            pass: passValue 
        }; 
        userList.push(user); 
        localStorage.setItem('logIn', JSON.stringify(userList)); 
        console.log(userList); 
        clearInputs();
        window.location.href = 'file:///D:/Route/Tasks/11-Smart%20Login%20System/home.html';
    } else if (!emailExists(emailValue)) { 
        alertParag.classList.remove('d-none'); 
        alertParag.textContent = "Email does not exist!"; 
    } else { 
        alertParag.classList.remove('d-none'); 
        alertParag.textContent = "Incorrect password!"; 
    }
}

//^ clear inputs
function clearInputs() {
    emailInput.value = '';
    passInput.value = '';
}

//^ close inner box
function closeRules() {
    innerBox.classList.add('d-none');
}

//* validation
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
    var passText = passInput.value;

    if (passRegex.test(passText)) {
        passInput.classList.add('is-valid');
        passInput.classList.remove('is-invalid');
        return true;
    } else {
        passInput.classList.remove('is-valid');
        passInput.classList.add('is-invalid');
        return false;
    }
}
