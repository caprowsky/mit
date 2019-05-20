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
/**
 * @file
 * Masonry script.
 *
 * Sponsored by: www.freelance-drupal.com
 */

(function ($, Drupal, drupalSettings) {

  Drupal.behaviors.masonry = {
    attach: function(context, settings) {

      // Apply Masonry on the page.
      applyMasonry(false);

      // Hack for tabs: when the tab is open, it takes to reload Masonry.
      // @todo: what is the effect of this on performance ?
      $('a[data-toggle="tab"]').on('shown.bs.tab', function () {
        applyMasonry(true);
      });

      /**
       * Apply Masonry
       * @param forceInit (boolean)
       *   Force the initialisation of Masonry display (necessary hack for tabs).
       */
      function applyMasonry(forceInit) {

        // Iterate through all Masonry instances
        $.each(drupalSettings.masonry, function (container, settings) {
          // Set container
          var $container = $(container);
          $(container).addClass('masonry-layout');

          // Set options
          var $options = new Object();

          // Sets the item selector.
          if (settings.item_selector) {
            $options.itemSelector = settings.item_selector;
            // Add custom class to all items.
            $(settings.item_selector).addClass('masonry-item');
          }

          // Apply column width units accordingly.
          if (settings.column_width) {
            if (settings.column_width_units == 'px') {
              $options.columnWidth = parseInt(settings.column_width);
            }
            else if (settings.column_width_units == '%') {
              $options.columnWidth = ($container.width() * (settings.column_width / 100)) - settings.gutter_width ;
            }
            else {
              $options.columnWidth = settings.column_width;
            }
          }

          // Add stamped selector.
          if (settings.stamp) {
            $options.stamp = settings.stamp;
          }

          // Add the various options.
          $options.gutter = settings.gutter_width;
          $options.isResizeBound = settings.resizable;
          $options.isFitWidth = settings.fit_width;
          if (settings.rtl) {
            $options.isOriginLeft = false;
          }
          if (settings.animated) {
            $options.transitionDuration = settings.animation_duration + 'ms';
          }
          else {
            $options.transitionDuration = 0;
          }
          if(settings.percent_position){
            $options.percentPosition = true;
          }

          /**
           * Apply Masonry to container
           */

          // Load images first if necessary.
          if (settings.images_first) {
            $container.imagesLoaded(function () {
              if (forceInit) {
                $container.masonry($options);
              }
              else if ($container.hasClass('masonry-processed')) {
                $container.masonry('reloadItems').masonry('layout');
              }
              else {
                $container.once('masonry').masonry($options);
              }
            });
          }

          // Apply without loading images first otherwise.
          else {
            if (forceInit) {
              $container.masonry($options);
            }
            else if (!forceInit && $container.hasClass('masonry-processed')) {
              $container.masonry('reloadItems').masonry('layout');
            }
            else {
              $container.once('masonry').masonry($options);
            }
          }

        });
      }
    }
  };
})(jQuery, Drupal, drupalSettings);;
