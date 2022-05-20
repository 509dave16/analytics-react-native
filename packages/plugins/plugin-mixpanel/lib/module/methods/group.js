export default ((event, mixpanel, settings) => {
  const groupId = event.groupId;
  const groupTraits = settings.groupIdentifierTraits;

  if (groupTraits !== undefined) {
    for (let groupTrait of groupTraits) {
      for (let eventTrait in event.traits) {
        if (groupTrait.toLocaleLowerCase() === eventTrait.toLocaleLowerCase()) {
          const group = event.traits[groupTrait];
          const traits = event.traits;
          mixpanel.getGroup(group, groupId).setOnce('properties', traits);
        }
      }

      mixpanel.setGroup(groupTrait, groupId);
    }
  }
});
//# sourceMappingURL=group.js.map