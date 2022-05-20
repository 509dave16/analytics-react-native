"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

//@ts-ignore
var _default = (eventName, properties, settings, mixpanel) => {
  var _settings$propIncreme;

  //track raw event
  mixpanel.track(eventName, properties); //everything else is for people setting

  if (settings.people !== true) {
    return;
  }

  if (settings.propIncrements !== undefined && ((_settings$propIncreme = settings.propIncrements) === null || _settings$propIncreme === void 0 ? void 0 : _settings$propIncreme.length) > 0) {
    let propIncrements = settings.propIncrements;

    for (let propString of propIncrements) {
      for (let property in properties) {
        if (propString.toLowerCase() === property.toLowerCase()) {
          let incrementValue = properties[property];

          if (typeof incrementValue === 'number') {
            mixpanel.getPeople().increment(property, incrementValue);
          }
        }
      }
    }
  }

  if (settings.eventIncrements !== undefined && settings.eventIncrements.length > 0) {
    const eventIncrements = settings.eventIncrements;

    for (let eventString of eventIncrements) {
      if (eventString.toLowerCase() === eventName.toLowerCase()) {
        const property = eventName;
        mixpanel.getPeople().increment(property, 1);
        const lastEvent = `Last ${property}`;
        const lastDate = Date();
        mixpanel.getPeople().set(lastEvent, lastDate);
      }
    }
  }

  if (properties.revenue !== undefined) {
    let revenue = properties.revenue;
    mixpanel.getPeople().trackCharge(revenue, properties);
  }
};

exports.default = _default;
//# sourceMappingURL=track.js.map