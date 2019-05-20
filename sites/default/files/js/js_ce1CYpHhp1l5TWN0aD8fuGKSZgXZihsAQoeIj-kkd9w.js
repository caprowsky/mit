;
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.initColorbox = {
    attach: function (context, settings) {
      if (!$.isFunction($.colorbox) || typeof settings.colorbox === 'undefined') {
        return;
      }

      if (settings.colorbox.mobiledetect && window.matchMedia) {
        // Disable Colorbox for small screens.
        var mq = window.matchMedia('(max-device-width: ' + settings.colorbox.mobiledevicewidth + ')');
        if (mq.matches) {
          return;
        }
      }

      settings.colorbox.rel = function () {
        return $(this).data('colorbox-gallery')
      };

      $('.colorbox', context)
        .once('init-colorbox')
        .colorbox(settings.colorbox);
    }
  };

})(jQuery, Drupal);
;
(function ($) {

Drupal.behaviors.initColorboxDefaultStyle = {
  attach: function (context, settings) {
    $(context).bind('cbox_complete', function () {
      // Only run if there is a title.
      if ($('#cboxTitle:empty', context).length == false) {
        $('#cboxLoadedContent img', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideDown();
        });
        $('#cboxOverlay', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideUp();
        });
      }
      else {
        $('#cboxTitle', context).hide();
      }
    });
  }
};

})(jQuery);
;
(function ($) {

  Drupal.votingApiReaction = {
    className: "votingapi-reaction-form"
  };

  Drupal.behaviors.votingApiReaction = {
    attach: function () {
      // We extend Drupal.ajax objects for all AJAX elements in our form
      for (var instance in Drupal.ajax.instances) {
        if (Drupal.ajax.instances.hasOwnProperty(instance)
            && Drupal.ajax.instances[instance] !== null
            && Drupal.ajax.instances[instance].element.hasOwnProperty('form')) {
          if (Drupal.ajax.instances[instance].element.form.classList.contains(Drupal.votingApiReaction.className)) {
            Drupal.ajax.instances[instance].beforeSend = Drupal.votingApiReaction.beforeSend;
          }
        }
      }

    }
  };

  // Disable radios before AJAX
  Drupal.votingApiReaction.beforeSend = function (xmlhttprequest, options) {
    Drupal.Ajax.prototype.beforeSend(xmlhttprequest, options);

    $("input[type=radio]:not(:disabled)", this.element.form).attr("disabled", true);
  };

})(jQuery);
;
