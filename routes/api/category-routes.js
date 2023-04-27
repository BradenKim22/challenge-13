const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Find All Categories
router.get('/', async (req, res) => {
  try {
    // be sure to include its associated Products
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });

    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

// Find a Category
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products??
      include: [{ model: Product }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Category not found with that id' });
      return;
    }

    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

// Create Category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);

    if (!categoryData) {
      res.status(404).json({ message: 'Please enter a valid input' });
      return;
    }

    res.status(200).json(categoryData);

  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a Category
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(
      {
        where: {
          id: req.params.id
        }
      },
      {
        category_name: req.body.category_name
      }
      );

      if (!categoryData) {
        res.status(404).json({ message: 'Error: Check your input and id' });
        return;
      }

      res.status(200).json(categoryData);

    } catch {
      res.status(400).json(err);
    }
});

// Delete a Category
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Category not found with that id' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;