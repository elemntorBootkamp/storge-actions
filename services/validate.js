import dns from 'dns';

export const onlyEnglishLetters = (value) => /^[a-zA-Z\s]*$/.test(value);
//   const regex = /^[a-zA-Z0-9-]{1,63}(\.[a-zA-Z0-9-]{1,63})*$/;
//   if (!regex.test(domain)) {
//     throw new Error('The domain is invalid.');
//   }
//   const domainWithoutProtocol = domain.toString().replace(/(^\w+:|^)\/\//, '');
//   const dnsbls = ['zen.spamhaus.org', 'bl.spamcop.net', 'dnsbl.sorbs.net'];
//   const promises = dnsbls.map((dnsbl) => {
//     const lookup = `${dnsbl}.${domainWithoutProtocol}`;
//     return new Promise((resolve) => {
//       dns.resolve4(lookup, (err) => {
//         if (err) {
//           resolve(false);
//         } else {
//           resolve(true);
//         }
//       });
//     });
//   });
//   const results = await Promise.all(promises);

//   if (results.some((result) => result === true)) {
//     throw new Error('The domain is listed in a DNSBL.');
//   }

//   return true;
// };
export const validateDomain = async (domain) => {
  const regex = /^[a-zA-Z0-9-]{1,63}(\.[a-zA-Z0-9-]{1,63})*$/;
  if (!regex.test(domain)) {
    throw new Error('The domain is invalid.');
  }
  const domainWithoutProtocol = domain.toString().replace(/(^\w+:|^)\/\//, '');
  const dnsbls = ['zen.spamhaus.org', 'bl.spamcop.net', 'dnsbl.sorbs.net'];
  const promises = dnsbls.map((dnsbl) => {
    const lookup = `${dnsbl}.${domainWithoutProtocol}`;
    return new Promise((resolve) => {
      dns.resolve4(lookup, (err) => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  });
  const results = await Promise.all(promises);

  if (results.some((result) => result === true)) {
    throw new Error('The domain is listed in a DNSBL.');
  }

  return true;
};
