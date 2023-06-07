import { books, authors } from './data.js';
import { html } from './helper-classes.js';

export class BookPreview extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    this.attachShadow({ mode: 'open' });

    // Define the HTML template
    this.shadowRoot.innerHTML = `
      <style>
      .preview {
        border-width: 0;
        width: 100%;
        font-family: Roboto, sans-serif;
        padding: 0.5rem 1rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        text-align: left;
        border-radius: 8px;
        border: 1px solid rgba(var(--color-dark), 0.15);
        background: rgba(var(--color-light), 1);
      }
      
      @media (min-width: 60rem) {
        .preview {
          padding: 1rem;
        }
      }
      
      .preview_hidden {
        display: none;
      }
      
      .preview:hover {
        background: rgba(var(--color-blue), 0.05);
      }
      
      .preview__image {
        width: 48px;
        height: 70px;
        object-fit: cover;
        background: grey;
        border-radius: 2px;
        box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
          0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
      }
      
      .preview__info {
        padding: 1rem;
      }
      
      .preview__title {
        margin: 0 0 0.5rem;
        font-weight: bold;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        color: rgba(var(--color-dark), 0.8)
      }
      
      .preview__author {
        color: rgba(var(--color-dark), 0.4);
      }
      </style>

      <button class="preview" type="button">
        <img class="preview__image" src="" alt="Book Cover" />
        <div class="preview__info">
          <h3 class="preview__title"></h3>
          <div class="preview__author"></div>
        </div>
      </button>
    `;
  }

  connectedCallback() {
    // Retrieve the book data from the element's attributes
    const bookId = this.dataset.bookId;

    // Retrieve the book details from the books object
    const book = books[bookId];

    if (book) {
      // Update the content of the book preview
      const previewButton = this.shadowRoot.querySelector('.preview');
      const previewImage = this.shadowRoot.querySelector('.preview__image');
      const previewTitle = this.shadowRoot.querySelector('.preview__title');
      const previewAuthor = this.shadowRoot.querySelector('.preview__author');

      previewButton.setAttribute('data-bookId', bookId);
      previewImage.src = book.image;
      previewTitle.textContent = book.title;
      previewAuthor.textContent = authors[book.author];

      previewButton.addEventListener('click', () => {
        html.bookPreview.overlay.open = true;
        html.bookPreview.overlay.Blur.src = book.image;
        html.bookPreview.overlay.Image.querySelector('img').src = book.image;
        html.bookPreview.overlay.Title.textContent = book.title;
        html.bookPreview.overlay.Subtitle.textContent = `${authors[book.author]} (${new Date(book.published).getFullYear()})`;
        html.bookPreview.overlay.Description.textContent = book.description;
      });
    }
  }
}

// Define the custom element
customElements.define('book-preview', BookPreview);

// Loop through the books object and create a book-preview element for each book
for (const bookId in books) {
  // Create a new book-preview element
  const bookPreview = document.createElement('book-preview');

  // Set the bookId attribute for the element
  bookPreview.dataset.bookId = bookId;

  // Append the element to the document body or any other container element
  html.main.booksDiv.appendChild(bookPreview);
}

// Add event listener to the booksDiv element
html.main.booksDiv.addEventListener('click', (event) => {
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  for (const node of pathArray) {
    if (active) break;

    if (node?.dataset?.bookId) {
      const bookId = node.dataset.bookId;
      active = books[bookId];
    }
  }

  if (active) {
    html.bookPreview.overlay.open = true;
    html.bookPreview.overlay.Blur.src = book.image;
    html.bookPreview.overlay.Image.src = book.image;
    html.bookPreview.overlay.Title.textContent = book.title;
    html.bookPreview.overlay.Subtitle.textContent = `${authors[book.author]} (${new Date(book.published).getFullYear()})`;
    html.bookPreview.overlay.Description.textContent = book.description;
  }

})