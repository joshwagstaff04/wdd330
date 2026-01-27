import{r as c,l as i,a as o}from"./utils-Df4u4WjJ.js";import{P as n}from"./ProductData-8k7b23-H.js";function d(t){return`<li class="product-card">
    <a href="../product_pages/?product=${t.Id}">
      <img
        src="${t.Images.PrimaryMedium}"
        alt="${t.Name}"
      />
      <h3 class="card__brand">${t.Brand.Name}</h3>
      <h2 class="card__name">${t.NameWithoutBrand}</h2>
      <p class="product-card__price">$${t.FinalPrice}</p>
    </a>
  </li>`}class l{constructor(a,r,s){this.category=a,this.dataSource=r,this.listElement=s}async init(){const a=await this.dataSource.getData(this.category);this.renderList(a)}renderList(a){c(d,this.listElement,a)}}i();const e=o("category"),m=new n,u=document.querySelector(".product-list"),h=new l(e,m,u);h.init();document.querySelector(".products h2").textContent=`Top Products: ${e}`;
