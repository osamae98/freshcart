import Link from 'next/link';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const BrandHero = () => {
  return (
    <section className="bg-gray-50 py-16 text-center">
      <div className="container">
        <nav className="flex justify-center mb-6 text-sm">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="text-gray-500 hover:text-primary-600">Home</Link></li>
            <li><FontAwesomeIcon icon={faChevronRight} className="text-[10px] text-gray-400" /></li>
            <li className="text-primary-600 font-semibold">Brands</li>
          </ol>
        </nav>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Partner Brands</h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          Discover quality products from our trusted brand partners. We&apos;ve partnered with leading brands to bring you the best selection of fresh and organic products.
        </p>
      </div>
    </section>
  );
};


export default BrandHero;
