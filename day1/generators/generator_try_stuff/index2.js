var async = require('async');

var resultMap = {};

var getCategories =  (cb) => {
    categories.find({}, (catErr, categoriesResult)=> {
        if (catErr) {
            return cb(catErr);
        }
        resultMap.categoriesResult = categoriesResult;
        return cb();
    })
}
var getUsers = (cb) => {
    Users.find({}, (userErr, userResult) => {
        if (userErr) {
            return cb(userErr);
        }
        resultMap.userResult = userResult;
        return cb();
    });
}

var getUsersAndCategories = (cb) => {
    async.parallel([getUsers, getCategories], (err) => {
        if(err) {
            return err;
        }
        return resultMap;
    })
}

