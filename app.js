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

/****************************CART LOGIC - CLOSURE **********************/

function CreateCart() {
  let items = [];
  let total = 0;

  itemCounts = {};

  return {
    addItem(id, data) {
      const product = data.find((item) => item.id === id);
      const { name, price } = product;
      items.push(product);

// Update item counts
      itemCounts[id] = (itemCounts[id] || 0) + 1;

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
    removeFromCart(id, data) {
      const index = items.findIndex((item) => item.id === id);
      if (index !== -1) {
        items.splice(index, 1);


        itemCounts[id] = Math.max(0, (itemCounts[id] || 0) - 1);




        const totalCountPerProduct = {};
        items.forEach((dessert) => {
          totalCountPerProduct[dessert.id] =
            (totalCountPerProduct[dessert.id] || 0) + 1;
        });

        const currentProductCount = totalCountPerProduct[id] || 0;

        if (currentProductCount === 0) {
          const productToRemove = document.getElementById(`dessert${id}`);
          if (productToRemove) {
            productsContainer.removeChild(productToRemove);
          }
        } else {
          const currentProductSpan = document.getElementById(
            `product-count-for-id${id}`
          );

          currentProductSpan.textContent = `${currentProductCount}x `;
        }
      }
      if (this.isCartEmpty()) {
        renderCards(); // Re-render to show "Add to cart" buttons instead of +/- buttons
      }
    },

    getCounts() {
      return items.length;
    },
    getItemCount(id) {
      return itemCounts[id] || 0;

    },
    getTotal() {
      return (total = items.reduce((total, item) => total + item.price, 0));
    },
    isCartEmpty() {
      return items.length === 0;
    },
  };
}

const cart = CreateCart();
/**************************************************************************/

/*Rendrovany Dom dynamicky  podla kondicie -  pozor na postupnost kodu*/

function renderCards() {
  const isCartEmpty = cart.isCartEmpty();
  cardContainer.innerHTML = data
    .map(
      (item) => `
              <div class="card">
                  <img src="${item.image.desktop}" alt="${item.name}" />
                  ${
                    isCartEmpty
                      ? `<button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>`
                      : `<div class="cart-button-active">
                          <button class="increase-btn" data-id="${item.id}">+</button>
                          <span class="cart-number-list" data-id="${item.id}">${cart.getItemCount(item.id)}</span>
                          <button class="decrease-btn" data-id="${item.id}">-</button>
                      </div>`
                  }
                  <p class="card-title">${item.category}</p>
                  <h2 class="card-header">${item.name}</h2>
                  <p class="price">$${item.price.toFixed(2)}</p>
              </div>`
    )
    .join("");
}

function updateCartUI() {
  numberCart.textContent = `(${cart.getCounts()})`;
  cartTotal.textContent = `Order total: $${cart.getTotal().toFixed(2)}`;
}

/*Call functions for initital render*/

renderCards();
updateCartUI();

/* Event listeners on buttons*/

// Event delegation nemusis tagetovat primo elemnty staci parent element
cardContainer.addEventListener("click", (event) => {
  const target = event.target;
  if (
    target.classList.contains("add-to-cart-btn") ||
    target.classList.contains("increase-btn")
  ) {
    const id = Number(target.dataset.id);
    cart.addItem(id, data);
    renderCards();
    updateCartUI();
   
  
  } else if (target.classList.contains("decrease-btn")) {
    const id = Number(target.dataset.id); // Get id directly from the decrease button
    cart.removeFromCart(id, data);
    renderCards();
    updateCartUI();
   
  }
});


