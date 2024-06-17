import React from "react";

const Testimonial = ({ quote, name }) => {
  return (
    <div className="testimonial p-4 border border-gray-300 rounded-md mb-4">
      <p className="text-gray-700">{quote}</p>
      <div className="flex items-center mt-2">
        <img
          src="/avatar.jpg"
          alt="Avatar"
          className="w-10 h-10 rounded-full mr-2"
        />
        <span className="text-gray-600">{name}</span>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="testimonials container mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-8">What people are saying</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <Testimonial
          quote="Mental Bloom helped me manage my anxiety and improve my relationships. I feel so much better now."
          name="John Doe"
        />
        <Testimonial
          quote="The online therapy sessions were convenient and effective. My therapist was very understanding and supportive."
          name="Jane Smith"
        />
      </div>
    </section>
  );
};

export default Testimonials;
