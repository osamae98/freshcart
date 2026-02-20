'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCheck } from "@fortawesome/free-solid-svg-icons";

const steps = [
    { id: 1, name: 'Cart' },
    { id: 2, name: 'Review' },
    { id: 3, name: 'Payment' },
    { id: 4, name: 'Complete' },
];

interface CheckoutStepperProps {
    currentStep: number;
}

export default function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
    return (
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
            {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                    <div className="flex items-center gap-2">
                        <div className={`
                            w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors
                            ${currentStep > step.id ? 'bg-primary-600 text-white' : 
                              currentStep === step.id ? 'bg-primary-600 text-white' : 
                              'bg-gray-200 text-gray-500'}
                        `}>
                            {currentStep > step.id ? (
                                <FontAwesomeIcon icon={faCheck} className="text-[10px]" />
                            ) : (
                                step.id
                            )}
                        </div>
                        <span className={`
                            text-sm font-medium transition-colors hidden sm:inline
                            ${currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'}
                        `}>
                            {step.name}
                        </span>
                    </div>
                    {index < steps.length - 1 && (
                        <FontAwesomeIcon 
                            icon={faChevronRight} 
                            className="ml-2 md:ml-4 text-gray-300 text-[10px]" 
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
