var assert  = require('chai').assert;
var _       = require('underscore');
var store   = require('../../src/store');
var sandbox = require('../../src/sandbox');
var dispatcher    = require('../../src/dispatcher');
var extend  = require('./tools/extend')(dispatcher, sandbox, store);
var sinon   = require('sinon');

describe('store()', function () {
    var symposia = {};

    before(function () {
        extend(symposia);
    });

    describe('add()', function () {
        var obj = { id: 1 };
        var callback;
        var sandbox;

        before(function () {
            sandbox = symposia.sandbox.create();
            callback = sinon.spy(function () {
                return false;
            });

            sandbox.subscribe({
                channel: '_store',
                topic: 'item.added',
                callback: callback
            });

            symposia.store.add(obj);
        });

        it ('should add one item to the store', function () {
            var list = symposia.store.list();
            assert.lengthOf(list,1);
        });

        it('should call the callback once', function () {
            assert.equal(callback.callCount, 1);
        });
    });

    describe('remove()', function () {

    });

    describe('find', function () {
        
    });
});