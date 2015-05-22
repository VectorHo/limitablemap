var LimitableMap = require('../limitablemap.js');

var cache = new LimitableMap(100);

cache.set('fuck', 'comeontom');
console.log(cache.get('fuck'));
console.log(cache.length());
console.log(cache.size());

cache.del('fuck');
console.log(cache.get('fuck'));
console.log(cache.length());
console.log(cache.size());
