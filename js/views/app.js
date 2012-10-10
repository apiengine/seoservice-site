define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'models/session',
	'events',
  'text!templates/layout.html',
  'views/header/header'
], function($, _, Backbone, Vm, Session, Events, layoutTemplate, HeaderView){
  var AppView = Backbone.View.extend({
    el: 'body',
    initialize: function () {
      $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        options.url = 'http://localhost:5000' + options.url;
        //options.url = 'http://seoserver-web.herokuapp.com' + options.url;
      });
    },
    render: function () {

      // Render main layout template
			var that = this;
      $(this.el).html(layoutTemplate); 

      Session.getAuth(function () {

        // Attach hooks to links for pushstate
        $('body').on('click', 'a', function (e) {
          if(typeof $(this).attr('href')!== 'undefined' && $(this).attr('href').substr(0,4) !== 'http') {
            clicky.log($(this).attr('href'), $(this).attr('href').replace('!', ''), 'pageview')
            Backbone.router.navigate($(this).attr('href').replace('!/', ''), true);
            return false;
          } 
        });


        var headerView = new HeaderView();
        headerView.render();

        // Hackery for pushState when developing
        var root = '/';
        if(window.location.hostname === 'localhost') {
          root = '/repos/seoservice-site/';
        }
        Backbone.history.start({pushState: true, root: root});
      });


		} 
	});
  return AppView;
});
