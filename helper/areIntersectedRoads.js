'use strict';
/**
 * Check out if two road are intersecting
 * @param  {Objects->Feature} Road 1
 * @param  {Objects->Feature} Road 2
 * @return {Boolean} Returns a true when the roads are intersecting
 */
module.exports = function(feature1, feature2) {
  var coord1 = feature1.geometry.coordinates;
  var coord2 = feature2.geometry.coordinates;
  var x1 = coord1[0][0];
  var y1 = coord1[0][1];
  var x2 = coord1[coord1.length - 1][0];
  var y2 = coord1[coord1.length - 1][1];
  var x3 = coord2[0][0];
  var y3 = coord2[0][1];
  var x4 = coord2[coord2.length - 1][0];
  var y4 = coord2[coord2.length - 1][1];
  var adx = x2 - x1;
  var ady = y2 - y1;
  var bdx = x4 - x3;
  var bdy = y4 - y3;
  var s = (-ady * (x1 - x3) + adx * (y1 - y3)) / (-bdx * ady + adx * bdy);
  var t = (+bdx * (y1 - y3) - bdy * (x1 - x3)) / (-bdx * ady + adx * bdy);
  return s >= 0 && s <= 1 && t >= 0 && t <= 1;
};
