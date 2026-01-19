import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const existing = getLocalStorage('so-cart');
    const cart = Array.isArray(existing) ? existing : [];

    console.log('Cart BEFORE:', cart);
    console.log('Adding:', this.product.Name);

    cart.push(this.product);
    console.log('Cart AFTER:', cart);
    
    setLocalStorage('so-cart', cart);
  }

  renderProductDetails() {
    document.querySelector('.product-detail h3').textContent = this.product.Brand.Name;
    document.querySelector('.product-detail h2').textContent = this.product.NameWithoutBrand;
    document.querySelector('.product-detail img').src = this.product.Image;
    document.querySelector('.product-detail img').alt = this.product.Name;
    document.querySelector('.product-card__price').textContent = `$${this.product.FinalPrice}`;
    document.querySelector('.product__color').textContent = this.product.Colors[0].ColorName;
    document.querySelector('.product__description').innerHTML = this.product.DescriptionHtmlSimple;
    document.querySelector('#addToCart').dataset.id = this.product.Id;
  }
}

