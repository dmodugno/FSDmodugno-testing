import { useState } from 'react';

export default function DefaultSearchCard() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    placeLived: '',
    birthYear: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build search URL with form data
    const params = new URLSearchParams();
    if (formData.firstName) params.append('givenName', formData.firstName);
    if (formData.lastName) params.append('surname', formData.lastName);
    if (formData.placeLived) params.append('place', formData.placeLived);
    if (formData.birthYear) params.append('birthYear', formData.birthYear);
    
    const searchUrl = `https://www.familysearch.org/en/search/?${params.toString()}`;
    window.open(searchUrl, '_blank');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What will you discover about your ancestors?
          </h2>
          <p className="text-lg text-gray-700">
            Search billions of ancestor profiles, photographs, and historical documents at once—absolutely FREE.
          </p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Enter your ancestor information:
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Not sure who to search for? Try a grandparent or great-grandparent.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Names
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Your Text Here"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Names*
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Your Text Here"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="placeLived" className="block text-sm font-medium text-gray-700 mb-1">
                  Place Lived
                </label>
                <input
                  type="text"
                  id="placeLived"
                  name="placeLived"
                  value={formData.placeLived}
                  onChange={handleChange}
                  placeholder="Your Text Here"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="birthYear" className="block text-sm font-medium text-gray-700 mb-1">
                  Birth Year
                </label>
                <input
                  type="text"
                  id="birthYear"
                  name="birthYear"
                  value={formData.birthYear}
                  onChange={handleChange}
                  placeholder="Your Text Here"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="px-8 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              SEARCH
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
