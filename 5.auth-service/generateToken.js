const jwt = require('jsonwebtoken');

const generateToken = (res, id, userInfo, toSend) => {
    const { FirstName } = userInfo
    const token = jwt.sign({ id, FirstName }, process.env.JWT_SECRET, {
        expiresIn: process.env.DB_ENV === 'testing' ? '1d' : '7d'
    });
    if (toSend)
        return res.cookie('token', token).status(200)
            .json({ userInfo, token });
    return token
};
module.exports = generateToken