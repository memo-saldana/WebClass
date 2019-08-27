let submitButton = document.getElementById('btnSubmit');

console.log('submitButton :', submitButton);
submitButton.addEventListener('click', () => {
  let name = document.getElementById('name');
  if(name.value == "") {
    name.classList.remove('hidden');
  } else {
    name.classList.add('hidden')
  }
});