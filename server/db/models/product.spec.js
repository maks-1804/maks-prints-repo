const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  // after('Synchronize and clear database', () => db.sync({force: true}));

    describe('column definitions', () => {
        it('has expected title definition', () => {
            expect(Product.attributes.title).to.be.an('object')
        })
        it('has expected description definition', () => {
            expect(Product.attributes.description).to.be.an('object')
        })
        it('has expected price definition', () => {
          expect(Product.attributes.price).to.be.an('object');
        });
        it('has expected inventoryQuanity definition', () => {
          expect(Product.attributes.inventoryQuanity).to.be.an('object');
        });
        it('has expected imageUrl definition', () => {
          expect(Product.attributes.imageUrl).to.be.an('object');
        });

    });


})
