
CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Requirements
 * Installation
 * Configuration
 * Troubleshooting
 * FAQ
 * Maintainers

INTRODUCTION
------------

 Flow2 is a Masonry Grid Layout based theme and design inspiration is taken from http://flow.elated-themes.com/flow2/
 Masonry is a JavaScript grid layout library. It works by placing elements in optimal position based on available vertical space,
 sort of like a mason fitting stones in a wall. You’ve probably seen it in use all over the Internet.


 REQUIREMENTS
 ------------ 

 To add Masonry grid and layout, the following modules/theme are required:
 Masonry API Module (https://www.drupal.org/project/masonry)
 Masonry Views (https://www.drupal.org/project/masonry_views)
 Bootstrap (https://www.drupal.org/project/bootstrap )


 INSTALLATION
 ------------

1. Download and enable the required modules (Libraries (2.x)http://drupal.org/project/libraries)
2. Download the Masonry plugin :
-- https://masonry.desandro.com/v2/jquery.masonry.min.js Rename the file to be located at :
/sites/.../libraries/masonry/jquery.masonry.min.js

-- https://npmcdn.com/masonry-layout@3.3.2/dist/masonry.pkgd.min.js Rename the file to be located at :
/sites/.../libraries/masonry/masonry.pkgd.min.js

3. you need to create a directory for imagesloaded in the libraries directory and then download the imagesloaded library from
http://imagesloaded.desandro.com/imagesloaded.pkgd.min.js. Rename it to be located at :
/sites/.../libraries/imagesloaded/imagesloaded.pkgd.min.js

4. Download and enable Masonry Api and sub module (https://www.drupal.org/project/masonry_views)

5. Check /admin/reports/status to ensure the Masonry plugin was properly detected

6. Download Bootstrap (https://www.drupal.org/project/bootstrap ) and locate this in /theme folder

7. Download Flow2 (https://www.drupal.org/project/flow2) and locate this in /theme folder as sub-theme

CONFIGURATION
-------------

go to /admin/appearance/settings/ and enable Flow2 theme.

2. Block settings
go to /admin/structure/block  and remove extra block which is not required

3. Frontpage View settings
go to /admin/structure/views/view/frontpage?destination=/admin/structure/views
Under FORMAT update style and settings :
 Format: Masonry | Settings


 MAINTAINERS
 -----------

 Current maintainers:
  * Vinit Kumar (vinitk) - https://www.drupal.org/u/vinitk
