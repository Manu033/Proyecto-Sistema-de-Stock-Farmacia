const { Product, Lot, ProductType } = require("./../../models");
const { Op } = require("sequelize");

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
  const { page = 1, limit = 20 } = req.query; // Valores predeterminados de página y límite

  try {
    const products = await Product.findAll({
      offset: (page - 1) * limit, // Salto para la paginación
      limit: parseInt(limit), // Límite de registros por página
      include: [
        {
          model: Lot,
          as: "lots",
        },
        { model: ProductType, as: "productType" },
      ],
    });

    const totalProducts = await Product.count();
    const totalPages = Math.ceil(totalProducts / limit);
  
    res.json({
      data: { products },
      pagination: {
        totalRecords: totalProducts,
        totalPages,
        currentPage: page,
        recordsPerPage: limit,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener productos", details: error.message });
  }
};

const searchProducts = async (req, res) => {
  const { query, page = 1, limit = 20 } = req.query;
  console.log(query);

  try {
    const { count, rows: products } = await Product.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${query}%`, // Búsqueda insensible a mayúsculas y minúsculas
        },
      },
      offset: (page - 1) * limit,
      limit: parseInt(limit),
      include: [
        {
          model: Lot,
          as: "lots",
        },
        { model: ProductType, as: "productType" },
      ],
    });

    res.json({
      data: { products },
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).send(error.message);
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
  searchProducts,
};
