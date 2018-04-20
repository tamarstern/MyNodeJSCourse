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



var b = {
    p: 2,
    q: "something else",
    r: true
}
 
var c = {
    p: 10,
    q: "other things",
    r: false
}



function Some(p, q, r){
    this.p = p;
    this.q = q;
    this.r = r;
}
 
var a = new Some(1, "something", false);
var b = new Some(2, "something else", true);
var c = new Some(10, "other things", false);




