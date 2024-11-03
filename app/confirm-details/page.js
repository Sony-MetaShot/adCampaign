'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import apiClient from '@/services/axiosSetup';

const Page = () => {
  const [registrationData, setRegistrationData] = useState({});
  const [chosenPosition, setChosenPosition] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedRegistrationData = JSON.parse(localStorage.getItem('registrationData'));
    const storedChosenPosition = JSON.parse(localStorage.getItem('chosenPosition'));
    setRegistrationData(storedRegistrationData);
    setChosenPosition(storedChosenPosition);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setStatusMessage('Interview Creation in Progress...');
    try {
      const response = await apiClient.post("/interview/createWithoutRegistration", {
        registrationData,
        chosenPosition
      });
      if (response.status === 200) {
        setStatusMessage('✔ Interview has been scheduled. Please check your email.');
      } else {
        setStatusMessage('✖ Failed to schedule the interview. Please try again.');
      }
    } catch (err) {
      setStatusMessage('✖ Failed to schedule the interview. Please try again.');
    } finally {
      setTimeout(() => {
        setLoading(false);
        router.push('/');
      }, 3000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 md:w-1/3 relative">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex flex-col items-center justify-center z-50 text-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <p className="text-lg font-semibold break-words">{statusMessage}</p>
        </div>
      )}
      <div className="flex items-center mb-4">
        <Image src={"/logo.png"} height={50} width={50} alt="logo" className='rounded-full p-2' />
        <h1 className="text-2xl font-bold ml-4">Confirm Details</h1>
      </div>
      <p className="mb-6">Please confirm your details before submitting.</p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <p className="px-3 py-2 border border-gray-300 rounded-md">{registrationData.name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="px-3 py-2 border border-gray-300 rounded-md">{registrationData.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <p className="px-3 py-2 border border-gray-300 rounded-md">{registrationData.phone}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">College Name</label>
          <p className="px-3 py-2 border border-gray-300 rounded-md">{registrationData.college}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Chosen Position</label>
          <p className="px-3 py-2 border border-gray-300 rounded-md">{chosenPosition.title}</p>
        </div>
      </div>
      <button 
        onClick={handleSubmit}
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
      >
        Confirm
      </button>
    </div>
  );
};

export default Page;