import express from "express";
import { customAlphabet } from "nanoid";

const router = express.Router();
const idLength = 8;
const nanoid = customAlphabet("1234567890", idLength);

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

router.get("/", (req, res) => {
  const products = req.app.db.data;

  res.send(products);
});

/**
 * @swagger
 * /product/{productId}:
 *   get:
 *     summary: Get the product story by productId
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
 *         description: The product description by productId
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 */

router.get("/:productId", (req, res) => {
  const foundProduct = req.app.db.data.find(
    (product) => parseInt(product.productId) === parseInt(req.params.productId)
  );

  if (!foundProduct) {
    res.sendStatus(404);
  }
  res.send(foundProduct);
});

/**
 * @swagger
 * /product/:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {
  try {
    let genId = nanoid()
    while (req.app.db.data.find(
      (product) => parseInt(product.productId) === parseInt(genId))) {
        genId = nanoid()
      }
    const product = {
      productId: genId,
      productName: req.body.productName,
      productOwnerName: req.body.productOwnerName,
      Developers: req.body.Developers,
      scrumMasterName: req.body.scrumMasterName,
      startDate: req.body.startDate,
      methodology: req.body.methodology,
    };

    req.app.db.data.push(product);
    req.app.db.write();

    /* verify data
    const products = req.app.db.data
    console.log(products)
    */
    res.send(product);
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /product/{productId}:
 *  put:
 *    summary: Update the product by productId
 *    tags: [Products]
 *    parameters:
 *      - name: productId
 *        in: path
 *        schema:
 *          type: string
 *        required: true
 *        description: The product id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: The product was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: The product was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:productId", (req, res) => {
  try {
    const products = req.app.db.data;
    const index = products.findIndex(
      (product) =>
        parseInt(product.productId) === parseInt(req.params.productId)
    );

    if (index === -1) {
      res.sendStatus(404);
    }

    let foundProduct = products[index];
    foundProduct = {
      productId: req.params.productId,
      productName: req.body.productName,
      productOwnerName: req.body.productOwnerName,
      Developers: req.body.Developers,
      scrumMasterName: req.body.scrumMasterName,
      startDate: req.body.startDate,
      methodology: req.body.methodology,
    };
    req.app.db.data.splice(index, 1);
    req.app.db.data.push(foundProduct);
    req.app.db.write();

    const newProduct = req.app.db.data.find(
      (product) =>
        parseInt(product.productId) === parseInt(req.params.productId)
    );

    res.send(newProduct);
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /product/{productId}:
 *  delete:
 *     summary: Remove the product by productId
 *     tags: [Products]
 *     parameters:
 *       - name: productId
 *         in: path
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
 *       500:
 *        description: Some error happened
 */

router.delete("/:productId", (req, res) => {
  try {
    const products = req.app.db.data;
    const index = products.findIndex(
      (product) =>
        parseInt(product.productId) === parseInt(req.params.productId)
    );

    if (index === -1) {
      res.sendStatus(404);
    }

    req.app.db.data.splice(index, 1);
    req.app.db.write();

    res.sendStatus(200);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default router;
