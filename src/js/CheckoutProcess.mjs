import { getLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    return {
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: 1
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    const summaryElement = document.querySelector(this.outputSelector + ' #cartTotal');
    const itemNumElement = document.querySelector(this.outputSelector + ' #num-items');
    this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);
    summaryElement.innerText = this.itemTotal.toFixed(2);
    itemNumElement.innerText = this.list.length;
  }

  calculateOrderTotal() {
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = this.itemTotal * 0.06;
    this.orderTotal = this.itemTotal + this.shipping + this.tax;
    
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(this.outputSelector + ' #tax');
    const shipping = document.querySelector(this.outputSelector + ' #shipping');
    const orderTotal = document.querySelector(this.outputSelector + ' #orderTotal');
    tax.innerText = this.tax.toFixed(2);
    shipping.innerText = this.shipping.toFixed(2);
    orderTotal.innerText = this.orderTotal.toFixed(2);
  }

  async checkout(form) {
    const formData = formDataToJSON(form);
    formData.orderDate = new Date().toISOString();
    formData.orderTotal = this.orderTotal.toFixed(2);
    formData.tax = this.tax.toFixed(2);
    formData.shipping = this.shipping;
    formData.items = packageItems(this.list);
    try {
      const res = await services.checkout(formData);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }
}
