import { getLocalStorage, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  
  if (cartItems.length > 0) {
    displayCartTotal(cartItems);
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${import.meta.env.BASE_URL}${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-remove" data-id="${item.Id}">X</span>
</li>`;

  return newItem;
}

function displayCartTotal(cartItems) {
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  document.querySelector('.cart-total span').textContent = total.toFixed(2);
  document.querySelector('.cart-footer').classList.remove('hide');
}

function removeFromCart(id) {
  const cartItems = getLocalStorage('so-cart');
  const updatedCart = cartItems.filter((item) => item.Id !== id);
  localStorage.setItem('so-cart', JSON.stringify(updatedCart));
  renderCartContents();
}

document.querySelector('.product-list').addEventListener('click', function(e) {
  if (e.target.classList.contains('cart-remove')) {
    const itemId = e.target.getAttribute('data-id');
    removeFromCart(itemId);
  }
});

renderCartContents();
