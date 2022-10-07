const jwt = require('jsonwebtoken')

const genAuthToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email
    }, 'thai')
}

module.exports= genAuthToken