"use client";

import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";

import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import {
  isActiveLink,
} from "../../../utils/linkActiveChecker";
import { usePathname, useRouter } from "next/navigation";


const Index = () => {
  const router = useRouter();

  const menuItems = [
    {
      label: "Home",
      routePath: "/",
    },
    {
      label: "Find Jobs",
      routePath: "/job-listing",
    },
    {
      label: "Employers",
      routePath: "/employers-list",
    },
    {
      label: "Candidates",
      routePath: "/candidates-list",
    },
    {
      label: "Pages",
      items: [
        { name: "About", routePath: "/about" },
        { name: "Pricing", routePath: "/pricing" },
        { name: "FAQ's", routePath: "/faq" },
        { name: "Terms", routePath: "/terms" },
        { name: "Invoice", routePath: "/invoice" },
        { name: "Contact", routePath: "/contact" },
        { name: "404", routePath: "/404" },
        {
          name: "Shop",
          items: [
            { name: "Shop List", routePath: "/shop/shop-list" },
            { name: "Shop Single", routePath: "/shop/shop-single/1" },
            { name: "Cart", routePath: "/shop/cart" },
            { name: "Checkout", routePath: "/shop/checkout" },
            { name: "Order Completed", routePath: "/shop/order-completed" },
            { name: "Login", routePath: "/login" },
            { name: "Register", routePath: "/register" },
          ],
        },
      ],
    },
  ];

  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet"
      tabIndex="-1"
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      <SidebarHeader />
      {/* End pro-header */}

      <Sidebar>
        <Menu>
          {menuItems.map((item) => {
            // Direct link items (Home, Find Jobs, Employers, Candidates)
            if (!item.items) {
              return (
                <MenuItem
                  key={item.label}
                  onClick={() => router.push(item.routePath)}
                  className={
                    isActiveLink(item.routePath, usePathname())
                      ? "menu-active-link"
                      : ""
                  }
                >
                  {item.label}
                </MenuItem>
              );
            }

            // Submenu items (Pages)
            return (
              <SubMenu
                label={item.label}
                key={item.label}
              >
                {item.items.map((menuItem, i) => {
                  // Pages sub-items
                  if (!menuItem.items) {
                    return (
                      <MenuItem
                        key={i}
                        onClick={() => router.push(menuItem.routePath)}
                        className={
                          isActiveLink(menuItem.routePath, usePathname())
                            ? "menu-active-link"
                            : ""
                        }
                      >
                        {menuItem.name}
                      </MenuItem>
                    );
                  }

                  // Shop submenu
                  return (
                    <SubMenu label={menuItem.name} key={i}>
                      {menuItem.items.map((shopItem, j) => (
                        <MenuItem
                          key={j}
                          onClick={() => router.push(shopItem.routePath)}
                          className={
                            isActiveLink(shopItem.routePath, usePathname())
                              ? "menu-active-link"
                              : ""
                          }
                        >
                          {shopItem.name}
                        </MenuItem>
                      ))}
                    </SubMenu>
                  );
                })}
              </SubMenu>
            );
          })}
        </Menu>
      </Sidebar>

      <SidebarFooter />
    </div>
  );
};

export default Index;