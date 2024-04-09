// const { Sequelize } = require(".");

module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define("Like", {
    id:{
      type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false, 

      // references: "Item",
      // referencesKey:"id"
    }, 
   userId: {
  type: DataTypes.INTEGER,
  allowNull: false,

      //  referemce: "User",
      //  referencesKey: "id"
   },
   
    
  });
  return Like
}

// addressId: {
//   type: DataTypes.INTEGER,
//   references: {
//       model: 'addresses',
//       key: 'id'
//   }
// }