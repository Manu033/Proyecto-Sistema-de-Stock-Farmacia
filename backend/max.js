const mergeEmailAddresses = (
  formValues,
  differentFields,
  newestClientIndex,
) => {
  const isFirstClientNewer = newestClientIndex === 0;

  const firstClientSelectedEmails =
    formValues?.email_addresses?.filter((email) =>
      differentFields.email_addresses[0].some( e => e.email_address === email.email_address),
    ) || [];
  const secondClientSelectedEmails =
    formValues?.email_addresses?.filter((email) =>
      differentFields.email_addresses[1].some( e => e.email_address === email.email_address),
    ) || [];
  const equalValues = differentFields.email_addresses[3] || [];

  if (!firstClientSelectedEmails.length && !secondClientSelectedEmails.length) {
    return equalValues;
  }

  const allEmails = [...formValues.email_addresses, ...equalValues];
  // Determine primary email
  const primaryEmailFromEqualValues = equalValues.find((email) => email.is_primary);
  const primaryEmail =
    primaryEmailFromEqualValues ||
    (isFirstClientNewer ? firstClientSelectedEmails : secondClientSelectedEmails).find((email) => email.is_primary);

  // Merge all emails
  const mergedEmails = allEmails.map((email) => ({
    ...email,
    is_primary: email.email_address === primaryEmail?.email_address,
  }));
  return mergedEmails;
};

let differentFields = {
  email_addresses: [
    [
      {
        is_primary: true,
        email_address: 'test@test.com',
        acceptable_communication_types: ['notification'],
      },
      {
        is_primary: false,
        email_address: 'test@test.com',
        acceptable_communication_types: ['notification'],
      },
    ],
    [
      {
        is_primary: true,
        email_address: 'test2@test.com',
        acceptable_communication_types: ['notification'],
      },
    ],
    true,
    [
      {
        is_primary: false,
        email_address: 'equal@test.com',
        acceptable_communication_types: ['notification'],
      },
    ],
  ],
};

formValues = {
  email_addresses: [
    {
      is_primary: true,
      email_address: 'test@test.com',
      acceptable_communication_types: ['notification'],
    },
    {
      is_primary: false,
      email_address: 'test1@test.com',
      acceptable_communication_types: ['notification'],
    },
  ],
};

const result = mergeEmailAddresses(formValues, differentFields, 0);

const expected = [
  {
    is_primary: true,
    email_address: 'test@test.com',
    acceptable_communication_types: ['notification'],
  },
  {
    is_primary: false,
    email_address: 'test1@test.com',
    acceptable_communication_types: ['notification'],
  },
  {
    is_primary: false,
    email_address: 'test2@test.com',
    acceptable_communication_types: ['notification'],
  },
  {
    is_primary: false,
    email_address: 'equal@test.com',
    acceptable_communication_types: ['notification'],
  },
];
console.log("\n \n \n result: ", result);
console.log("\n \n \n expected: ", expected);