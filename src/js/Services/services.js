'use strict';

/* Services */

var tennisServices = angular.module('tennisServices', []);

tennisServices
    .factory('dbinstance', function() {
        return new PouchDB('tennis');
    })
    .factory('db', function(dbinstance) {

        return {
            add: function(obj) {
                    return dbinstance.put(obj);
                },
            addArray: function(arr) {
                    return dbinstance.bulkDocs(arr);
                },
            addAuto: function(obj) {
                    return dbinstance.post(obj);
                },
            get: function(id) {
                    return dbinstance.get(id);
                },
            getAll: function() {
                return dbinstance.allDocs({
                    include_docs: true,
                    attachments: false
                });
            },
            rm: function(doc, rev) {
                return dbinstance.remove(doc, rev);
            },
            query: function(query) {
                return dbinstance.query(query, {
                    include_docs: true,
                    attachments: false
                });
            }
        }
    });