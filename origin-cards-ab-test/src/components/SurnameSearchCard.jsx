import { useState } from 'react';

export default function SurnameSearchCard({ config }) {
  const baseUrl = import.meta.env.BASE_URL;
  const [surname, setSurname] = useState('');

  const {
    heading = "Search your Last Name",
    subheading = "",
    urlPattern = "surname?surname=", // Default to query param style
    buttonText = "Search",
    placeholder = "Last Name",
    image = "Placeholder"
  } = config;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!surname.trim()) return;

    // Check if urlPattern uses query params or path style
    let searchUrl;
    if (urlPattern.includes('?')) {
      // Query param style: surname?surname={surname}
      searchUrl = `https://www.familysearch.org/en/${urlPattern}${encodeURIComponent(surname)}`;
    } else {
      // Path style: japan/surname/{surname} - lowercase and hyphenate
      const formattedSurname = surname.toLowerCase().trim().replace(/\s+/g, '-');
      searchUrl = `https://www.familysearch.org/en/${urlPattern}${formattedSurname}`;
    }

    window.open(searchUrl, '_blank');
  };

  const hasImage = image && image !== 'None' && image !== '';

  return (
    <article className="bg-white rounded-[10px] border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_480px] min-h-[260px] w-full">
      <div className="p-8 flex flex-col justify-center order-2 md:order-1">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{heading}</h3>
        {subheading && (
          <p className="text-gray-700 mb-4">{subheading}</p>
        )}

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder={placeholder}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-700"
              required
            />
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded px-4 py-2 font-medium transition-colors bg-teal-700 text-white border border-teal-700 hover:bg-teal-600"
              >
                {buttonText}
              </button>
            </div>
          </div>
        </form>
      </div>

      {hasImage && (
        <div className="order-1 md:order-2">
          {image !== 'Placeholder' ? (
            <img
              src={`${baseUrl}${image}`}
              alt=""
              className="w-full h-full min-h-[260px] object-cover"
            />
          ) : (
            <div className="bg-gray-300 w-full h-full min-h-[260px]" aria-hidden="true"></div>
          )}
        </div>
      )}
    </article>
  );
}
