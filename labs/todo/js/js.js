let itemInput = document.getElementById('newitem'),
    list = document.getElementById('todoList'),
    checkBoxes = document.getElementsByName('todo');

itemInput.addEventListener('keyup', event => {
  if(event.keyCode == 13) {
    let textNode = document.createTextNode(itemInput.value),
        listItem = document.createElement('li'),
        textSpan = document.createElement('span'),
        check = document.createElement('input');
    
    textSpan.appendChild(textNode);
    check.setAttribute("type", "checkbox");
    check.setAttribute("name", "todo");
    listItem.appendChild(check);
    listItem.appendChild(textSpan);
    listItem.addEventListener('click', event => {
      if(check.checked){
        textSpan.classList.add('done');
      } else {
        textSpan.classList.remove('done');
      }
    })
    list.appendChild(listItem);
    itemInput.value = '';
  }
});

checkBoxes.forEach(input => {
  input.addEventListener('click', event => {
    if(input.checked){
      input.nextElementSibling.classList.add('done');
    } else {
      input.nextElementSibling.classList.remove('done');
    }
  })
});