const Product = require('../models/product')

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing:false
    });
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    req.user.createProduct({
      title:title,
      price:price,
      description:description,
      imageUrl:imageUrl,
    })
    .then(result =>{
      console.log('Created Product')
      res.redirect('/admin/products');
    })
    .catch(err =>{
      console.log(err)
    });
}

exports.getEditProducts = (req, res, next) => {
  const prodId = req.params.productId;
  req.user.getProducts({
    where:{
      id: prodId
    }
  })
  .then(products =>{
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing:true,
      product: products[0]
    });
  })
  .catch(err =>{
    return res.redirect('/');
  });

}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;

  const product = new Product(prodId, title, imageUrl, description, price);
  Product.findByPk(prodId)
  .then(product =>{
    product.title = title;
    product.imageUrl = imageUrl;
    product.description = description;
    product.price = price;

    return product.save();
  })
  .then(result =>{
    console.log("UPDATED PRODUCT");
    res.redirect('/admin/products');
  })
  .catch(err =>{
    console.log(err)
    return res.redirect('/');
  });
  
}

exports.getProducts = (req, res, next) => {
  //Product.findAll({})
  req.user.getProducts({})
  .then(products =>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  })
  .catch(err =>{
    console.log(err)
  });
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
  .then(product =>{
    return product.destroy();
  })
  .then(result =>{
    console.log("DESTROY PRODUCT");
    res.redirect('/admin/products');
  })
  .catch(err =>{
    console.log(err)
    return res.redirect('/');
  });
}