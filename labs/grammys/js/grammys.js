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
  nominees.append(`<span> ${currentField.description? currentField.description: ''} </span>`);
  
  currentField.categories.forEach(category => {
    nominees.append(`<h3> ${category.category_name} </h3>`);
    nominees.append(`<p class="description"> ${category.description} </p>`);
    nominees.append(`<h4> Nominees: </4>`);
    nominees.append(`<ul>`);

    category.nominees.forEach((nominee,i) => {
      nominees.append(`<li class="${i == category.winner_id ? 'winner': ''}"> ${nominee.nominee} - ${nominee.artist}: ${nominee.info} </li>`)
    });
    nominees.append(`</ul>`);
  })
})