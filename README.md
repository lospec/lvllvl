
# lvllvl

lvllvl is a browser based editor for textmode art.

It was created in 2023 by [jaammees](https://github.com/jaammees) before he suddenly passed away. The site was originally hosted on lvllvl.com, but became unreachable on 2024-10-23. In order to keep using the tool, Lospec created this branch so it could be hosted on a new site. This branch may also be updated with new features in the future.

## Information

lvllvl is a static website with no server components, allowing it to be deployed as a static website. 
The building process for the website requires PHP, which isn't usually supported by static website hosting providers, so it must be build locally, with the build directory being committed to the repository.

## Building

First you must download PHP. As of writing, the latest version (8.1.13) seems to work fine. You can download it from the [official PHP website](https://www.php.net/downloads).

PHP doesn't need to be installed and can be run manually with a command.

To build the website, run the following command in the root directory of the repository:

```"/path/to/php.exe" build.php```

This will overwrite the contents of the `/dist` directory with the latest build, which can then be committed to the repository.

## Issues

The only part of the build process that isn't PHP is the minification of the javascript files. This uses a node package called [uglifyjs](https://www.npmjs.com/package/uglify-js). Unfortunately this package must be installed globally so it can be accessed with the `uglify` command, but that doesn't work by default on windows. Fortunately the site still works fine without being minified, the files will just be a little larger.

Uglify is only used on these two files:
- `build/js/main.js`
- `c64page/js/c64.js`

This process is done after the files have been generated by the build script.

Ideally this whole build process would be converted to node so it can be deployed without having to commit the build directory, and would support uglifyjs. I've started this process on the [javascript-build-tools](https://github.com/lospec/lvllvl/tree/javascript-build-tools) branch, but it will need a lot of work.