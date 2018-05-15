'use strict';
var utils;
var print;
var backboneEvents;
var layers;

var urlVars = require('./../../../browser/modules/urlparser').urlVars;


var exId = "alleroed_lp";

module.exports = {
    set: function (o) {

        utils = o.utils;
        print = o.print;
        layers = o.layers;
        backboneEvents = o.backboneEvents;

    },

    init: function () {

        layers.setUri("/extensions/qgisfilter/api/wms/" + urlVars.planid);

        print.setCallBack(function (e) {
            if (!e.success) {
                alert("Noget gik galt!")
            } else {
                console.log(e.key);
                window.parent.postMessage({"key": e.key}, '*');
            }
        });

    }
};