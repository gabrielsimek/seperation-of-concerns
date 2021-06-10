const { Router } = require('express');
const Order = require('../models/Order');

// export default Router.......
module.exports = Router() // app.post(....)
  .post('/api/v1/orders', async(req, res) => {
    try {
      const order = await Order.insert(req.params.quantity);
      res.send(order);
    } catch(err) {
      res.status(500).send(err);
    }
  })
  .get('/api/v1/orders', async(req, res) => {
    try {
      const orders = await Order.getOrders();
      res.send(orders);

    } catch(err) {
      res.status(500).send(err);
    }
  })
  .put('/api/v1/orders:id', async(req, res) => {
    try {
      const updatedOrder = await Order.update(req.params.id, req.params.quantity);
      res.send(updatedOrder);

    }
    catch(err) {
      res.status(500).send(err);
    }
  })
  .delete('/api/v1/orders:id', async(req, res) => {
    try {
      const removedOrder = await Order.remove(req.params.id);
      res.send(removedOrder);

    }
    catch(err){
      res.status(500).send(err);
    }
  });

// class Dog {
//   name;
//   age;
//   weight;

//   constructor(name, age, weight) {
//     this.name = name;
//     this.age = age;
//     this.weight = weight;
//   }

//   static legs() {
//     return 4;
//   }

//   sayName() {
//     console.log(`My name is ${this.name}`);
//   }
// }

// // const spot = {
// //   name: 'spot',
// //   age: 5,
// //   weight: '20 lbs',
// // };
// const spot = new Dog('spot', 5, '20 lbs');
// spot.sayName();

// Dog.legs();
