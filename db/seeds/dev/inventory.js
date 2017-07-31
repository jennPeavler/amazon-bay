const inventoryItems = [
  {
    title: 'tz',
    description: 'pinball',
    image: 'http://download.gamezone.com/uploads/image/data/1105285/twilightzonepinball.jpg',
    price: 5000.00
  },
  {
    title: 'unicorn',
    description: 'mythical creature',
    image: 'https://s-media-cache-ak0.pinimg.com/736x/3b/06/ef/3b06efe25fed62de2960090ff2b8d83a--cute-cartoon-drawings-drawings-of.jpg',
    price: 333.00
  },
  {
    title: 'hot pocket',
    description: 'yummy',
    image: 'https://www.hotpockets.com/media/1006/hp_steam.jpg',
    price: 5.99
  },
  {
    title: 'tz',
    description: 'pinball',
    image: 'http://download.gamezone.com/uploads/image/data/1105285/twilightzonepinball.jpg',
    price: 5000.00
  },
  {
    title: 'unicorn',
    description: 'mythical creature',
    image: 'https://s-media-cache-ak0.pinimg.com/736x/3b/06/ef/3b06efe25fed62de2960090ff2b8d83a--cute-cartoon-drawings-drawings-of.jpg',
    price: 333.00
  },
  {
    title: 'hot pocket',
    description: 'yummy',
    image: 'https://www.hotpockets.com/media/1006/hp_steam.jpg',
    price: 5.99
  },
  {
    title: 'tz',
    description: 'pinball',
    image: 'http://download.gamezone.com/uploads/image/data/1105285/twilightzonepinball.jpg',
    price: 5000.00
  },
  {
    title: 'unicorn',
    description: 'mythical creature',
    image: 'https://s-media-cache-ak0.pinimg.com/736x/3b/06/ef/3b06efe25fed62de2960090ff2b8d83a--cute-cartoon-drawings-drawings-of.jpg',
    price: 333.00
  },
  {
    title: 'hot pocket',
    description: 'yummy',
    image: 'https://www.hotpockets.com/media/1006/hp_steam.jpg',
    price: 5.99
  },
]

const orderItems = [
  {
    date: 20170727,
    total: 338
  },
  {
    date: 20170727,
    total: 55555
  },
  {
    date: 20170728,
    total: 103992
  },
  {
    date: 20170720,
    total: 802822
  },
  {
    date: 20170731,
    total: 93736262
  }
]

const getOrders = (knex) => {
  return orderItems.map((item) => {
    const { date, total } = item;
    return knex('order_history').insert({ date, total})
  })
}

const getInventory = (knex) => {
  return inventoryItems.map((item) => {
    const { title,
            description,
            image,
            price } = item;
    return knex('inventory').insert({
      title,
      description,
      image,
      price,
    });
  });
};

exports.seed = (knex, Promise) => {
  return knex('inventory').del()
    .then(()=> knex('order_history').del())
    .then(() => {
      const inventoryData = getInventory(knex);
      const orderData = getOrders(knex);
      return Promise.all([...inventoryData, ...orderData]);
    });
};
