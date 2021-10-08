// variables
const main = document.querySelector('main');
let details = document.querySelector('.details');
let close = document.querySelector('#close');
let aside = document.querySelector('aside');
let favorite = document.querySelector('#favorite')
const array = []

let detailsTitle = document.querySelector('.details__title')
let detailsYear = document.querySelector('.details__pubyear')
let detailsDesc = document.querySelector('.details__desc')


const displayBooks = () => {
   fetch(`https://openlibrary.org/search.json?q=gorey&author_key=OL25895A`)
    .then(res => res.json())
    .then(res => {
        // iterate through book objects
        for (let i = 0; i < 20; i++) {

            // get book at random index
            const book = res.docs[Math.floor(Math.random()*res.docs.length)]
            const title = book.title;

                // check if it has a cover
                if(book.cover_i) {
                    // create book container and book cover
                    // const bookContainer = document.createElement('article')
                    const bookCover = document.createElement('img')

                    // append book container to main
                    main.appendChild(bookCover)

                    bookCover.setAttribute('src', `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`)
                    bookCover.setAttribute('alt', title)

                // open the menu by adding an event listener to the icon
                // when the icon is clicked, add the CSS-defined class 'menu-open' to the menu itself
                // 'menu-open' makes the menu opaque and slides it in from the right (100% --> 0% on the x-axis)

                bookCover.addEventListener('click', () => {
                    fetch(`https://openlibrary.org${book.key}.json`)
                    .then(res => res.json())
                    .then(res => {
                        detailsTitle.innerText = res.title;
                        if(res.first_publish_date) {
                            detailsYear.innerText = res.first_publish_date;
                        } else {
                            detailsYear.innerText = 'mystery year'
                        }

                        // show description if there is one
                        if(res.description) {
                            detailsDesc.innerText = res.description.value;
                        } else if (res.first_sentence) {
                            detailsDesc.innerText = res.first_sentence.value;
                        } else {
                            detailsDesc.innerText = 'this work defies description'
                        }
                    })

                    aside.classList.add('details-open');
                })

                // LOOK AT THIS https://www.kirupa.com/html5/storing_and_retrieving_an_array_from_local_storage.htm

                // const getItems = () => {
                //     // initialize array for bookbag
                //     let bookbag = [];
                //     // grab data from localStorage ("bookbag" is a div id)
                //     let bookbagString = localStorage.getItem("bookbag");
                //     // convert what's in localStorage to JSON
                //     if(bookbagString !== null) {
                //     bookbag = JSON.parse(bookbagString);
                //     }
                //     return bookbag;
                // }
                
                // const add = () => {
                //     // let bookbag = getItems();
                //     let bookbagArr = []
                //     // get the book the user saved from the details panel. . . . .
                
                //     // push to todos array defined above from localStorage
  
                //         bookbagArr.push(detailsTitle); // cover & title
                //         // localStorage.setItem("bookbag", JSON.stringify(bookbag));
                //         // show();
                //     }
                
                // const show = () => {
                //     // let bookbag = getItems();
                //     console.log(`this is from show`)
                //     // start html
                //     let html = '<ul>';
                //     // add each todo item + button to string as an <li>
                //     for(let i = 0; i < bookbag.length; i++) {
                //         html += '<li>' + bookbag[i] + ' ' + '<button class="remove-item" id="' + i + '">Remove</button><hr></li>';
                //     }
                //     // end html
                //     html += '</ul>';
                
                //     document.getElementById("bookbag").innerHTML = html;
                
                //     // remove button: retrieve all the Remove buttons and iterate over them to add event listeners that invoke the remove method on an individual Remove button, upon click or enter
                //     let removeButtons = document.getElementsByClassName("remove-item");
                //     for (let i = 0; i < removeButtons.length; i++) {
                //         removeButtons[i].addEventListener("click", remove);
                //     }
                // }
                
                // when the user clicks on a remove button, remove it from a new array, set the new array in localStorage and display it
                // const remove = () => {
                //     let newTodos = getItems();
                //     newTodos.splice(this.id, 1);
                //     localStorage.setItem("bookbag", JSON.stringify(bookbag));
                //     show();
                // }
                
                // // show any existing todos first
                // show();

                // favorite.addEventListener('click', () => {
                //     console.log(array)
                //     add()

                // // add item: trigger on click and on enter
                // // favorite.addEventListener("keyup", function(event) {
                // //     if (event.key === "Enter") {
                // //         event.preventDefault();
                // //         add();
                // //     } else {
                // //         favorite.addEventListener("click", add);
                // //     }
                // // });

                // })
            }
        }
    })
}

displayBooks()

// close the menu by removing the 'details-open' class from the menu
close.addEventListener('click', () => {
    aside.classList.remove('details-open');
});

/* TODOS
---
- implement bookbag add/remove functionality
- make images keyboard accessible
- test w/ screen reader
- fix close/fav buttons
- update colors
- link to openlibrary page
- use author_alternative_name for welcome msg
- add some more info about gorey to make it a real tribute
- randomize the quote?
*/