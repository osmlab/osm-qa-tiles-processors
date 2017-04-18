'use strict';
var turf = require('turf');
var _ = require('underscore');

module.exports = function(tileLayers, tile, writeData, done) {
  var layer = tileLayers.osm.osm;
  var osmlint = 'doubledcity';
  var result = [];
  var objs = {};
  var places = {
    'country': true,
    'state': true,
    'region': true,
    'province': true,
    'district': true,
    'county': true,
    'municipality': true,
    'city': true,
    'borough': true,
    'suburb': true,
    'quarter': true,
    'city_block': true,
    'plot': true,
    'twon': true,
    'village': true,
    'hamlet': true,
    'farm': true,
    'allotments': true,
    'neighbourhood': true
  };

  for (var i = 0; i < layer.features.length; i++) {
    var val = layer.features[i];
    if (val.properties.place && places[val.properties.place] && (val.geometry.type === 'Point' || val.geometry.type === 'Polygon') && val.properties.name) {
      var pname = val.properties.place + '-' + val.properties.name.toLowerCase();
      if (objs[pname]) {
        objs[pname].push(val);
      } else {
        objs[pname] = [val];
      }
    }
  }
  _.each(objs, function(v, k) {
    var coordPoints = [];
    if (v.length > 1) {
      for (var i = 0; i < v.length; i++) {
        if (v[i].geometry.type === 'Polygon') {
          var points = turf.explode(v[i]);
          for (var n = 0; n < points.features.length; n++) {
            coordPoints.push(points.features[n].geometry.coordinates)
          }
        } else if (v[i].geometry.type === 'Point') {
          coordPoints.push(v[i].geometry.coordinates);
        }
      }
      var multiPt = turf.multiPoint(coordPoints);
      multiPt.properties = v[0].properties;
      result.push(multiPt);
    }
  });

  if (result.length > 0) {
    var fc = turf.featureCollection(result);
    writeData(JSON.stringify(fc) + '\n');
  }

  done(null, null);

};