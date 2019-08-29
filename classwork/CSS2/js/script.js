let submitButton = document.getElementById('btnSubmit');

console.log('submitButton :', submitButton);
submitButton.addEventListener('click', () => {
  let name = document.getElementById('name');
  if(name.value == "") {
    name.classList.remove('hidden');
  } else {
    name.classList.add('hidden')
  }
  // validar correo
  let email = document.getElementById('email');
  let emailError = document.getElementById('emailError');

  if(email.value == "") {
    emailError.classList.remove('hidden');
  } else {
    if( validaEmail(email.value)) {
      emailError.classList.add('hidden');
    } else {
      emailError.textContent = 'Tu email no es valido'
    }
  }

  // validar passwords
  let password = document.getElementById('password');
  let passwordError = document.getElementById('passwordError');
  let passwordConfirmation = document.getElementById('passwordConfirmation');;
  let passwordConfirmationError = 
    document.getElementById('passwordConfirmationError');

  if(password.value == "") {
    passwordError.classList.remove('hidden');
  } else {
    passwordError.classList.add('hidden');
  }

  if(password.value != passwordConfirmation.value ){ 
    passwordConfirmationError.classList.remove('hidden');
  } else {
    passwordConfirmationError.classList.add('hidden');
  }

  let country = document.getElementById('country');
  let countryError = document.getElementById('countryError');

  if(country.value == 0) {
    countryError.classList.remove('hidden');
  } else {
    countryError.classList.add('hidden');
  }

  let radios = document.getElementsByName('gender');
  let genderError = document.getElementById('genderError')
  let flag = false;

  for(let i=0; i< radios.length; ++i ) {
    if( radios[i].checked ) {
      flag = true;
    }
  }

  if(!flag) {
    genderError.classList.remove('hidden');
  } else {
    genderError.classList.add('hidden');
  }
});

function validaEmail(email) {
  var regexpEmail = /\S+@\S+\.\S+/;
  return regexpEmail.test(email);
}
