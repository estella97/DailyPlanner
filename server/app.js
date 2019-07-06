




// old code
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const DataSchema = new Schema(
//   {
//     name: String,                           // the official name of the location
//     type: String,                           // the location type (ie: park, restraunt, etc...)
//     feelings: Array(String),                // the feelings associated with this location
//     location: {
//         type: String,                       // GeoPoint type for MongoDB see: https://docs.mongodb.com/manual/reference/geojson/#
//         coordinates: Array(2, Number)       // Should be specified as type: "Point"
//     }
//   },
//   { timestamps: true }                      // we can use the timestamp to determine 'stale' data
// );

// module.exports = mongoose.model("Data", DataSchema);
