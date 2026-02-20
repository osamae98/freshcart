import {
    faClock,faShieldHalved, faTruck 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Image from "next/image";

export default function LoginHero() {
    return (
        <>
        <div className="hidden lg:block">
            <div className="text-center space-y-6">
                <Image className="w-full h-96 object-cover rounded-2xl shadow-lg"
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"
                  alt="Fresh vegetables and fruits for grocery shopping"
                  width={600}
                  height={400} />

                <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-gray-800">
                        FreshCart - Your One-Stop Shop for Fresh Products
                    </h2>
                    <p className="text-lg text-gray-600">
                        Join thousands of happy customers who trust FreshCart for their 
                        daily grocery needs
                    </p>
                    <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                        <div className="flex items-center">
                            <FontAwesomeIcon
                             icon={faTruck}
                             className="text-primary-600 mr-2"
                             />
                             Free Delivery
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon
                                icon={faShieldHalved}
                                className="text-primary-600 mr-2"
                                />
                                Secure Payment
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon
                                icon={faClock}
                                className="text-primary-600 mr-2"
                            />
                            24/7 Support
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}