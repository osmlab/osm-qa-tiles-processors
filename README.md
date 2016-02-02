# OSM Lint

![](https://circleci.com/gh/osmlab/osmlint.png?circle-token=e4229a7582377cb4914b45e6a232441b742eb0ee)

_Work in progress and changing fast._

Validate OpenStreetMap data with [OSM QA Tiles](http://osmlab.github.io/osm-qa-tiles/). OSM Lint is a selection of validators built with [TileReduce](https://github.com/mapbox/tile-reduce) for validating OSM QA Tiles. Use from the command line or as a node module.

## Installation

```sh
git clone https://github.com/osmlab/osmlint.git
cd osmlint
npm install -g && npm link
```

## Usage

### Command line

```sh
osmlint bridgeonnode --bbox="[7.4, 43.7, 7.4, 43.7]" --zoom=12 osm.mbtiles
```

### Javascript

```javascript
// Outputs nodes with bridge tags to stdout
require('osmlint').bridgeOnNode({bbox: [-122.1, 36.9, -121.9, 37.0], zoom: 12}, './osm.mbtiles', function() {
    console.log('done');
});
```

## Available validators

See [`validators.txt`](https://github.com/osmlab/osmlint/blob/master/validators.txt).

## Test

```sh
npm install & npm test
```
### Output
osmlint will generate a newline separated list of geojson feature collections instdout. You can merge this into a valid geojson file using the merge_geosjon.py script

```
osmlint filterusers --bbox="[62, 31, 70.5, 26.7]" --zoom=12 afghanistan.mbtiles > output.json
python utils/merge_geojson.py output.json > output.geojson
```
