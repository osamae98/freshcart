'use client';

import React, { useState } from 'react';
import { Product } from '../../types/Products.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faFlask } from '@fortawesome/free-solid-svg-icons';

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('Product Details');

  const tabs = ['Product Details', 'Nutrition Facts', `Reviews (${product.ratingQuantity})`, 'Shipping & Returns'];

  return (
    <div className="mt-12">
      <div className="flex flex-wrap border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-sm font-semibold transition-all relative ${
              activeTab === tab ? 'text-primary-600' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500" />
            )}
          </button>
        ))}
      </div>

      <div className="py-8 animate-in fade-in slide-in-from-top-4 duration-500">
        {activeTab === 'Product Details' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Product Description</h3>
              <p className="text-gray-600 leading-relaxed max-w-4xl">
                {product.description}. Our organic strawberries are carefully grown without synthetic pesticides or fertilizers, ensuring you get the purest, most natural flavor in every bite. These vibrant red berries are handpicked at peak ripeness to guarantee maximum sweetness and nutritional value.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Benefits</h4>
                <ul className="space-y-3">
                  {['Rich in vitamins C and K', 'Good source of fiber and antioxidants', 'Supports heart health', 'Helps regulate blood sugar', 'Promotes healthy skin'].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Product Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-gray-500">Origin:</span>
                    <span className="font-semibold text-gray-900">California, USA</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-gray-500">Cultivation:</span>
                    <span className="font-semibold text-gray-900">Organic</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-gray-500">Storage:</span>
                    <span className="font-semibold text-gray-900">Refrigerate upon arrival</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-gray-500">Shelf Life:</span>
                    <span className="font-semibold text-gray-900">5-7 days when refrigerated</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-gray-900">How To Store</h4>
              <p className="text-gray-600 leading-relaxed max-w-4xl">
                For optimal freshness, refrigerate strawberries unwashed in their original container or in a paper towel-lined container. Wash just before eating. To extend shelf life, remove any damaged berries as soon as possible.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-gray-900">Certifications</h4>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-gray-50">
                  <FontAwesomeIcon icon={faLeaf} className="text-primary-500" />
                  USDA Organic
                </div>
                <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-gray-50">
                  <FontAwesomeIcon icon={faFlask} className="text-primary-500" />
                  Non-GMO
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab.includes('Reviews') && (
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-2xl">
            Customer reviews section coming soon...
          </div>
        )}

        {activeTab === 'Nutrition Facts' && (
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-2xl">
            Nutrition information coming soon...
          </div>
        )}

        {activeTab === 'Shipping & Returns' && (
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-2xl">
            Shipping and returns policy coming soon...
          </div>
        )}
      </div>
    </div>
  );
}
