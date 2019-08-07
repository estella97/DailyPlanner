// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by feedback.js.
import { name as packageName } from "meteor/feedback";

// Write your tests here!
// Here is an example.
Tinytest.add('feedback - example', function (test) {
  test.equal(packageName, "feedback");
});
