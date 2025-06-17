"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";

const AllProducts = () => {
  const { products } = useAppContext();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // جلب الكاتيجوريز من API
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/categories/list");
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
        <div className="flex flex-col items-end pt-12 w-full">
          <p className="text-2xl font-medium">All products</p>
          <div className="w-16 h-0.5 bg-orange-600 rounded-full mb-4"></div>

          {/* فلتر الكاتيجوري */}
          <div className="w-full flex justify-end mb-6">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="all">All Categories</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* عرض المنتجات */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-2 pb-14 w-full">
          {products
            .filter(
              (product) =>
                selectedCategory === "all" ||
                product.category === selectedCategory
            )
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
