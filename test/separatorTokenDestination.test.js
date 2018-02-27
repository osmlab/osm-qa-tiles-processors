'use strict';
var test = require('tape');
var logInterceptor = require('log-interceptor');
var path = require('path');
var processors = require('../index.js');
var zoom = 12;
var separatorTokenTiles = path.join(__dirname, '/fixtures/separatorTokenDestination.mbtiles');
var separatorTokenOpts = {
  bbox: [19.910831, 41.02741, 19.998722, 41.082296],
  zoom: zoom
};
test('separatorTokenDestination', function(t) {
  t.plan(2);
  logInterceptor();
  processors.separatorToken(separatorTokenOpts, separatorTokenTiles, function() {
    var logs = logInterceptor.end();
    for (var i = 0; i < logs.length; i++) {
      var geoJSON = JSON.parse(logs[i]);
      t.comment('Pass: ' + (i + 1));
      if (geoJSON.features.length > 0) {
        t.equal(
          geoJSON.features[0].properties._osmlint,
          'separatortokendestination',
          'Should be separatorTokenDestination'
        );
        t.equal(geoJSON.features[0].geometry.type, 'LineString', 'Should be a lineString');
      }
    }
    t.end();
  });
});
