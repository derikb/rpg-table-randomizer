# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.1.0](https://github.com/derikb/rpg-table-randomizer/compare/v1.0.1...v1.1.0) (2022-01-07)


### Features

* **npc:** Apply schema to npc function ([a8779ec](https://github.com/derikb/rpg-table-randomizer/commit/a8779ec92fbcaa7bf0dba20a9375b51de9fa1f6b)), closes [#49](https://github.com/derikb/rpg-table-randomizer/issues/49)


### Bug Fixes

* **build:** Fix uuid import, add build for test page ([b59c942](https://github.com/derikb/rpg-table-randomizer/commit/b59c94294bf8cea24c95db37a9c117c0f48e1c8f)), closes [#48](https://github.com/derikb/rpg-table-randomizer/issues/48)
* **names:** Fix for full names where surname is empty on type ([d734e6d](https://github.com/derikb/rpg-table-randomizer/commit/d734e6d59525f2fc1e614a7c5f966dd960ac7cdd))
* **serialization:** Fix serialization for classes in classes ([f152887](https://github.com/derikb/rpg-table-randomizer/commit/f152887a8905163808675c6e117a4757bb690b3e)), closes [#50](https://github.com/derikb/rpg-table-randomizer/issues/50)

### [1.0.1](https://github.com/derikb/rpg-table-randomizer/compare/v1.0.0...v1.0.1) (2022-01-01)


### Features

* **npc:** Add some helper methods ([70a15e8](https://github.com/derikb/rpg-table-randomizer/commit/70a15e86d1e2655be1da8233880e6b40e30f9b15))


### Bug Fixes

* **npc:** Fix import of uuid ([7e56a67](https://github.com/derikb/rpg-table-randomizer/commit/7e56a677968d5e9d3da2c0df53a56386c41fa1a7))

## [1.0.0](https://github.com/derikb/rpg-table-randomizer/compare/v0.10.3...v1.0.0) (2021-12-27)


### ⚠ BREAKING CHANGES

* **docs:** See README for breaking change information for v1

### Features

* **docs:** Add updating info ([e6820b6](https://github.com/derikb/rpg-table-randomizer/commit/e6820b6b18f860fbbd0efadcb6b0c7373a120081))
* **npc:** Fix toJSON, add Schema methods ([4eff768](https://github.com/derikb/rpg-table-randomizer/commit/4eff76867db011e06d5095d10f019da0e6f58c6b)), closes [#35](https://github.com/derikb/rpg-table-randomizer/issues/35) [#34](https://github.com/derikb/rpg-table-randomizer/issues/34)


### Bug Fixes

* **randomizer:** Improve table by key lookup ([df3c012](https://github.com/derikb/rpg-table-randomizer/commit/df3c01296b1780ea0d7fbcac0a72e58c38d4adef)), closes [#39](https://github.com/derikb/rpg-table-randomizer/issues/39)
* **tables:** Handle infinite loops ([5dda97c](https://github.com/derikb/rpg-table-randomizer/commit/5dda97cccee008d1f9ac4874aa968ba18b9603db)), closes [#38](https://github.com/derikb/rpg-table-randomizer/issues/38)

### [0.10.3](https://github.com/derikb/rpg-table-randomizer/compare/v0.10.2...v0.10.3) (2021-10-08)

### [0.10.2](https://github.com/derikb/rpg-table-randomizer/compare/v0.10.1...v0.10.2) (2021-06-20)


### Features

* **names:** Added Mexican/Spanish ([0ac511b](https://github.com/derikb/rpg-table-randomizer/commit/0ac511b1e8c8beeb634d36c8d3ae041d0df99ca8))

### [0.10.1](https://github.com/derikb/rpg-table-randomizer/compare/v0.10.0...v0.10.1) (2021-06-20)

## [0.10.0](https://github.com/derikb/rpg-table-randomizer/compare/v0.9.0...v0.10.0) (2021-05-07)


### Features

* **json:** Make json output ignore empty ([b562d11](https://github.com/derikb/rpg-table-randomizer/commit/b562d112a2f971c1c53c4f2dd7b95dad31d6c193)), closes [#30](https://github.com/derikb/rpg-table-randomizer/issues/30)
* **names:** Add mixed option for names ([7816d33](https://github.com/derikb/rpg-table-randomizer/commit/7816d33d02517863cc6b7f4017d394471100eea5)), closes [#33](https://github.com/derikb/rpg-table-randomizer/issues/33)
* **npc:** Add label to schema field ([52c8544](https://github.com/derikb/rpg-table-randomizer/commit/52c854416d9b9b7f59539efa73b1d957316ca7b5)), closes [#28](https://github.com/derikb/rpg-table-randomizer/issues/28)
* **tokens:** Simply token output for tables ([b0d0bed](https://github.com/derikb/rpg-table-randomizer/commit/b0d0bed39684ec795cb309fe2b1fe17cd11c8c77))
* Add typescript types as a test ([e6f5400](https://github.com/derikb/rpg-table-randomizer/commit/e6f5400bef3bd508705689a2f0ab1ef67538161c)), closes [#26](https://github.com/derikb/rpg-table-randomizer/issues/26)


### Bug Fixes

* **names:** Fix name:random token type not working ([a1056aa](https://github.com/derikb/rpg-table-randomizer/commit/a1056aa8ec85b8a11d507a2ebd3dbec30e79ceda)), closes [#31](https://github.com/derikb/rpg-table-randomizer/issues/31)
* **npc:** Remove default export ([a8274d6](https://github.com/derikb/rpg-table-randomizer/commit/a8274d6f634c22a08279151020f1f0611a028400)), closes [#27](https://github.com/derikb/rpg-table-randomizer/issues/27)

## [0.9.0](https://github.com/derikb/rpg-table-randomizer/compare/v0.8.1...v0.9.0) (2021-05-01)


### Features

* **RandomTable:** Add toString method ([0098d6d](https://github.com/derikb/rpg-table-randomizer/commit/0098d6d40098a95cff21ed3562762572a3d93dcf)), closes [#23](https://github.com/derikb/rpg-table-randomizer/issues/23)
* **RandomTable:** Convert print to display options using class map ([5644ed5](https://github.com/derikb/rpg-table-randomizer/commit/5644ed5c767054f4bd91d62e00018c1143eb8365)), closes [#24](https://github.com/derikb/rpg-table-randomizer/issues/24)
* **RantomTableEntry:** Add class for entries ([15e4da9](https://github.com/derikb/rpg-table-randomizer/commit/15e4da974ee0ce730cb7235e7d2bf0562f6cda3d)), closes [#25](https://github.com/derikb/rpg-table-randomizer/issues/25)
* **TableResults:** Added results and results sets classes ([b14632f](https://github.com/derikb/rpg-table-randomizer/commit/b14632f76682efab994ba66a4f22d612ccd04807)), closes [#22](https://github.com/derikb/rpg-table-randomizer/issues/22)

### [0.8.1](https://github.com/derikb/rpg-table-randomizer/compare/v0.8.0...v0.8.1) (2021-04-30)


### Bug Fixes

* **randomizer:** Fix syntax issue ([9967657](https://github.com/derikb/rpg-table-randomizer/commit/9967657e281c767a289211926b4b79ec9a845dd2)), closes [#21](https://github.com/derikb/rpg-table-randomizer/issues/21)

## [0.8.0](https://github.com/derikb/rpg-table-randomizer/compare/v0.7.2...v0.8.0) (2021-04-10)


### ⚠ BREAKING CHANGES

* EVERYTHING!

* Change to ES Modules ([9c14e95](https://github.com/derikb/rpg-table-randomizer/commit/9c14e950d62094a039daeed90b0e7f9cbf3df674))

### 0.7.1 (2020-04-12)


### Bug Fixes

* **npm:** Update dependencies for security ([83a37e2](https://github.com/derikb/rpg-table-randomizer/commit/83a37e2f540dc859184a0cac504eacb68943d11d))
