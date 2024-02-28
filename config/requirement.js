
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const expressValidator = require('express-validator');

module.exports.requirements = {
    jwt,
    dotenv,
    bcrypt,
    expressValidator
}