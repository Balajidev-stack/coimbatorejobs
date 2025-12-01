"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderNavContent = () => {
  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          {/* Home direct link */}
          <li className={usePathname() === "/" ? "current" : ""}>
            <Link href="/">Home</Link>
          </li>
          {/* End Home */}

          {/* Find Jobs direct link */}
          <li
            className={
              usePathname()?.startsWith("/job-list") ? "current" : ""
            }
          >
            <Link href="/job-list">Find Jobs</Link>
          </li>
          {/* End Find Jobs */}

          {/* Employers direct link */}
          <li
            className={
              usePathname()?.startsWith("/employers-list") ? "current" : ""
            }
          >
            <Link href="/employers-list">Employers</Link>
          </li>
          {/* End Employers */}

          {/* Candidates direct link */}
          <li
            className={
              usePathname()?.startsWith("/candidates-list") ? "current" : ""
            }
          >
            <Link href="/candidates-list">Candidates</Link>
          </li>
          {/* End Candidates */}

          {/* Pages dropdown */}
          <li className={`dropdown`}>
            <span>Pages</span>
            <ul>
              <li className="dropdown">
                <span>Shop</span>
                <ul>
                  <li>
                    <Link href="/shop/shop-list">Shop List</Link>
                  </li>
                  <li>
                    <Link href="/shop/shop-single/1">Shop Single</Link>
                  </li>
                  <li>
                    <Link href="/shop/cart">Cart</Link>
                  </li>
                  <li>
                    <Link href="/shop/checkout">Checkout</Link>
                  </li>
                  <li>
                    <Link href="/shop/order-completed">Order Completed</Link>
                  </li>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/register">Register</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/faq">FAQ's</Link>
              </li>
              <li>
                <Link href="/terms">Terms</Link>
              </li>
              <li>
                <Link href="/invoice">Invoice</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/404">404</Link>
              </li>
            </ul>
          </li>
          {/* End Pages menu items */}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
