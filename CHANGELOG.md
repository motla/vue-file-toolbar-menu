## v1.4.0

- SCSS has been converted to basic CSS, so you don't have to install a SCSS compiler anymore
- Updating dependencies
- Removing ESLint for a lighter project

## v1.3.4

- \[Color button\] Prevent calling `color_update()` callback when the color is changed not from the color palette

## v1.3.3

- Setting the CSS `z-index` of menus to 1000 (it was 1 previously)
- Dependencies upgrade

## v1.3.2

- Renaming the static library "VueFileToolbarMenu"
- Adding UMD example to README.md

## v1.3.1

- Dependencies upgrade
- Changing `material-design-icons` to `material-icons` package (only the icon font and required CSS, considerably smaller and updated regularly)

## v1.3.0

- Enhancement [Issue 13](https://github.com/motla/vue-file-toolbar-menu/issues/13): user can now set menu elements `id`
  - API.md update

## v1.2.0

- Bug fix [Issue 7](https://github.com/motla/vue-file-toolbar-menu/issues/7): `disable` option now prevents the `click` event
- Dependencies upgrade

## v1.1.4

- Bug fix [Issue 6](https://github.com/motla/vue-file-toolbar-menu/issues/6): Menu did not close when clicking sub-menus that had click events

## v1.1.3

- Bug fix [Issue 4](https://github.com/motla/vue-file-toolbar-menu/issues/4): "Color picker turned off once clicked"
  - New option `stay_open` for `button-color`
  - API.md update

## v1.1.2

- Separator and spacer styles moved to bar-default-styles.scss
- Minor code refactoring
- Minor updates to README

## v1.1.1

- Added `sass-loader` to `peerDependencies` in package.json
- Github issue templates
- Minor updates to README

## v1.1.0

- Added `spacer` component
- Added disabled mode for color menu
- Setting parameter `menu_height` now changes CSS `max-height`
- Moving `vue` and `core-js` to devDependencies

## v1.0.3

- Minor documentation update

## v1.0.2

- Hide icon names until icon font is loaded

## v1.0.1

- Fix for external node_modules import

## v1.0.0

Initial release