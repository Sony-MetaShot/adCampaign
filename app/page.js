'use client';
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      college: e.target.college.value,
    };
    
    localStorage.setItem('registrationData', JSON.stringify(formData));
    const queryString = new URLSearchParams({
      name:formData.name,
      email:formData.email,
      phone:formData.phone,
      college:formData.college
    }).toString();
    router.push(`/schedule?${queryString}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6 flex justify-start"><Image src={"/logo.png"} height={50} width={50} className="rounded-full text-xs md:text-md hidden md:block bg-green-200/50 md:p-2" alt="logo" /><p className=" text-center md:text-start text-md md:mx-12 my-auto flex-1">Registration Form</p> </h1>
        
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="college" className="block text-sm font-medium text-gray-700">
            College Name <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            id="college" 
            name="college" 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
