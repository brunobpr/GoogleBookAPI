function advancedForm() {
  if (document.getElementById('checkBox').checked) {
    document.getElementById('simpleform').style.visibility = 'hidden';
    document.getElementById('advancedform').style.visibility = 'visible';
  } else {
    document.getElementById('simpleform').style.visibility = 'visible';
    document.getElementById('advancedform').style.visibility = 'hidden';
  }
}

function getBook() {

  var results = document.getElementById('results');

  if (results.childNodes[0] != undefined) {
    results.removeChild(results.childNodes[0])
  }


  const colletion = document.createElement('ul')
  colletion.setAttribute('class', 'collection col s6 offset-s2')
  results.appendChild(colletion)

  const titleInput = document.getElementById('title').value
  const authorInput = document.getElementById('author').value
  var url = ""
  if (titleInput != "" && authorInput != "") {
    url = 'https://www.googleapis.com/books/v1/volumes?q=+intitle:' + titleInput + '+inauthor:' + authorInput + '&key=AIzaSyCfxVfRWs5eLZEwwiZemvp1iAwyAaHBHUQ'
  }
  if (authorInput == "") {
    url = 'https://www.googleapis.com/books/v1/volumes?q=+intitle:' + titleInput + '&key=AIzaSyCfxVfRWs5eLZEwwiZemvp1iAwyAaHBHUQ'
  } else if (titleInput == "") {
    url = 'https://www.googleapis.com/books/v1/volumes?q=+inauthor:' + authorInput + '&key=AIzaSyCfxVfRWs5eLZEwwiZemvp1iAwyAaHBHUQ'
  }



  console.log(url);
  fetch(url)
  .then(response => {
    return response.json()
  })
  .then(data => {
    if (data.totalItems > 0) {
      for (i = 0; i < data.totalItems; i++) {
        const list = document.createElement('li')
        const span = document.createElement('span')
        const p = document.createElement('p')
        const img = document.createElement('img')
        const a = document.createElement('a')
        const button = document.createElement('i')

        list.setAttribute('class', 'collection-item avatar')
        span.setAttribute('class', 'title')
        if(data.items[i].volumeInfo.imageLinks != undefined){
        img.setAttribute('src', data.items[i].volumeInfo.imageLinks.smallThumbnail)}
        img.setAttribute('class', 'circle')
        a.setAttribute('class', 'btn-floating btn-large waves-effect waves-light red')         
        button.setAttribute('class', 'material-icons')
        button.innerText = 'shop';         
        var info = "Title: " + data.items[i].volumeInfo.title
        if (data.items[i].volumeInfo.authors != undefined){
          info = info + '\n Author:     ' + data.items[i].volumeInfo.authors[0];
        } 
        if(data.items[i].volumeInfo.publisher != undefined){
          info = info + '\n Publisher:    ' + data.items[i].volumeInfo.publisher;
          publisher = data.items[i].volumeInfo.publisher;
        }
        if(data.items[i].volumeInfo.categories != undefined){
          info = info + '\n Category:    ' + data.items[i].volumeInfo.categories[0];
        }
        if(data.items[i].volumeInfo.publishedDate != undefined){
          var date = data.items[i].volumeInfo.publishedDate
          info = info + '\n Year:    ' + date.substring(0, 4);
        }
       a.setAttribute('style', 'margin-top: -80px')
        a.setAttribute('href', 'https://www.amazon.co.uk/s?k='+title+" "+author+'&ref=nb_sb_noss_2')
        a.setAttribute('target', '_blank')
        p.innerText = info         
        list.appendChild(img)      
        list.appendChild(p)
        p.appendChild(a)
        colletion.appendChild(list)
        a.appendChild(button)
      }
    } else { 
      const error = document.createElement('p')
      error.setAttribute('style', "color: white; text-align: center")
      error.innerText = 'Please, try again! \n Your search returned 0 item! :(';
      colletion.appendChild(error)
    }
    }
  )
  .catch(err => {
    console.log(err)
    const error = document.createElement('p')
    if (err.code != undefined) {
      error.setAttribute('style', "color: red")
      error.innerText = err.message;
      colletion.appendChild(error)
    }

  })
}

