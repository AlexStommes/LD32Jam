My Phaser Template
===============================================================================

>   A project template for [Phaser][phsr] web games.

Notice: this project _may become_ a project scaffold of sorts… Or maybe not…
I'll figure out… If you're interested, well, stay tuned…


What's included?
-------------------------------------------------------------------------------

*   [Gulp][gulp] task manager, to handle development and distribution tasks.

*   [BrowserSync][bsnc] development server, for cross-device testing.

*   [EditorConfig][edcf] support, for consistent editor configuration between
    collaborators — check if EditorConfig support is available for your code
    editor.

*   [JSHint][jsht] for code quality check.

*   [Bower][bowr] for easy component management.

*   [Babel][babl] to translate from ES6 to ES5 syntax.
    See which [language features][feat] are currently supported.

*   [Handlebars][hbs.] templates, [LESS][less] style sheets, support for source
    maps output, off-line cache and much more!


Development Instructions
-------------------------------------------------------------------------------

Download and extract the [packaged project][dwld] contents, or clone this
repository locally. Either way, the following npm scripts are available to you,
performing the tasks described below.

```sh
npm install   # Installs all required project dependencies.
npm start     # Launch a development server. Same as `gulp dev`.
npm run dist  # Prepare the game release for distribution. Also `gulp dist`.
npm run clean # Delete temporary and distribution build files.
```

<small>Also, you may want to install Gulp and Bower globally, but you are not
required to do so.</small>

Happy coding!


Sample Game
-------------------------------------------------------------------------------

To see a more elaborate sample game in action, extract the `sample-game.zip`
file, included in this repository, from the project root. The only extra
dependency is [localForage][lofr], so you'll need to run `bower install` to run
the game without errors.


License
-------------------------------------------------------------------------------

All source code distributed under the terms of the [MIT License][lcnc].

This project is based upon earlier efforts by these two brilliant developers:

- [slush-phaser-node][sspn], by [Matt Gale (@Eruant)][matt], and
- [slush-phaser-project][sspp], by [Sean Bohan (@pixelpicosean)][ppsn].

Some code borrowed from [gulp-starter][gsdt], by Daniel Tello.


<!-- ---------------------------------------------------------------------- -->

[bowr]: http://bower.io/
[phsr]: http://phaser.io/
[babl]: https://babeljs.io/
[gulp]: http://gulpjs.com/
[jsht]: http://jshint.com/
[less]: http://lesscss.org/
[edcf]: http://editorconfig.org/
[hbs.]: http://handlebarsjs.com/
[matt]: https://github.com/Eruant
[bsnc]: http://www.browsersync.io/
[feat]: http://babeljs.io/docs/learn-es6/
[ppsn]: https://github.com/pixelpicosean/
[lofr]: http://mozilla.github.io/localForage/
[gsdt]: https://github.com/greypants/gulp-starter/
[sspn]: https://github.com/Eruant/slush-phaser-node
[sspp]: https://github.com/pixelpicosean/slush-phaser-project
[dwld]: https://github.com/rblopes/my-phaser-template/archive/master.zip
[lcnc]: https://github.com/rblopes/my-phaser-template/blob/master/LICENSE
