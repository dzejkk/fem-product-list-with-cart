/*data and variables */
const data = [
    {
      image: {
        thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
        mobile: "./assets/images/image-waffle-mobile.jpg",
        tablet: "./assets/images/image-waffle-tablet.jpg",
        desktop: "./assets/images/image-waffle-desktop.jpg",
      },
      id: 0,
      name: "Waffle with Berries",
      category: "Waffle",
      price: 6.5,
    },
    {
      image: {
        thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
        mobile: "./assets/images/image-creme-brulee-mobile.jpg",
        tablet: "./assets/images/image-creme-brulee-tablet.jpg",
        desktop: "./assets/images/image-creme-brulee-desktop.jpg",
      },
      id: 1,
      name: "Vanilla Bean Crème Brûlée",
      category: "Crème Brûlée",
      price: 7.0,
    },
    {
      image: {
        thumbnail: "./assets/images/image-macaron-thumbnail.jpg",
        mobile: "./assets/images/image-macaron-mobile.jpg",
        tablet: "./assets/images/image-macaron-tablet.jpg",
        desktop: "./assets/images/image-macaron-desktop.jpg",
      },
      id: 2,
      name: "Macaron Mix of Five",
      category: "Macaron",
      price: 8.0,
    },
    {
      image: {
        thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg",
        mobile: "./assets/images/image-tiramisu-mobile.jpg",
        tablet: "./assets/images/image-tiramisu-tablet.jpg",
        desktop: "./assets/images/image-tiramisu-desktop.jpg",
      },
      id: 3,
      name: "Classic Tiramisu",
      category: "Tiramisu",
      price: 5.5,
    },
    {
      image: {
        thumbnail: "./assets/images/image-baklava-thumbnail.jpg",
        mobile: "./assets/images/image-baklava-mobile.jpg",
        tablet: "./assets/images/image-baklava-tablet.jpg",
        desktop: "./assets/images/image-baklava-desktop.jpg",
      },
      id: 4,
      name: "Pistachio Baklava",
      category: "Baklava",
      price: 4.0,
    },
    {
      image: {
        thumbnail: "./assets/images/image-meringue-thumbnail.jpg",
        mobile: "./assets/images/image-meringue-mobile.jpg",
        tablet: "./assets/images/image-meringue-tablet.jpg",
        desktop: "./assets/images/image-meringue-desktop.jpg",
      },
      id: 5,
      name: "Lemon Meringue Pie",
      category: "Pie",
      price: 5.0,
    },
    {
      image: {
        thumbnail: "./assets/images/image-cake-thumbnail.jpg",
        mobile: "./assets/images/image-cake-mobile.jpg",
        tablet: "./assets/images/image-cake-tablet.jpg",
        desktop: "./assets/images/image-cake-desktop.jpg",
      },
      id: 6,
      name: "Red Velvet Cake",
      category: "Cake",
      price: 4.5,
    },
    {
      image: {
        thumbnail: "./assets/images/image-brownie-thumbnail.jpg",
        mobile: "./assets/images/image-brownie-mobile.jpg",
        tablet: "./assets/images/image-brownie-tablet.jpg",
        desktop: "./assets/images/image-brownie-desktop.jpg",
      },
      id: 7,
      name: "Salted Caramel Brownie",
      category: "Brownie",
      price: 4.5,
    },
    {
      image: {
        thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg",
        mobile: "./assets/images/image-panna-cotta-mobile.jpg",
        tablet: "./assets/images/image-panna-cotta-tablet.jpg",
        desktop: "./assets/images/image-panna-cotta-desktop.jpg",
      },
      id: 8,
      name: "Vanilla Panna Cotta",
      category: "Panna Cotta",
      price: 6.5,
    },
  ];
  
  const cardContainer = document.querySelector(".product-contianer");
  const productsContainer = document.getElementById("cart-product-contianer");
  const cartTotal = document.getElementById("total");
  const numberCart = document.getElementById("number-cart");
  /*data and variables */
  
  /*Initial Create of  dom elements */
  
  cardContainer.innerHTML = data
    .map(
      (item) =>
        `<div class="card">
                   <img src=${item.image.desktop} alt="image-wafle" />
      
                     <button class="add-to-cart-btn" id=${
                       item.id
                     }>Add to cart</button>
                  
                   <p class="card-title">${item.category}</p>
                   <h2 class="card-header">${item.name}</h2>
                   <p class="price">$${item.price.toFixed(2)}</p>
            </div>`
    )
    .join("");
  
  /*Cart Logic - Closure try*/
  
  function CreateCart() {
    let items = [];
    let total = 0;
  
    return {
      addItem(id, data) {
        const product = data.find((item) => item.id === id);
        const { name, price } = product;
        items.push(product);
  
        const totalCountPerProduct = {};
        items.forEach((dessert) => {
          totalCountPerProduct[dessert.id] =
            (totalCountPerProduct[dessert.id] || 0) + 1;
        });
  
        const currentProductCount = totalCountPerProduct[product.id];
        const existingProduct = document.getElementById(`dessert${id}`);
  
        // If product already exists in cart, update the count
        if (existingProduct) {
          const currentProductSpan = document.getElementById(
            `product-count-for-id${id}`
          );
  
          currentProductSpan.textContent = `${currentProductCount}x `;
        } else {
          // If it's a new product, add it to the cart
          const productHTML = `
          <div id="dessert${id}" class="product">
            <p>
              <span class="product-count" id="product-count-for-id${id}">${
            currentProductCount > 1 ? currentProductCount + "x " : ""
          }</span>${name}
            </p>
            <p>$${price.toFixed(2)}</p>
          </div>
        `;
          productsContainer.innerHTML += productHTML;
        }
  
        // console.log(items);
        // console.log(total);
  
        // document.getElementById("total").textContent = `$${this.getTotal().toFixed(2)}` // moze to byt aj tu ale musis this - operator
      },
  
      getCounts() {
        return items.length;
      },
      getTotal() {
        return (total = items.reduce((total, item) => total + item.price, 0));
      },
      isCartEmpty(){
        return items.length === 0;
      },
    };
  }
  
  /*Creating closure + adding event listeners*/
  
  const cart = CreateCart();
  
  const addToCartButtons = document.getElementsByClassName("add-to-cart-btn");
  
  [...addToCartButtons].forEach((btn) => {
    btn.addEventListener("click", (event) => {
      cart.addItem(Number(event.target.id), data);
      cart.getTotal();
      numberCart.textContent = `(${cart.getCounts()})`;
      cartTotal.textContent = `Order total: $${cart.getTotal().toFixed(2)}`;
      changeUI();
    });
  });
  
  ////////////////////*Change UI depeding on  items*//////////////////////////////////////////
  let cartState = false;
  
  if (cart.getCounts() <= 0) {
    cartState = false;
  } else {
    cartState = true;
  }
  
  function changeUI() {
    cardContainer.innerHTML = data
      .map(
        (item) =>
          `<div class="card">
      <img src=${item.image.desktop} alt="image-wafle" />
                   ${
                     cartState
                       ? `<button class="add-to-cart-btn" id=${item.id}>Add to cart</button>`
                       : `<div class="cart-button-active">
                     <button class="increase-btn" id=${item.id}>+</button class="decrease-btn" id=${item.id}><button>-</button>
                     </div>`
                   }
                   <p class="card-title">${item.category}</p>
                   <h2 class="card-header">${item.name}</h2>
                   <p class="price">$${item.price.toFixed(2)}</p>
                   </div>`
      )
      .join("");
  
    const increaseBtns = document.getElementsByClassName("increase-btn");
    const decrementBtns = document.getElementsByClassName("decrease-btn");
  
    [...increaseBtns].forEach((btn) => {
      btn.addEventListener("click", (event) => {
        cart.addItem(Number(event.target.id), data);
        cart.getTotal();
        numberCart.textContent = `(${cart.getCounts()})`;
        cartTotal.textContent = `Order total: $${cart.getTotal().toFixed(2)}`;
  
        console.log("picka");
      });
    });
  }
  