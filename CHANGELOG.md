Change Log
===============================================================================


v0.3.0
-------------------------------------------------------------------------------

*   Sample game replaced by a simpler application.
*   Including a ZIP file, containing the old sample game.


v0.2.2
-------------------------------------------------------------------------------

*   Upgraded to Babel v5.0.0.
*   Upgraded plugin `gulp-postcss` to v5.0.0.


v0.2.1
-------------------------------------------------------------------------------

*   Use `gulp-hb` to compile templates.
*   Move template data to project source.


v0.2.0
-------------------------------------------------------------------------------

*   Upgraded Phaser to version 2.3.0.
*   Phaser is now the first dependency declared in the `bower.json` manifest,
    avoiding some issues with Almond and Phaser's P2 physics engine build
    incompatibilities.
*   Tasks and accompanying library asset are now encapsulated in a single
    module structured under the `gulpfile.js` directory.
*   Not relying on `gulp-plumber` to handle errors in tasks anymore.
*   `run-sequence` was dropped, in favor of proper sequential task
    dependencies (to be improved in a future Gulp 4.0 release).
*   Spread the project configuration into CommonJS modules.
*   Updated Favicons and related stuff.


v0.1.9
-------------------------------------------------------------------------------

*   Upgrading gulp plugins: `gulp-load-plugins`, `require-dir`
*   Return `Promise`s from storage plugin
*   Expose game states through a module, add them dynamically
*   New: `SplashScreen` class
*   Simplify game launching code
*   Renaming web application manifest file


v0.1.8
-------------------------------------------------------------------------------

*   Upgrade some gulp plugin versions


v0.1.7
-------------------------------------------------------------------------------

*   Upgrade task plug-in `gulp-processhtml`


v0.1.6
-------------------------------------------------------------------------------

*   Make incremental builds actually work
*   Remove obsolete Babel `format` option from project configuration
*   Update mentions to Babel in project metadata and README, some other minor 
    changes
*   Use `gulp-filter` instead of `gulp-if` when filtering bundled scripts
*   Upgrade `gulp-minify-css`


v0.1.5
-------------------------------------------------------------------------------

*   Upgrade plug-in `gulp-less`
*   Replacing 6to5 by Babel, due to the project name change.


v0.1.4
-------------------------------------------------------------------------------

*   Upgrade to BrowserSync 2.0


v0.1.3
-------------------------------------------------------------------------------

*   Solve issue #1, where 6to5 may compile code with syntax errors formatted 
    with the `compact` option (thanks @dfyx)


v0.1.2
-------------------------------------------------------------------------------

*   Reverted game states to class instances
*   Upgraded some development dependencies, 6to5


v0.1.1
-------------------------------------------------------------------------------

*   Force UTF-8 encoding by default in new files
*   Comments as hints in task files
*   Avoid including non-JS files in `bundle.js`
*   Crediting @Eruant in the README
*   Dependency upgrades


v0.1.0
-------------------------------------------------------------------------------

First public release, including:

*   6to5
*   Almond runtime dependency tracker
*   Bower component manager
*   BrowserSync development web server
*   EditorConfig support
*   Gulp task manager
*   Handlebars templates
*   JSHint code quality check support
*   LESS style sheets
*   Mozilla's localForage, with sample wrapper plugin
*   Offline Cache support in final builds
*   Phaser v2.2 game development framework
*   The sample game "My Awesome Game"
*   Early project configuration support
