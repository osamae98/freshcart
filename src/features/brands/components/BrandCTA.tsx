import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const BrandCTA = () => {
  const benefits = [
    "Access to over 1 million active customers",
    "Dedicated account manager for your brand",
    "Marketing and promotional opportunities",
    "Streamlined logistics and fulfillment"
  ];

  return (
    <section className="mt-20">
      <div className="bg-primary-50/30 rounded-3xl overflow-hidden border border-primary-50">
        <div className="grid lg:grid-cols-2">
          {/* Left Content */}
          <div className="p-8 md:p-12 lg:p-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Want to become a brand partner?
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Join our growing family of quality brands. Showcase your products to our engaged customer base and grow your business with FreshCart.
            </p>
            
            <ul className="space-y-4 mb-10">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-700">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-primary-500" />
                  <span className="font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
            
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-primary-600/20 active:scale-[0.98]">
              Apply to Become a Partner
            </button>
          </div>
          
          {/* Right Image */}
          <div className="relative min-h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"
              alt="Become a partner"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCTA;
