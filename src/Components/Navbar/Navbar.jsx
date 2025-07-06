import { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer } from "@mantine/core";
import { Menu, ShoppingCart, Heart, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import MiniCartDrawer from "../cart/MiniCartDrawer";
import WishlistDrawer from "../wishlist/WishlistDrawer";

const categories = [
  {
    id: 1,
    name: "Mekhela Sador",
    slug: "mekhela-sador",
    children: [
      { id: 2, name: "Bridal Mekhela", slug: "bridal-mekhela" },
      { id: 3, name: "Kesapaat", slug: "kesapaat" },
      { id: 4, name: "Paat Silk", slug: "paat-silk" }
    ]
  },
  {
    id: 5,
    name: "Women",
    slug: "women",
    children: []
  }
];

const dropdownVariants = {
  hidden: { opacity: 0, y: 10, pointerEvents: "none" },
  visible: {
    opacity: 1,
    y: 0,
    pointerEvents: "auto",
    transition: { duration: 0.25, ease: "easeOut" }
  },
  exit: { opacity: 0, y: 10, pointerEvents: "none", transition: { duration: 0.15 } }
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <>
      <header className="w-full bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
              <Menu />
            </button>
            <Link to="/" className="text-2xl font-bold tracking-wide">
              Label Gayatri
            </Link>
          </div>

          {/* Center */}
          <nav className="hidden lg:flex gap-6 items-center relative">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="relative"
                onMouseEnter={() => setHoveredCategory(cat)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <button className="text-sm font-semibold tracking-wide uppercase hover:text-gray-700">
                  {cat.name}
                </button>

                <AnimatePresence>
                  {cat.children.length > 0 &&
                    hoveredCategory?.id === cat.id && (
                      <motion.div
                        key="mega-menu"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-full left-0 mt-2 w-[600px] bg-white border shadow-xl p-6 grid grid-cols-2 gap-4 z-50 rounded-xl"
                      >
                        {cat.children.map((sub) => (
                          <Link
                            key={sub.id}
                            to={`/category/${sub.slug}`}
                            className="text-gray-700 hover:text-black flex justify-between items-center transition-colors"
                          >
                            {sub.name}
                            <ChevronRight size={16} />
                          </Link>
                        ))}
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button onClick={() => setWishOpen(true)}>
              <Heart />
            </button>
            <button onClick={() => setCartOpen(true)}>
              <ShoppingCart />
            </button>
          </div>
        </div>

        {/* Mobile Drawer with motion */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 bg-white z-[999] w-3/4 p-6 shadow-lg lg:hidden"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button onClick={() => setMobileOpen(false)}>✕</button>
              </div>
              <div className="space-y-4">
                {categories.map((cat) => (
                  <div key={cat.id}>
                    <p className="font-semibold text-gray-800">{cat.name}</p>
                    <div className="ml-4 space-y-1">
                      {cat.children.map((sub) => (
                        <Link
                          key={sub.id}
                          to={`/category/${sub.slug}`}
                          className="block text-gray-600"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Drawers */}
      <MiniCartDrawer opened={cartOpen} onClose={() => setCartOpen(false)} />
      <WishlistDrawer opened={wishOpen} onClose={() => setWishOpen(false)} />
    </>
  );
};

export default Navbar;
