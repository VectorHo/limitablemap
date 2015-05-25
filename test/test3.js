var LimitableMap = require('../limitablemap.js');

var cache = new LimitableMap();

cache.p_set('fuck', 'comeontom');
console.log(cache.p_get('fuck'));
console.log(cache.p_length());
console.log(cache.p_size());

cache.p_remove('fuck');
console.log(cache.p_get('fuck'));
console.log(cache.p_length());
console.log(cache.p_size());
