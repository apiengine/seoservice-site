define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var SiteModel = Backbone.Model.extend({
    urlRoot: '/site'

  });
  return SiteModel;

});
