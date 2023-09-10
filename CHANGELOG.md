# Changelog


## 6.2.0
*Released: 05/09/2023*

### Summary:
- Version `6.0.0` of `mongodb` permits array serialization, hence any command that sends/receives array was affected

### Dependency updates:
- Updated `mongodb` from `4.10.0` to `6.0.0`


## 6.1.0
*Released: 05/09/2023*

### Features:
- Added support for `runCommand` (Addresses [#41](https://github.com/Zaista/cypress-mongodb/issues/41))

### Misc:
- Dropped testing support for node `v19`, added `v20` instead.


## 6.0.0
*Released: 04/09/2023*

### Summary:
- Adding mongodb commands to cypress is now done through separate file to avoid conflicts with project using preprocessors as they can mix node and browser process causing various errors.

### Breaking changes:
- The import command in `e2e.js` file was changed. (Addresses [#42](https://github.com/Zaista/cypress-mongodb/issues/42))

### Features:
- Added support for `runCommand` (Addresses [#41](https://github.com/Zaista/cypress-mongodb/issues/41))

### Dependency updates:
- Updated `cypress` from `12.13.0` to `13.1.0`


## 5.5.0
*Released: 29/05/2023*

### Summary:
- Passing `options` in any mongodb command is no longer limited to the plugin related options, and now accepts any mongodb related option


## 5.4.0
*Released: 28/05/2023*

### Features:
- Added support for `upsert` and `returnDocument` within `findOneAndUpdate` command options.
- Added support for `sort` and `projection` within `findOneAndDelete` command options.

### Misc:
- Dropped testing support for node `v17`, added `v16` instead.

### Dependency updates:
- Updated `cypress` from `12.9.0` to `12.13.0`


## 5.3.0
*Released: 29/05/2023*

### Features:
- Added `findOneAndUpdate` command support.
- Added `findOneAndDelete` command support.


## 5.2.1
*Released: 15/03/2023*

### Features:
- Added `upsert` support within `updateOne` and `updateMany` command options. (Addresses [#29](https://github.com/Zaista/cypress-mongodb/issues/29))

### Dependency updates:
- Updated `cypress` from `12.3.0` to `12.7.0`


## 5.1.4
*Released: 03/02/2023*

### Bug fixes:
- Fix `findOne` and `findMany` serialization. (Addresses [#24](https://github.com/Zaista/cypress-mongodb/issues/24))

### Dependency updates:
- Updated `cypress` from `11.2.0` to `12.3.0`


## 5.1.2
*Released: 18/10/2022*

### Bug fixes:
- Fixed `deleteOne` and `deleteMany` serialization. (Addresses [#20](https://github.com/Zaista/cypress-mongodb/issues/20))


## 5.1.0
*Released: 09/10/2022*

### Features:
- Added support for `updateOne` and `updateMany` commands. (Addresses [#18](https://github.com/Zaista/cypress-mongodb/issues/18))

### Dependency updates:
- Updated `cypress` from `10.7.0` to `10.9.0`


## 5.0.1
*Released: 04/09/2022*

### Dependency updates:
- Updated `mongodb` from `4.7.0` to `4.9.1`
- Updated `cypress` from `10.3.0` to `10.7.0`