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
