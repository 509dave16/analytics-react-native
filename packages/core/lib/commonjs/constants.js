"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settingsCDN = exports.defaultConfig = exports.defaultApiHost = exports.batchApi = void 0;
const batchApi = 'https://api.segment.io/v1/b';
exports.batchApi = batchApi;
const defaultApiHost = 'api.segment.io/v1';
exports.defaultApiHost = defaultApiHost;
const settingsCDN = 'https://cdn-settings.segment.com/v1/projects';
exports.settingsCDN = settingsCDN;
const defaultConfig = {
  writeKey: '',
  flushAt: 20,
  flushInterval: 30,
  maxBatchSize: 1000,
  trackDeepLinks: false,
  trackAppLifecycleEvents: false,
  autoAddSegmentDestination: true
};
exports.defaultConfig = defaultConfig;
//# sourceMappingURL=constants.js.map