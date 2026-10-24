'use client';

import { faBars, faCartShopping, faChevronDown, faEnvelope, faGift, faHeart, faHeadset, faMagnifyingGlass, faPhone, faRightFromBracket, faTruck, faUser, faUserPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";
import Image from "next/image";
import freshCartLogo from "../../assets/images/freshcart-logo.svg";
import useLogout from "@/features/auth/hooks/useLogout";

export default function Navbar() {
    const router = useRouter();
    const { logout } = useLogout();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const categoriesRef = useRef<HTMLLIElement>(null);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
                setIsCategoriesOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const { isAuthenticated } = useSelector(
        (appState: AppState) => appState.auth
    );

    const { numOfCartItems } = useSelector(
        (appState: AppState) => appState.cart
    );

    return (
        <>
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            {/* Top Bar - Green */}
            <div className="hidden lg:block bg-primary-600 text-white text-sm">
                <div className="container flex items-center justify-between py-2">
                    <ul className="flex gap-6 items-center">
                        <li className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faTruck} className="text-xs" />
                            <span>Free Shipping on Orders 500 EGP</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faGift} className="text-xs" />
                            <span>New Arrivals Daily</span>
                        </li>
                    </ul>

                    <ul className="flex gap-5 items-center">
                        <li className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faPhone} className="text-xs" />
                            <a href="tel:+18001234567">+1 (800) 123-4567</a>
                        </li>
                        <li className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                            <a href="mailto:support@freshcart.com">support@freshcart.com</a>
                        </li>
                        <li className="border-l border-white/30 pl-4">
                            {isAuthenticated ? (
                                <button onClick={logout} className="flex items-center gap-2 hover:text-primary-200 transition-colors">
                                    <FontAwesomeIcon icon={faRightFromBracket} className="text-xs" />
                                    <span>Sign Out</span>
                                </button>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Link href="/login" className="flex items-center gap-1.5 hover:text-primary-200 transition-colors">
                                        <FontAwesomeIcon icon={faUser} className="text-xs" />
                                        <span>Sign In</span>
                                    </Link>
                                    <Link href="/signUp" className="flex items-center gap-1.5 hover:text-primary-200 transition-colors">
                                        <FontAwesomeIcon icon={faUserPlus} className="text-xs" />
                                        <span>Sign Up</span>
                                    </Link>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="container">
                <nav className="flex py-3 justify-between items-center gap-6">
                    {/* Logo */}
                    <h1 className="flex-shrink-0">
                        <Link href="/">
                            <Image src={freshCartLogo} alt="Fresh Cart Logo" className="h-8 w-auto" />
                        </Link>
                    </h1>

                    {/* Search Bar */}
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            const value = (e.currentTarget.elements.namedItem("search") as HTMLInputElement).value.trim();
                            if (value) router.push(`/search?keyword=${encodeURIComponent(value)}`);
                        }}
                        className="hidden lg:flex flex-1 max-w-lg relative"
                    >
                        <input 
                            name="search" 
                            type="text" 
                            className="w-full pl-4 pr-12 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm" 
                            placeholder="Search for products, brands and more..."
                        />
                        <button 
                            type="submit" 
                            className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm" />
                        </button>
                    </form>

                    {/* Nav Links */}
                    <ul className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-700">
                        <li>
                            <Link href="/" className={`hover:text-primary-600 transition-colors ${isActive('/') ? 'text-primary-600' : ''}`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/featured" className={`hover:text-primary-600 transition-colors ${isActive('/featured') ? 'text-primary-600' : ''}`}>
                                Shop
                            </Link>
                        </li>
                        <li ref={categoriesRef} className="relative">
                            <button 
                                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                                className={`flex items-center gap-1.5 hover:text-primary-600 transition-colors ${isCategoriesOpen ? 'text-primary-600' : ''}`}
                            >
                                <span>Categories</span>
                                <FontAwesomeIcon icon={faChevronDown} className={`text-[10px] transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isCategoriesOpen && (
                                <div className="absolute top-full left-0 mt-3 min-w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-slide-in">
                                    <Link href="/categories" onClick={() => setIsCategoriesOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700 transition-colors">
                                        <span>Men&apos;s Fashion</span>
                                    </Link>
                                    <Link href="/categories" onClick={() => setIsCategoriesOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700 transition-colors">
                                        <span>Women&apos;s Fashion</span>
                                    </Link>
                                    <Link href="/categories" onClick={() => setIsCategoriesOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700 transition-colors">
                                        <span>Baby &amp; Toys</span>
                                    </Link>
                                    <Link href="/categories" onClick={() => setIsCategoriesOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700 transition-colors">
                                        <span>Beauty &amp; Health</span>
                                    </Link>
                                    <Link href="/categories" onClick={() => setIsCategoriesOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700 transition-colors">
                                        <span>Electronics</span>
                                    </Link>
                                    <div className="border-t border-gray-100 mt-1 pt-1">
                                        <Link href="/categories" onClick={() => setIsCategoriesOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-primary-600 font-semibold transition-colors">
                                            <span>View All Categories</span>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li>
                            <Link href="/brands" className={`hover:text-primary-600 transition-colors ${isActive('/brands') ? 'text-primary-600' : ''}`}>
                                Brands
                            </Link>
                        </li>
                    </ul>

                    {/* Support Badge */}
                    <div className="hidden xl:flex items-center gap-2.5 border-l border-gray-200 pl-6">
                        <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                            <FontAwesomeIcon icon={faHeadset} className="text-primary-600" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-gray-900">Support</div>
                            <div className="text-xs text-gray-500">24/7 Help</div>
                        </div>
                    </div>

                    {/* Right Icons */}
                    <div className="hidden lg:flex items-center gap-5">
                        <Link href="/wishlist" className={`text-gray-600 hover:text-primary-600 transition-colors ${isActive('/wishlist') ? 'text-primary-600' : ''}`}>
                            <FontAwesomeIcon icon={faHeart} className="text-xl" />
                        </Link>

                        <Link href="/cart" className={`relative text-gray-600 hover:text-primary-600 transition-colors ${isActive('/cart') ? 'text-primary-600' : ''}`}>
                            <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
                            <span className="absolute -top-2 -right-2.5 size-5 flex justify-center items-center rounded-full bg-primary-600 text-white text-[10px] font-bold ring-2 ring-white">
                                {numOfCartItems}
                            </span>
                        </Link>

                        {isAuthenticated ? (
                            <Link href="/profile" className={`text-gray-600 hover:text-primary-600 transition-colors ${isActive('/profile') ? 'text-primary-600' : ''}`}>
                                <FontAwesomeIcon icon={faUser} className="text-xl" />
                            </Link>
                        ) : (
                            <Link 
                                href="/login" 
                                className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="lg:hidden btn bg-primary-600 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                       {isMenuOpen ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
                    </button>
                </nav>
            </div>
        </header>

            {/* Mobile Off-Canvas */}
            {isMenuOpen && <>
                <div className="background cursor-pointer fixed z-30 inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)}></div>
                <div className="offcanvas space-y-5 fixed z-40 bg-white top-0 bottom-0 left-0 w-80 p-5 animate-slide-in overflow-y-auto">
                    <div className="flex justify-between items-center border-b border-gray-300/50 pb-4">
                        <Image src={freshCartLogo} alt="Fresh Cart Logo" />
                        <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center" onClick={() => setIsMenuOpen(false)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>

                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            const value = (e.currentTarget.elements.namedItem("search-mobile") as HTMLInputElement).value.trim();
                            if (value) {
                                router.push(`/search?keyword=${encodeURIComponent(value)}`);
                                setIsMenuOpen(false);
                            }
                        }}
                        className="relative"
                    >
                        <input 
                            name="search-mobile"
                            type="text" 
                            className="w-full pl-4 pr-12 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:border-primary-500 text-sm" 
                            placeholder="Search for products"
                        />
                        <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm" />
                        </button>
                    </form>

                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Menu</h2>
                        <ul className="space-y-1">
                            {[
                                { href: '/', label: 'Home' },
                                { href: '/featured', label: 'Shop' },
                                { href: '/categories', label: 'Categories' },
                                { href: '/brands', label: 'Brands' },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link 
                                        href={item.href} 
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`block py-2.5 px-3 rounded-lg transition-colors ${isActive(item.href) ? 'text-primary-600 bg-primary-50' : 'hover:bg-gray-50'}`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Account</h2>
                        <ul className="space-y-1">
                            <li>
                                <Link href="/wishlist" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-gray-50">
                                    <FontAwesomeIcon icon={faHeart} className="text-gray-500 w-5" />
                                    <span>Wishlist</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-gray-50">
                                    <FontAwesomeIcon icon={faCartShopping} className="text-gray-500 w-5" />
                                    <span>Cart</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-gray-50">
                                    <FontAwesomeIcon icon={faUser} className="text-gray-500 w-5" />
                                    <span>Account</span>
                                </Link>
                            </li>
                            {isAuthenticated ? (
                                <li>
                                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-gray-50 w-full text-left text-red-500">
                                        <FontAwesomeIcon icon={faRightFromBracket} className="w-5" />
                                        <span>Logout</span>
                                    </button>
                                </li>
                            ) : (
                                <>
                                    <li>
                                        <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-gray-50">
                                            <FontAwesomeIcon icon={faUser} className="text-gray-500 w-5" />
                                            <span>Sign In</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/signUp" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-gray-50">
                                            <FontAwesomeIcon icon={faUserPlus} className="text-gray-500 w-5" />
                                            <span>Sign Up</span>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </>}
        </>
    )
}