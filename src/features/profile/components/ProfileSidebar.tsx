'use client';

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { 
    faUser, 
    faShoppingBag, 
    faHeart, 
    faStar, 
    faMapMarkerAlt, 
    faCreditCard, 
    faSignOutAlt,
    faTachometerAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import useLogout from "@/features/auth/hooks/useLogout";

interface SidebarItemProps {
    href: string;
    icon: IconDefinition;
    label: string;
    isActive: boolean;
}

const SidebarItem = ({ href, icon, label, isActive }: SidebarItemProps) => (
    <Link 
        href={href}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive 
            ? "bg-primary-50 text-primary-600 font-semibold" 
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`}
    >
        <FontAwesomeIcon icon={icon} className="w-5" />
        <span>{label}</span>
    </Link>
);

export default function ProfileSidebar() {
    const pathname = usePathname();
    const { logout } = useLogout();
    const { userInfo } = useAppSelector((state) => state.auth);

    const sidebarItems = [
        { href: "/profile/dashboard", icon: faTachometerAlt, label: "Dashboard" },
        { href: "/orders", icon: faShoppingBag, label: "Orders" },
        { href: "/wishlist", icon: faHeart, label: "Wishlist" },
        { href: "/favorites", icon: faStar, label: "Favorites" },
        { href: "/addresses", icon: faMapMarkerAlt, label: "Addresses" },
        { href: "/payment-methods", icon: faCreditCard, label: "Payment Methods" },
        { href: "/profile", icon: faUser, label: "Account Details" },
    ];

    return (
        <aside className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                    <FontAwesomeIcon icon={faUser} size="lg" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">{userInfo?.name || "User Name"}</h3>
                    <p className="text-sm text-gray-500">{userInfo?.email || "user@example.com"}</p>
                </div>
            </div>

            <nav className="space-y-1">
                {sidebarItems.map((item) => (
                    <SidebarItem 
                        key={item.href}
                        href={item.href}
                        icon={item.icon}
                        label={item.label}
                        isActive={pathname === item.href}
                    />
                ))}
                
                <button 
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors mt-4"
                    onClick={logout}
                >
                    <FontAwesomeIcon icon={faSignOutAlt} className="w-5" />
                    <span>Logout</span>
                </button>
            </nav>
        </aside>
    );
}
