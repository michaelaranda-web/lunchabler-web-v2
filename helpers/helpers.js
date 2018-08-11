module.exports = function collectionAsObject(coll) {
  return coll.reduce(function(acc, cur) {
    acc[cur._id] = cur;
    return acc;
  }, {});
}