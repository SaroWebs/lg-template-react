import { Select } from '@mantine/core';
import { Globe, IndianRupee, Languages } from 'lucide-react';

const TopNav = () => {
  return (
    <div className="bg-gray-100 border-b text-sm text-gray-700 py-1 px-4 flex justify-between items-center">
      {/* Left: Note */}
      <div className="hidden sm:block">
        <span className="tracking-wide font-medium">
          Free Shipping on Orders Over ₹1500
        </span>
      </div>

      {/* Right: Selectors */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center gap-1">
          <IndianRupee size={14} />
          <Select
            size="xs"
            variant="unstyled"
            data={['INR', 'USD', 'EUR']}
            defaultValue="INR"
          />
        </div>

        <div className="flex items-center gap-1">
          <Languages size={14} />
          <Select
            size="xs"
            variant="unstyled"
            data={['EN', 'हिन्दी']}
            defaultValue="EN"
          />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
