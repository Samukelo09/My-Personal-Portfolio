var tablinks = document.getElementsByClassName("tab-link");
var tabcontents = document.getElementsByClassName("tab-contents");
function opentab(tabname) {
    for (var tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (var tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

var sidemenu = document.getElementById("sidemenu");
function openmenu() {
    sidemenu.style.right = "0";
}
function closemenu() {
    sidemenu.style.right = "-200px";
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbxLx_JUk767YICdG6XYkvzeAmo0_jErWxiwoCKR0TtkXAC9BrrVa0vbNaHisTbUi3_4/exec';
const form = document.forms['submit-to-google-sheet'];
const confirm = document.getElementById("confirm");

form.addEventListener('submit', e => {
e.preventDefault();
fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        confirm.innerHTML = "Message sent successfully";
        setTimeout(function() {
            confirm.innerHTML = "";
        }, 5000);
        form.reset();
    })
    .catch(error => console.error('Error!', error.message));
})