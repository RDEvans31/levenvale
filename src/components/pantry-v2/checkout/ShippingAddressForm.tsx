'use client';

import { ApiShippingAddress } from '@/actions/users/shipping';
import { areAddressesEqual } from '@/lib/helper/areAddressesEqual';
import { useUserStore } from '@/store';
import { UserAddress } from '@/store/types';
import { ChevronRight, CircleX, MapPin } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

const mapAddress = (
  address: ApiShippingAddress | undefined
): UserAddress | undefined => {
  if (!address) {
    return undefined;
  }
  return {
    firstName: address.firstName,
    lastName: address.lastName,
    address1: address.address1,
    address2: address.address2 || undefined,
    city: address.city,
    state: address.state,
    postcode: address.postcode,
    country: address.country,
    email: address.email,
  };
};

function AddNewAddressForm({
  onSubmit,
  selectedAddress,
  setIsNew,
}: {
  onSubmit: (data: UserAddress) => void;
  selectedAddress: UserAddress;
  setIsNew: (isNew: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAddress>({
    defaultValues: selectedAddress || {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postcode: '',
      country: 'GB',
    },
  });
  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-between">
          <h3 className="font-medium">Shipping Address</h3>
          <button onClick={() => setIsNew(false)}>
            <CircleX size={20} className="text-red-500" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              {...register('firstName', {
                required: 'First name is required',
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              {...register('lastName', {
                required: 'Last name is required',
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            {...register('address1', { required: 'Address is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.address1 && (
            <p className="mt-1 text-sm text-red-600">
              {errors.address1.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              {...register('city', { required: 'City is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              State/County
            </label>
            <input
              {...register('state', { required: 'State is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            {errors.state && (
              <p className="mt-1 text-sm text-red-600">
                {errors.state.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Postcode
            </label>
            <input
              {...register('postcode', {
                required: 'Postcode is required',
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
            {errors.postcode && (
              <p className="mt-1 text-sm text-red-600">
                {errors.postcode.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              {...register('country', { required: 'Country is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="GB">United Kingdom</option>
            </select>
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">
                {errors.country.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full block bg-black text-white py-4 rounded-lg font-medium text-center"
        >
          Save Shipping Address
        </button>
      </form>
    </div>
  );
}

export function ShippingAddressForm({
  existingAddresses,
}: {
  existingAddresses?: ApiShippingAddress[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const { shippingAddress, setShippingAddress } = useUserStore();
  const selectedAddress = useMemo(
    () =>
      shippingAddress ||
      (existingAddresses?.[0] ? mapAddress(existingAddresses?.[0]) : undefined),
    [shippingAddress, existingAddresses]
  );

  const { watch, reset } = useForm<UserAddress>({
    defaultValues: selectedAddress || {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postcode: '',
      country: 'GB',
    },
  });

  useEffect(() => {
    if (
      selectedAddress &&
      !areAddressesEqual(selectedAddress, shippingAddress)
    ) {
      setShippingAddress(selectedAddress); // this will trigger a reset of the form
    } else if (
      selectedAddress &&
      areAddressesEqual(selectedAddress, shippingAddress)
    ) {
      reset(selectedAddress);
    }
  }, [selectedAddress, shippingAddress, reset, setShippingAddress]);

  const formData = watch();
  const hasAddress = formData.address1 !== '';

  const onSubmit = (data: UserAddress) => {
    setShippingAddress(data);
    setIsOpen(false);
    setIsNew(false);
  };

  return (
    <div className="flex items-start gap-4">
      <MapPin size={20} className="mt-1" />
      {!isOpen && !isNew && (
        <>
          <div className="flex-1">
            <h3 className="font-medium">Shipping Address</h3>
            {hasAddress ? (
              <>
                <h3 className="font-medium">{formData.address1}</h3>
                <p className="text-gray-600">
                  {formData.city}, {formData.state} {formData.postcode}
                </p>
              </>
            ) : (
              <p className="text-green-600 mt-2">Add shipping address</p>
            )}
          </div>
          <button onClick={() => setIsOpen(!isOpen)}>
            <ChevronRight size={20} />
          </button>
        </>
      )}
      {isOpen && !isNew && (
        <div className="flex-1">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Select Address</h3>
              <button onClick={() => setIsOpen(false)}>
                <CircleX size={20} className="text-red-500" />
              </button>
            </div>

            <div className="space-y-2">
              {existingAddresses?.map((address, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const mappedAddress = mapAddress(address);
                    if (mappedAddress) {
                      setShippingAddress(mappedAddress);
                      reset(mappedAddress);
                    }
                    setIsOpen(false);
                  }}
                  className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 hover:border-gray-300"
                >
                  <div className="font-medium">
                    {address.firstName} {address.lastName}
                  </div>
                  <div className="text-sm text-gray-600">
                    {address.address1}
                    {address.address2 && `, ${address.address2}`}
                  </div>
                  <div className="text-sm text-gray-600">
                    {address.city}, {address.state} {address.postcode}
                  </div>
                </button>
              ))}

              <button
                onClick={() => {
                  setIsNew(true);
                  setIsOpen(false);
                }}
                className="w-full text-left p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 text-gray-600"
              >
                + Add new address
              </button>
            </div>
          </div>
        </div>
      )}
      {isNew && (
        <AddNewAddressForm
          onSubmit={onSubmit}
          selectedAddress={formData}
          setIsNew={setIsNew}
        />
      )}
    </div>
  );
}
