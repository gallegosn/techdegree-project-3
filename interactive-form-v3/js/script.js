
const name = document.getElementById('name');
name.focus();
name.className = 'input.error';
document.getElementById('other-job-role').hidden = true;

const jobRoles = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role');

const typedEmail = document.getElementById('email');

//real time email validation
typedEmail.addEventListener('keyup', emailValidator);

function emailValidator(){
    
    const typedEmailVal = typedEmail.value;
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // regex borrowed from stack overflow: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    if(typedEmailVal != ''){
        if (emailRegEx.test(typedEmailVal)){
            typedEmail.parentElement.className = 'valid';
            typedEmail.parentElement.lastElementChild.hidden = true;
        }
        else{
            typedEmail.parentElement.className = 'not-valid';
            typedEmail.parentElement.lastElementChild.className = 'not-valid';
            typedEmail.parentElement.lastElementChild.hidden = false;
            e.preventDefault();
        }
    }else{
        typedEmail.parentElement.className = 'not-valid';
        typedEmail.parentElement.lastElementChild.className = 'not-valid';
        typedEmail.parentElement.lastElementChild.hidden = false;
        e.preventDefault();
    }
}

jobRoles.addEventListener('change', (e) => {
    if(jobRoles.value == 'other'){
        otherJobRole.hidden = false;
    }
    if(jobRoles.value != 'other'){
        otherJobRole.hidden = true;
        otherJobRole.value = '';
    }
    console.log(jobRoles.value);
});

const design = document.getElementById('design');
const size = document.getElementById('size');
const color = document.getElementById('color');
const colorOptions = document.querySelectorAll('#color option');

for (let i = 0; i < colorOptions.length; i++){
    colorOptions[i].disabled = true;
}

design.addEventListener('change', e => {
    for (let i = 0; i < colorOptions.length; i++){
        colorOptions[i].removeAttribute('hidden')
    }
    if(e.target.value == 'js puns'){
        for(let i = 1; i < 4; i++){
            colorOptions[i].disabled = false;
            for (let i = 4; i < 7; i++){
                colorOptions[i].setAttribute('hidden', '');
            }
        }
    }else {
        for (let i = 4; i < 7; i++){
            colorOptions[i].disabled =false;
            for (let i = 1; i < 4; i++){
                colorOptions[i].setAttribute('hidden', '');
            }
        }
    }
});

const checkboxes = document.querySelectorAll('.activities input');
const checkboxesFieldSet = document.querySelector('#activities');
const totalDollars = document.getElementById('activities-cost');
let totalCost = 0;

checkboxesFieldSet.addEventListener('change', e => {
    const clicked = e.target;
        let dataCost = clicked.getAttribute('data-cost');
        console.log(dataCost);
        dataCost = +dataCost;
        if (clicked.checked == true){
            totalCost += dataCost;
        }
        if (clicked.checked == false){
            totalCost -= dataCost;
        }
    totalDollars.innerHTML = `Total: $${totalCost}`;
    // Code Borrowed from Henry Blandon Treehouse Student
    //Activities focus and blur indicator
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener('focus', (e) => {
          checkboxes[i].parentElement.classList.add('focus');
      });
      checkboxes[i].addEventListener('blur', (e) => {
          const active = document.querySelector('.focus');
          if(active){
              active.classList.remove('focus');
          }
      })
    }
    // code below borrowed (variables modified by me) from TimothyHBourne https://github.com/timothyhbourne/The_Interactive_Form/blob/main/js/script.js
    // Code prevents activities from being scheduled at the same time.
    const dataDayTime = e.target.getAttribute('data-day-and-time');
    const eventName = e.target.getAttribute('name');
    for (let i = 0; i < checkboxes.length; i++) {
        const selectedTime = checkboxes[i].getAttribute('data-day-and-time');
        const selectedName = checkboxes[i].getAttribute('name');
        if (dataDayTime === selectedTime && eventName !== selectedName) {
        if (e.target.checked) {
            checkboxes[i].parentElement.classList.add('disabled');
            checkboxes[i].disabled = true;
        } else {
            checkboxes[i].disabled = false;
            checkboxes[i].parentElement.classList.remove('disabled');
        }
        }
    }        
});

