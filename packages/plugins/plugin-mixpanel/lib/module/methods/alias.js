export default (async (event, mixpanel, analytics) => {
  let distinctId = '';
  const newId = event.userId;

  try {
    distinctId = await mixpanel.getDistinctId();
  } catch (e) {
    analytics.logger.warn(e);
  }

  if (distinctId !== '') {
    mixpanel.alias(newId, distinctId);
  }
});
//# sourceMappingURL=alias.js.map