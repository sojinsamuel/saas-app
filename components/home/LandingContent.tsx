"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const testimonials = [
  {
    name: "John",
    avatar: "J",
    title: "Software Engineer",
    description: "Genius! Just made my life better.",
  },
  {
    name: "Andy",
    avatar: "A",
    title: "Developer Expert",
    description: "This is Epic. I should've found this sooner.",
  },
  {
    name: "Emily",
    avatar: "E",
    title: "Marketing Specialist",
    description:
      "Incredible tool! It has revolutionized our marketing strategies.",
  },
  {
    name: "Sarah",
    avatar: "S",
    title: "Graphic Designer",
    description:
      "This platform is a game-changer for designers. So glad I discovered it!",
  },
  {
    name: "Michael",
    avatar: "M",
    title: "Entrepreneur",
    description:
      "As a business owner, this service has saved me so much time and effort. Highly recommend it!",
  },
  {
    name: "Alex",
    avatar: "X",
    title: "Data Analyst",
    description:
      "I can't believe how much easier my data analysis tasks have become with this tool. Superb!",
  },
  {
    name: "Jessica",
    avatar: "J",
    title: "Content Creator",
    description:
      "This platform is a content creator's dream come true. It's like it reads my mind!",
  },
  {
    name: "Jennifer",
    avatar: "J",
    title: "Project Manager",
    description:
      "This platform has streamlined our project management process. It's a must-have for any team!",
  },
];

function LandingContent() {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{testimonial.name}</p>
                  <p className="text-zinc-400 text-sm">{testimonial.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {testimonial.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default LandingContent;
