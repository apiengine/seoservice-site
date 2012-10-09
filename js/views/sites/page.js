define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/sites/page.html',
], function($, _, Backbone, sitesTemplate){
  var SitesPage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
    },
    render: function () {
      console.log('as');
      this.$el.html(sitesTemplate); 
      $('title').text('Seo Service - Sites')
    }
  });
  return SitesPage;
});
