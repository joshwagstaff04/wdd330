import{l as c,g as o}from"./utils-Df4u4WjJ.js";c();function n(){const t=o("so-cart"),a=t.map(e=>s(e));document.querySelector(".product-list").innerHTML=a.join(""),t.length>0&&l(t)}function s(t){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="/wdd330/${t.Image}"
      alt="${t.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${t.Name}</h2>
  </a>
  <p class="cart-card__color">${t.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${t.FinalPrice}</p>
</li>`}function l(t){const a=t.reduce((e,r)=>e+r.FinalPrice,0);document.querySelector(".cart-total span").textContent=a.toFixed(2),document.querySelector(".cart-footer").classList.remove("hide")}n();
