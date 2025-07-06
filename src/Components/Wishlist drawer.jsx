import { Drawer, Button } from "@mantine/core";
import { motion } from "framer-motion";
import { useWishlist } from "@/hooks/useWishlist"; // custom hook you define
import { HeartOff } from "lucide-react";
import { Link } from "react-router-dom";

const WishlistDrawer = ({ opened, onClose }) => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Your Wishlist"
      position="right"
      size="md"
      padding="md"
      overlayProps={{ opacity: 0.4, blur: 2 }}
      withCloseButton={false}
    >
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
      >
        {wishlist.length === 0 ? (
          <p className="text-center text-gray-600">Your wishlist is empty.</p>
        ) : (
          <div className="space-y-4">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-3"
              >
                <div>
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-sm text-gray-500">₹{item.price}</p>
                </div>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-pink-500 hover:text-pink-700"
                >
                  <HeartOff size={18} />
                </button>
              </div>
            ))}

            <Link to="/wishlist">
              <Button fullWidth variant="outline" onClick={onClose}>
                View Full Wishlist
              </Button>
            </Link>
          </div>
        )}
      </motion.div>
    </Drawer>
  );
};

export default WishlistDrawer;
