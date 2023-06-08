//@ts-check
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

/**
 * @typedef {Object} settingsProperties
 * @prop {HTMLButtonElement | null} settingsButton
 * @prop {HTMLDialogElement | null} overlay
 * @prop {HTMLFormElement | null} form
 * @prop {HTMLSelectElement | null} settingsSelect
 * @prop {HTMLButtonElement | null} close
 * @prop {HTMLButtonElement | null} submit
 */

/**
 * @typedef {Object} searchProperties
 * @prop {HTMLButtonElement | null} searchButton
 * @prop {HTMLDialogElement | null} overlay
 * @prop {HTMLFormElement | null} form
 * @prop {HTMLInputElement | null} title
 * @prop {HTMLSelectElement | null} genreSelect
 * @prop {HTMLSelectElement | null} authorSelect
 * @prop {HTMLButtonElement | null} close
 * @prop {HTMLButtonElement | null} submit
 */

/**
 * @typedef {Object} bookPreviewProperties
 * @prop {HTMLDialogElement | null} overlay
 * @prop {HTMLImageElement | null} Blur
 * @prop {HTMLImageElement | null} Image
 * @prop {HTMLHeadingElement | null} Title
 * @prop {HTMLDivElement | null} Subtitle
 * @prop {HTMLParagraphElement | null} description
 * @prop {HTMLButtonElement | null} close
 */

/**
 * @typedef {Object} mainProperties
 * @prop {HTMLDivElement | null} booksDiv
 * @prop {HTMLButtonElement | null} loadMoreButton
 * @prop {HTMLDivElement | null} message
 */

/**
 * @typedef {Object} HTMLObject
 * @prop {mainProperties} main
 * @prop {bookPreviewProperties} bookPreview
 * @prop {searchProperties} search
 * @prop {settingsProperties} settings
 */

/**
 * @type {HTMLObject} html - An object containing all the elements that were retrieved from
 *                           the DOM.
 */
 export const html = {
    main: {
       booksDiv: document.querySelector('[data-list-items]'),
       loadMoreButton: document.querySelector('[data-list-button]'),
       message: document.querySelector('[data-list-message]')
     },
    bookPreview: {
       overlay: document.querySelector('[ data-list-active]'),
       Blur: document.querySelector('[data-list-blur]'),
       Image: document.querySelector('[ data-list-image]'),
       Title: document.querySelector('[ data-list-title]'),
       Subtitle: document.querySelector('[data-list-subtitle]'),
       description: document.querySelector('[data-list-description]'),
       close: document.querySelector('[data-list-close]')
    },
    search: {
       searchButton: document.querySelector('[data-header-search]'),
       overlay: document.querySelector('[ data-search-overlay]'),
       form: document.querySelector('[data-search-form]'),
       title: document.querySelector('[data-search-title]'),
       genreSelect: document.querySelector('[data-search-genres]'),
       authorSelect: document.querySelector('[ data-search-authors]'),
       close: document.querySelector('[data-search-cancel]'),
       submit: document.querySelector('[data-search-submit]')
    },
    settings: {
     settingsButton: document.querySelector('[data-header-settings]'),
     overlay: document.querySelector('[ data-settings-overlay]'),
     form: document.querySelector('[data-settings-form]'),
     settingsSelect: document.querySelector('[data-settings-theme]'),
     close: document.querySelector('[data-settings-cancel]'),
     submit: document.querySelector('[ data-settings-submit]')
    },
 }
 


 
//This class creates the element with it's corresponding attributes and innerHtml
  export class ElementsUtils {
  static createElementsWithAttributes(tag, attributes, innerHTML) {
  // Because it's defined as a static method the method can be called without creating an object of the class.
    const element = document.createElement(tag);
    for(const [key, value] of Object.entries(attributes)){
      element.setAttribute(key, value);
    }
    element.innerHTML = innerHTML;
    return element
  }
}
 
 
//Class to create preview elements.
/* export class previewElements{
  static createPreviewElement(book){
    const {author, id, image, title } = book;
    const element = ElementsUtils.createElementsWithAttributes('button',{
      class: 'preview',
      'data-preview': id,
    });
    element.innerHTML = `
    <button>
    <img class="preview__image" src="${image}" />
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>
      </button>
      `
    return element 
  }
 }*/


  // Helper function to create option elements
  export class optionElements{
    static createOptionElement(value, text) {
    const attributes = {
      value: value,
    };
    return ElementsUtils.createElementsWithAttributes('option', attributes, text);
  }
}
 