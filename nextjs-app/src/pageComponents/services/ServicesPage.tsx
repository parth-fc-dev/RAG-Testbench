"use client";

import { Header, Button, Card, Footer } from "@/components";

export default function ServicesPage() {
  const services = [
    {
      title: "Web Development",
      description:
        "Building responsive and performant web applications with modern frameworks.",
    },
    {
      title: "Full Stack Development",
      description:
        "End-to-end application development from frontend to backend.",
    },
    {
      title: "Cloud Deployment",
      description:
        "Deploying applications using Docker and modern cloud platforms.",
    },
    {
      title: "Performance Optimization",
      description:
        "Optimizing applications for speed, scalability, and user experience.",
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-8 md:py-16 overflow-y-auto">
        <div className="max-w-4xl w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-8 md:mb-10">
            Our Services
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
            {services.map((service, index) => (
              <Card key={index} title={service.title}>
                {service.description}
              </Card>
            ))}
          </div>

          <Button href="/">Back to Home</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
