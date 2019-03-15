const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const REACT_BUILD_DIRECTORY = "../../hosting-admin-panel-frontend/build/"; // npm run build (from the react project)
module.exports = [
    logger('dev'),
    express.json(),
    express.urlencoded({ extended: false }),
    cookieParser(),
    express.static(path.join(__dirname, REACT_BUILD_DIRECTORY))
];