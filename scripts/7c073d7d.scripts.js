"use strict";var Listit=angular.module("ListItApp",["ngResource"]);Listit.config(["$routeProvider","$httpProvider",function(a,b){b.defaults.headers.common["X-ZUMO-APPLICATION"]="deHcYguFWpBdJcEQYeiSQSlfZseKjK11",a.when("/",{templateUrl:"views/lists.html",controller:"ListCtrl"}).when("/list/:listId",{templateUrl:"views/listitems.html",controller:"ListItemsCtrl"}).otherwise({redirectTo:"/"})}]);var baseUrl="https://seriouslists.azure-mobile.net/tables/";Listit.factory("listItemData",["$resource",function(a){return a(baseUrl+"listitems/:id",{id:"@id"},{remove:{method:"DELETE"},add:{method:"POST"}})}]),Listit.factory("getListItemData",["$resource",function(a){return a(baseUrl+"listitems",{},{query:{method:"GET",isArray:!0}})}]),Listit.factory("listData",["$resource",function(a){return a(baseUrl+"lists/:id",{id:"@id"},{get:{method:"GET"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},add:{method:"POST"}})}]),Listit.controller("ListCtrl",["$scope","listData",function(a,b){a.lists=b.query(),a.removeList=function(c){b.remove(c),a.lists=b.query()},a.addList=function(){var c={name:a.listName,description:a.listDescription};b.add(c),a.lists=b.query(),a.listName="",a.listDescription=""}}]),Listit.controller("ListItemsCtrl",["$scope","$routeParams","getListItemData","listItemData","listData",function(a,b,c,d){var e=null;if(b.listId&&(e=b.listId),null!=e){var f="(listId eq "+e+")";a.items=c.query({$filter:f}),a.removeItem=function(b){d.remove(b),a.items=d.query({$filter:f})},a.addItem=function(){var b={text:a.itemText,complete:!1,listId:e};d.add(b),a.items=d.query({$filter:f}),a.itemText=""}}}]);