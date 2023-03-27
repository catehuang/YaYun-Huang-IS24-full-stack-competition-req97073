import express from "express";
import { nanoid } from "nanoid"

const router = express.Router();
const idLength = 8;

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         -productName
 *         -scrumMasterName
 *         -productOwnerName
 *         -Developers
 *         -startDate
 *         -methodology
 *       properties:
 *         productId:
 *           type: string
 *           description: The auto-generated id of the product
 *         productName:
 *           type: string
 *           description: The name of the product
 *         scrumMasterName:
 *           type: string
 *           description: The name of the scrum master
 *         productOwnerName:
 *          type: string
 *          description: The name of the product owner
 *         Developers:
 *          type: string
 *          description: The names of developers (up to 5)
 *         startDate:
 *          type: string
 *          description: The date to start to work on this product
 *         methodology:
 *          type: string
 *          description: Agile or Waterfall
 *       example:
 *         productId: '00000001'
 *         productName: 'Astro'
 *         scrumMasterName: 'Elijah'
 *         productOwnerName: 'Benjamin'
 *         Developers: 'Benjamin, Ava, William, James, Evelyn'
 *         startDate: '2020/01/01'
 *         methodology: 'Agile'
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The products managing API
 */

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Returns the list of all the products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

router.get('/', (req, res) => {
  const products = req.app.get("products")["products"]
  
  res.send(products);
});

  /**
   * @swagger
   * /product/{productId}:
   *   get:
   *     summary: Get the product story by id
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: productId
   *         schema:
   *           type: string
   *         required: true
   *         description: The product id
   *     responses:
   *       200:
   *         description: The product description by id
   *         contents:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/product'
   *       404:
   *         description: The product was not found
   */

router.get("/:productId", (req, res) => {
  const product = req.app.get("products").find({ id: req.params.id }).value();
  if (!product) {
    res.sendStatus(404)
  }
  res.send(product);
});

  /**
   * @swagger
   * /product:
   *   post:
   *     summary: Create a new product
   *     tags: [Products]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/product'
   *     responses:
   *       200:
   *         description: The product was successfully created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/product'
   *       500:
   *         description: Some server error
   */

   router.post("/", (req, res) => {
    try {
      const product = {
        id: nanoid(idLength),
        ...req.body,
      };

      req.app.get("product").push(product).write();

      res.send(product);
    } catch (error) {
      return res.status(500).send(error);
    }
  });

  /**
   * @swagger
   * /product/{productId}:
   *  put:
   *    summary: Update the product by id
   *    tags: [Products]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: The product id
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/product'
   *    responses:
   *      200:
   *        description: The product was updated
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/product'
   *      404:
   *        description: The product was not found
   *      500:
   *        description: Some error happened
   */

  router.put("/:productId", (req, res) => {
    try {
      req.app.db
        .get("product")
        .find({ id: req.params.id })
        .assign(req.body)
        .write();

      res.send(req.app.get("product").find({ id: req.params.id }));
    } catch (error) {
      return res.status(500).send(error);
    }
  });

  /**
   * @swagger
   * /product/{productId}:
   *   delete:
   *     summary: Remove the product by id
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The product id
   *
   *     responses:
   *       200:
   *         description: The product was deleted
   *       404:
   *         description: The product was not found
   */

  router.delete("/:productId", (req, res) => {
    req.app.get("product").remove({ id: req.params.id }).write();

    res.sendStatus(200);
  });

export default router;
