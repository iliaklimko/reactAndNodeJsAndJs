module.exports = function (sequelize, Sequelize) {

    var User = sequelize.define('user', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        },


        email: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Email-id required"
                },
                isEmail: {
                    args: true,
                    msg: 'Valid email-id required'
                }
            },
            unique: {msg: 'Email address already in use!'}

        },


        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'inactive'
        },

        adminStatus: {
            type: Sequelize.ENUM('true', 'false'),
            defaultValue: 'false'
        }


    });

    return User;

}