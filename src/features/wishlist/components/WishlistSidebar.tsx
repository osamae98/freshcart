'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faLock, faGlobe, faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import Link from "next/link";

interface WishlistInfo {
    name: string;
    count: number;
}

export default function WishlistSidebar() {
    const [wishlistName, setWishlistName] = useState('');
    const [privacy, setPrivacy] = useState<'public' | 'private'>('private');
    const [copied, setCopied] = useState(false);

    // Mock wishlists for UI display
    const myWishlists: WishlistInfo[] = [
        { name: 'Default Wishlist', count: 12 },
        { name: 'Birthday Ideas', count: 8 },
        { name: 'Weekly Groceries', count: 15 },
    ];

    const handleCreateWishlist = () => {
        if (!wishlistName.trim()) return;
        // Placeholder for create wishlist functionality
        setWishlistName('');
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText('https://freshcart.com/wishlist/shared');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            {/* Create New Wishlist */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Create New Wishlist</h3>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="wishlist-name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Wishlist Name
                        </label>
                        <input
                            type="text"
                            id="wishlist-name"
                            value={wishlistName}
                            onChange={(e) => setWishlistName(e.target.value)}
                            placeholder="e.g., Holiday Shopping"
                            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Privacy</p>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                                <input
                                    type="radio"
                                    name="privacy"
                                    value="public"
                                    checked={privacy === 'public'}
                                    onChange={() => setPrivacy('public')}
                                    className="accent-primary-600"
                                />
                                <FontAwesomeIcon icon={faGlobe} className="text-gray-400 text-xs" />
                                Public
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                                <input
                                    type="radio"
                                    name="privacy"
                                    value="private"
                                    checked={privacy === 'private'}
                                    onChange={() => setPrivacy('private')}
                                    className="accent-primary-600"
                                />
                                <FontAwesomeIcon icon={faLock} className="text-gray-400 text-xs" />
                                Private
                            </label>
                        </div>
                    </div>

                    <button
                        onClick={handleCreateWishlist}
                        className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Create Wishlist
                    </button>
                </div>
            </div>

            {/* My Wishlists */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">My Wishlists</h3>
                <div className="space-y-3">
                    {myWishlists.map((list, index) => (
                        <div key={index} className="flex items-center justify-between group">
                            <div>
                                <p className="text-sm font-bold text-gray-800 group-hover:text-primary-600 transition-colors">{list.name}</p>
                                <p className="text-xs text-gray-400">{list.count} items</p>
                            </div>
                            <Link
                                href="/wishlist"
                                className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                            >
                                View
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Share Your Wishlist */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Share Your Wishlist</h3>
                <p className="text-xs text-gray-500 mb-4">
                    Share your wishlist with friends and family
                </p>

                <div className="flex gap-2 mb-3">
                    <a
                        href="https://www.facebook.com/sharer/sharer.php"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors"
                    >
                        <FontAwesomeIcon icon={faFacebook} />
                        Facebook
                    </a>
                    <a
                        href="https://twitter.com/intent/tweet"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#1DA1F2] hover:bg-[#1A94DA] text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors"
                    >
                        <FontAwesomeIcon icon={faTwitter} />
                        Twitter
                    </a>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        readOnly
                        value="https://freshcart.com/wi..."
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-500 bg-gray-50"
                    />
                    <button
                        onClick={handleCopyLink}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1.5"
                    >
                        <FontAwesomeIcon icon={copied ? faCheck : faCopy} className={copied ? 'text-primary-600' : ''} />
                        {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                </div>
            </div>
        </div>
    );
}
