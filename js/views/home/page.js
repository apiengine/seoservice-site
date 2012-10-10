define([
  'jquery',
  'underscore',
  'backbone',
  'models/user',
  'models/session',
  'text!templates/home/page.html',
], function($, _, Backbone, UserModel, SessionModel, homeTemplate){
  var HomePage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
    },
    events: {
      'click .register': 'register',
      'click .btn-register': 'submitRegister'
    },
    submitRegister: function (ev) {
      var formDetails = $('.form-register').serializeObject();
      console.log(formDetails);
      var userModel = new UserModel();
      userModel.save(formDetails, {
        success: function () {
          console.log(arguments);
        }
      })
      return false;
    },
    register: function () {
      $("#register").modal('show')   
    },
    render: function () {
      $('title').text('Seo Server - Enable SEO for your Javascript applications')
      this.$el.html(homeTemplate); 
    }
  });
  return HomePage;
});
