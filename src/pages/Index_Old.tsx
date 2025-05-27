// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useApp } from "@/context/AppContext";
// import ProductCard from "@/components/ProductCard";
// import {
//   ArrowRight,
//   Star,
//   Users,
//   Award,
//   Truck,
//   ChevronDown,
//   Shield,
//   RefreshCw,
//   Heart,
//   Quote,
// } from "lucide-react";

// const Index = () => {
//   const { state } = useApp();
//   const [visibleElements, setVisibleElements] = useState<Set<number>>(
//     new Set()
//   );
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const index = parseInt(
//               entry.target.getAttribute("data-index") || "0"
//             );
//             setVisibleElements((prev) => new Set([...prev, index]));
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     const elements = document.querySelectorAll(".animate-on-scroll");
//     elements.forEach((el) => observer.observe(el));

//     return () => observer.disconnect();
//   }, []);

//   const features = [
//     {
//       icon: Award,
//       title: "Premium Quality",
//       description:
//         "Crafted from the finest materials for lasting comfort and style.",
//     },
//     {
//       icon: Truck,
//       title: "Free Shipping",
//       description: "Complimentary shipping on all orders over $50.",
//     },
//     {
//       icon: Users,
//       title: "Expert Support",
//       description: "24/7 customer service to assist with your needs.",
//     },
//     {
//       icon: Star,
//       title: "Satisfaction Guaranteed",
//       description: "30-day returns for complete peace of mind.",
//     },
//   ];

//   const testimonials = [
//     {
//       name: "Sarah Johnson",
//       role: "Fashion Blogger",
//       content:
//         "Twenty 1 has completely transformed my wardrobe. The quality is exceptional and the minimalist designs are exactly what I was looking for.",
//       rating: 5,
//     },
//     {
//       name: "Michael Chen",
//       role: "Creative Director",
//       content:
//         "The attention to detail in every piece is remarkable. These are not just clothes, they are investments in timeless style.",
//       rating: 5,
//     },
//     {
//       name: "Emma Rodriguez",
//       role: "Entrepreneur",
//       content:
//         "From the fabric quality to the perfect fit, Twenty 1 delivers on every promise. My go-to brand for professional attire.",
//       rating: 5,
//     },
//   ];

//   const stats = [
//     { number: "50K+", label: "Happy Customers" },
//     { number: "99%", label: "Satisfaction Rate" },
//     { number: "24/7", label: "Customer Support" },
//     { number: "30 Days", label: "Return Policy" },
//   ];

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section with 3D Parallax Effect */}
//       <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white_smoke to-isabelline dark:from-eerie_black dark:to-raisin_black">
//         {/* 3D Background Elements */}
//         <div
//           className="absolute inset-0 opacity-50"
//           style={{
//             transform: `translateZ(${scrollY * 0.5}px) rotateX(${
//               scrollY * 0.05
//             }deg)`,
//             transformStyle: "preserve-3d",
//           }}
//         >
//           <div
//             className="absolute top-1/4 left-1/4 w-32 h-32 bg-raisin_black dark:bg-white_smoke rounded-full blur-sm"
//             style={{ transform: `translateZ(${scrollY * 0.3}px)` }}
//           />
//           <div
//             className="absolute top-3/4 right-1/4 w-24 h-24 bg-jet dark:bg-isabelline rounded-full blur-sm"
//             style={{ transform: `translateZ(${scrollY * 0.2}px)` }}
//           />
//           <div
//             className="absolute bottom-1/4 left-1/2 w-16 h-16 bg-eerie_black dark:bg-white_smoke rounded-full blur-sm"
//             style={{ transform: `translateZ(${scrollY * 0.4}px)` }}
//           />
//         </div>

//         <div className="absolute inset-0 bg-black/5 dark:bg-white/5" />

//         <div
//           className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
//           style={{
//             transform: `translateY(${scrollY * 0.3}px)`,
//             transformStyle: "preserve-3d",
//           }}
//         >
//           <h1
//             className={`text-6xl md:text-8xl font-light mb-6 transition-all duration-1000 ${
//               visibleElements.has(0)
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-8"
//             } text-raisin_black dark:text-white_smoke`}
//             data-index="0"
//             style={{
//               textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
//               transform: `rotateX(${scrollY * 0.02}deg) translateZ(50px)`,
//             }}
//           >
//             Twenty 1
//             <span className="block font-normal text-4xl md:text-6xl mt-4 text-jet dark:text-isabelline">
//               Fashion
//             </span>
//           </h1>

