import React from 'react';

export default function FreeHelp() {
  return (
    <section className="bg-[#EEEFC9] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Get free help—online or in person</h2>
        <p className="text-center text-lg text-gray-700 mb-12">Try one of these free help options.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* In-person help */}
          <div className="flex flex-col items-start">
            <div className="w-16 h-16 mb-6">
              <img src="/assets/icon/Help.svg" alt="" className="w-full h-full" />
            </div>
            <h3 className="text-xl font-bold mb-3">Get in-person help at a local center</h3>
            <p className="text-gray-700 mb-4 flex-grow">
              FamilySearch centers offer free, in-person guidance from an assistant trained to help you.
            </p>
            <a href="#" className="text-gray-900 underline font-medium inline-flex items-center hover:text-gray-700">
              Find a center
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Learning center */}
          <div className="flex flex-col items-start">
            <div className="w-16 h-16 mb-6">
              <img src="/assets/icon/Questions.svg" alt="" className="w-full h-full" />
            </div>
            <h3 className="text-xl font-bold mb-3">Visit our learning center</h3>
            <p className="text-gray-700 mb-4 flex-grow">
              Find answers to your research questions, view classes and videos, and discover much more.
            </p>
            <a href="#" className="text-gray-900 underline font-medium inline-flex items-center hover:text-gray-700">
              View resources
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Online consultation */}
          <div className="flex flex-col items-start">
            <div className="w-16 h-16 mb-6">
              <img src="/assets/icon/Support.svg" alt="" className="w-full h-full" />
            </div>
            <h3 className="text-xl font-bold mb-3">Schedule an online consultation</h3>
            <p className="text-gray-700 mb-4 flex-grow">
              Sign up for a free, 20-minute session with a research specialist.
            </p>
            <a href="#" className="text-gray-900 underline font-medium inline-flex items-center hover:text-gray-700">
              Schedule now
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
