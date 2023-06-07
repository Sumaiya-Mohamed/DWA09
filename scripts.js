import {BookPreview} from "./book-preview.js"
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'
import { html, ElementsUtils, previewElements, optionElements } from './helper-classes.js';

let page = 1;
let matches = books

/*books.forEach((book) => {
    const previewElement = previewElements.createPreviewElement(book);
    html.main.booksDiv.appendChild(previewElement);
  });
*/



  //This part of the code deals with the genre options and adds them to the 
//select field and also adds the All genres option.
const genreHtml = document.createDocumentFragment();
const firstGenreElement = document.createElement('option')
firstGenreElement.value = 'any';
firstGenreElement.innerText = 'All Genres'
genreHtml.appendChild(firstGenreElement);
html.search.genreSelect.appendChild(genreHtml)

Object.entries(genres).map(([value, text]) => {
    const genreOptions = optionElements.createOptionElement(value, text);
    html.search.genreSelect.appendChild(genreOptions);
  });
  


// This part of the code deals with adding all the author names as options in the select field
//  as well as adding the All Authors option.
const authorsHtml = document.createDocumentFragment()
const firstAuthorElement = document.createElement('option')
firstAuthorElement.value = 'any'
firstAuthorElement.innerText = 'All Authors'
authorsHtml.appendChild(firstAuthorElement)
html.search.authorSelect.appendChild(authorsHtml)

Object.entries(authors).map(([value, text]) =>{
    const authorOptions = optionElements.createOptionElement(value, text);
    html.search.authorSelect.appendChild(authorOptions)
})

// This part of the code handles the the day and night theme options. 
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.settings.settingsSelect.value = 'night'
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
} else {
    html.settings.settingsSelect.value = 'day'
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}


 html.main.loadMoreButton.innerHTML = `
    <span>Show more</span> 
`


 
  html.search.close.addEventListener('click', () => {
    html.search.overlay.open = false
})

  html.settings.close.addEventListener('click', () => {
    html.settings.overlay.open = false
})

  html.search.searchButton.addEventListener('click', () => {
    html.search.overlay.open = true 
    html.search.title.focus()
})

   html.settings.settingsButton.addEventListener('click', () => {
    html.settings.overlay.open = true 
})

     html.bookPreview.close.addEventListener('click', () => {
     html.bookPreview.overlay.open = false
})

/**
 * The function below handles the settings form and settings option.
 * @param {object} event 
 */
     const handleThemeSettings =  (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
    
    document.querySelector('[data-settings-overlay]').open = false
}
 
html.settings.form.addEventListener('submit', handleThemeSettings)

/** 
 * The function below deals with the search form and filter options.
 * @param {object} event
 * */ 
     const handleSearchForm =  (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []

    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

    page = 1;
    matches = result

    if (result.length < 1) { // Displays a message if the search filter is too narrow.
        html.main.message.classList.add('list__message_show')
    } else {
        html.main.message.classList.remove('list__message_show')
    }

    html.main.booksDiv.innerHTML = ''
    const newItems = document.createDocumentFragment()

    for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `

        newItems.appendChild(element)
    }

    html.main.booksDiv.appendChild(newItems)
    html.main.loadMoreButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1

    html.main.loadMoreButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `

    window.scrollTo({top: 0, behavior: 'smooth'});
    html.search.overlay.open = false
}

  html.search.form.addEventListener('submit', handleSearchForm)
   
   
    //This function handles the displaying of more books
    // and handles the show more button.

    const loadMoreBooks = () => {
    const fragment = document.createDocumentFragment()

    for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `

        fragment.appendChild(element)
    }

    html.main.booksDiv.appendChild(fragment)
    page += 1

    const startIndex = page * BOOKS_PER_PAGE; // get the starting index of the books to render
    const endIndex = startIndex + BOOKS_PER_PAGE; // get the ending index of the books to render

    html.main.loadMoreButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 0 // fixed the button error as > was used in place of <.

    html.main.loadMoreButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining">
     (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})
     </span>  
    `
    html.main.loadMoreButton.innerText = `Show more (${matches.length - endIndex})` 
}

html.main.loadMoreButton.addEventListener('click', loadMoreBooks)

// The code below handles displaying the active book's information.
   /*html.main.booksDiv.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            active = result
        }
    }
    
    if (active) {
        html.bookPreview.overlay.open = true
        html.bookPreview.Blur.src = active.image
        html.bookPreview.Image.src = active.image
        html.bookPreview.Title.innerText = active.title
        html.bookPreview.Subtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        html.bookPreview.description.innerText = active.description
    }
})*/