module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      product_code: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      qty: {
        type: Sequelize.INTEGER
      },
      total_amount: {
        type: Sequelize.STRING
      },
      catalog_code: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return Order;
  };