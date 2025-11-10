const Value = require("../models/Attr_value");
const Attr = require("../models/Attr");
const Product_att = require("../models/Product_attr");
class ProductController {
  #value = Value;
  #attr = Attr;
  #product_attr = Product_att;
  constructor(model) {
    this.model = model;
  }

  async getProducts(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 10;
      console.log(page, limit);
      const products = await this.model.getAllProducts({ page, limit });

      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (err) {
      next(err);
    }
  }
  async getProductById(req, res, next) {
    try {
      const product = await this.model.getProductById(req.params.id);
      if (!product) {
        return res.status(400).json({
          success: false,
          error: req.params.id + "bhgui",
        });
      }
      const attrs = await this.#product_attr.getProductAttrById(product.id);
      console.log(attrs)
      res.status(200).json({
        success: true,
        data: { ...product, detail: attrs },
      });
    } catch (err) {
      next(err);
    }
  }
  async createProduct(req, res, next) {
    const { details, ...body } = req.body;
    const product = await this.model.createProduct(body);
    await Promise.all(
      Object.entries(details).map(async ([k, v]) => {
        let value = await this.#value.getProductAttrById(v);
        console.log(v, "value");
        await this.#product_attr.createProductAttr({
          product_id: product.id,
          values: !value ? v : null,
          attr_id: k,
          value_id: value ? v : null,
        });
      })
    );
    res.status(200).json({
      success: true,
      // data: product,
    });
  }
}

module.exports = ProductController;
