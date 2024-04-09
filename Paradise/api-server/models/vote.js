// const { Sequelize } = require(".");

module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define("Vote", {
    id:{
      type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    
    },
    commentId: {
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
   }
   ,

    
  });
  return Vote
}

// addressId: {
//   type: DataTypes.INTEGER,
//   references: {
//       model: 'addresses',
//       key: 'id'
//   }
// }