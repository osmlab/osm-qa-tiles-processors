'use strict';
var test = require('tape');
var logInterceptor = require('log-interceptor');
var path = require('path');
var processors = require('../index.js');
var zoom = 12;
var signPuntuactionTiles = path.join(__dirname, '/fixtures/signPuntuaction.mbtiles');
var signPuntuactionOpts = {
  bbox: [-74.268436, -13.252812, -74.209900, -13.20167719],
  zoom: zoom
};
test('signPuntuaction', function(t) {
  t.plan(2);
  logInterceptor();
  processors.signPuntuaction(signPuntuactionOpts, signPuntuactionTiles, function() {
    var logs = logInterceptor.end();
    for (var i = 0; i < logs.length; i++) {
      var geoJSON = JSON.parse(logs[i]);
      t.comment('Pass: ' + (i + 1));
      if (geoJSON.features.length > 0) {
        t.equal(geoJSON.features[0].properties._osmlint, 'signpuntuaction', 'Should be signPuntuaction');
        t.equal(geoJSON.features[0].geometry.type, 'LineString', 'Should be a lineString');
      }
    }
    t.end();
  });
});