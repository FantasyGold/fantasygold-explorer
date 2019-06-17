'use strict';

angular.module('insight.networks')
	.factory('Networks',
		function(Constants, FantasyGoldCoreLib) {
			return {
				getCurrentNetwork: function () {
					return FantasyGoldCoreLib.Networks.get(Constants.NETWORK);
				}
			}
		});