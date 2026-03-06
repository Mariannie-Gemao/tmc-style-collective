
CREATE TABLE public.products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  discount INTEGER,
  rating NUMERIC DEFAULT 4.5,
  reviews INTEGER DEFAULT 0,
  sold INTEGER DEFAULT 0,
  image TEXT DEFAULT '',
  shop_url TEXT DEFAULT '',
  category TEXT,
  platform TEXT NOT NULL CHECK (platform IN ('tiktok', 'shopee', 'special')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Anyone can read products
CREATE POLICY "Products are publicly readable" ON public.products
  FOR SELECT TO anon, authenticated USING (true);

-- Only admins can modify products
CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;

-- Insert TikTok products
INSERT INTO public.products (name, price, original_price, discount, rating, reviews, sold, image, category, platform) VALUES
('Wireless Bluetooth Earbuds Pro', 599, 1299, 54, 4.8, 2345, 5000, '', 'electronics', 'tiktok'),
('Smart Watch Fitness Tracker', 899, 1999, 55, 4.7, 1890, 3200, '', 'electronics', 'tiktok'),
('LED Ring Light with Stand', 399, 799, 50, 4.6, 987, 2100, '', 'lighting', 'tiktok'),
('Cordless Power Drill 21V', 1899, 2999, 37, 4.7, 567, 1200, '', 'tools', 'tiktok'),
('Smart LED Ceiling Light', 1299, 2499, 48, 4.8, 890, 2100, '', 'lighting', 'tiktok'),
('Industrial Safety Helmet', 349, 699, 50, 4.5, 456, 3400, '', 'industrial', 'tiktok'),
('Ergonomic Office Chair', 3499, 5999, 42, 4.9, 1234, 800, '', 'furniture', 'tiktok'),
('Heavy Duty Door Hinge Set', 199, 399, 50, 4.6, 345, 5600, '', 'hardware', 'tiktok'),
('Kitchen Organizer Rack', 299, 599, 50, 4.5, 678, 4200, '', 'home-supplies', 'tiktok'),
('Stainless Steel Dish Rack', 449, 799, 44, 4.6, 432, 3100, '', 'home-supplies', 'tiktok'),
-- Shopee products
('Portable Power Bank 20000mAh', 499, 999, 50, 4.9, 4567, 8900, '', 'electronics', 'shopee'),
('Cement Mixer 50L', 2499, 3999, 38, 4.5, 234, 500, '', 'construction-materials', 'shopee'),
('Steel Reinforcement Bar Bundle', 1899, 2599, 27, 4.7, 189, 950, '', 'construction-materials', 'shopee'),
('Gaming RGB Keyboard Mechanical', 1299, 2499, 48, 4.9, 6789, 8900, '', 'electronics', 'shopee'),
('Standing Desk Adjustable', 4999, 7999, 38, 4.8, 567, 340, '', 'furniture', 'shopee'),
('Solar Flood Light 100W', 899, 1599, 44, 4.6, 1234, 4500, '', 'lighting', 'shopee'),
('Stainless Steel Bolt Set 200pcs', 299, 599, 50, 4.5, 890, 7800, '', 'hardware', 'shopee'),
('Industrial Air Compressor', 5999, 8999, 33, 4.8, 345, 120, '', 'industrial', 'shopee'),
('Bathroom Storage Cabinet', 1299, 2199, 41, 4.7, 567, 2300, '', 'home-supplies', 'shopee'),
('Laundry Basket Set 3pcs', 399, 699, 43, 4.4, 345, 5100, '', 'home-supplies', 'shopee');
