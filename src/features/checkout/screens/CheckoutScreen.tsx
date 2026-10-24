'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AppState } from '../../../store/store';
import { useAppDispatch } from '../../../store/hooks';
import { clearCart } from '../../cart/store/cart.slice';
import { createCashOrder, createCheckoutSession } from '../../orders/server/orders.actions';
import CheckoutStepper from '../components/CheckoutStepper';
import PaymentMethod from '../components/PaymentMethod';
import BillingAddress from '../components/BillingAddress';
import OrderSummary from '../components/OrderSummary';

import ProductCard from '../../products/components/ProductCard';
import { Product } from '../../products/types/Products.types';

// Mock products for "You Might Also Like"
const mockRecommendations: Product[] = [
    {
        _id: '1',
        id: '1',
        title: 'Hass Avocados (2pcs)',
        slug: 'hass-avocados',
        description: 'Fresh Hass Avocados',
        quantity: 100,
        price: 3.99,
        priceAfterDiscount: 2.99,
        sold: 50,
        images: [],
        imageCover: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&auto=format&fit=crop',
        subcategory: [],
        category: { _id: '1', name: 'Fruits & Vegetables', slug: 'fruits', image: '' },
        brand: { _id: '1', name: 'Fresh', slug: 'fresh', image: '' },
        ratingsAverage: 4.8,
        ratingsQuantity: 120,
        createdAt: '',
        updatedAt: ''
    },
    {
        _id: '2',
        id: '2',
        title: 'Organic Bananas (1kg)',
        slug: 'organic-bananas',
        description: 'Fresh Organic Bananas',
        quantity: 100,
        price: 1.99,
        priceAfterDiscount: 0,
        sold: 80,
        images: [],
        imageCover: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&auto=format&fit=crop',
        subcategory: [],
        category: { _id: '1', name: 'Fruits & Vegetables', slug: 'fruits', image: '' },
        brand: { _id: '1', name: 'Fresh', slug: 'fresh', image: '' },
        ratingsAverage: 4.5,
        ratingsQuantity: 95,
        createdAt: '',
        updatedAt: ''
    },
    {
        _id: '3',
        id: '3',
        title: 'Greek Yogurt (32oz)',
        slug: 'greek-yogurt',
        description: 'Creamy Greek Yogurt',
        quantity: 100,
        price: 4.49,
        priceAfterDiscount: 0,
        sold: 40,
        images: [],
        imageCover: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop',
        subcategory: [],
        category: { _id: '2', name: 'Dairy & Eggs', slug: 'dairy', image: '' },
        brand: { _id: '2', name: 'Fresh', slug: 'fresh', image: '' },
        ratingsAverage: 4.9,
        ratingsQuantity: 150,
        createdAt: '',
        updatedAt: ''
    }
];

export default function CheckoutScreen() {
    const { cart } = useSelector((state: AppState) => state.cart);
    
    const [currentStep, setCurrentStep] = useState(2); // Starting at Review/Payment step as per image
    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('online');
    const [sameAsDelivery, setSameAsDelivery] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zipCode: '',
        phone: ''
    });
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleProceed = async () => {
        if (!cart || isPlacingOrder) return;

        const { firstName, lastName, address, city, phone } = formData;
        if (!firstName.trim() || !lastName.trim() || !address.trim() || !city.trim()) {
            toast.error('Please fill in your name, address and city');
            return;
        }
        if (!/^01[0125][0-9]{8}$/.test(phone.trim())) {
            toast.error('Please enter a valid Egyptian phone number');
            return;
        }

        const shippingAddress = {
            details: `${firstName.trim()} ${lastName.trim()}, ${address.trim()}`,
            phone: phone.trim(),
            city: city.trim(),
        };

        setIsPlacingOrder(true);
        setCurrentStep(3);

        if (paymentMethod === 'online') {
            const result = await createCheckoutSession({ cartId: cart._id, shippingAddress, returnUrl: window.location.origin });
            if (result.success) {
                window.location.href = result.data.url;
                return;
            }
            toast.error(result.message);
        } else {
            const result = await createCashOrder({ cartId: cart._id, shippingAddress });
            if (result.success) {
                setCurrentStep(4);
                dispatch(clearCart());
                toast.success('Order placed successfully');
                router.push('/orders');
                return;
            }
            toast.error(result.message);
        }

        setCurrentStep(2);
        setIsPlacingOrder(false);
    };

    if (!cart) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
                <p className="text-gray-500 mt-2">Add some products to your cart before checking out.</p>
            </div>
        );
    }

    // The API charges only the cart total (no tax, shipping or discount), so mirror that here
    const subtotal = cart.totalCartPrice;
    const discount = 0;
    const shipping = 0;
    const tax = 0;

    return (
        <section className="py-12 bg-gray-50/30 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                    <h1 className="text-3xl font-black text-gray-900">Checkout</h1>
                    <CheckoutStepper currentStep={currentStep} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <PaymentMethod 
                            selectedMethod={paymentMethod}
                            onMethodChange={setPaymentMethod}
                        />

                        <BillingAddress 
                            formData={formData}
                            onInputChange={handleInputChange}
                            sameAsDelivery={sameAsDelivery}
                            onToggleSameAsDelivery={() => setSameAsDelivery(!sameAsDelivery)}
                        />

                        {/* Recommendation Section */}
                        <div className="mt-12">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 font-primary">You Might Also Like</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {mockRecommendations.map(product => (
                                    <ProductCard key={product._id} info={product} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Summary Column */}
                    <div className="lg:col-span-1">
                        <OrderSummary 
                            items={cart.products}
                            subtotal={subtotal}
                            discount={discount}
                            shipping={shipping}
                            tax={tax}
                            onProceed={handleProceed}
                            isProcessing={isPlacingOrder}
                            paymentMethod={paymentMethod}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

