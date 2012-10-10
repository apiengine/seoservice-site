define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'models/session',
  'events',
  'text!templates/header/header.html',
], function($, _, Backbone, Vm, Session, Events, headerTemplate){
  var AppView = Backbone.View.extend({
    el: '.header',
    initialize: function () {
      var that = this;
      Session.on('change:auth', function(session) {
        that.render();
        if(Session.get('auth')) {
          Backbone.router.navigate('sites', {trigger:true});

        } else {
          
        Backbone.router.navigate('', {trigger:true});
        }
      })
    },
    events: {
      'submit .login-form': 'submitLogin',
      'click .logout': 'logout'
    },
    logout: function () {
      Session.logout();

    },
    submitLogin: function (ev) {
      var loginDetails = $(ev.currentTarget).serializeObject();
      Session.login(loginDetails);
      return false;
    },
    render: function () {
      $(this.el).html(_.template(headerTemplate, {auth: Session.get('auth')})); 
    }
  });
  return AppView;
});
