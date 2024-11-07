import React from "react";

export const Card = ({ title, description, value }) => (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-white/60 text-sm">{description}</p>
      <p className="text-4xl font-bold text-white mt-4">{value}</p>
    </div>
  );