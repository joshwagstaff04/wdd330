import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

const myCheckout = new CheckoutProcess('so-cart', '.order-summary');
myCheckout.init();

document.querySelector('#zip').addEventListener('blur', myCheckout.calculateOrderTotal.bind(myCheckout));

document.querySelector('.checkout-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  if (form.checkValidity()) {
    myCheckout.checkout(form);
  } else {
    form.reportValidity();
  }
});
