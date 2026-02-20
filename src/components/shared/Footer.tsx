import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faPinterestP,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Image from "next/image";
import freshcartLogo from "../../assets/images/freshcart-logo.svg";
import miniLogo from "../../assets/images/mini-logo.png";

export default function Footer() {
  return (
    <>
    <footer className="py-5 bg-white border-t border-gray-400/20">
<div className="container">
  <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6 py-8">
        <div className="xl:col-span-2 space-y-3 ">
          <Image src={freshcartLogo} alt="Footer Logo" />
          <p>
            FreshCart is a versatile e-commerce platform offering a wide range
            of products, from clothing to electronics. It provides a
            user-friendly experience for seamless shopping across diverse
            categories.
          </p>

          <ul className="flex items-center gap-4 *:text-gray-500 text-lg *:hover:text-primary-600 *:transition-colors *:duration-200">
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faPinterestP} />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <ul className="space-y-3 *:hover:text-primary-600 *:transition-colors *:duration-200">
            <li>
              <Link href={``}>men&apos;s Fashion</Link>
            </li>
            <li>
              <Link href={``}>women&apos;s Fashion</Link>
            </li>
            <li>
              <Link href={``}>Baby & Toys</Link>
            </li>
            <li>
              <Link href={``}>beauty & health</Link>
            </li>
            <li>
              <Link href={``}>Electronics</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-3 *:hover:text-primary-600 *:transition-colors *:duration-200">
            <li>
              <Link href={`/about`}>About Us</Link>
            </li>
            <li>
              <Link href={`/contact`}>Contact Us</Link>
            </li>
            <li>
              <Link href={`/privacy-policy`}>Privacy Policy</Link>
            </li>
            <li>
              <Link href={`/terms`}>Terms of Service</Link>
            </li>
            <li>
              <Link href={`/shipping-policy`}>Shipping Policy</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Customer Service</h2>
          <ul className="space-y-3 *:hover:text-primary-600 *:transition-colors *:duration-200">
            <li>
              <Link href={`/profile`}>My Account</Link>
            </li>
            <li>
              <Link href={`/orders`}>My Orders</Link>
            </li>
            <li>
              <Link href={`/wishlist`}>Wishlist</Link>
            </li>
            <li>
              <Link href={`/returns-and-refunds`}>Returns & Refunds</Link>
            </li>
            <li>
              <Link href={`/help-center`}>Help Center</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center py-5 border-t border-gray-400/20 ">
        <p>&copy; {new Date().getFullYear()} FreshCart. All rights reserved.</p>
        <Image src={miniLogo} className="w-8" alt="Mini Logo" />
      </div>
</div>
    </footer>

    </>
  );
}
