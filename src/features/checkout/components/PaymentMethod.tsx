'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faCreditCard, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

interface PaymentMethodProps {
    selectedMethod: 'cod' | 'online';
    onMethodChange: (method: 'cod' | 'online') => void;
}

export default function PaymentMethod({ selectedMethod, onMethodChange }: PaymentMethodProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
            
            <div className="space-y-4">
                {/* Cash on Delivery */}
                <label className={`
                    relative flex p-4 cursor-pointer rounded-xl border-2 transition-all
                    ${selectedMethod === 'cod' ? 'border-primary-600 bg-primary-50/30' : 'border-gray-100 hover:border-gray-200'}
                `}>
                    <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="cod"
                        checked={selectedMethod === 'cod'}
                        onChange={() => onMethodChange('cod')}
                        className="sr-only"
                    />
                    <div className="flex gap-4 w-full">
                        <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                            ${selectedMethod === 'cod' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-400'}
                        `}>
                            <FontAwesomeIcon icon={faMoneyBill} />
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-gray-900">Cash on Delivery</span>
                                <span className="text-xs font-bold text-green-600">No extra charges</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Pay when your order arrives</p>
                            
                            {selectedMethod === 'cod' && (
                                <div className="mt-4 bg-green-50 border border-green-100 rounded-lg p-3 flex gap-3 text-green-700">
                                    <FontAwesomeIcon icon={faCircleInfo} className="mt-1 flex-shrink-0" />
                                    <p className="text-sm">Please keep exact change ready for hassle-free delivery</p>
                                </div>
                            )}
                        </div>
                        <div className={`
                            w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1
                            ${selectedMethod === 'cod' ? 'border-primary-600' : 'border-gray-300'}
                        `}>
                            {selectedMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />}
                        </div>
                    </div>
                </label>

                {/* Online Payment */}
                <label className={`
                    relative flex p-4 cursor-pointer rounded-xl border-2 transition-all
                    ${selectedMethod === 'online' ? 'border-primary-600 bg-primary-50/30' : 'border-gray-100 hover:border-gray-200'}
                `}>
                    <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="online"
                        checked={selectedMethod === 'online'}
                        onChange={() => onMethodChange('online')}
                        className="sr-only"
                    />
                    <div className="flex gap-4 w-full">
                        <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                            ${selectedMethod === 'online' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-400'}
                        `}>
                            <FontAwesomeIcon icon={faCreditCard} />
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-gray-900">Online Payment</span>
                                <span className="text-xs font-bold text-primary-600">Recommended</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Pay securely with card or digital wallet</p>
                            
                            {selectedMethod === 'online' && (
                                <div className="mt-4 bg-primary-50 border border-primary-100 rounded-lg p-3 flex gap-3 text-primary-700">
                                    <FontAwesomeIcon icon={faCircleInfo} className="mt-1 flex-shrink-0" />
                                    <p className="text-sm">You will be redirected to secure payment gateway to complete your transaction</p>
                                </div>
                            )}
                        </div>
                        <div className={`
                            w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1
                            ${selectedMethod === 'online' ? 'border-primary-600' : 'border-gray-300'}
                        `}>
                            {selectedMethod === 'online' && <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />}
                        </div>
                    </div>
                </label>
            </div>
        </div>
    );
}
