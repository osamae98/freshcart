'use client';

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faHome, 
  faSearch, 
  faPhone, 
  faEnvelope, 
  faComments,
  faAppleWhole,
  faEgg,
  faBreadSlice,
  faCow
} from '@fortawesome/free-solid-svg-icons';
import NewsLetter from '@/features/home/components/NewsLetter';

const categories = [
  { name: 'Fruits & Vegetables', icon: faAppleWhole, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { name: 'Dairy & Eggs', icon: faEgg, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { name: 'Bakery & Snacks', icon: faBreadSlice, color: 'text-orange-500', bg: 'bg-orange-50' },
  { name: 'Meat & Seafood', icon: faCow, color: 'text-red-500', bg: 'bg-red-50' },
];

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 text-center max-w-4xl">
        {/* 404 Illustration */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-[120px] md:text-[200px] font-black text-primary-100 leading-none select-none">4</span>
          <div className="relative group">
            <div className="w-24 h-24 md:w-40 md:h-40 bg-primary-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <FontAwesomeIcon icon={faShoppingCart} className="text-primary-500 text-4xl md:text-7xl group-hover:rotate-12 transition-transform duration-500" />
            </div>
            {/* Pulsing effect */}
            <div className="absolute inset-0 bg-primary-200 rounded-full animate-ping opacity-20" />
          </div>
          <span className="text-[120px] md:text-[200px] font-black text-primary-100 leading-none select-none">4</span>
        </div>

        {/* Text Content */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-500 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium">
          The page you&apos;re looking for seems to have gone shopping! <br className="hidden md:block" />
          Don&apos;t worry, our fresh products are still available for you.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20">
          <Link 
            href="/"
            className="w-full md:w-auto bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-10 rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary-500/25 group"
          >
            <FontAwesomeIcon icon={faHome} className="group-hover:-translate-y-0.5 transition-transform" />
            <span>Back to Home</span>
          </Link>
          <Link 
            href="/products"
            className="w-full md:w-auto bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50 font-bold py-4 px-10 rounded-2xl flex items-center justify-center gap-3 transition-all group"
          >
            <FontAwesomeIcon icon={faSearch} className="group-hover:scale-110 transition-transform" />
            <span>Search Products</span>
          </Link>
        </div>

        {/* Categories Section */}
        <div className="mb-20">
          <p className="text-gray-900 font-bold text-lg mb-8">Or explore our popular categories</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <Link 
                key={idx}
                href="/categories"
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all group"
              >
                <div className={`${cat.bg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <FontAwesomeIcon icon={cat.icon} className={`${cat.color} text-2xl`} />
                </div>
                <h3 className="text-gray-900 font-bold text-sm">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-primary-50/50 rounded-[2.5rem] p-8 md:p-12 mb-20 border border-primary-100/50">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
          <p className="text-gray-500 font-medium mb-8">Our customer support team is here to assist you 24/7</p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <a href="tel:+18001234567" className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-colors font-bold">
              <FontAwesomeIcon icon={faPhone} className="text-primary-500" />
              <span>+1 (800) 123-4567</span>
            </a>
            <a href="mailto:support@freshcart.com" className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-colors font-bold">
              <FontAwesomeIcon icon={faEnvelope} className="text-primary-500" />
              <span>support@freshcart.com</span>
            </a>
            <button className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-colors font-bold">
              <FontAwesomeIcon icon={faComments} className="text-primary-500" />
              <span>Live Chat</span>
            </button>
          </div>
        </div>

        {/* Newsletter */}
        <NewsLetter />
      </div>
    </main>
  );
}
