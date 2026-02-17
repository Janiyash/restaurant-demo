import React, { useState } from "react";
const Button = ({ children, className="", ...props }) => (
  <button
    className={`px-4 py-2 rounded-xl font-medium ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className="" }) => (
  <div className={`rounded-3xl ${className}`}>{children}</div>
);

const CardContent = ({ children, className="" }) => (
  <div className={className}>{children}</div>
);

import { motion } from "framer-motion";
import { Star, ShoppingCart, Phone, MapPin, X } from "lucide-react";

export default function RestaurantDemo() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const menu = [
    { id: 1, name: "Margherita Pizza", price: 299, img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092" },
    { id: 2, name: "Pasta Alfredo", price: 349, img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9" },
    { id: 3, name: "Veg Burger", price: 199, img: "https://images.unsplash.com/photo-1550547660-d9450f859349" },
    { id: 4, name: "Cold Coffee", price: 149, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },
  ];

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
    setCartOpen(true);
  };

  const total = cartItems.reduce((sum, i) => sum + i.price, 0);

  const handleCheckout = () => {
    setCartOpen(false);
    setSuccess(true);
    setCartItems([]);
  };

  const handleBooking = () => {
    setBookingOpen(false);
    setBookingSuccess(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">

      {/* ORDER SUCCESS */}
      {success && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-neutral-900 w-[420px] p-8 rounded-3xl text-center border border-white/10">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center text-3xl">✓</div>
            <h2 className="text-2xl font-bold mt-4">Order Placed Successfully</h2>
            <p className="text-white/60 mt-2">Demo checkout completed.</p>
            <Button className="bg-orange-500 w-full mt-6" onClick={()=>setSuccess(false)}>Close</Button>
          </div>
        </div>
      )}

      {/* BOOKING SUCCESS */}
      {bookingSuccess && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-neutral-900 w-[450px] p-8 rounded-3xl text-center border border-white/10">
            <h2 className="text-2xl font-bold">Table Reserved 🍽️</h2>
            <p className="text-white/60 mt-2">Booking confirmed (demo).</p>
            <Button className="bg-orange-500 w-full mt-6" onClick={()=>setBookingSuccess(false)}>Close</Button>
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      {bookingOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-neutral-900 w-[600px] p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6">Book a Table</h2>

            <div className="grid grid-cols-2 gap-4">
              <input className="p-3 bg-black/30 rounded-xl" placeholder="Full Name" />
              <input className="p-3 bg-black/30 rounded-xl" placeholder="Phone" />
              <input className="p-3 bg-black/30 rounded-xl" placeholder="Email" />
              <input type="date" className="p-3 bg-black/30 rounded-xl" />
              <input type="time" className="p-3 bg-black/30 rounded-xl" />
              <select className="p-3 bg-black/30 rounded-xl">
                <option>Guests</option>
                <option>1-2</option>
                <option>3-4</option>
                <option>5-8</option>
                <option>10+</option>
              </select>
              <select className="p-3 bg-black/30 rounded-xl">
                <option>Seating Preference</option>
                <option>Indoor</option>
                <option>Outdoor</option>
                <option>Window</option>
              </select>
              <select className="p-3 bg-black/30 rounded-xl">
                <option>Occasion</option>
                <option>Birthday</option>
                <option>Date Night</option>
                <option>Business</option>
              </select>
            </div>

            <textarea className="w-full mt-4 p-3 bg-black/30 rounded-xl" placeholder="Special Request"></textarea>

            <div className="flex gap-3 mt-6">
              <Button className="bg-orange-500 flex-1" onClick={handleBooking}>Confirm Booking</Button>
              <Button className="bg-white/10 flex-1" onClick={()=>setBookingOpen(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-white/10 sticky top-0 bg-neutral-950/90">
        <h1 className="text-2xl font-bold">🍽️ RoyalBite</h1>
        <div className="flex gap-6 items-center">
          <a href="#menu">Menu</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <Button onClick={() => setCartOpen(true)} className="bg-orange-500 rounded-2xl">
            Cart ({cartItems.length})
          </Button>
        </div>
      </nav>

      {/* HERO */}
      <section className="grid md:grid-cols-2 items-center px-10 py-24 gap-10">
        <div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl font-bold">
            Premium Restaurant Website
          </motion.h2>
          <p className="mt-6 text-white/70 max-w-xl">
            High-converting modern restaurant site with ordering, booking and premium UI.
          </p>
          <div className="flex gap-4 mt-8">
            <Button className="bg-orange-500">View Menu</Button>
            <Button className="bg-white/10" onClick={()=>setBookingOpen(true)}>Book Table</Button>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" className="rounded-3xl shadow-2xl" />
      </section>

      {/* MENU */}
      <section id="menu" className="px-10 py-20">
        <h3 className="text-4xl font-bold mb-12">Popular Dishes</h3>
        <div className="grid md:grid-cols-4 gap-8">
          {menu.map((item) => (
            <Card key={item.id} className="bg-white/5 border-white/10 rounded-3xl overflow-hidden">
              <img src={item.img} className="h-48 w-full object-cover" />
              <CardContent className="p-5">
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <div className="flex justify-between mt-3">
                  <span className="text-orange-400">₹{item.price}</span>
                  <Button onClick={() => addToCart(item)} className="bg-orange-500 rounded-xl">
                    <ShoppingCart size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-10 py-20 bg-white/5">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5" className="rounded-3xl" />
          <div>
            <h3 className="text-4xl font-bold">About RoyalBite</h3>
            <p className="mt-4 text-white/70">
              RoyalBite is a premium demo restaurant created to showcase modern web design,
              online ordering systems, and scalable restaurant websites for real clients.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-10 py-20">
        <h3 className="text-4xl font-bold mb-8">Contact Us</h3>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <Card className="bg-white/5 p-6 rounded-3xl"><Phone /><p className="mt-2">+91 98765 43210</p></Card>
            <Card className="bg-white/5 p-6 rounded-3xl"><MapPin /><p className="mt-2">Vadodara, Gujarat</p></Card>
            <Card className="bg-white/5 p-6 rounded-3xl"><Star /><p className="mt-2">Open 10AM – 11PM</p></Card>
          </div>

          <div className="bg-white/5 p-6 rounded-3xl">
            <h4 className="text-xl font-semibold mb-4">Send Message</h4>
            <input className="w-full mb-3 p-3 bg-black/30 rounded-xl" placeholder="Your Name"/>
            <input className="w-full mb-3 p-3 bg-black/30 rounded-xl" placeholder="Email"/>
            <textarea className="w-full mb-3 p-3 bg-black/30 rounded-xl" placeholder="Message"/>
            <Button className="bg-orange-500 w-full">Send Message</Button>
          </div>
        </div>
      </section>

      {/* CART */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end">
          <div className="w-[400px] bg-neutral-900 h-full p-6">
            <div className="flex justify-between mb-6">
              <h3 className="text-2xl font-bold">Your Cart</h3>
              <X onClick={()=>setCartOpen(false)} />
            </div>

            {cartItems.map((item,i)=>(
              <div key={i} className="flex justify-between mb-2">
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </div>
            ))}

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <Button className="bg-orange-500 w-full mt-4" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}

      <footer className="text-center py-10 border-t border-white/10 text-white/60">
        Premium demo for clients • Built by Yash
      </footer>
    </div>
  );
}
