const router = require('express').Router()
const { User, Cart, Review } = require('../db/models')
module.exports = router

/*
As a user, I want to be able to create an account (POST), view my own profile information (GET), edit my profile (PUT), or delete my account (DELETE). I should be able to see all associated information for my account too- my cart, my orders, my reviews, etc.
*/

// Authorized User Routes
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId, {
      include: [{ model: Cart }, { model: Review }]
    });
    if (!user) res.sendStatus(404)
    res.json(user);
  } catch (err) {
    next(err);
  }
})


router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const newUser = await user.update(req.body);
    res.json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    await user.destroy();
    res.end();
  } catch (err) {
    next(err);
  }
});

// Admin User Routes

//As an admin, I want to be able to view all registered users (GET), view a single user (GET), promote or demote a user's status (admin vs regular user, PUT), and ban a user(DELETE). All associated information should be loaded when I view the user- their cart, orders, reviews, etc.

// Do I need to write inside my route if usertype === admin then do the route?
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // Do we want to eager load both the carts and models instantly?
      include: [{ model: Cart }, { model: Review }]
    });
    res.json(users)
  } catch (err) {
    next(err)
  }
})
