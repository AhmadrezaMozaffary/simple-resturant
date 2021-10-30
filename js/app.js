let carts = document.querySelectorAll(".btn");
let products = [
  {
    name: "پیتزا سبزیجات",
    tag: "vegPizza",
    price: 50000,
    inCart: 0,
  },
  {
    name: "سیب زمینی ویژه",
    tag: "fries",
    price: 20000,
    inCart: 0,
  },
  {
    name: "سوشی ویژه",
    tag: "soshi",
    price: 90000,
    inCart: 0,
  },
  {
    name: "پیتزا کینگ سایز",
    tag: "kingsize",
    price: 75000,
    inCart: 0,
  },
  {
    name: "پاستا",
    tag: "pasta",
    price: 70000,
    inCart: 0,
  },
  {
    name: "استیک اسپیشال",
    tag: "estake",
    price: 110000,
    inCart: 0,
  },
  {
    name: "جوجه چینی",
    tag: "chicken",
    price: 65000,
    inCart: 0,
  },
  {
    name: "برگرمخصوص",
    tag: "burgur",
    price: 65000,
    inCart: 0,
  },
];
const delBtns = document.querySelectorAll(".delbtn");

carts.forEach((cart, i) => {
  cart.addEventListener("click", (e) => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
});

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".order").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".order").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".order").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsIncart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }
  localStorage.setItem("productsIncart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsIncart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".card-items-container");
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
        <div class="card-items">
          <img src="./img/${item.tag}.jpg" alt="pic-food" />
          <div class="exp">
            <p class="titr">نام</p>
            <p class="product-name">${item.name}</p>
          </div>
          <div class="fee">
            <p class="titr">قیمت واحد</p>
            <p class="fee-of-one">ت${item.price}</p>
          </div>
          <div class="num">
            <p class="titr">تعداد</p>
            <p class="num-of-orders">${item.inCart}</p>
          </div>
          <div class="total">
            <p class="titr">کل</p>
            <p class="total-cost">ت${item.inCart * item.price}</p>
          </div>
          <button class="delbtn btn-primary">حذف</button>
        </div>
        `;
    });
  }
}

onLoadCartNumbers();
displayCart();