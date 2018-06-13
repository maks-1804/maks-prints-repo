const { db, User, Product, Cart, Review, Category } = require('./models')

const seed = async () => {
  try {
    await db.sync({ force: true })
    const [admin, monica, arielle, kaitlin] = await Promise.all([
      User.create({
        name: 'Sharon',
        email: 'sharonyun11@gmail.com',
        password: 'p@$5w0rd',
        address: '144 17th St #4 Brooklyn, NY 11215',
        isAdmin: true
      }),
      User.create({
        name: 'Monica',
        email: 'monica@gmail.com',
        password: 'monica123',
        address: '123 Pennsylvania Ave, Jersey City, NJ 07097',
        isAdmin: false
      }),
      User.create({
        name: 'Arielle',
        email: 'arielle@gmail.com',
        password: 'arielle123',
        address: '456 Park Pl, Brooklyn, NY 11215',
        isAdmin: false
      }),
      User.create({
        name: 'Kaitlin',
        email: 'kaitlin@gmail.com',
        password: 'kaitlin123',
        address: '789 Boardwalk, Brooklyn, NY 11215',
        isAdmin: false
      })
    ])
    const [nationalParks, southAmerica, california, cities, selfies, animals] = await Promise.all([
      Category.create({
        name: 'National Parks'
      }),
      Category.create({
        name: 'South America'
      }),
      Category.create({
        name: 'California'
      }),
      Category.create({
        name: 'Cities'
      }),
      Category.create({
        name: 'Selfies'
      }),
      Category.create({
        name: 'Animals'
      })
    ])
    const [cart1, cart2, cart3, cart4, cart5, cart6] = await Promise.all([
      Cart.create({
        date: Date.now(),
        status: 'open',
        subtotal: 40
      }),
      Cart.create({
        date: new Date('May 17, 2018 03:24:00'),
        status: 'closed',
        subtotal: 85
      }),
      Cart.create({
        date: new Date('June 4, 2018 12:00:00'),
        status: 'open',
        subtotal: 50
      }),
      Cart.create({
        date: new Date('March 10, 2018 03:24:00'),
        status: 'closed',
        subtotal: 85
      }),
      Cart.create({
        date: new Date('June 3, 2018 03:24:00'),
        status: 'processing',
        subtotal: 10
      }),
      Cart.create({
        date: new Date('June 1, 2018 03:24:00'),
        status: 'canceled',
        subtotal: 3
      })
    ])

    const [
      yellowstone,
      glacier,
      grandCanyon,
      redwoods,
      patagonia,
      skyViewCity,
      superHighway,
      linda,
      pankti,
      crystal,
      gg,
      pupper
    ] = await Promise.all([
      Product.create({
        title: 'Yellowstone',
        description:
          'Colorful thermal feature, Yellowstone National Park, Montana',
        price: 300,
        inventoryQuantity: 20,
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/1/1b/Old_Faithfull-pdPhoto.jpg'
      }),
      Product.create({
        title: 'Glacier',
        description: 'Margerie Glacier, Tarr Inlet, Glacier Bay National Park',
        price: 250,
        inventoryQuantity: 15,
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/7/72/Mount_Reynolds_at_Logan_Pass.jpg'
      }),
      Product.create({
        title: 'Grand Canyon',
        description: 'Grand Canyon with River views',
        price: 150,
        inventoryQuantity: 34,
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/c/cd/Grandcanyon_view2.jpg'
      }),
      Product.create({
        title: 'Redwoods',
        description: 'Redwoods Avenue of Giants',
        price: 250,
        inventoryQuantity: 20,
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Fitz_Roy_framed_trees_%28colour_balans%29.jpg/1920px-Fitz_Roy_framed_trees_%28colour_balans%29.jpg'
      }),
      Product.create({
        title: 'Patagonia',
        description: 'Patagonia Glaciers',
        price: 550,
        inventoryQuantity: 10,
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Fitz_Roy_framed_trees_%28colour_balans%29.jpg/1920px-Fitz_Roy_framed_trees_%28colour_balans%29.jpg'
      }),
      Product.create({
        title: 'Sky View City',
        description: 'View from above',
        price: 550,
        inventoryQuantity: 10,
        imageUrl: 'https://cdn.triplepundit.com/wp-content/uploads/2017/03/chicago-1791002_1280.jpg'
      }),
      Product.create({
        title: 'Super Highway',
        description: 'A big highway in a city',
        price: 350,
        inventoryQuantity: 15,
        imageUrl: 'https://www.100resilientcities.org/wp-content/uploads/2017/06/cities-bangkok_optimized-450x300.jpg'
      }),
      Product.create({
        title: 'Linda',
        description: 'A great gal!',
        price: 450,
        inventoryQuantity: 20,
        imageUrl: 'https://i.imgur.com/KQJk1Gk.jpg'
      }),
      Product.create({
        title: 'Pankti',
        description: 'What a great smile',
        price: 450,
        inventoryQuantity: 25,
        imageUrl: 'https://i.imgur.com/uepQFlw.jpg'
      }),
      Product.create({
        title: 'GG',
        description: 'A beautiful selfie',
        price: 450,
        inventoryQuantity: 20,
        imageUrl: 'https://i.imgur.com/ilZlOJd.jpg'
      }),
      Product.create({
        title: 'Crystal',
        description: 'A fun selfie at the Museum of Ice Cream',
        price: 450,
        inventoryQuantity: 25,
        imageUrl: 'https://i.imgur.com/rImcTPo.jpg'
      }),
      Product.create({
        title: 'Pupperino',
        description: 'A handsome pup!',
        price: 650,
        inventoryQuantity: 15,
        imageUrl: 'https://barkpost.com/wp-content/uploads/2014/09/awkward-dog-selfie.jpg?q=70&fit=crop&crop=entropy&w=808&h=500'
      })
    ])

    const [review1, review2, review3] = await Promise.all([
      Review.create({
        title: 'Would purchase again!',
        content: 'I really liked this picture!',
        rating: 'happy'
      }),
      Review.create({
        title: 'Great picture!',
        content: 'Looks great at my apartment.',
        rating: 'happy'
      }),
      Review.create({
        title: 'Stunning!',
        content: 'I get so many compliments on this picture.',
        rating: 'happy'
      })
    ])
    // const products = await db.models.product.findAll()
    // console.log(products)
    //add associations for productCategories
    await yellowstone.setCategories([nationalParks])
    await patagonia.setCategories([nationalParks, southAmerica])
    await glacier.setCategories([nationalParks])
    await redwoods.setCategories([nationalParks, california])
    await grandCanyon.setCategories([nationalParks])
    await skyViewCity.setCategories([cities])
    await superHighway.setCategories([cities])
    await crystal.setCategories([selfies])
    await pankti.setCategories([selfies])
    await gg.setCategories([selfies])
    await linda.setCategories([selfies])
    await pupper.setCategories([selfies, animals])
//!!!!
    //add products to the carts
    await cart1.setProducts([yellowstone, patagonia])
    await cart2.setProducts([yellowstone, glacier, redwoods])
    await cart3.setProducts([grandCanyon, glacier, patagonia])
    await cart4.setProducts([patagonia, skyViewCity])
    await cart5.setProducts([superHighway, redwoods, glacier])
    await cart6.setProducts([grandCanyon])

    //assign user a cart or multiple carts
    await arielle.setCarts([cart1, cart2])
    await monica.setCarts([cart3, cart4, cart5, cart6])

    //assign reviews to the users that wrote them
    await kaitlin.setReviews([review1, review2])
    await monica.setReviews([review3])
    //review is on one product
    await review1.setProduct(yellowstone)
    await review2.setProduct(glacier)
    await review3.setProduct(redwoods)

    db.close()
    console.log('seed success')
  } catch (error) {
    console.log(error)
    db.close()
  }
}

seed()
