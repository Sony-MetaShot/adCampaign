"use client"
import Image from 'next/image';
import React from 'react'
import { useRouter } from 'next/navigation';

const positions = [
  {
    id: 1,
    title: "Digital Marketing",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    skills: ["React", "JavaScript", "Node.js", "CSS"]
  },
  {
    id: 2,
    title: "Networking",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    skills: ["Python", "Django", "PostgreSQL", "AWS"]
  },
  {
    id: 3,
    title: "Coding",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    skills: ["Vue.js", "TypeScript", "MongoDB", "Docker"]
  },
  {
    id: 4,
    title: "UI/UX",
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    skills: ["Angular", "Java", "Spring Boot", "MySQL"]
  }
];

const PositionCard = ({ id, title, description, skills, onClick }) => {
  return (
    <div 
      className="bg-white hover:bg-blue-50 rounded-lg shadow-md p-4 sm:p-6 mb-4 w-full cursor-pointer"
      onClick={() => onClick(id)}
    >
      <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{title}</h2>
      <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">{description}</p>
      <div>
        <h3 className="font-semibold text-sm sm:text-base mb-2">Required Skills:</h3>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {skills.map((skill, index) => (
            <span 
              key={index}
              className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Page = ({ params, searchParams }) => {
  // const { name, email, phone, college } = searchParams;
  const router = useRouter();

  const handleConfirm = (id) => {
    const chosenPosition = positions.find(position => position.id === id);
    localStorage.setItem('chosenPosition', JSON.stringify(chosenPosition));
    router.push(`/confirm-details`);
  };

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex">
        <Image src={"/logo.png"} height={50} width={50} alt="logo" className='rounded-full p-2 my-auto' />
        <h1 className='my-auto'>Available Positions</h1>
      </div>
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {positions.map((position) => (
          <PositionCard
            key={position.id}
            id={position.id}
            title={position.title}
            description={position.description}
            skills={position.skills}
            onClick={handleConfirm}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
