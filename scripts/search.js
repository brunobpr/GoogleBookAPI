//This function is intended to fetch a book from Google Book API and display to the usar
//It is called from the submit button from the simple form
//It will use any word to search for a book
//Only the first 10 are shown
function getBooks() {
  //Get the <div id='results'> that holds the list
  var results = document.getElementById('results');
  //Get the <div id='results'> that holds the list
  var results = document.getElementById('results');
  //Cleaning the previous result if any
  if (results.childNodes[0] != undefined) {
    results.removeChild(results.childNodes[0])
  }
  //Creating a new unordered list <ul>
  const colletion = document.createElement('ul')
  //Set the classe to the <ul>
  colletion.setAttribute('class', 'collection col s6 offset-s2')
  //Add to the DIV id
  results.appendChild(colletion)
  // Get the input
  const book = document.getElementById('search').value

  fetch('https://www.googleapis.com/books/v1/volumes?q=' + book + '&key=AIzaSyCfxVfRWs5eLZEwwiZemvp1iAwyAaHBHUQ')
    .then(response => {
      return response.json()
    })
    .then(data => {
      //If there is at least one result loop through all of them 
      if (data.totalItems > 0) {
        for (i = 0; i < data.totalItems; i++) {
          //Those are the components to build materializecss collection component
          //See more at : https://materializecss.com/collections.html
          //Create a <li>
          const list = document.createElement('li')
          //Create a <span>
          const span = document.createElement('span')
          //Create a <p>
          const p = document.createElement('p')
          //Create a <img>
          const img = document.createElement('img')
          //Create a <li>
          const a = document.createElement('a')
          //Create a <i>
          const button = document.createElement('i')
          //Defining classes to the components for the collections
          list.setAttribute('class', 'collection-item avatar')
          span.setAttribute('class', 'title')
          img.setAttribute('class', 'circle')
          a.setAttribute('class', 'btn-floating btn-large waves-effect waves-light red')
          button.setAttribute('class', 'material-icons')
          //If there is a image thumgbail, define it as a logo
          if (data.items[i].volumeInfo.imageLinks != undefined) {
            img.setAttribute('src', data.items[i].volumeInfo.imageLinks.smallThumbnail)
          }
          //Defining the material-icons for the button
          button.innerText = 'shop';
          //The info variable stores the information of the book
          //First, add the title to it
          var info = "Title: " + data.items[i].volumeInfo.title
          //Store the title to pass it to the Amazon url
          title = data.items[i].volumeInfo.title
          //If there is a author add it to the info
          if (data.items[i].volumeInfo.authors != undefined) {
            info = info + '\n Author:     ' + data.items[i].volumeInfo.authors[0];
            //Store the author to pass it to the Amazon url
            author = data.items[i].volumeInfo.authors[0];
          }
          //If there is a publisher add it to the info
          if (data.items[i].volumeInfo.publisher != undefined) {
            info = info + '\n Publisher:    ' + data.items[i].volumeInfo.publisher;
            publisher = data.items[i].volumeInfo.publisher;
          }
          //If there is a category add it to the info
          if (data.items[i].volumeInfo.categories != undefined) {
            info = info + '\n Category:    ' + data.items[i].volumeInfo.categories[0];
          }
          //If there is a published date add it to the info
          if (data.items[i].volumeInfo.publishedDate != undefined) {
            var date = data.items[i].volumeInfo.publishedDate
            info = info + '\n Year:    ' + date.substring(0, 4);
          }
          // <a> is the red cicle button 
          a.setAttribute('style', 'margin-top: -80px')
          // This link will send the usar to the amazon site to buy the book
          a.setAttribute('href', 'https://www.amazon.co.uk/s?k=' + title + " " + author + '&ref=nb_sb_noss_2')
          // To open a new window
          a.setAttribute('target', '_blank')
          //Add all the info regarding the book to the <p>
          p.innerText = info
          // Nesting the elements as:
          // <li> 
          // ----<img>
          // ----<p>
          // ----<a><i>
          list.appendChild(img)
          list.appendChild(p)
          p.appendChild(a)
          colletion.appendChild(list)
          a.appendChild(button)
        }
        //If no books were found, display an message to the user
      } else {
        const error = document.createElement('p')
        error.setAttribute('style', "color: white; text-align: center")
        error.innerText = 'Please, try again! \n Your search returned 0 item! :(';
        colletion.appendChild(error)
      }
    }
    )
    //If any error occurs, display a red error message to the user
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

