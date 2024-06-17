import React from "react";

const Feature = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center mb-8 text-2xl shadow-lg transition-transform transform hover:scale-105">
      <span className="text-4xl text-green-500 mb-2">{icon}</span>
      <h3 className="text-2xl font-bold mb-2 text-center text-green-400">
        {title}
      </h3>
      <p className="text-xl text-gray-700 text-center">{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <section className="features container mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
      <Feature
        icon="😊" // Add an appropriate emoji for mood tracking
        title="Mood Tracking & Analysis"
        description="Track your mood over time and gain insights into patterns and triggers."
      />
      <Feature
        icon="🫂" // Add an appropriate emoji for recommendations
        title="Personalized Recommendations"
        description="Receive personalized recommendations based on your mood and preferences."
      />
      <Feature
        icon="❤️" // Add an appropriate emoji for resources
        title="Resources & Support"
        description="Access a wealth of resources and support materials to aid in your mental health journey."
      />
      <Feature
        icon="👩‍👧‍👦" // Add an appropriate emoji for forums
        title="Support Forums"
        description="Participate in supportive communities and connect with others facing similar challenges."
      />
      <Feature
        icon="‍⚕️" // Add an appropriate emoji for therapists
        title="Therapists & Crisis Interventions"
        description="Access professional therapists and crisis interventions when needed."
      />
    </section>
  );
};

export default Features;
