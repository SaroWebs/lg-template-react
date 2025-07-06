import { Drawer, Button } from "@mantine/core";
import { motion } from "framer-motion";
import { useCart } from "react-use-cart";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const MiniCartDrawer = ({ opened, onClose }) => {
  const { isEmpty, items, cartTotal, removeItem } = useCart();

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Your Cart"
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
        {isEmpty ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-3"
              >
                <div>
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-700">
                    ₹{item.itemTotal?.toFixed(2) || (item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            <div className="flex justify-between items-center pt-4 border-t font-semibold">
              <span>Total:</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>

            <Link to="/checkout">
              <Button fullWidth variant="filled" onClick={onClose}>
                Go to Checkout
              </Button>
            </Link>
          </div>
        )}
      </motion.div>
    </Drawer>
  );
};

export default MiniCartDrawer;
