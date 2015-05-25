var LimitableMap = function(limit) {
  this.limit = limit || 16;
  this.map = {}; // 要求这些键，不能是js关键字、保留字
  this.keys = [];

  // 常驻map
  this.p_map = {};
  this.p_keys = [];
};

var hasOwnProperty = Object.prototype.hasOwnProperty; // func

LimitableMap.prototype.set = function(key, value) {
  var map = this.map;
  var keys = this.keys;
  if (!hasOwnProperty.call(map, key)) {
    if (keys.length === this.limit) { // 防止内存溢出
      var firstKey = keys.shift();
      delete map[firstKey];
    }
    keys.push(key); // 当前元素的下标
  }
  map[key] = value; // 覆盖存在的旧对象
};

LimitableMap.prototype.p_set = function(key, value) {
  var map = this.p_map;
  var keys = this.p_keys;
  if (!hasOwnProperty.call(map, key)) {
    keys.push(key); // 当前元素的下标
  }
  map[key] = value; // 覆盖存在的旧对象
};

LimitableMap.prototype.get = function(key) {
  return this.map[key];
};

LimitableMap.prototype.p_get = function(key) {
  return this.p_map[key];
};


LimitableMap.prototype.del = LimitableMap.prototype.remove = function(key) {
  var map = this.map;
  var keys = this.keys;
  if (hasOwnProperty.call(map, key)) { // map.hasOwnProperty(key); {key： value}
    // 根据key删除,找到位子删除信息
    keys.filter(function(item, index, array) {
      if (key === item) {
        array.splice(index, 1);
      }
    });
    delete map[key];
  }
};

LimitableMap.prototype.p_del = LimitableMap.prototype.p_remove = function(key) {
  var map = this.p_map;
  var keys = this.p_keys;
  if (hasOwnProperty.call(map, key)) { // map.hasOwnProperty(key); {key： value}
    // 根据key删除,找到位子删除信息
    keys.filter(function(item, index, array) {
      if (key === item) {
        array.splice(index, 1);
      }
    });
    delete map[key];
  }
};

LimitableMap.prototype.length = LimitableMap.prototype.size = function() {
  return this.keys.length;
};

LimitableMap.prototype.p_length = LimitableMap.prototype.p_size = function() {
  return this.p_keys.length;
};

exports = module.exports = LimitableMap;
