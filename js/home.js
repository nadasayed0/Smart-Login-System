let welcome = document.querySelector('.welcome');
let logout = document.querySelector('.logout');

(function(){

    let users = JSON.parse(localStorage.getItem('signUp')); 
    users.forEach(user => { 
        welcome.textContent = `Welcome ${user.name}`;
    });
})()

logout.addEventListener('click' , function(){
    // window.open('file:///D:/Route/Tasks/11-Smart%20Login%20System/index.html');
    window.location.href = 'file:///D:/Route/Tasks/11-Smart%20Login%20System/index.html';

})