//           <p
//             className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
//               visibleElements.has(1)
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-8"
//             } text-eerie_black dark:text-white_smoke`}
//             data-index="1"
//             style={{ transform: `translateZ(30px)` }}
//           >
//             Discover our curated collection of premium clothing designed for the
//             modern minimalist.
//           </p>

//           <div
//             className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-600 ${
//               visibleElements.has(2)
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-8"
//             }`}
//             data-index="2"
//             style={{ transform: `translateZ(20px)` }}
//           >
//             <Link
//               to="/shop"
//               className="bg-raisin_black dark:bg-white_smoke text-white_smoke dark:text-raisin_black px-8 py-4 rounded-md font-medium hover:bg-eerie_black dark:hover:bg-isabelline transition-all duration-200 inline-flex items-center justify-center space-x-2 group transform hover:scale-105"
//             >
//               <span>Shop Collection</span>
//               <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
//             </Link>

//             <Link
//               to="/about"
//               className="border-2 border-raisin_black dark:border-white_smoke text-raisin_black dark:text-white_smoke px-8 py-4 rounded-md font-medium hover:bg-raisin_black hover:text-white_smoke dark:hover:bg-white_smoke dark:hover:text-raisin_black transition-all duration-200 transform hover:scale-105"
//             >
//               Learn More
//             </Link>
//           </div>
//         </div>

//         {/* Animated Scroll Indicator */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
//           <div className="animate-bounce">
//             <ChevronDown className="w-8 h-8 text-raisin_black dark:text-white_smoke animate-pulse" />
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section
//         className="py-16 bg-raisin_black dark:bg-white_smoke relative overflow-hidden"
//         style={{ transform: `translateY(${scrollY * 0.08}px)` }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <div
//                 key={index}
//                 className={`text-center animate-on-scroll transition-all duration-1000 ${
//                   visibleElements.has(20 + index)
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-8"
//                 }`}
//                 style={{
//                   transitionDelay: `${index * 150}ms`,
//                   transform: `rotateY(${scrollY * 0.01}deg)`,
//                 }}
//                 data-index={20 + index}
//               >
//                 <div className="text-3xl md:text-4xl font-bold text-white_smoke dark:text-raisin_black mb-2">
//                   {stat.number}
//                 </div>
//                 <div className="text-isabelline dark:text-jet text-sm md:text-base">
//                   {stat.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section
//         className="py-20 bg-white_smoke dark:bg-eerie_black relative overflow-hidden"
//         style={{ transform: `translateY(${scrollY * 0.1}px)` }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div
//             className={`text-center mb-16 animate-on-scroll transition-all duration-1000 ${
//               visibleElements.has(3)
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-8"
//             }`}
//             data-index="3"
//           >
//             <h2 className="text-5xl md:text-6xl font-light text-raisin_black dark:text-white_smoke mb-6">
//               Minimalist Excellence
//             </h2>
//             <p className="text-xl text-jet dark:text-isabelline max-w-3xl mx-auto leading-relaxed">
//               At Twenty 1, we believe in the power of simplicity. Our carefully
//               curated collection represents the perfect intersection of timeless
//               design, premium materials, and contemporary style. Each piece is
//               selected to enhance your wardrobe with versatile, high-quality
//               essentials that transcend seasonal trends.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
//             <div
//               className={`text-center animate-on-scroll transition-all duration-1000 ${
//                 visibleElements.has(24)
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-8"
//               }`}
//               data-index="24"
//             >
//               <div className="w-16 h-16 bg-raisin_black dark:bg-white_smoke rounded-full flex items-center justify-center mx-auto mb-6">
//                 <Shield className="h-8 w-8 text-white_smoke dark:text-raisin_black" />
//               </div>
//               <h3 className="text-xl font-semibold text-raisin_black dark:text-white_smoke mb-3">
//                 Quality Assurance
//               </h3>
//               <p className="text-jet dark:text-isabelline">
//                 Every piece undergoes rigorous quality checks to ensure it meets
//                 our high standards.
//               </p>
//             </div>

