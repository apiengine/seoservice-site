// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
	'vm'
], function ($, _, Backbone, Session, Vm) {
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
      if(Session.get('auth')) {

        require(['views/sites/page'], function(SitesPage){
          var sitesPage = new SitesPage();
          sitesPage.render();
        })
      } else {
        Backbone.router.navigate('', {trigger:true});

      }
    });
    router.on('route:home', function () {
      if(!Session.get('auth')) {
        require(['views/home/page'], function(HomePage){
          var homePage = new HomePage();
          homePage.render();
        })
      } else {
        Backbone.router.navigate('sites', {trigger:true});
      }
    });
        
		router.on('route:defaultAction', function (username) {
		
    });
    
  };
  return {
    initialize: initialize
  };
});
