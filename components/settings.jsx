import React from "react";
import { checkout } from "./CheckoutForm";

function Settings() {
  return (
    <div>
      <div>
        <h1>Pricing Plan</h1>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias quas
          magni libero consequuntur voluptatum velit amet id repudiandae ea,
          deleniti laborum in neque eveniet.
        </p>

        <div>
          <div>
            <p>Free</p>

            <h2>$0</h2>

            <p>Life time</p>
          </div>

          <div>
            <p>Premium</p>

            <h2>$20</h2>

            <p>Per month</p>

            <button
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

          <div>
            <p>Enterprise</p>

            <h2>$40</h2>

            <p>per month</p>

            <button
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