//             <div
//               className={`text-center animate-on-scroll transition-all duration-1000 ${
//                 visibleElements.has(25)
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-8"
//               }`}
//               data-index="25"
//               style={{ transitionDelay: "150ms" }}
//             >
//               <div className="w-16 h-16 bg-raisin_black dark:bg-white_smoke rounded-full flex items-center justify-center mx-auto mb-6">
//                 <RefreshCw className="h-8 w-8 text-white_smoke dark:text-raisin_black" />
//               </div>
//               <h3 className="text-xl font-semibold text-raisin_black dark:text-white_smoke mb-3">
//                 Sustainable Fashion
//               </h3>
//               <p className="text-jet dark:text-isabelline">
//                 Committed to sustainable practices and ethical manufacturing
//                 processes.
//               </p>
//             </div>

//             <div
//               className={`text-center animate-on-scroll transition-all duration-1000 ${
//                 visibleElements.has(26)
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-8"
//               }`}
//               data-index="26"
//               style={{ transitionDelay: "300ms" }}
//             >
//               <div className="w-16 h-16 bg-raisin_black dark:bg-white_smoke rounded-full flex items-center justify-center mx-auto mb-6">
//                 <Heart className="h-8 w-8 text-white_smoke dark:text-raisin_black" />
//               </div>
//               <h3 className="text-xl font-semibold text-raisin_black dark:text-white_smoke mb-3">
//                 Made with Love
//               </h3>
//               <p className="text-jet dark:text-isabelline">
//                 Each garment is crafted with attention to detail and passion for
//                 excellence.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Products with 3D Cards */}
//       <section
//         className="py-20 bg-isabelline dark:bg-raisin_black relative"
//         style={{ transform: `translateY(${scrollY * 0.05}px)` }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div
//             className={`text-center mb-16 animate-on-scroll transition-all duration-1000 ${
//               visibleElements.has(4)
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-8"
//             }`}
//             data-index="4"
//           >
//             <h2 className="text-4xl md:text-5xl font-light text-raisin_black dark:text-white_smoke mb-4">
//               Featured Collection
//             </h2>
//             <p className="text-xl text-jet dark:text-isabelline max-w-2xl mx-auto">
//               Handpicked essentials that embody timeless style and
//               uncompromising quality.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {state.products.map((product, index) => (
//               <div
//                 key={product.id}
//                 className={`animate-on-scroll transition-all duration-1000 transform hover:scale-105 hover:rotate-1 ${
//                   visibleElements.has(5 + index)
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-8"
//                 }`}
//                 style={{
//                   transitionDelay: `${(index + 1) * 150}ms`,
//                   transformStyle: "preserve-3d",
//                 }}
//                 data-index={5 + index}
//               >
//                 <div style={{ transform: `rotateY(${scrollY * 0.01}deg)` }}>
//                   <ProductCard product={product} />
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div
//             className={`text-center mt-12 animate-on-scroll transition-all duration-1000 ${
//               visibleElements.has(9)
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-8"
//             }`}
//             data-index="9"
//           >
//             <Link
//               to="/shop"
//               className="inline-flex items-center space-x-2 text-raisin_black dark:text-white_smoke hover:text-jet dark:hover:text-isabelline transition-colors duration-200 group text-lg font-medium"
//             >
//               <span>View All Products</span>
//               <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section
//         className="py-20 bg-white_smoke dark:bg-eerie_black"
//         style={{ transform: `translateY(${scrollY * 0.03}px)` }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div
//             className={`text-center mb-16 animate-on-scroll transition-all duration-1000 ${
//               visibleElements.has(27)
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-8"
//             }`}
//             data-index="27"
//           >
//             <h2 className="text-4xl md:text-5xl font-light text-raisin_black dark:text-white_smoke mb-4">
//               What Our Customers Say
//             </h2>
//             <p className="text-xl text-jet dark:text-isabelline max-w-2xl mx-auto">
//               Real stories from people who love Twenty 1.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <div
//                 key={index}
//                 className={`bg-card p-8 rounded-lg shadow-sm animate-on-scroll transition-all duration-1000 transform hover:scale-105 ${
//                   visibleElements.has(28 + index)
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-8"
//                 }`}
//                 style={{
//                   transitionDelay: `${index * 150}ms`,
//                   transform: `rotateX(${scrollY * 0.005}deg)`,
//                 }}
//                 data-index={28 + index}
//               >
//                 <div className="flex items-center mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className="h-5 w-5 text-yellow-400 fill-current"
//                     />
//                   ))}
//                 </div>
//                 <Quote className="h-8 w-8 text-muted-foreground mb-4" />
//                 <p className="text-foreground mb-6 italic">
//                   "{testimonial.content}"
//                 </p>
//                 <div>
//                   <div className="font-semibold text-foreground">
//                     {testimonial.name}
//                   </div>
//                   <div className="text-sm text-muted-foreground">
//                     {testimonial.role}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section with 3D Icons */}
//       <section
//         className="py-20 bg-isabelline dark:bg-raisin_black"
//         style={{ transform: `translateY(${scrollY * 0.02}px)` }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div
//             className={`text-center mb-16 animate-on-scroll transition-all duration-1000 ${
//               visibleElements.has(10)
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-8"
//             }`}
//             data-index="10"
//           >
//             <h2 className="text-4xl md:text-5xl font-light text-raisin_black dark:text-white_smoke mb-4">
//               Why Choose Twenty 1
//             </h2>
//             <p className="text-xl text-jet dark:text-isabelline max-w-2xl mx-auto">
//               We're committed to providing an exceptional shopping experience.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className={`text-center animate-on-scroll transition-all duration-1000 transform hover:scale-105 ${
//                   visibleElements.has(11 + index)
//                     ? "opacity-100 translate-y-0"
//                     : "opacity-0 translate-y-8"
//                 }`}
//                 style={{
//                   transitionDelay: `${(index + 1) * 150}ms`,
//                   transformStyle: "preserve-3d",
//                 }}
//                 data-index={11 + index}
//               >
//                 <div
//                   className="inline-flex items-center justify-center w-16 h-16 bg-raisin_black dark:bg-white_smoke text-white_smoke dark:text-raisin_black rounded-full mb-6 transform hover:rotate-12 transition-transform duration-300"
//                   style={{ transform: `rotateX(${scrollY * 0.01}deg)` }}
//                 >
//                   <feature.icon className="h-8 w-8" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-raisin_black dark:text-white_smoke mb-3">
//                   {feature.title}
//                 </h3>
//                 <p className="text-jet dark:text-isabelline">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Newsletter Section */}
//       <section
//         className="py-20 bg-raisin_black dark:bg-white_smoke text-white_smoke dark:text-raisin_black relative overflow-hidden"
//         style={{ transform: `translateY(${scrollY * -0.05}px)` }}
//       >
//         <div className="absolute inset-0 opacity-100">
//           <div
//             className="absolute top-0 left-0 w-full h-full"
//             style={{
//               background:
//                 "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)",
//               transform: `translateX(${scrollY * 0.1}px)`,
//             }}
//           />
//         </div>

//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
//           <div
//             className={`animate-on-scroll transition-all duration-1000 ${
//               visibleElements.has(15)
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-8"
//             }`}
//             data-index="15"
//           >
//             <h2 className="text-4xl md:text-5xl font-light mb-4">
//               Stay Updated
//             </h2>
//             <p className="text-xl mb-8 opacity-90">
//               Subscribe to our newsletter for exclusive offers and style
//               updates.
//             </p>

//             <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="flex-1 px-4 py-3 rounded-md bg-white_smoke dark:bg-raisin_black text-raisin_black dark:text-white_smoke placeholder-jet dark:placeholder-isabelline focus:outline-none focus:ring-2 focus:ring-white_smoke dark:focus:ring-raisin_black border border-transparent"
//               />
//               <button className="bg-white_smoke dark:bg-raisin_black text-raisin_black dark:text-white_smoke px-6 py-3 rounded-md font-medium hover:bg-isabelline dark:hover:bg-jet transition-colors duration-200 transform hover:scale-105">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Index;
