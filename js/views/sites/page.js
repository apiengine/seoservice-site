define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/sites/page.html',
  'collections/sites',
  'text!templates/sites/table.html',
  'models/site'
], function($, _, Backbone, sitesTemplate, Sites, tableTemplate, Site){
  var SitesPage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
    },
    events: {
      'click .btn-site-modal': 'openModal',
      'click .btn-open-edit': 'openEditModal',
      'submit .form-addsite': 'addSite',
      'submit .form-editsite': 'editSite'
    },
    openModal: function (ev) {
      $("#addsite").modal('show')   

      return false;
    },
    openEditModal: function (ev) {
      var siteid = $(ev.currentTarget).attr('data-site-id');
      console.log(siteid);
      $("#editsite").modal('show')   
      var site = new Site({id: siteid});
      console.log(site);
      site.fetch({
        success: function (site) {
          console.log(arguments);
          $('.edit-site-domain').val(site.get('domain'));
          $('.form-editsite').attr('data-site-id', siteid);
        }
      });
      return false;
    },
    addSite: function () {
      var that = this;
      var siteDetails = $('.form-addsite').serializeObject();
      console.log('a',siteDetails);
      var site = new Site();
      site.save(siteDetails, {
        success: function () {
          console.log(arguments);
          $("#addsite").modal('hide')   
          that.render();
        }
      });
      return false;
    },
    editSite: function () {
      var that = this;
      var siteDetails = $('.form-editsite').serializeObject();
      var site = new Site();
      siteDetails.id = $('.form-editsite').attr('data-site-id');

      site.save(siteDetails, {
        success: function () {
          console.log(arguments);
          $("#editsite").modal('hide')   
          that.render();
        }
      });
      return false;
    },
    render: function () {
      this.$el.html(sitesTemplate); 
      $('title').text('Seo Service - Sites');
      var sites = new Sites();
      sites.fetch({
        success: function (sites) {
          console.log(sites);
          $('.site-list-container').html(_.template(tableTemplate, {_:_, sites:sites.models}));

        }
      })
    }
  });
  return SitesPage;
});
