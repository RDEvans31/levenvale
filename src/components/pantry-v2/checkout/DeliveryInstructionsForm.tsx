'use client';

import { useCartStore, useUserStore } from '@/store';
import { OrderType } from '@/store/types';
import { ChevronRight, ChevronUp, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface DeliveryInstructionsFormData {
  instructions: string;
}

export function DeliveryInstructionsForm() {
  const [isOpen, setIsOpen] = useState(false);
  const { deliveryInstructions, setDeliveryInstructions } = useUserStore();
  const { orderType } = useCartStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<DeliveryInstructionsFormData>({
    defaultValues: {
      instructions: deliveryInstructions || '',
    },
  });

  useEffect(() => {
    if (deliveryInstructions) {
      reset({ instructions: deliveryInstructions });
    }
  }, [deliveryInstructions, reset]);

  const formData = watch();
  const hasInstructions = formData.instructions !== '';

  const isPickup = orderType === OrderType.PICKUP;

  const placeholderText = isPickup
    ? "Let us know when you'd like to pick it up"
    : 'Let us know a safe place to leave it';

  const requiredMessage = isPickup
    ? 'Please let us know when you would like to pick up your order'
    : 'Please let us know a safe place to leave your delivery';

  const labelText = isPickup ? 'Pickup Instructions' : 'Delivery Instructions';

  const onSubmit = (data: DeliveryInstructionsFormData) => {
    setDeliveryInstructions(data.instructions);
    setIsOpen(false);
  };

  return (
    <div className="flex items-start gap-4">
      <User size={20} className="mt-1" />
      {!isOpen ? (
        <>
          <div className="flex-1">
            <h3 className="font-medium">{labelText}</h3>
            {hasInstructions ? (
              <p className="text-gray-600">{formData.instructions}</p>
            ) : (
              <button
                onClick={() => setIsOpen(true)}
                className="text-green-600 mt-2"
              >
                Add delivery instructions
              </button>
            )}
          </div>
          <button onClick={() => setIsOpen(!isOpen)}>
            <ChevronRight size={20} />
          </button>
        </>
      ) : (
        <div className="flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-between">
              <h3 className="font-medium">{labelText}</h3>
              <button onClick={() => setIsOpen(!isOpen)}>
                <ChevronUp size={20} />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Instructions
              </label>
              <textarea
                {...register('instructions', {
                  required: requiredMessage,
                })}
                placeholder={placeholderText}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 min-h-[100px]"
              />
              {errors.instructions && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.instructions.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full block bg-black text-white py-4 rounded-lg font-medium text-center"
            >
              Save Instructions
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
