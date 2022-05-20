import ReactAppboy from 'react-native-appboy-sdk';
export default (payload => {
  if (payload.userId) {
    ReactAppboy.changeUser(payload.userId);
  }

  if (payload.traits.birthday) {
    const data = new Date(payload.traits.birthday);
    ReactAppboy.setDateOfBirth(data.getFullYear(), // getMonth is zero indexed
    data.getMonth() + 1, data.getDate());
  }

  if (payload.traits.email) {
    ReactAppboy.setEmail(payload.traits.email);
  }

  if (payload.traits.firstName) {
    ReactAppboy.setFirstName(payload.traits.firstName);
  }

  if (payload.traits.lastName) {
    ReactAppboy.setLastName(payload.traits.lastName);
  }

  if (payload.traits.gender) {
    const validGenders = ['m', 'f', 'n', 'o', 'p', 'u'];
    const isValidGender = validGenders.indexOf(payload.traits.gender) > -1;

    if (isValidGender) {
      ReactAppboy.setGender(payload.traits.gender);
    }
  }

  if (payload.traits.phone) {
    ReactAppboy.setPhoneNumber(payload.traits.phone);
  }

  if (payload.traits.address) {
    if (payload.traits.address.city) {
      ReactAppboy.setHomeCity(payload.traits.address.city);
    }

    if (payload.traits.address.country) {
      ReactAppboy.setCountry(payload.traits.address.country);
    }
  }

  const appBoyTraits = ['birthday', 'email', 'firstName', 'lastName', 'gender', 'phone', 'address'];
  Object.entries(payload.traits).forEach(_ref => {
    let [key, value] = _ref;

    if (appBoyTraits.indexOf(key) < 0) {
      ReactAppboy.setCustomUserAttribute(key, value);
    }
  });
  return payload;
});
//# sourceMappingURL=identify.js.map