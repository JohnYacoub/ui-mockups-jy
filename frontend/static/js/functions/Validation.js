const form = document.querySelector('#form');
const errorDiv = document.querySelector('#show-error');
const username = document.querySelector('#name');
const website= document.querySelector('#website');
const email = document.querySelector('#email'); 
const phone = document.querySelector('#phone'); 
const phoneReg = '^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$';
// console.log("I runn")


document.addEventListener('onchange', (error) => {
    // All validation checks are run in this method.   
console.log("i ran")
    let incorrectInput = '';
    const firstLetter = username.value[0];
    const firstLetterIsUpperCase = (firstLetter === firstLetter.toUpperCase()); 
    
    if (!firstLetterIsUpperCase) {
        incorrectInput += ' The first letter of username must be uppercase.\n';
    }
  
    if(!phone.value.match(phoneReg) ){
      incorrectInput += ' Please add valid phone number.\n';
    }
    if (incorrectInput !== "") {
      // Change the error div tag to display the error message(s)
      errorDiv.innerText = incorrectInput; 
      // Change the color of the text to red
      errorDiv.style.color = 'red'; 
      // Prevent the form button from submitting again, before fixing the issues
      error.preventDefault(); 
    }
  })





