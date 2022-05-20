import { generateMapTransform } from '@segment/analytics-react-native';
const traitMap = {
  firstName: '$first_name',
  lastName: '$last_name',
  createdAt: '$created',
  lastSeen: '$last_seen',
  email: '$email',
  name: '$name',
  username: '$username',
  phone: '$phone'
};
const mapTransform = generateMapTransform(traitMap, {});
export default ((event, mixpanel, settings) => {
  const userId = event.userId;
  const mixpanelTraits = mapTransform(event.traits);

  if (userId !== undefined) {
    mixpanel.identify(userId);
  }

  if (settings.setAllTraitsByDefault === true) {
    mixpanel.registerSuperProperties(mixpanelTraits);

    if (settings.people === true) {
      mixpanel.getPeople().set(mixpanelTraits);
    }
  }

  if (settings.superProperties !== undefined && settings.superProperties.length) {
    let superProperties = settings.superProperties;
    let superPropertyTraits = {};

    for (let superProperty of superProperties) {
      superPropertyTraits[superProperty] = mixpanelTraits[superProperty];
    }

    const mappedSuperProperties = mapTransform(superPropertyTraits);
    mixpanel.registerSuperProperties(mappedSuperProperties);
  }

  if (settings.people === true && settings.peopleProperties !== undefined && settings.peopleProperties.length) {
    let peopleProperties = settings.peopleProperties;
    let peoplePropertyTraits = {};

    for (let peopleProperty of peopleProperties) {
      peoplePropertyTraits[peopleProperty] = event.traits[peopleProperty];
    }

    const mappedPeopleProperties = mapTransform(peoplePropertyTraits);
    mixpanel.getPeople().set(mappedPeopleProperties);
  }
});
//# sourceMappingURL=identify.js.map