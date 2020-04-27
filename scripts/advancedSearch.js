function advancedForm() {
  if (document.getElementById('checkBox').checked) {
    document.getElementById('simpleform').style.visibility = 'hidden';
    document.getElementById('advancedform').style.visibility = 'visible';
  } else {
    document.getElementById('simpleform').style.visibility = 'visible';
    document.getElementById('advancedform').style.visibility = 'hidden';
  }
  console.log('condas')
}

function getBook() {
  var colletion = document.getElementById('books_collection')
  const titleInput = document.getElementById('title').value
  const authorInput =  document.getElementById('author').value
  var url =""
  if(titleInput != "" && authorInput != ""){
     url = 'https://www.googleapis.com/books/v1/volumes?q=+intitle:' +  titleInput +'+inauthor:'+authorInput +'&key=AIzaSyCfxVfRWs5eLZEwwiZemvp1iAwyAaHBHUQ'
  }
    if(authorInput == ""){
       url = 'https://www.googleapis.com/books/v1/volumes?q=+intitle:' +  titleInput +'&key=AIzaSyCfxVfRWs5eLZEwwiZemvp1iAwyAaHBHUQ'
    } else if(titleInput == ""){
       url = 'https://www.googleapis.com/books/v1/volumes?q=+inauthor:' +  authorInput +'&key=AIzaSyCfxVfRWs5eLZEwwiZemvp1iAwyAaHBHUQ'
    }
    

  
  console.log(url);
  fetch(url)
    .then(response => {
      return response.json()
    })
    .then(data => {

      for (i = 0; i < data.totalItems; i++) {
        const list = document.createElement('li')
        const collapsible_header = document.createElement('div')
        const collapsible_body = document.createElement('div')
        const title = document.createElement('p')
        const description = document.createElement('p')
        const img = document.createElement('img')
        list.setAttribute('class', 'collection-item avatar')
        collapsible_header.setAttribute('class', 'collapsible-header')
        collapsible_body.setAttribute('class', 'collapsible-body')
        img.setAttribute('src', data.items[i].volumeInfo.imageLinks.smallThumbnail)
        img.setAttribute('class', 'circle')
        img.setAttribute('style', 'position: absolute; padding-right: 25px; max-width:100px')
        var info = "Title: " + data.items[i].volumeInfo.title

        if (data.items[i].volumeInfo.authors != undefined) {
          info = "Title: " + data.items[i].volumeInfo.title + '\n Author:     ' + data.items[i].volumeInfo.authors[0];
        } else {
          var info = "Title: " + data.items[i].volumeInfo.title

        }
        title.innerText = info
        description.textContent = data.items[i].volumeInfo.description
        collapsible_header.appendChild(img)         //   <li>
        collapsible_header.appendChild(title)       //      <div>
        collapsible_body.appendChild(description)   //           \          
        list.appendChild(collapsible_header)        //        
        list.appendChild(collapsible_body)          //    


        colletion.appendChild(list)
      }
    })
    .catch(err => {
      const error = document.createElement('p')
      if (err.code != undefined) {
        error.setAttribute('style', "color: red")

        error.innerText = err.message;
        colletion.appendChild(error)
      }
    })
}

