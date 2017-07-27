
const getInventory = () => {
  fetch('http://localhost:3000/api/v1/inventory')
  .then(res => res.json())
  .then(response => {
    console.log(response);
  })
}

getInventory();
