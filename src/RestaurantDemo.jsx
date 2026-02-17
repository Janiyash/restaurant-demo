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

  const [contactSuccess, setContactSuccess] = useState(false);

  const [contact, setContact] = useState({
    name:"",
    email:"",
    message:""
  });

  const [booking, setBooking] = useState({
    name:"",
    phone:"",
    email:"",
    date:"",
    time:"",
    guests:""
  });

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

  // CONTACT SUBMIT
  const handleContactSubmit = () => {
    if(!contact.name || !contact.email || !contact.message){
      alert("Please fill all contact fields");
      return;
    }
    setContactSuccess(true);
    setContact({name:"",email:"",message:""});
  };

  // BOOKING SUBMIT
  const handleBooking = () => {
    if(!booking.name || !booking.phone || !booking.date || !booking.time){
      alert("Please fill booking details");
      return;
    }
    setBookingOpen(false);
    setBookingSuccess(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">

      {/* ORDER SUCCESS */}
      {success && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-neutral-900 w-[420px] p-8 rounded-3xl text-center border border-white/10">
            <h2 className="text-2xl font-bold">Order Confirmed</h2>
            <p className="text-white/60 mt-2">
              Thank you! This is a demo order.  
              Payment & kitchen integration can be added for real clients.
            </p>
            <Button className="bg-orange-500 w-full mt-6" onClick={()=>setSuccess(false)}>Close</Button>
          </div>
        </div>
      )}

      {/* CONTACT SUCCESS */}
      {contactSuccess && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-neutral-900 w-[420px] p-8 rounded-3xl text-center">
            <h2 className="text-2xl font-bold">Message Sent</h2>
            <p className="text-white/60 mt-2">
              Thank you for contacting RoyalBite.  
              This is a demo contact form for client preview.
            </p>
            <Button className="bg-orange-500 w-full mt-6" onClick={()=>setContactSuccess(false)}>Close</Button>
          </div>
        </div>
      )}

      {/* BOOKING SUCCESS */}
      {bookingSuccess && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-neutral-900 w-[450px] p-8 rounded-3xl text-center">
            <h2 className="text-2xl font-bold">Table Reserved</h2>
            <p className="text-white/60 mt-2">
              Your reservation request has been received.  
              This is a demo booking system for client presentation.
            </p>
            <Button className="bg-orange-500 w-full mt-6" onClick={()=>setBookingSuccess(false)}>Close</Button>
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      {bookingOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-neutral-900 w-[600px] p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6">Reserve a Table</h2>

            <div className="grid grid-cols-2 gap-4">
              <input className="p-3 bg-black/30 rounded-xl" placeholder="Full Name"
                value={booking.name}
                onChange={e=>setBooking({...booking,name:e.target.value})}
              />
              <input className="p-3 bg-black/30 rounded-xl" placeholder="Phone"
                value={booking.phone}
                onChange={e=>setBooking({...booking,phone:e.target.value})}
              />
              <input className="p-3 bg-black/30 rounded-xl" placeholder="Email"
                value={booking.email}
                onChange={e=>setBooking({...booking,email:e.target.value})}
              />
              <input type="date" className="p-3 bg-black/30 rounded-xl"
                onChange={e=>setBooking({...booking,date:e.target.value})}
              />
              <input type="time" className="p-3 bg-black/30 rounded-xl"
                onChange={e=>setBooking({...booking,time:e.target.value})}
              />
              <select className="p-3 bg-black/30 rounded-xl"
                onChange={e=>setBooking({...booking,guests:e.target.value})}>
                <option>Guests</option>
                <option>1-2</option>
                <option>3-4</option>
                <option>5-8</option>
                <option>10+</option>
              </select>
            </div>

            <textarea className="w-full mt-4 p-3 bg-black/30 rounded-xl"
              placeholder="Special Request (optional)"></textarea>

            <div className="flex gap-3 mt-6">
              <Button className="bg-orange-500 flex-1" onClick={handleBooking}>
                Confirm Reservation
              </Button>
              <Button className="bg-white/10 flex-1" onClick={()=>setBookingOpen(false)}>
                Cancel
              </Button>
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

      {/* CONTACT */}
      <section id="contact" className="px-10 py-20">
        <h3 className="text-4xl font-bold mb-8">Contact Us</h3>
        <div className="grid md:grid-cols-2 gap-10">

          <div className="space-y-4">
            <Card className="bg-white/5 p-6 rounded-3xl"><Phone /><p className="mt-2">+91 98765 43210</p></Card>
            <Card className="bg-white/5 p-6 rounded-3xl"><MapPin /><p className="mt-2">Vadodara</p></Card>
            <Card className="bg-white/5 p-6 rounded-3xl"><Star /><p className="mt-2">Open 10AM – 11PM</p></Card>
          </div>

          <div className="bg-white/5 p-6 rounded-3xl">
            <h4 className="text-xl font-semibold mb-4">Send Message</h4>
            <input className="w-full mb-3 p-3 bg-black/30 rounded-xl"
              placeholder="Your Name"
              value={contact.name}
              onChange={e=>setContact({...contact,name:e.target.value})}
            />
            <input className="w-full mb-3 p-3 bg-black/30 rounded-xl"
              placeholder="Email"
              value={contact.email}
              onChange={e=>setContact({...contact,email:e.target.value})}
            />
            <textarea className="w-full mb-3 p-3 bg-black/30 rounded-xl"
              placeholder="Message"
              value={contact.message}
              onChange={e=>setContact({...contact,message:e.target.value})}
            />
            <Button className="bg-orange-500 w-full" onClick={handleContactSubmit}>
              Send Message
            </Button>
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
