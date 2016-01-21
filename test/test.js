'use strict';

var test = require('tap').test;
var GJV = require('geojson-validation');
var logInterceptor = require('log-interceptor');
var path = require('path');
var processors = require('../index.js');

var bbox = [7.4068451, 43.723259, 7.4422073, 43.752901];
var zoom = 12;
var mbtiles = path.join(__dirname, '/fixtures/monaco.mbtiles');
var bridgeOnNodeTiles = path.join(__dirname, '/fixtures/bridgeonnode.mbtiles');
var nodeendingnearhighwayTiles = path.join(__dirname, '/fixtures/nodeendingnearhighway.mbtiles');

var optsbridgeOnNode = {
  bbox: [114.445, 3.656, 126.376, 11.738],
  zoom: zoom
};

var opts = {
  bbox: bbox,
  zoom: zoom
};

// Parameters for testing missingHighwaysUS
var osmLevyCountyTiles = path.join(__dirname, '/fixtures/osm.levycounty.mbtiles');
var tiger2015LevyCountyTiles = path.join(__dirname, '/fixtures/tiger2015.levycounty.mbtiles');

var optsMissingHighwaysUS = {
  bbox: [-83.0759, 29.0201, -82.4290, 29.6141],
  zoom: zoom
};

test('filterDate', function(t) {
  t.plan(1);
  logInterceptor();
  processors.filterDate(opts, mbtiles, function() {
    var logs = logInterceptor.end();
    t.equal(logs.length, 0, 'No features returned');
    t.end();
  });
});

test('filterUsers', function(t) {
  t.plan(2);
  logInterceptor();
  processors.filterUsers(opts, mbtiles, function() {
    var logs = logInterceptor.end();
    for (var i = 0; i < logs.length; i++) {
      var geoJSON = JSON.parse(logs[i]);
      t.comment('Pass: ' + (i + 1));
      t.equal(GJV.isFeatureCollection(geoJSON), true, 'Should be a FeatureCollection');
      t.equal(geoJSON.features[0].properties._user, 'karitotp', 'Should be karitotp');
    }
    t.end();
  });
});

test('bridgeOnNode', function(t) {
  t.plan(6);
  logInterceptor();
  processors.bridgeOnNode(optsbridgeOnNode, bridgeOnNodeTiles, function() {
    var logs = logInterceptor.end();
    for (var i = 0; i < logs.length; i++) {
      var geoJSON = JSON.parse(logs[i]);
      t.comment('Pass: ' + (i + 1));
      if (geoJSON.features.length > 0) {
        t.equal(geoJSON.features[0].properties._osmlint, 'bridgeonnode', 'Should be bridgeonnode');
        t.equal(geoJSON.features[0].geometry.type, 'Point', 'Should be  Point');
      }
    }
    t.end();
  });
});

test('missingLayerBridges', function(t) {
  t.plan(2);
  logInterceptor();
  processors.missingLayerBridges(opts, mbtiles, function() {
    var logs = logInterceptor.end();
    for (var i = 0; i < logs.length; i++) {
      var geoJSON = JSON.parse(logs[i]);
      t.comment('Pass: ' + (i + 1));
      if (geoJSON.features.length > 0) {
        t.equal(geoJSON.features[0].properties._osmlint, 'missinglayerbridges', 'Should be missinglayerbridges');
        t.equal(geoJSON.features[0].geometry.type, 'LineString', 'Should be  Point');
      }
    }
    t.end();
  });
});

test('selfIntersectingHighways', function(t) {
  t.plan(2);
  logInterceptor();
  processors.selfIntersectingHighways(opts, mbtiles, function() {
    var logs = logInterceptor.end();
    for (var i = 0; i < logs.length; i++) {
      var geoJSON = JSON.parse(logs[i]);
      t.comment('Pass: ' + (i + 1));
      if (geoJSON.features.length > 0) {
        t.equal(geoJSON.features[0].properties._osmlint, 'selfintersectinghighways', 'Should be selfintersecting');
        t.equal(geoJSON.features[0].geometry.type, 'LineString', 'Should be  LineString');
      }
    }
    t.end();
  });
});

test('unclosedWays', function(t) {
  t.plan(2);
  logInterceptor();
  processors.unclosedWays(opts, mbtiles, function() {
    var logs = logInterceptor.end();
    for (var i = 0; i < logs.length; i++) {
      var geoJSON = JSON.parse(logs[i]);
      t.comment('Pass: ' + (i + 1));
      if (geoJSON.features.length > 0) {
        t.equal(geoJSON.features[0].properties._osmlint, 'unclosedways', 'Should be unclosedways');
        t.equal(geoJSON.features[0].geometry.type, 'LineString', 'Should be  LineString');
      }
    }
    t.end();
  });
});

test('untaggedWays', function(t) {
  t.plan(2);
  logInterceptor();
  processors.untaggedWays(opts, mbtiles, function() {
    var logs = logInterceptor.end();
    for (var i = 0; i < logs.length; i++) {
      var geoJSON = JSON.parse(logs[i]);
      t.comment('Pass: ' + (i + 1));
      if (geoJSON.features.length > 0) {
        t.equal(geoJSON.features[0].properties._osmlint, 'untaggedway', 'Should be untaggedway');
        t.equal(geoJSON.features[0].geometry.type, 'LineString', 'Should be  LineString');
      }
    }
    t.end();
  });
});

test('missingHighwaysUS', function(t) {
  t.plan(54);
  logInterceptor();
  processors.missingHighwaysUS(optsMissingHighwaysUS, osmLevyCountyTiles, tiger2015LevyCountyTiles, function() {
    var logs = logInterceptor.end();
    for (var i = 0; i < logs.length; i++) {
      var geoJSON = JSON.parse(logs[i]);
      t.comment('Pass: ' + (i + 1));
      if (geoJSON.features.length > 0) {
        t.equal(geoJSON.features[0].properties._osmlint, 'missinghighwayus', 'Should be missinghighwayus');
        t.equal(geoJSON.features[0].geometry.type, 'LineString', 'Should be  LineString');
      }
    }
    t.end();
  });
});

test('nodeEndingNearHighway', function(t) {
  t.plan(3);
  logInterceptor();
  processors.nodeEndingNearHighway(opts, nodeendingnearhighwayTiles, function() {
    var logs = logInterceptor.end();
    for (var i = 0; i < logs.length; i++) {
      var geoJSON = JSON.parse(logs[i]);
      t.comment('Pass: ' + (i + 1));
      if (geoJSON.features.length > 0) {
        t.equal(geoJSON.features[0].properties._osmlint, 'nodeendingnearhighway', 'Should be nodeendingnearhighway');
        t.equal(geoJSON.features[0].geometry.type, 'LineString', 'Should be LineString');
        t.equal(geoJSON.features[3].geometry.type, 'Point', 'Should be Point');
      }
    }
    t.end();
  });
});
