// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
	'vm'
], function ($, _, Backbone, Vm) {
  var AppRouter = Backbone.Router.extend({
    routes: {

      'sites': 'sites',
      '': 'home'
    }
  });

  var initialize = function(options){
    
		var appView = options.appView;
    var router = new AppRouter(options);
    Backbone.router = router;
    router.on('route:sites', function () {
      require(['views/sites/page'], function(SitesPage){
        var sitesPage = new SitesPage();
        sitesPage.render();
      })
    });
    router.on('route:home', function () {
      require(['views/home/page'], function(HomePage){
        var homePage = new HomePage();
        homePage.render();
      })
    });
        
		router.on('route:defaultAction', function (username) {
		});
    
  };
  return {
    initialize: initialize
  };
});
