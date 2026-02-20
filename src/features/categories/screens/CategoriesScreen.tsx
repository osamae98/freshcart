import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronRight, faCheck, faLeaf, faCheese, faBreadSlice, faFish, faDrumstickBite, faWineBottle } from "@fortawesome/free-solid-svg-icons";
import { getAllCategories } from "../server/categories.actions";
import { Category } from "../types/Category.types";
import NewsLetter from "@/features/home/components/NewsLetter";

// Tags for category cards (deterministic based on index)
const categoryTags: string[][] = [
    ["Organic", "Fresh", "Local"],
    ["Organic", "Farm Fresh"],
    ["Artisan", "Fresh Baked"],
    ["Premium", "Fresh", "Wild Caught"],
    ["Organic", "Natural"],
    ["Eco-Friendly", "Natural"],
];

// Icons for popular subcategories
const popularSubcategories = [
    { name: "Fresh Fruits", icon: faLeaf, count: 42, color: "text-green-500", bg: "bg-green-50" },
    { name: "Fresh Vegetables", icon: faLeaf, count: 38, color: "text-emerald-500", bg: "bg-emerald-50" },
    { name: "Cheese", icon: faCheese, count: 24, color: "text-yellow-500", bg: "bg-yellow-50" },
    { name: "Bread", icon: faBreadSlice, count: 18, color: "text-amber-600", bg: "bg-amber-50" },
    { name: "Seafood", icon: faFish, count: 16, color: "text-blue-500", bg: "bg-blue-50" },
    { name: "Juices", icon: faWineBottle, count: 22, color: "text-orange-500", bg: "bg-orange-50" },
];

// Seasonal categories mock data
const seasonalCategories = [
    { name: "Summer Fruits", items: 28, image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=600" },
    { name: "Fall Harvest", items: 32, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600" },
    { name: "Holiday Baking", items: 24, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600" },
];

function CategoryCard({ category, index }: { category: Category; index: number }) {
    const tags = categoryTags[index % categoryTags.length];
    const itemCount = (category.name.length * 7 + index * 13) % 80 + 20; // deterministic item count

    return (
        <Link
            href={`/categories/${category._id}`}
            className="group relative rounded-2xl overflow-hidden h-52 block"
        >
            <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-lg mb-0.5">{category.name}</h3>
                <span className="text-white/70 text-sm">{itemCount} items</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex gap-1.5 mt-8">
                    {tags.map((tag, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-primary-600 transition-colors mt-8">
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </div>
            </div>
        </Link>
    );
}

export default async function CategoriesScreen() {
    let categories: Category[] = [];
    try {
        const response = await getAllCategories();
        categories = response.data;
    } catch {
        // API temporarily unavailable
    }

    return (
        <div className="pb-20">
            {/* Breadcrumb */}
            <div className="container pt-6 pb-2">
                <nav className="flex items-center gap-2 text-sm text-gray-500">
                    <Link href="/" className="hover:text-primary-600">Home</Link>
                    <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
                    <span className="text-gray-900 font-semibold">Categories</span>
                </nav>
            </div>

            <div className="container">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop by Categories</h1>
                        <p className="text-gray-500">Browse our wide selection of fresh products by category</p>
                    </div>
                    <div className="flex items-center gap-3 mt-4 md:mt-0">
                        <span className="text-sm text-gray-500">Sort by:</span>
                        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:border-primary-500">
                            <option>Featured</option>
                            <option>Name A-Z</option>
                            <option>Name Z-A</option>
                            <option>Most Items</option>
                        </select>
                        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                            <button className="w-9 h-9 flex items-center justify-center bg-primary-600 text-white">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><rect x="0" y="0" width="7" height="7" rx="1"/><rect x="9" y="0" width="7" height="7" rx="1"/><rect x="0" y="9" width="7" height="7" rx="1"/><rect x="9" y="9" width="7" height="7" rx="1"/></svg>
                            </button>
                            <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-600">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><rect x="0" y="0" width="16" height="3" rx="1"/><rect x="0" y="6.5" width="16" height="3" rx="1"/><rect x="0" y="13" width="16" height="3" rx="1"/></svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Category Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
                    {categories.map((category, index) => (
                        <CategoryCard key={category._id} category={category} index={index} />
                    ))}
                </div>

                {/* Popular Subcategories */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Subcategories</h2>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        {popularSubcategories.map((sub, i) => (
                            <Link
                                key={i}
                                href="/categories"
                                className="flex flex-col items-center text-center p-4 rounded-2xl hover:shadow-md transition-shadow group"
                            >
                                <div className={`w-16 h-16 ${sub.bg} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                    <FontAwesomeIcon icon={sub.icon} className={`${sub.color} text-xl`} />
                                </div>
                                <h3 className="text-sm font-bold text-gray-900 mb-0.5">{sub.name}</h3>
                                <span className="text-xs text-gray-400">{sub.count} items</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Featured Category Banner */}
                <section className="mb-16">
                    <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-primary-50">
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <span className="text-primary-600 font-semibold text-sm mb-2">Featured Category</span>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Organic Fruits &amp; Vegetables</h2>
                            <p className="text-gray-600 mb-6">
                                Discover our wide range of certified organic produce, sourced from
                                local farms and delivered fresh to your doorstep.
                            </p>
                            <ul className="space-y-2.5 mb-8">
                                <li className="flex items-center gap-2 text-gray-700">
                                    <FontAwesomeIcon icon={faCheck} className="text-primary-600 text-sm" />
                                    <span className="text-sm font-medium">100% Certified Organic</span>
                                </li>
                                <li className="flex items-center gap-2 text-gray-700">
                                    <FontAwesomeIcon icon={faCheck} className="text-primary-600 text-sm" />
                                    <span className="text-sm font-medium">Locally Sourced When Available</span>
                                </li>
                                <li className="flex items-center gap-2 text-gray-700">
                                    <FontAwesomeIcon icon={faCheck} className="text-primary-600 text-sm" />
                                    <span className="text-sm font-medium">No Pesticides or Harmful Chemicals</span>
                                </li>
                            </ul>
                            <div>
                                <Link
                                    href="/featured"
                                    className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                                >
                                    Explore Category
                                </Link>
                            </div>
                        </div>
                        <div className="relative min-h-[300px]">
                            <Image
                                src="/organic_produce.png"
                                alt="Organic Fruits & Vegetables"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Seasonal Categories */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Seasonal Categories</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {seasonalCategories.map((cat, i) => (
                            <Link
                                key={i}
                                href="/categories"
                                className="group relative rounded-2xl overflow-hidden h-56 block"
                            >
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="text-[10px] font-bold bg-primary-600 text-white px-2.5 py-1 rounded-full uppercase tracking-wide mb-2 inline-block">
                                        Limited Time
                                    </span>
                                    <h3 className="text-white font-bold text-lg">{cat.name}</h3>
                                    <span className="text-white/70 text-sm">{cat.items} items</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Newsletter */}
                <NewsLetter />
            </div>
        </div>
    );
}
