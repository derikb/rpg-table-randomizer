# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [1.5.0](https://github.com/derikb/rpg-table-randomizer/compare/v1.4.0...v1.5.0) (2024-06-22)


### Features

* remove bundling for test page ([eba5add](https://github.com/derikb/rpg-table-randomizer/commit/eba5addb01b871858a1b6573166e7c3b23084e7d))
* remove typescript test ([1c8df30](https://github.com/derikb/rpg-table-randomizer/commit/1c8df30b148b47c78c3d091065f1ef360925e6d9))
* remove unnecessary dependencies/scripts ([441d153](https://github.com/derikb/rpg-table-randomizer/commit/441d1531909b7b0e3ea73fcf0f8d30662bef5752))
* use native crypto in browser and node for uuids ([7654617](https://github.com/derikb/rpg-table-randomizer/commit/7654617c5f4835bb5982588bbee177968e0e6ed9))

## [1.4.0](https://github.com/derikb/rpg-table-randomizer/compare/v1.3.3...v1.4.0) (2023-07-30)


### Features

* **names:** Add italian names ([26b65f4](https://github.com/derikb/rpg-table-randomizer/commit/26b65f457ae289237aa1c01a61b7b1f1679b2386))

## [1.3.3](https://github.com/derikb/rpg-table-randomizer/compare/v1.3.2...v1.3.3) (2023-07-23)

## [1.3.2](https://github.com/derikb/rpg-table-randomizer/compare/v1.3.1...v1.3.2) (2023-01-29)

### [1.3.1](https://github.com/derikb/rpg-table-randomizer/compare/v1.3.0...v1.3.1) (2022-11-19)

## [1.3.0](https://github.com/derikb/rpg-table-randomizer/compare/v1.2.0...v1.3.0) (2022-02-13)


### Features

* **tables:** Add oneof token for simple select ([6268d44](https://github.com/derikb/rpg-table-randomizer/commit/6268d4433b718aa8bf1bf557c42f92521b2f5375)), closes [#59](https://github.com/derikb/rpg-table-randomizer/issues/59)

## [1.2.0](https://github.com/derikb/rpg-table-randomizer/compare/v1.1.4...v1.2.0) (2022-02-12)


### Features

* **dice:** Add drop/keep die syntax ([a4495b1](https://github.com/derikb/rpg-table-randomizer/commit/a4495b1dcbdb112871291b04bba2068d75d7c517)), closes [#46](https://github.com/derikb/rpg-table-randomizer/issues/46)
* **npc:** Improve Field typings ([f6f3937](https://github.com/derikb/rpg-table-randomizer/commit/f6f3937b81376c1a8ac8077c70d688ec6027b05c)), closes [#53](https://github.com/derikb/rpg-table-randomizer/issues/53)


### Bug Fixes

* **r_helpers:** Handle Map/Set/etc better ([3c3d6b5](https://github.com/derikb/rpg-table-randomizer/commit/3c3d6b5a3c7abb39df7fc2ee936ba4b05624743c)), closes [#58](https://github.com/derikb/rpg-table-randomizer/issues/58)

### [1.1.4](https://github.com/derikb/rpg-table-randomizer/compare/v1.1.3...v1.1.4) (2022-02-06)


### Features

* **TableRoller:** Add table key to results ([6f853e7](https://github.com/derikb/rpg-table-randomizer/commit/6f853e78dc997d9118ddea5534e9726168447ceb)), closes [#55](https://github.com/derikb/rpg-table-randomizer/issues/55)


### Bug Fixes

* **npc:** Fix error in field unserialization ([40dc2e4](https://github.com/derikb/rpg-table-randomizer/commit/40dc2e457e5202269aa8378e512718c649c5ab1a)), closes [#56](https://github.com/derikb/rpg-table-randomizer/issues/56)

### [1.1.3](https://github.com/derikb/rpg-table-randomizer/compare/v1.1.2...v1.1.3) (2022-01-08)


### Bug Fixes

* **diceresult:** Fix bad serialization ([8272922](https://github.com/derikb/rpg-table-randomizer/commit/82729224250787e5df4b637c1258ac392529ffb1))
* **npc:** Fix for unserialization ([2c435fc](https://github.com/derikb/rpg-table-randomizer/commit/2c435fc8bb923bf6311e53660bca741b90be2dfd))
* **npc:** Fix unserialization of NPCSchema ([491c33e](https://github.com/derikb/rpg-table-randomizer/commit/491c33e3867c6032815d6c345bbf2c76cb8f8439))
* **RandomTableResultSet:** Fix bad unserialization of DisplayOptions ([35eeed2](https://github.com/derikb/rpg-table-randomizer/commit/35eeed29e93c21c119003b3632c7a3bcc54c2c0b)), closes [#52](https://github.com/derikb/rpg-table-randomizer/issues/52)

### [1.1.2](https://github.com/derikb/rpg-table-randomizer/compare/v1.1.1...v1.1.2) (2022-01-07)


### Bug Fixes

* **npc:** Fix unserializing NPC fields ([9e8ca8e](https://github.com/derikb/rpg-table-randomizer/commit/9e8ca8ed885c40380d2d4870b9102ef1ce53d369))

### [1.1.1](https://github.com/derikb/rpg-table-randomizer/compare/v1.1.0...v1.1.1) (2022-01-07)


### Bug Fixes

* **typos:** Embarrassing Randon typos (sigh) ([f797eb4](https://github.com/derikb/rpg-table-randomizer/commit/f797eb456b8a494775f116cc66477d66fb54c937))

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
