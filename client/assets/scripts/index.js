const inventoryDisplay = document.getElementById('inventory');
const shoppingCart = document.getElementById('shopping-cart');
const cartTotal = document.getElementById('cart-total');
let runningTotal = 0;
let root = window.location.href
console.log(root)


const getInventory = () => {
  fetch(`${root}api/v1/inventory`)
  .then(res => res.json())
  .then(response => {
    displayInventory(response);
  })
}

const displayInventory = (inventory) => {
  console.log(inventory);
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

      let cartItem = document.createElement('th');
      cartItem.innerHTML += `${item.title}`;
      let cartPrice = document.createElement('th');
      cartPrice.innerHTML += `${item.price}`;

      newRow.append(cartItem);
      newRow.append(cartPrice);

      shoppingCart.append(newRow);
      let itemPrice = Number(cartPrice.innerHTML);
      runningTotal += itemPrice;
      console.log(typeof(itemPrice), itemPrice);
      console.log('running total', runningTotal);
      cartTotal.innerHTML = runningTotal;
    })

    newItem.append(title);
    newItem.append(description);
    newItem.append(image);
    newItem.append(price);
    newItem.append(addItemBtn)

    inventoryDisplay.append(newItem)
  })
}

getInventory();
