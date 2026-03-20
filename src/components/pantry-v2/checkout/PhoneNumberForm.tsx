'use client';

import { useUserStore } from '@/store';
import { ChevronRight, CircleX, Phone } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

interface PhoneNumberFormData {
  phone: string;
}

function AddNewPhoneForm({
  onSubmit,
  selectedPhone,
  setIsNew,
}: {
  onSubmit: (data: PhoneNumberFormData) => void;
  selectedPhone: string;
  setIsNew: (isNew: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneNumberFormData>({
    defaultValues: {
      phone: selectedPhone || '',
    },
  });

  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-between">
          <h3 className="font-medium">Phone Number</h3>
          <button onClick={() => setIsNew(false)}>
            <CircleX size={20} className="text-red-500" />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <input
            type="tel"
            {...register('phone', {
              required: 'Mobile number is required',
              pattern: {
                value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                message: 'Please enter a valid phone number',
              },
            })}
            placeholder="Enter your phone number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full block bg-black text-white py-4 rounded-lg font-medium text-center"
        >
          Save Phone Number
        </button>
      </form>
    </div>
  );
}

export function PhoneNumberForm({
  existingPhoneNumbers,
}: {
  existingPhoneNumbers?: {
    id: string;
    number: string;
    type: string;
    isDefault: boolean;
    isVerified: boolean;
  }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const { phone, setPhoneNumber } = useUserStore();
  const selectedPhoneNumber = useMemo(
    () => phone || existingPhoneNumbers?.[0]?.number || undefined,
    [existingPhoneNumbers, phone]
  );

  const { watch, reset } = useForm<PhoneNumberFormData>({
    defaultValues: {
      phone: selectedPhoneNumber || undefined,
    },
  });

  useEffect(() => {
    if (selectedPhoneNumber !== phone) {
      setPhoneNumber(selectedPhoneNumber);
    } else {
      reset({ phone: selectedPhoneNumber });
    }
  }, [phone, selectedPhoneNumber, reset, setPhoneNumber]);

  const formData = watch();
  const hasPhone = formData.phone !== undefined && formData.phone !== undefined;

  const onSubmit = (data: PhoneNumberFormData) => {
    setPhoneNumber(data.phone);
    setIsOpen(false);
    setIsNew(false);
  };

  return (
    <div className="flex items-start gap-4">
      <Phone size={20} className="mt-1" />
      {!isOpen && !isNew && (
        <>
          <div className="flex-1">
            <h3 className="font-medium">Mobile Number</h3>
            {hasPhone ? (
              <p className="text-gray-600">{formData.phone}</p>
            ) : (
              <button
                onClick={() => setIsOpen(true)}
                className="text-green-600 mt-2"
              >
                Add Contact Number
              </button>
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
              <h3 className="font-medium">Select Phone Number</h3>
              <button onClick={() => setIsOpen(false)}>
                <CircleX size={20} className="text-red-500" />
              </button>
            </div>

            <div className="space-y-2">
              {existingPhoneNumbers?.map((phoneNumber, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setPhoneNumber(phoneNumber.number);
                    reset({ phone: phoneNumber.number });
                    setIsOpen(false);
                  }}
                  className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 hover:border-gray-300"
                >
                  <div className="font-medium">{phoneNumber.number}</div>
                  <div className="text-sm text-gray-600">
                    {phoneNumber.type}
                    {phoneNumber.isDefault && ' (Default)'}
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
                + Add new phone number
              </button>
            </div>
          </div>
        </div>
      )}
      {isNew && (
        <AddNewPhoneForm
          onSubmit={onSubmit}
          selectedPhone={formData.phone}
          setIsNew={setIsNew}
        />
      )}
    </div>
  );
}
