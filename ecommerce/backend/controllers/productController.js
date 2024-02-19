const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler'); 
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Create api
exports.newProduct = catchAsyncErrors(async (req,res,next) =>{
  
  req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})

// Get all api => /api/v1/products?keyword=apple
exports.getAllProducts = catchAsyncErrors(async(req, res, next) => {
  
  const resPerPage = 4;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(),req.query)
  .search()
  .filter()

  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage)
 // products = await apiFeatures.query;
 
    res.status(200).json({
      success: true,
      productsCount,
      resPerPage,
      filteredProductsCount,
      products
    });
  
});

// Get api
exports.getProduct = catchAsyncErrors(async(req,res,next)=>{
  const product = await Product.findById(req.params.id);
  if(!product){
    return next(new ErrorHandler('Product not found',404))
  }

  res.status(200).json({
    success:true,
    product
  })
})

// Update api
exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
  let product = await Product.findById(req.params.id)

  if(!product){
    return  next(new ErrorHandler('Product not found',404))
  }

  product = await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  });

  res.status(200).json({
    success:true,
    product
  })
})
// Delete api
exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
  const product = await Product.findById(req.params.id);

  if(!product){
    return  next(new ErrorHandler('Product not found',404))
  }

  await product.deleteOne()

  res.status(200).json({
    success:true,
    message:'Product is deleted.'
  }) 
})