// const { Sequelize } = require(".");

module.exports = function(sequelize, DataTypes) {
  var User_decoration = sequelize.define("User_decoration", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,

      // referemce: "User",
      // referencesKey:"id"
    },
    decoration: {
      type: DataTypes.TEXT,
      allowNull: false,

      // references: "Item",
      // referencesKey:"id"
    },

    colors: {
      type: DataTypes.TEXT,
      allowNull: false,

      // references: "Item",
      // referencesKey:"id"
    },
    background: {
      type: DataTypes.TEXT,
      allowNull: false,

    },
  });
  return User_decoration;
}



// module.exports = function(sequelize, DataTypes) {
//     var Post = sequelize.define("Post", {
//       title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           len: [1]
//         }
//       },
//       body: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//         len: [1]
//       }
//     });
  
//     Post.associate = function(models) {
//       // We're saying that a Post should belong to an Author
//       // A Post can't be created without an Author due to the foreign key constraint
//       Post.belongsTo(models.Author, {
//         foreignKey: {
//           allowNull: false
//         }
//       });
//     };
  
//     return Post;
//   };
  

  // module.exports = function(sequelize, DataTypes) {
  //   var Author = sequelize.define("Author", {
  //     // Giving the Author model a name of type STRING
  //     name: DataTypes.STRING
  //   });
  
  //   Author.associate = function(models) {
  //     // Associating Author with Posts
  //     // When an Author is deleted, also delete any associated Posts
  //     Author.hasMany(models.Post, {
  //       onDelete:  "cascade"
  //     });
  //   };
  
  //   return Author;
  // };
  