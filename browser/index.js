'use strict';
var utils;
var print;
var backboneEvents;
var layers;
var anchor;

var urlVars = require('./../../../browser/modules/urlparser').urlVars;


var exId = "alleroed_lp";

module.exports = {
    set: function (o) {

        utils = o.utils;
        print = o.print;
        layers = o.layers;
        anchor = o.anchor;
        backboneEvents = o.backboneEvents;

    },

    init: function () {

        layers.setUri("/extensions/qgisfilter/api/wms/" + urlVars.planid);

        print.setCallBack(function (e) {
            if (!e.success) {
                alert("Noget gik galt!")
            } else {
                let obj = {"key": e.key, "hash": anchor.getAnchor()};
                console.log(obj);
                window.parent.postMessage(obj, '*');
            }
        });

    }
};