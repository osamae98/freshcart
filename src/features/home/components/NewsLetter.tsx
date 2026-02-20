'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faLeaf, 
  faTruck, 
  faTag, 
  faArrowRight, 
  faShieldHalved 
} from '@fortawesome/free-solid-svg-icons';

const NewsLetter = () => {
  return (
    <section className="bg-primary-50 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden my-12 border border-primary-100/50 shadow-sm">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100/30 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
        {/* Top Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-primary-500 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
            <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
          </div>
          <div>
            <h4 className="text-primary-600 font-bold text-xs tracking-widest uppercase">Newsletter</h4>
            <p className="text-gray-500 text-sm font-medium">50,000+ subscribers</p>
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 max-w-2xl leading-tight">
          Get the Freshest Updates <span className="text-primary-600">Delivered Free</span>
        </h2>
        <p className="text-gray-500 text-lg mb-8 font-medium">
          Weekly recipes, seasonal offers & exclusive member perks.
        </p>

        {/* Badge List */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            { icon: faLeaf, label: 'Fresh Picks Weekly' },
            { icon: faTruck, label: 'Free Delivery Codes' },
            { icon: faTag, label: 'Members-Only Deals' }
          ].map((badge, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-gray-100 px-5 py-2.5 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-default group"
            >
              <FontAwesomeIcon icon={badge.icon} className="text-primary-500 text-sm group-hover:scale-110 transition-transform" />
              <span className="text-gray-700 font-bold text-sm">{badge.label}</span>
            </div>
          ))}
        </div>

        {/* Subscription Form */}
        <div className="max-w-3xl">
          <form className="flex flex-col md:flex-row gap-4 mb-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex-1 relative group">
              <input 
                type="email" 
                placeholder="you@example.com" 
                className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all text-gray-700 font-semibold placeholder:text-gray-400 shadow-sm"
              />
            </div>
            <button 
              type="submit"
              className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-10 rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary-500/25 group whitespace-nowrap"
            >
              <span>Subscribe</span>
              <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Footer Disclaimer */}
          <div className="flex items-center gap-2.5 text-gray-400 text-sm font-medium ml-1">
            <FontAwesomeIcon icon={faShieldHalved} className="text-xs text-primary-400" />
            <p>Unsubscribe anytime. No spam, ever.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
