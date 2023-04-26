// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
// (Not sure about the Foreign Key Yet)_____________________________
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Categories have many Products
// (Not sure about the Foreign Key Yet or Delete)___________________
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// Products belongsToMany Tags (through ProductTag)_________________
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    // unique: false
  },
  // as: 'product_tags'
});

// Tags belongsToMany Products (through ProductTag)_________________
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    // unique: false
  },
  // as: 'tag_products'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
