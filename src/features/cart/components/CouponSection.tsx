'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

export default function CouponSection() {
    const [coupon, setCoupon] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState('FRESH20');

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Apply Coupon</h3>
            <div className="flex gap-3">
                <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                />
                <button 
                    disabled={!coupon}
                    className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-200 text-white font-bold px-8 rounded-xl transition-all active:scale-95 whitespace-nowrap"
                >
                    Apply
                </button>
            </div>

            {appliedCoupon && (
                <div className="mt-4 flex items-center justify-between bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2 text-green-700">
                        <FontAwesomeIcon icon={faTag} size="sm" />
                        <span className="text-sm font-bold">{appliedCoupon} Applied</span>
                    </div>
                    <span className="text-sm font-bold text-green-700">-$3.25</span>
                </div>
            )}
        </div>
    );
}
