define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var SessionModel = Backbone.Model.extend({
  
    urlRoot: '/session',
    initialize: function () {
      var that = this;
      // Hook into jquery
      // Use withCredentials to send the server cookies
      // The server must allow this through response headers
      $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        options.xhrFields = {
          withCredentials: true
        };
        // If we have a csrf token send it through with the next request
        if(typeof that.get('csrf') !== 'undefined') {
          jqXHR.setRequestHeader('X-CSRF-Token', that.get('csrf'));
        }
      });
    },
    defaults: {
    
    },
    login: function(creds) {
      creds.csrf = this.get('csrf');
      // Do a POST to /session and send the serialized form creds
      this.clear({silent: true});
      this.save(creds, {
         success: function () {},
         wait: true
      });
    },
    logout: function() {
      // Do a DELETE to /session and clear the clientside data
      var that = this;
      this.destroy({
        success: function (model, resp) {
          
          // Set auth to false to trigger a change:auth event
          // The server also returns a new csrf token so that
          // the user can relogin without refreshing the page
          that.set({auth: false, csrf: resp.csrf});
          
        }
      });      
    },
    getAuth: function(callback) {
      // getAuth is wrapped around our router
      // before we start any routers let us see if the user is valid
      this.fetch({
          success: callback
      });
    }
  });
  return new SessionModel();

});
