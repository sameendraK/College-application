// const express = require('express');
// const router = express.Router();
// const Product = require('../Models/product.model')

// router.get('/', async (req, res, next) => {
//     try {
//         const results = await (Product.find({}, { _id: 1, __v: 0 }));
//         // results.find(i=>i.name==="iPhone 13")
//         res.send(results)
//     } catch {
//         console.log('some error occured');
//     }
// })
// router.post('/', async (req, res, next) => {
//     const product = new Product(req.body);
//     const result = await product.save();
//     res.send(result)
//     console.log(product)
// })
// router.delete('/', async (req, res, next) => {
//     const id = req.params.id;
//     try {
//         const product = await Product.findOneAndUpdate(id);
//     }
//     catch {
//         console.log("unexpected error occured");
//     }
// })
// router.get('/:id', async (req, res, next) => {
//     const id = req.params.id;
//     // const product = new Product(req.body);
//     try {
//         const results = await Product.findById(id);
//         res.send(results)
//     }
//     catch {
//         console.log('error')
//     }
// })
// router.post('/:id', (req, res, next) => {
//     res.send('post by ID method');
// })
// router.delete('/:id', async (req, res, next) => {
//     const id = req.params.id;
//     try {
//         const results = await Product.findByIdAndDelete(id);
//         res.send(results)
//     }
//     catch {
//         console.log("unexpected error occured");
//     }
// })
// module.exports = router;