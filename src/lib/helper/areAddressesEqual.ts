import { UserAddress } from '@/store/types';

export const areAddressesEqual = (
  address1?: UserAddress,
  address2?: UserAddress
) => {
  if (!address1 || !address2) {
    return false;
  }

  return (
    address1.firstName === address2.firstName &&
    address1.lastName === address2.lastName &&
    address1.address1 === address2.address1 &&
    address1.city === address2.city &&
    address1.state === address2.state &&
    address1.postcode === address2.postcode &&
    address1.country === address2.country
  );
};
