# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
- [#197](https://github.com/os2display/display-admin-client/pull/197)
Add pagination to tables below multiselect dropdowns.
- [#196](https://github.com/os2display/display-admin-client/pull/196)
  Changed to handling rrule dates as UTC.
- [#194](https://github.com/os2display/display-admin-client/pull/195)
  Fix button margin on mobile view.
- [#193](https://github.com/os2display/display-admin-client/pull/194)
  Prevent screen-manager.js from redirecting before everything is saved.
- [#192](https://github.com/os2display/display-admin-client/pull/193)
  Readd and fix cypress tests.
## [1.2.6] - 2023-05-11

- [#197](https://github.com/os2display/display-admin-client/pull/197)
Add pagination to tables below multiselect dropdowns.

## [1.2.5] - 2023-03-24

- [#191](https://github.com/os2display/display-admin-client/pull/191)
  Fixed theme logo loading in slide preview.
  Fixed error messages in slide manager.

## [1.2.4] - 2023-03-24

- [#190](https://github.com/os2display/display-admin-client/pull/190)
  Changed config loader to avoid competing promises.
- [#189](https://github.com/os2display/display-admin-client/pull/189)
  Fixed issue where playlist showed a maximum of 10 selected slides.

## [1.2.3] - 2023-03-07

- [#188](https://github.com/os2display/display-admin-client/pull/188)
  Fixed template sorting.
  Removed option to change template after creation
- [#187](https://github.com/os2display/display-admin-client/pull/187)
  Added license.
- [#185](https://github.com/os2display/display-admin-client/pull/185)
  Changed rich text defaultValue to avoid update loops.
  Cleaned up rich text toolbar options.
- [#183](https://github.com/os2display/display-admin-client/pull/183)
  Adds information about max file sizes.

## [1.2.2] - 2023-02-08

- [#184](https://github.com/os2display/display-admin-client/pull/184)
  Fix logo upload, and change image uploader to use hook selected
- [#182](https://github.com/os2display/display-admin-client/pull/182)
  Make cypress tests run 3 times in GA, and set defaultCommandTimeout to 10000
- [#181](https://github.com/os2display/display-admin-client/pull/181)
  Disable selected menu link
- [#180](https://github.com/os2display/display-admin-client/pull/180)
  Make it possible to delete media from slide
- [#179](https://github.com/os2display/display-admin-client/pull/179)
  Simplify info modal, remove pagination

## [1.2.1] - 2023-01-13

- [#178](https://github.com/os2display/display-admin-client/pull/178)
  add 8080 to port to make cypresstests run
- [#177](https://github.com/os2display/display-admin-client/pull/177)
  css in name to cssstyles
- [#176](https://github.com/os2display/display-admin-client/pull/176)
  css -> cssstyles in all places but not the request body
- [#175](https://github.com/os2display/display-admin-client/pull/175)
  update proptypes
  rename cssstyles to css
  give resolution a default value

## [1.2.0] - 2023-01-05

- [#174](https://github.com/os2display/display-admin-client/pull/174)
  Added changelog.
  Added github action to enforce that PRs should always include an update of the changelog.
- [#172](https://github.com/os2display/display-admin-client/pull/172)
  Fixed search issue for screens.
- [#171](https://github.com/os2display/display-admin-client/pull/171)
  Moved to page 1 after deletions.
- [#170](https://github.com/os2display/display-admin-client/pull/170)
  Fixed media library issue.
  The css was not displayed in the theme page (create/edit).
  Shared playlists in gantt are not clickable/do not redirect.
- [#169](https://github.com/os2display/display-admin-client/pull/169)
  Updated docker setup to match new itkdev base setup
- [#168](https://github.com/os2display/display-admin-client/pull/168)
  Fixed wrong link.
- [#167](https://github.com/os2display/display-admin-client/pull/167)
  Updated grid generator from 1.0.6 -> 1.0.8.

## [1.1.0] - 2022-10-06

- [#166](https://github.com/os2display/display-admin-client/pull/166)
  Updated react to 18.
- [#164](https://github.com/os2display/display-admin-client/pull/164)
  Removed 0 in calendar view screen.

## [1.0.3] - 2022-09-05

- [#163](https://github.com/os2display/display-admin-client/pull/163)
  Moved gantt chart to edit pages.
- [#162](https://github.com/os2display/display-admin-client/pull/162)
  Added dropdown for resolution/orientation on screen.
  Removed screen width/height.
- [#161](https://github.com/os2display/display-admin-client/pull/161)
  Changed default duration from 10 to 15 s.
- [#159](https://github.com/os2display/display-admin-client/pull/159)
  Refactored theme-manager (as the other elements have that as well, slide-manager e.g.).
  Added logo to theme form.
  Save theme logo.

## [1.0.2] - 2022-06-02

- [#158](https://github.com/os2display/display-admin-client/pull/158)
  Added slide class to remote component.

## [1.0.1] - 2022-06-01

- [#157](https://github.com/os2display/display-admin-client/pull/157)
  Changed class names to lower case.
- [#156](https://github.com/os2display/display-admin-client/pull/156)
  Added check to station selector.

## [1.0.0] - 2022-05-18

- First release.
