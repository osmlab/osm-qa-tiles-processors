'use strict';
var test = require('tape');
var logInterceptor = require('log-interceptor');
var path = require('path');
var processors = require('../index.js');
var zoom = 12;
var islandsHighwaysTiles = path.join(__dirname, '/fixtures/islandsHighways.mbtiles');
var commonOpts = {
  bbox: [-0.0878906, -0.0878906, 0, 0],
  zoom: zoom
};

test('islandsHighways', function(t) {
  t.plan(2);
  logInterceptor();
  processors.islandsHighways(commonOpts, islandsHighwaysTiles, function() {
    var logs = logInterceptor.end();
    for (var i = 0; i < logs.length; i++) {
      var geoJSON = JSON.parse(logs[i]);
      t.comment('Pass: ' + (i + 1));
      if (geoJSON.features.length > 0) {
        t.equal(geoJSON.features[0].properties._osmlint, 'islandshighways', 'Should be islandsHighways');
        t.equal(geoJSON.features[0].geometry.type, 'LineString', 'Should be LineString');
      }
    }
    t.end();
  });
});
