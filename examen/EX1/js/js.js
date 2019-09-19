/*
1. Función que muestra y esconde la sección para hacer comentarios 
   al hacer click el botón 'Escribe una reseña'. 
   on click!
   (5 puntos)
*/
// Set 'seccion_comentario' como hidden por default
let seccion_comentario = $('#seccion_comentario');
let seccion_reviews = $('#seccion_reviews');
seccion_comentario.addClass('hidden');
$('#error_comment').addClass('hidden');
$('#escribe_reseña').click( _ => {
  seccion_comentario.toggleClass('hidden');
})

/*
2. Cargar los comentarios de el archivo comentarios.xml o bien de 
  https://tc2026daw.github.io/instrucciones/misc/comentarios.xml 
  (función ajax, 25 puntos)
*/
$.ajax({
  url: 'https://tc2026daw.github.io/instrucciones/misc/comentarios.xml',
  dataType: 'xml',
  success: response => {
    let comments = response.getElementsByTagName('comment');
    
    for (var i = 0; i < comments.length; i++) {   
      let comment = comments[i]
      let name = comment.children[0].firstChild.nodeValue;
      let text = comment.children[3].firstChild.nodeValue;
      let date = comment.children[2].firstChild.nodeValue;
      let stars = comment.children[1].firstChild.nodeValue;
      
      let textNode = document.createTextNode(name),
          nameEl = document.createElement('p'),
          div = document.createElement('div'),
          commentNode = document.createElement('p'),
          commentText = document.createTextNode(text),
          dateSpan = document.createElement('span'),
          dateNode = document.createTextNode(date);
  
        // Adds name
        nameEl.classList.add("nombre");
        nameEl.append(textNode);
        div.appendChild(nameEl);
        // Adds stars
        $(div).append(getStarsSpans(stars))

        // Adds date
        dateSpan.appendChild(dateNode);
        div.appendChild(dateSpan);
        // Adds comment
        commentNode.appendChild(commentText);
        div.appendChild(commentNode);
        div.classList.add('review');

      seccion_reviews.append(div)
    }   
    
  }
});

/*
3. Funcion que apendiza el nuevo comentario al darle click a PUBLICAR
  on click!
  (función, 35 puntos)
*/
$('#btn-publicar').click( _ => {
  
  let nombre = $('#nombre').val();

  let stars = $('input[name=rating]:checked').val();
  $('input[name=rating]:checked').removeAttr('checked')
  
  let email = $('#email').val();
  
  let comment = $('#comentario').text();
  $('#comentario').empty();
  let date = 'hace unos segundos'

  if(nombre && nombre.length >0 && comment && comment.length > 0){
    $('#error_comment').addClass('hidden');
  
    let textNode = document.createTextNode(nombre),
      nameEl = document.createElement('p'),
      div = document.createElement('div'),
      commentNode = document.createElement('p'),
      commentText = document.createTextNode(comment),
      dateSpan = document.createElement('span'),
      dateNode = document.createTextNode(date);
  
    // Adds name
    nameEl.classList.add("nombre");
    nameEl.append(textNode);
    div.appendChild(nameEl);
    // Adds stars
    $(div).append(getStarsSpans(stars))

    // Adds date
    dateSpan.appendChild(dateNode);
    div.appendChild(dateSpan);
    // Adds comment
    commentNode.appendChild(commentText);
    div.appendChild(commentNode);
    div.classList.add('review')
    seccion_reviews.append(div);
    $(':input', '#seccion_comentario')
      .not(':button, :submit, :reset, :hidden')
      .val('')
      .removeAttr('checked')
      .removeClass('checked')
  } else {
    $('#error_comment').removeClass('hidden')
  }

})

/*
4. Funcion que limpia el nombre, el email y el div "#comentarios" al darle
   click en "btn-limpiar" con leyenda de "CANCELAR"
   on click!
  (5 puntos)
*/
$('#btn-limpiar').click(_ => {
  $('#error_comment').addClass('hidden')
  $('#comentario').empty();
  $(':input', '#seccion_comentario')
    .not(':button, :submit, :reset, :hidden')
    .val('')
    .removeAttr('checked')
    .removeClass('checked');
})
/*
Funcion que recibe un numero de stars y regresa los 5 spans 
que simbolizan las estrellas del rating. por ejemplo:
let stars = 3;
let html = getStarsSpans(stars);

html = '
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
'
*/
function getStarsSpans(stars) {
  let new_html = '';
  for( let i = 0; i < stars; i++) {
    new_html += `
      <span class="fa fa-star checked"></span>
    `;
  }

  for ( let i = 0; i < 5 - stars; i++ ) {
    new_html += `
      <span class="fa fa-star"></span>
    `;
  }

  return new_html;
}
