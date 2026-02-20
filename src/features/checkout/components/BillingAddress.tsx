'use client';

interface BillingAddressProps {
    formData: {
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        zipCode: string;
    };
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    sameAsDelivery: boolean;
    onToggleSameAsDelivery: () => void;
}

export default function BillingAddress({ 
    formData, 
    onInputChange, 
    sameAsDelivery, 
    onToggleSameAsDelivery 
}: BillingAddressProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Billing Address</h2>
            
            <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                        type="checkbox" 
                        checked={sameAsDelivery}
                        onChange={onToggleSameAsDelivery}
                        className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">Same as delivery address</span>
                </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700" htmlFor="firstName">First Name</label>
                    <input 
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="e.g. John"
                        value={formData.firstName}
                        onChange={onInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-gray-300"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700" htmlFor="lastName">Last Name</label>
                    <input 
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="e.g. Doe"
                        value={formData.lastName}
                        onChange={onInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-gray-300"
                    />
                </div>
            </div>

            <div className="space-y-2 mt-4">
                <label className="text-sm font-bold text-gray-700" htmlFor="address">Address</label>
                <input 
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Street name, house number, apartment"
                    value={formData.address}
                    onChange={onInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-gray-300"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700" htmlFor="city">City</label>
                    <input 
                        id="city"
                        name="city"
                        type="text"
                        placeholder="e.g. Cairo"
                        value={formData.city}
                        onChange={onInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-gray-300"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700" htmlFor="zipCode">ZIP Code</label>
                    <input 
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        placeholder="12345"
                        value={formData.zipCode}
                        onChange={onInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-gray-300"
                    />
                </div>
            </div>
        </div>
    );
}
