import { fetchUserShippingData } from '@/actions/users';
import { DeliveryInstructionsForm } from '@/components/pantry-v2/checkout/DeliveryInstructionsForm';
import { PhoneNumberForm } from '@/components/pantry-v2/checkout/PhoneNumberForm';
import { ShippingAddressForm } from '@/components/pantry-v2/checkout/ShippingAddressForm';

interface UserDetailsProps {
  userId: string;
}

export async function UserDetails({ userId }: UserDetailsProps) {
  const userData = await fetchUserShippingData(userId);

  if (!userData.success) {
    // Fallback UI when API call fails
    return (
      <div className="space-y-4 p-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            Unable to load shipping information. Please refresh the page or
            contact support.
          </p>
        </div>
        <DeliveryInstructionsForm />
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <ShippingAddressForm
        existingAddresses={userData.value.shippingAddresses}
      />
      <PhoneNumberForm existingPhoneNumbers={userData.value.phoneNumbers} />
      <DeliveryInstructionsForm />
    </div>
  );
}
