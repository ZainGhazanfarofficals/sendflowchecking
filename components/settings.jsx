import React from "react";
import { checkout } from "./CheckoutForm";
function Settings() {
  return (
    <div class="bg-white">
      <div class="container px-6 py-8 mx-auto">
        <h1 class="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
          Pricing Plan
        </h1>

        <p class="max-w-2xl mx-auto mt-4 text-center text-gray-500 xl:mt-6">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias quas
          magni libero consequuntur voluptatum velit amet id repudiandae ea,
          deleniti laborum in neque eveniet.
        </p>

        <div class="grid grid-cols-1 gap-8 mt-6 xl:mt-12 xl:gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div class="w-full p-8 space-y-8 text-center border border-gray-200 rounded-lg ">
            <p class="font-medium text-gray-500 uppercase ">Free</p>

            <h2 class="text-4xl font-semibold text-gray-800 uppercase ">$0</h2>

            <p class="font-medium text-gray-500 ">Life time</p>
          </div>

          <div class="w-full p-8 space-y-8 text-center bg-blue-600 rounded-lg">
            <p class="font-medium text-gray-200 uppercase">Premium</p>

            <h2 class="text-5xl font-bold text-white uppercase ">$20</h2>

            <p class="font-medium text-gray-200">Per month</p>
            <button
              className="w-full px-4 py-2 mt-10 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80"
              onClick={() => {
                checkout({
                  lineItems: [
                    { price: "price_1NnHAfELqXvkIUV6RRW6SpgU", quantity: 1 },
                  ],
                });
              }}
            >
              Start Now
            </button>
          </div>

          <div class="w-full p-8 space-y-8 text-center border border-gray-200 rounded-lg ">
            <p class="font-medium text-gray-500 uppercase ">Enterprise</p>

            <h2 class="text-4xl font-semibold text-gray-800 uppercase ">$40</h2>

            <p class="font-medium text-gray-500 ">per month</p>
            <button
              className="w-full px-4 py-2 mt-10 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80"
              onClick={() => {
                checkout({
                  lineItems: [
                    { price: "price_1NnGhtELqXvkIUV6xk1MKQ7T", quantity: 1 },
                  ],
                });
              }}
            >
              Start Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
