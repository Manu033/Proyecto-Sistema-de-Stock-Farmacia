const { Product, Lot, ProductType } = require("./../../models");

// Crear un nuevo producto
const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    console.log("maximo", productData);

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear el producto", details: error.message });
  }
};

// Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Lot,
          as: "lots",
        },
        {
          model: ProductType,
          as: "productType",
        },
      ],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los productos",
      details: error.message,
    });
  }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: [
        {
          model: Lot,
          as: "lots",
          attributes: ["id", "name"],
        },
      ],
    });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener el producto", details: error.message });
  }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const [updated] = await Product.update(
      { name },
      {
        where: { id },
      }
    );

    if (updated) {
      const updatedProduct = await Product.findByPk(id);
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar el producto",
      details: error.message,
    });
  }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.destroy({
      where: { id },
    });

    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar el producto", details: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
