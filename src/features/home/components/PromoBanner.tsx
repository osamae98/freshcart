import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTruck,
    faShieldAlt,
    faUndo,
    faHeadset,
} from "@fortawesome/free-solid-svg-icons";


export default function PromoBanners() {
    const features = [
        {
            icon: faTruck,
            title: "Free Shipping",
            description: "On orders over 500 EGP",
            color: "text-blue-500",
            bgColor: "bg-blue-50",
        },
        {
            icon: faShieldAlt,
            title: "Secure Payment",
            description: "100% secure transactions",
            color: "text-emerald-500",
            bgColor: "bg-emerald-50",
        },
        {
            icon: faUndo,
            title: "Easy Returns",
            description: "14-day return policy",
            color: "text-orange-500",
            bgColor: "bg-orange-50",
        },
        {
            icon: faHeadset,
            title: "24/7 Support",
            description: "Dedicated support team",
            color: "text-purple-500",
            bgColor: "bg-purple-50",
        },
    ];

    return (
        <section className="py-8 bg-gray-50">
            <div className="container mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 bg-white rounded-xl shadow-sm hover:shadow-md">
                                <div className={`${feature.bgColor} ${feature.color} w-12 h-12 rounded-full flex items-center justify-center`}>
                                    <FontAwesomeIcon icon={feature.icon} className="text-xl"/>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 text-sm">{feature.title}</h3>
                                    <p className="text-xs text-gray-500">{feature.description}</p>
                                </div>
                            </div>

                    ))}
                </div>
            </div>
        </section>
    )
}