const searchForm = document.getElementById('search-form');
const resultsContainer = document.getElementById('results-container');
const errorMessage = document.getElementById('error-message');
const loadingState = document.getElementById('loading-state');
const clearButton = document.getElementById('clear-button');
const previouslyViewedContainer = document.getElementById('previously-viewed-container'); 

const MAX_PREVIOUSLY_VIEWED = 5;
let previouslyViewedItems = [];

// Event listener 1 for the "submit" button, main container for the code
searchForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = event.target.name.value;
  const formattedName = name.replace(/ /g, "_").toLowerCase(); // API has underscores for all values with a space. Adding in an underscore so the user will not have to type this in

  loadingState.style.display = 'block';
  resultsContainer.innerHTML = '';
  errorMessage.textContent = '';

  fetch(`https://botw-compendium.herokuapp.com/api/v2/entry/${formattedName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error occurred. Search was not found at https://botw-compendium.herokuapp.com/api/v2'); // throw error immediately if the data is not in the API
      }
      return response.json();
    })
    .then(data => {
      if (data.error) {
        throw new Error(data.error);
      }

      // display elements from HTML file
      const product = data.data;
      loadingState.style.display = 'none';
      const productName = document.createElement('h2');
      productName.textContent = product.name;
      const productImage = document.createElement('img');
      productImage.src = product.image;
      const productDescription = document.createElement('h3');
      productDescription.textContent = product.description;
      resultsContainer.appendChild(productName);
      resultsContainer.appendChild(productImage);
      resultsContainer.appendChild(productDescription);
      addToPreviouslyViewed(formattedName);
      updatePreviouslyViewed();
    })
    .catch(error => {
      console.error('Error:', error);
      resultsContainer.innerHTML = '';
      errorMessage.textContent = error.message;
      loadingState.style.display = 'none';
    });
});
// Event listener 2 for the "clear" button
clearButton.addEventListener('click', function() {
  searchForm.reset();
  resultsContainer.innerHTML = '';
  errorMessage.textContent = '';
  previouslyViewedContainer.innerHTML = '';
  previouslyViewedItems = [];
});
// Event listener 3 for the previously viewed section
previouslyViewedContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('previously-viewed-item')) {
    const clickedItem = event.target.dataset.item;
    if (clickedItem) {
      const nameInput = document.getElementById('name');
      nameInput.value = clickedItem;
    }
  }
});
// Add image to previously viewed section
function addToPreviouslyViewed(item) {
  previouslyViewedItems = previouslyViewedItems.filter(prevItem => prevItem !== item);
  previouslyViewedItems.unshift(item);
  if (previouslyViewedItems.length > MAX_PREVIOUSLY_VIEWED) {
    previouslyViewedItems.pop();
  }
};
//Update previously viewed section with proper item name and image
function updatePreviouslyViewed() {
  previouslyViewedContainer.innerHTML = '';
  previouslyViewedItems.forEach(item => {
    const img = document.createElement('img');
    img.src = `https://botw-compendium.herokuapp.com/api/v2/entry/${item}/image`;
    img.alt = 'Previously Viewed';
    const itemName = item.replace(/_/g, ' ');
    const name = document.createElement('p');
    name.textContent = itemName;
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('previously-viewed-item');
    itemContainer.dataset.item = item;
    itemContainer.appendChild(name);
    itemContainer.appendChild(img);
    previouslyViewedContainer.appendChild(itemContainer);
  });
};