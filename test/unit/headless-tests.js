/**
 * Copyright 2016 IBM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
/**
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corp. 2016
 */

var FileKeyValStore = require('../../lib/FileKeyValStore.js');
var test = require('tape');
var fs = require('fs');

var keyValStorePath = "tmp";//tmpKeyValStore";
var fileName = "keyValFileStoreName";
var keyValue = "secretKeyValue";

//
// Run the FileKeyValStore test
//
test('FileKeyValStore test', function (t) {
    fileKeyValStore(function(err) {
        if (err) {
          fail(t, "FileKeyValStore", err);
          // Exit the test script after a failure
          process.exit(1);
        } else {
          pass(t, "FileKeyValStore");
        }
    });
});

// The FileKeyValStore test
function fileKeyValStore(cb) {
   console.log("FileKeyValStore");
   var store = new FileKeyValStore(keyValStorePath);
   store.setValue(fileName, keyValue);
   var value = store.getValue(fileName);
   value.then(
        // Log the fulfillment value
        function(val) {           
            if (val != keyValue) return cb(val +" does not equal keyValue of "+keyValue);
            else return cb();
        })
        .catch(
        // Log the rejection reason
        function(reason) {
            return cb(reason);
        });


}

function pass(t, msg) {
    t.pass("Success: [" + msg + "]");
    t.end();
}

function fail(t, msg, err) {
    t.fail("Failure: [" + msg + "]: [" + err + "]");
    t.end(err);
}
