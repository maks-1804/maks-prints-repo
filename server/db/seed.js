const { db, User, Product, Cart, Review, Category } = require('./models');

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all([
      User.create({
        username: 'admin123',
        password: 'p@$5w0rd',
        email: 'sharonyun11@gmail.com',
        address: '144 17th St #4 Brooklyn, NY 11215',
        type: 'admin'
      }),
      User.create({
        username: 'monicagonzalez',
        password: 'monica123',
        email: 'monica@gmail.com',
        address: '123 Pennsylvania Ave, Jersey City, NJ 07097',
        type: 'user'
      }),
      User.create({
        username: 'ariellegordon',
        password: 'arielle123',
        email: 'arielle@gmail.com',
        address: '456 Park Pl, Brooklyn, NY 11215',
        type: 'user'
      }),
      User.create({
        username: 'kaitlinschaer',
        password: 'kaitlin123',
        email: 'kaitlin@gmail.com',
        address: '789 Boardwalk, Brooklyn, NY 11215',
        type: 'user'
      })
    ])
    await Promise.all([
      Product.create({
        title: 'Yellowstone',
        description: 'Colorful thermal feature, Yellowstone National Park, Montana',
        price: 30,
        inventoryQuantity: 20,
        imageUrl: 'https://flic.kr/p/bss8YG'
      }),
      Product.create({
        title: 'Glacier',
        description: 'Margerie Glacier, Tarr Inlet, Glacier Bay National Park',
        price: 25,
        inventoryQuantity: 15,
        imageUrl: 'https://flic.kr/p/XNYogZ'
      }),
      Product.create({
        title: 'Grand Canyon',
        description: 'Grand Canyon with River views',
        price: 15,
        inventoryQuantity: 34,
        imageUrl: 'https://flic.kr/p/W6KyEB '
      }),
      Product.create({
        title: 'Redwoods',
        description: 'Redwoods Avenue of Giants',
        price: 25,
        inventoryQuantity: 20,
        imageUrl: 'https://flic.kr/p/f2VquP'
      }),
      Product.create({
        title: 'Patagonia',
        description: 'Patagonia Glaciers',
        price: 55,
        inventoryQuantity: 10,
        imageUrl: 'https://flic.kr/p/7VSNCE'
      })
    ])
    await Promise.all([
      Cart.create({
        date: Date.now(),
        status: 'open',
        subtotal: 40,
        userId: 2
      }),
      Cart.create({
        date: new Date('May 17, 2018 03:24:00'),
        status: 'closed',
        subtotal: 85,
        userId: 2
      }),
      Cart.create({
        date: new Date('June 4, 2018 12:00:00'),
        status: 'open',
        subtotal: 50,
        userId: 3
      })
    ])
    await Promise.all([
      Review.create({
        title: 'Would purchase again!',
        content: 'I really liked this picture!',
        rating: 'happy',
        userId: 3,
        productId: 3
      })
    ])
    await Promise.all([
      Category.create({
        name: 'National Parks'
      })
    ])

    console.log('Done!');
    db.close();
  } catch (err) {
    console.error('Something went wrong!', err);
    db.close();
  }
};

seed();
