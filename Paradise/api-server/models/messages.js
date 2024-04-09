// const { Sequelize } = require(".");

module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    id:{
      type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
   
      // references: "Item",
      // referencesKey:"id"
    }, 
   senderId: {
       type: DataTypes.INTEGER,
       allowNull: false,
    
      //  referemce: "User",
      //  referencesKey: "id"
   },

      senderName: {
       type: DataTypes.STRING,
       allowNull: false,
     
      //  referemce: "User",
      //  referencesKey: "id"
   },
   time:{
     type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false

   },
    message:{
      type: DataTypes.TEXT,
      
}
  });
  return Message
}

// addressId: {
//   type: DataTypes.INTEGER,
//   references: {
//       model: 'addresses',
//       key: 'id'
//   }
// }