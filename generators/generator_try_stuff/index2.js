


function getFromCache(model, ctx, filter, cb) {  
    var key = createKey(model, ctx ,filter, isInstanceQueryVal);
    var valueFromCache = cache.get(key);
    if (valueFromCache instanceof Promise) {
        valueFromCache.then((objs) => {
                //Init Value In Cache
        }).catch((err) => {
            cb(err);
        });
    } else {
        return cb(valueFromCache);
    }
}