'use strict';

var _ = require('underscore');

module.exports = function (symposia) {
    var sandbox = {};

    sandbox.create = function (name) {
        var _id = _.uniqueId('sandbox_');

        return {
            /**
             * Find the element with a matching ID
             */
            getElement: function () {
                var element;

                if (symposia.dom) {
                    element = symposia.dom.find(name);
                }

                return element;
            },
            getSubscriptions: function () {
                 return symposia.dispatcher.getBySubscriberId(_id);
            },
            /**
             * Publish a message
             * @param {object} envelope
             */
            publish: function (message) {
                 return symposia.dispatcher.publish(message);
            },
            /**
             * Create a new subscription
             * @param {object} subscription
             */
            subscribe: function (subscription) {
                symposia.dispatcher.subscribe(_.extend(subscription, { sid: _id }));
            },
            /**
             * Unsubscribe a subscription
             * @param {subscription}
             */
            unsubscribe: function (subscription) {
                symposia.dispatcher.unsubscribe(_.extend(subscription, { sid: _id }));
            },
            /**
             * Remove all subscriptions
             */
            unsubscribeAll: function () {
                symposia.dispatcher.unsubscribeAll(_id);
            },
            /**
             * Store a single item
             * @param {object}
             */
            storeItem: function (obj) {
                symposia.store.add(obj);
            }
        };
    };

    symposia.sandbox = sandbox;
};
