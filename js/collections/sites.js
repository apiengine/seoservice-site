define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var Sites = Backbone.Collection.extend({
    url: function () {
      return '/sites'
    }
  });

  return Sites;
});
