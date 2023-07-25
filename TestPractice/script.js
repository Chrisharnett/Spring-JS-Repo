const span = document.querySelector("span")

// Access elements using nodeValue property
const bElemText = span.firstChild.nodeValue;
const uElemText = span.firstChild.nextElementSibling.firstChild.nodeValue;
const iElemText = span.lastChild.firstChild.nodeValue;
//Using textContent property
const spanText = span.textContent;
console.log(spanText);