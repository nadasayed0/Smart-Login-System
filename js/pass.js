//* vars
let newPassInput = document.getElementById('newPass');
let confirmNewPassInput = document.getElementById('confirmNewPass');
let confAlert = document.querySelector('.confAlert');
let savePassBtn = document.querySelector('.savePass');
let showPassIconOne = document.querySelector('.showPassIconOne');
let showPassIconTwo = document.querySelector('.showPassIconTwo');
let closeBtn = document.getElementById('closeBtn');
let innerBox = document.getElementById('out-inner-box'); 


//* Events

//^ pass matching
savePassBtn.addEventListener('click', function() {
    checkPass();
});


//^ show & hide pass
newPassInput.addEventListener('input' , validationPass);
showPassIconOne.addEventListener('click', function() {
    newPassInput.type = newPassInput.type === "password" ? "text" : "password";
});

showPassIconTwo.addEventListener('click', function() {
    confirmNewPassInput.type = confirmNewPassInput.type === "password" ? "text" : "password";
});

//^ close inner box
closeBtn.addEventListener('click', closeInnerBox);


//*functions

//^ pass matching
function checkPass() {
    let newPassValue = newPassInput.value;
    let confirmNewPassValue = confirmNewPassInput.value;

    let isPassValid = validationPass(); 

    if (!isPassValid) {
        innerBox.classList.remove('d-none'); 
        return; 
    }

    if (newPassValue !== confirmNewPassValue) {
        confAlert.classList.remove('d-none');
        confAlert.textContent = "Passwords do not match!";
    } else {
        confAlert.classList.add('d-none');
        console.log("Passwords match, proceeding to save password");
        savePass();
    }
}


//^ new pass
function savePass() {
    let email = sessionStorage.getItem('email');  // Get email from session storage
    let newPassValue = newPassInput.value;

    if (localStorage.getItem('signUp') !== null) {
        let users = JSON.parse(localStorage.getItem('signUp'));
        let userFound = false;

        for (let i = 0; i < users.length; i++) {
            if (users[i].email.toLowerCase() === email.toLowerCase()) {
                users[i].pass = newPassValue;  // Update password
                userFound = true;
                break;
            }
        }

        if (userFound) {
            localStorage.setItem('signUp', JSON.stringify(users));
            alert('Password updated successfully. Redirecting to login page...');
            sessionStorage.removeItem('email'); // Clear the email from session storage
            window.location.href = 'file:///D:/Route/Tasks/11-Smart%20Login%20System/index.html';
        } else {
            alert('Email not found!');
            console.log("Email not found in signUp");
        }
    } else {
        alert('No users found in local storage.');
        console.log("No users found in local storage");
    }
}

function closeInnerBox(){
    innerBox.classList.add('d-none'); 
}

//*validation

function validationPass() {
    var passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    var passText = newPassInput.value;

    if (passRegex.test(passText)) {
        newPassInput.classList.add('is-valid');
        newPassInput.classList.remove('is-invalid');
        innerBox.classList.add('d-none'); // Hide the inner box if password is valid
        return true;
    } else {
        newPassInput.classList.remove('is-valid');
        newPassInput.classList.add('is-invalid');
        return false;
    }
}
