const inventoryDisplay = document.getElementById('inventory');
const shoppingCart = document.getElementById('shopping-cart');
const cartTotal = document.getElementById('cart-total');
const cart = document.getElementById('cart');
const history = document.getElementById('history');
const orderHistory = document.getElementById('order-history');
const orderBtn = document.getElementById('place-order-btn')
let runningTotal = 0;
let orderNumber = 0;
let root = window.location.href;

const getInventory = () => {
  fetch(`${root}api/v1/inventory`)
  .then(res => res.json())
  .then(response => {
    displayInventory(response);
  })
}

const displayInventory = (inventory) => {
  inventory.forEach(item => {
    let newItem = document.createElement('article');
    newItem.classList.add('item');

    let title = document.createElement('h3');
    title.innerHTML += `Title:  ${item.title}`;

    let description = document.createElement('p');
    description.innerHTML += `Description:  ${item.description}`;

    let image = document.createElement('img');
    image.setAttribute('src', `${item.image}`);

    let price = document.createElement('p');
    price.innerHTML += `Price:  $${item.price}`;

    let addItemBtn = document.createElement('button');
    addItemBtn.innerHTML += 'Add Item';
    addItemBtn.addEventListener('click', () => {
      let newRow = document.createElement('tr');
      newRow.classList.add('cart-row')

      let cartItem = document.createElement('th');
      cartItem.innerHTML += `${item.title}`;
      let cartPrice = document.createElement('th');
      cartPrice.innerHTML += `${item.price}`;

      newRow.append(cartItem);
      newRow.append(cartPrice);

      shoppingCart.append(newRow);
      let itemPrice = Number(cartPrice.innerHTML);
      runningTotal += itemPrice;
      cartTotal.innerHTML = `$${runningTotal}`;

      let storageItem = JSON.stringify({title: `${item.title}`, price: `${item.price}`})
      localStorage.setItem(Date.now(), storageItem)

    })

    newItem.append(title);
    newItem.append(description);
    newItem.append(image);
    newItem.append(price);
    newItem.append(addItemBtn)

    inventoryDisplay.append(newItem)
  })
}


cart.addEventListener('click', function() {
  if (cart.classList.contains('hide-cart')) {
    cart.classList.remove('hide-cart');
    cart.classList.add('show-cart')
    document.getElementById('shopping-cart').style.display = 'block'
    document.getElementById('totals').style.display = 'block'
    document.getElementById('place-order-btn').style.display = 'block'
  } else {
    cart.classList.remove('show-cart');
    cart.classList.add('hide-cart')
    document.getElementById('shopping-cart').style.display = 'none'
    document.getElementById('totals').style.display = 'none'
    document.getElementById('place-order-btn').style.display = 'none'
  }
})

history.addEventListener('click', function() {
  if (history.classList.contains('hide-history')) {
    history.classList.remove('hide-history');
    history.classList.add('show-history');
    document.getElementById('order-history').style.display = 'block'
  } else {
    history.classList.remove('show-history');
    history.classList.add('hide-history')
    document.getElementById('order-history').style.display = 'none'
  }
})

orderBtn.addEventListener('click', function() {
  orderNumber += 1;
  let newOrder = document.createElement('tr');

  let order = document.createElement('th');
  order.innerHTML += orderNumber;
  let orderDate = document.createElement('th');
  orderDate.innerHTML += Date.now();
  let orderTotal = document.createElement('th');
  orderTotal.innerHTML += `$${runningTotal}`;

  newOrder.append(order);
  newOrder.append(orderDate);
  newOrder.append(orderTotal);
  orderHistory.append(newOrder);

  runningTotal = 0;

  const cartRows = document.querySelectorAll('.cart-row');
  // console.log('cart rows', cartRows)
  cartRows.forEach(row => {
    console.log(row)
    row.parentNode.removeChild(row);
    cartTotal.innerHTML = '';
  })

  localStorage.clear()
})

window.onload = () => {
  for(let i=0; i<localStorage.length; i++) {
    let retrievedStorageItem = localStorage.getItem(localStorage.key(i));
    let parsedItem = JSON.parse(retrievedStorageItem)
    let newRow = document.createElement('tr');
    newRow.classList.add('cart-row')

    let cartItem = document.createElement('th');
    cartItem.innerHTML += `${parsedItem.title}`;
    let cartPrice = document.createElement('th');
    cartPrice.innerHTML += `${parsedItem.price}`;

    newRow.append(cartItem);
    newRow.append(cartPrice);

    shoppingCart.append(newRow);
    let itemPrice = Number(cartPrice.innerHTML);
    runningTotal += itemPrice;
    cartTotal.innerHTML = `$${runningTotal}`;
  }
}


getInventory();
