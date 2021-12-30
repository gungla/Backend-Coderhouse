/* eslint-disable no-console */
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const express = require('express');
const upload = require('../middlewares/upload');
const { ProductsService } = require('../services');
const { verifyTokenAdmin } = require('../middlewares');

const router = express.Router();

let gfs;

const conn = mongoose.connection;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('images');
  console.log('Connected to Grid');
});

router.post('/upload', verifyTokenAdmin, upload.single('file'), async (req, res) => {
  const idProduct = req.query.idproduct;

  try {
    if (req.file === undefined) {
      return res.send('You must select a file.');
    }
    const product = await ProductsService.getOne(idProduct.toString());
    if (!product) res.status(400).json({ message: 'Product not found.' });
    product.images.push(req.file.id);
    product.save();
    return res.status(201).json({ product, file: req.file });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// media routes
router.get('/:id', async (req, res) => {
  try {
    const file = await gfs.files.findOne({ _id: req.params.id });
    const readStream = gfs.createReadStream(file._id);
    readStream.pipe(res);
    // res.status(200).json(file);
  } catch (error) {
    res.status(404).json({ message: 'image not found.' });
  }
});

router.delete('/:id', verifyTokenAdmin, async (req, res) => {
  const idImage = req.params.id;
  try {
    // await gfs.files.deleteOne({ _id: idImage });
    const products = await ProductsService.getAll();
    const prod = products.filter((product) => product.images.includes(idImage.toString()));
    if (!prod) res.status(400).json({ message: 'Image not found.' });
    const productToUpdate = await ProductsService.getOne(prod[0]._id);
    const imagesArray = productToUpdate.images.filter((id) => id.toString() !== idImage.toString());
    productToUpdate.images = imagesArray;
    productToUpdate.save();
    res.status(200).json({ message: 'Image deleted.', updatedProduct: productToUpdate });
  } catch (error) {
    res.status(400).json({ message: 'Error while deleting the image.' });
  }
});

module.exports = router;
