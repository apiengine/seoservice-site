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
      'click .btn-open-delete': 'openDeleteModal',
      'submit .form-addsite': 'addSite',
      'submit .form-editsite': 'editSite',
      'click .btn-confirm-delete': 'confirmDelete',
      'click .btn-cancel-delete': 'cancelDelete'
    },
    openModal: function (ev) {
      $("#addsite").modal('show')   

      return false;
    },
    openDeleteModal: function (ev) {
      var id = $(ev.currentTarget).attr('data-site-id');
      $("#deletesite").data('id', id).modal('show');   
      $('.btn-confirm-delete').attr('data-site-id', id);

      return false;
    },
    confirmDelete: function (ev) {
      var that = this;
      var site = new Site({id: $(ev.currentTarget).attr('data-site-id')});
      site.destroy({
        success: function () {
                $('#deletesite').on('hidden', function () {
that.render();
})
          $("#deletesite").modal('hide')   
          console.log('des', arguments);
        }
      })
      return false;
    },
    cancelDelete: function(ev) {
          $("#deletesite").modal('hide')   
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
            $('#addsite').on('hidden', function () {
that.render();
})
          $("#addsite").modal('hide'); 
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
          $('#editsite').on('hidden', function () {
that.render();
})
          $("#editsite").modal('hide')   
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
