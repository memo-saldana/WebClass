let dropdown = $('#category_types'),
    fields;

$.getJSON('./data/grammys.json', data => {
  fields = data.fields;
  fields.forEach(field => {
    dropdown.append(`<option value="${field.field_id}"> ${field.field} </option>`);
  })
})

dropdown.change( _ => {
  let nominees = $('#nominees_section')
  let fieldId = dropdown.val();
  let currentField = fields[fieldId-1];

  nominees.html(`<h2> ${currentField.field} </h2>`);
  nominees.append(`<p class="description"> ${currentField.description? currentField.description: ''} </p>`);
  
  currentField.categories.forEach(category => {
    nominees.append(`<h3> ${category.category_name} </h3>`);
    nominees.append(`<p class="description"> ${category.description} </p>`);
    nominees.append(`<ul>`);
//  - ${nominee.artist}: ${nominee.info} 
    category.nominees.forEach((nominee,i) => {
      nominees.append(`<li> <h4 class="${i == category.winner_id ? 'winner': ''}">${nominee.nominee}  </h4> ${i == category.winner_id? '<span>WINNER!</span>': ''}</li>`);
      nominees.append(`<p> ${nominee.artist}`);
      nominees.append(`<p> ${nominee.info}`);
    });
    nominees.append(`</ul>`);
  })
})