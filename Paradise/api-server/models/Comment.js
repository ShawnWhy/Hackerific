// const { Sequelize } = require(".");

module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references:{
        model:"Items",
        key:"id"
      }
      // references: "Item",
      // referencesKey:"id"
    }, 
   userId: {
       type: DataTypes.INTEGER,
       allowNull: false,
  
      //  referemce: "User",
      //  referencesKey: "id"
   },
   userName: {
       type: DataTypes.STRING,
       allowNull: false,  
  
      //  referemce: "User",
      //  referencesKey: "id"
   },

   votes:{
    type: DataTypes.INTEGER
   },
    comment:{
      type: DataTypes.TEXT,
}
  });
  return Comment
}

// addressId: {
//   type: DataTypes.INTEGER,
//   references: {
//       model: 'addresses',
//       key: 'id'
//   }
// }