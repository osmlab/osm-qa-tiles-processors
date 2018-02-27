'use strict';
var test = require('tape');
var logInterceptor = require('log-interceptor');
var path = require('path');
var processors = require('../index.js');
var zoom = 12;
var selfIntersectingHighwaysTiles = path.join(__dirname, '/fixtures/selfIntersectingHighways.mbtiles');
var commonOpts = {
  bbox: [-0.0878906, -0.0878906, 0, 0],
  zoom: zoom
};

test('selfIntersectingHighways', function(t) {
  t.plan(2);
  logInterceptor();
  processors.selfIntersectingHighways(commonOpts, selfIntersectingHighwaysTiles, function() {
    var logs = logInterceptor.end();
    for (var i = 0; i < logs.length; i++) {
      var geoJSON = JSON.parse(logs[i]);
      t.comment('Pass: ' + (i + 1));
      if (geoJSON.features.length > 0) {
        t.equal(geoJSON.features[0].properties._osmlint, 'selfintersectinghighways', 'Should be selfintersecting');
        t.equal(geoJSON.features[0].geometry.type, 'Point', 'Should be  LineString');
      }
    }
    t.end();
  });
});
