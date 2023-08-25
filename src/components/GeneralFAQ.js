import React from "react";
import { Collapse } from "antd";

export const GeneralFAQ = () => {

  return (
    <div className="flex flex-col items-center gap-y-5 mb-20">
      <h1 className="text-2xl font-bold">General FAQ's</h1>
      <div className="flex flex-col gap-y-4 md:w-8/12 w-[95%]">
        <Collapse
          items={[
            {
              key: "1",
              label: <span className="font-medium">What are the payment options you accept ?</span>,
              children: <p>We only accept payment through stripe checkout pages which are securely integrated in our shopping platform.</p>,
            },
          ]}
        />
        <Collapse
          items={[
            {
              key: "2",
              label: <span className="font-medium">What is stripe ? We have not heard about it, is it a bank?</span>,
              children: <p>No, <a href="https://www.stripe.com" target="_blank" className="text-blue-600" rel="noreferrer">stripe</a> is not a bank. Stripe is a private company which works with banks and make the payment easy for businesses and also customers so we both can be happy.</p>,
            },
          ]}
        />
        <Collapse
          items={[
            {
              key: "3",
              label: <span className="font-medium">How much time delivery takes usually ?</span>,
              children: <p>We try to deliver your orders within 2-3 days, but as you know we are a new company, so sometimes delivery may take some time.</p>,
            },
          ]}
        />
        <Collapse
          items={[
            {
              key: "4",
              label: <span className="font-medium">Can we get some coupon codes to apply at checkout page ?</span>,
              children: <p>We are working on this feature, so we suggest you to register your account on our shopping platform and we will email you when you can redeem your coupon codes and we may even send you one monthly.</p>,
            },
          ]}
        />
        <p className="font-medium text-xs">For more queries, you can mail us on <span className="font-medium text-primary">care@fillkart.com</span></p>
      </div>
    </div>
  );
};
