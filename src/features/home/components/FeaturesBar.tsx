import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faShieldHalved, faRotateLeft, faHeadset } from "@fortawesome/free-solid-svg-icons";

const features = [
    {
        icon: faTruck,
        color: "text-primary-600",
        bg: "bg-primary-50",
        title: "Free Shipping",
        description: "On orders over 500 EGP",
    },
    {
        icon: faShieldHalved,
        color: "text-primary-600",
        bg: "bg-primary-50",
        title: "Secure Payment",
        description: "100% secure transactions",
    },
    {
        icon: faRotateLeft,
        color: "text-orange-500",
        bg: "bg-orange-50",
        title: "Easy Returns",
        description: "14-day return policy",
    },
    {
        icon: faHeadset,
        color: "text-primary-600",
        bg: "bg-primary-50",
        title: "24/7 Support",
        description: "Dedicated support team",
    },
];

export default function FeaturesBar() {
    return (
        <section className="py-6">
            <div className="container">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className={`w-12 h-12 ${feature.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                                <FontAwesomeIcon icon={feature.icon} className={`${feature.color} text-lg`} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">{feature.title}</h3>
                                <p className="text-xs text-gray-500">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
