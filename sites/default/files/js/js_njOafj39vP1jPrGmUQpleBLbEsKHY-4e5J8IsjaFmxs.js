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
/**
 * @file
 * Attaches is useful rating.
 */

(function ($, Drupal) {
  Drupal.behaviors.usefulRating = {
    attach: function (context, settings) {
     $('body').find('.useful').each(function () {
       var $this = $(this);
       $(this).find('select').once('processed').each(function () {
         $this.find('[type=submit]').hide();
         var $select = $(this);
         var isPreview = $select.data('is-edit');
         $select.after('<div class="useful-rating"><a href="#"><i class="fa fa-thumbs-down"></i></a><a href="#"><i class="fa fa-thumbs-up"></a></i></div>').hide();
         $this.find('.useful-rating a').eq(0).each(function () {
           $(this).bind('click',function (e) {
             if (isPreview) {
               return;
             }
             e.preventDefault();
             $select.get(0).selectedIndex = 0;
             $this.find('[type=submit]').trigger('click');
             $this.find('a').addClass('disabled');
             $this.find('.vote-result').html();
           })
         })
         $this.find('.useful-rating a').eq(1).each(function () {
           $(this).bind('click',function (e) {
             if (isPreview) {
               return;
             }
             e.preventDefault();
             $select.get(0).selectedIndex = 1;
             $this.find('[type=submit]').trigger('click');
             $this.find('a').addClass('disabled');
             $this.find('.vote-result').html();
           })
         })
       })
     });
    }
  };
})(jQuery, Drupal);
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