const paymentMethod = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const payPal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

payPal.hidden = true;
bitcoin.hidden = true;
creditCard.hidden = false;
let cc = false;
let bc = false;
let pp = false;

paymentMethod.addEventListener('change', e => {
    const clicked = e.target.value;
    if (clicked == 'paypal'){
        payPal.hidden = false;
        creditCard.hidden = true;
        bitcoin.hidden = true;
        pp = true;
    }
    if (clicked == 'bitcoin'){
        payPal.hidden = true;
        creditCard.hidden = true;
        bitcoin.hidden = false;
        bc = true;
    }
    if (clicked == 'credit-card') {
        payPal.hidden = true;
        creditCard.hidden = false;
        bitcoin.hidden = true;
        cc = true;
    }
});

const cardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector('form');
const hint = document.getElementById('activities-hint');

form.addEventListener('submit', (e) => {
    if (cc == false && bc == false && pp == false){
        e.preventDefault();
    }
    if (totalCost == 0){
        e.preventDefault();
        hint.className = 'not-valid';
    }
    if (totalCost != 0){
        hint.className = 'valid';
    }
    const typedName = document.getElementById('name');
    const typedNameValue = typedName.value;
    const nameRegEx = /^[a-z ,.'-]+$/i  //regex borrowed from stack overflow: https://stackoverflow.com/questions/2385701/regular-expression-for-first-and-last-nam
    if(typedNameValue != ''){
        if (nameRegEx.test(typedNameValue)){      
            typedName.parentElement.className = 'valid';
            typedName.parentElement.lastElementChild.hidden = true;
        }
        else {
            typedName.parentElement.className = 'not-valid';
            typedName.parentElement.lastElementChild.className = 'not-valid';
            typedName.parentElement.lastElementChild.hidden = false;
            e.preventDefault();
        }
    }else{
        typedName.parentElement.className = 'not-valid';
        typedName.parentElement.lastElementChild.className = 'not-valid';
        typedName.parentElement.lastElementChild.hidden = false;
        e.preventDefault();
    }
    
    const cardNumVal = cardNumber.value;
    const ccRegEx = /^\d{13,16}$/; // regex updated based on project feedback
    // /(?:(\d)[ -]?){12,15}(\d)/ // regex (13-16 digits) borrowed from stack overflow: https://stackoverflow.com/questions/57290428/create-credit-card-regex
    if(cardNumVal != 0 || cc == true){
        if (ccRegEx.test(cardNumVal)){
            cardNumber.parentElement.className = 'valid';
            cardNumber.parentElement.lastElementChild.hidden = true;
        }
        else{
            cardNumber.parentElement.className = 'not-valid';
            cardNumber.parentElement.lastElementChild.className = 'not-valid';
            cardNumber.parentElement.lastElementChild.hidden = false;
            e.preventDefault();
        }
    }else if (cc == true){
        cardNumber.parentElement.className = 'not-valid';
        cardNumber.parentElement.lastElementChild.className = 'not-valid';
        cardNumber.parentElement.lastElementChild.hidden = false;
        e.preventDefault();
    }
    const zipCodeVal = zipCode.value;
    const zipRegEx = /\d{5}/i
    if(zipCodeVal != 0 || cc == true){
        if (zipRegEx.test(zipCodeVal)){
            zipCode.parentElement.className = 'valid';
            zipCode.parentElement.lastElementChild.hidden = true;
        }
        else{
            zipCode.parentElement.className = 'not-valid';
            zipCode.parentElement.lastElementChild.className = 'not-valid';
            zipCode.parentElement.lastElementChild.hidden = false;
            e.preventDefault()
        }
    }
    const cvvVal = cvv.value;
    const cvvRegEx = /\d{3}/i
    if(cvvVal != 0 || cc == true){
        if (cvvRegEx.test(cvvVal)){
            cvv.parentElement.className = 'valid';
            cvv.parentElement.lastElementChild.hidden = true;
        }
        else{
            cvv.parentElement.className = 'not-valid';
            cvv.parentElement.lastElementChild.className = 'not-valid';
            cvv.parentElement.lastElementChild.hidden = false;
            e.preventDefault();
        }
    }
});




