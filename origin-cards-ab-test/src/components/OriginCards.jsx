import { originCardsContent } from '../data.jsx';

export default function OriginCards({ country, skipAncestorSearch = false }) {
  const baseUrl = import.meta.env.BASE_URL;
  let cards = originCardsContent[country] || [];
  
  // Filter out multi-field ancestor search cards if requested
  if (skipAncestorSearch) {
    cards = cards.filter(card => {
      const isAncestorSearch = card.hasForm && 
                               card.formFields && 
                               card.formFields.length === 4 &&
                               card.header === "What will you discover about your ancestors?";
      return !isAncestorSearch;
    });
  }

  if (cards.length === 0) {
    return null;
  }

  const getButtonStyle = (emphasis) => {
    if (emphasis === 'high') {
      return 'bg-teal-700 text-white border border-teal-700 hover:bg-teal-600';
    } else if (emphasis === 'medium') {
      return 'border border-gray-900 text-gray-900 bg-white hover:bg-gray-100';
    } else {
      return 'text-teal-700 hover:underline';
    };
  };

  // Section header - just text, no card wrapper
  const SectionHeader = ({ card }) => (
    <div className="py-4">
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{card.header}</h3>
      {card.subheader && (
        <p className="text-gray-700">{card.subheader}</p>
      )}
    </div>
  );

  const handleFormSubmit = (e, buttonLink) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const year = formData.get('birthYear');
    
    console.log('Form submitted:', { buttonLink, year });
    
    if (buttonLink && year) {
      // Button link already ends with '/', just append the year
      const fullUrl = buttonLink + year;
      console.log('Opening URL:', fullUrl);
      window.open(fullUrl, '_blank');
    }
  };

  // First card - full width horizontal layout
  const FullWidthCard = ({ card, country }) => {
    const hasImage = card.image && card.image !== 'None' && card.image !== '';
    const hasLink = card.link && (!card.buttons || card.buttons.length === 0) && !card.hasForm;
    const isMultiFieldForm = card.hasForm && card.formFields && card.formFields.length > 1;
    
    // For multi-field forms, use horizontal layout like DefaultSearchCard
    if (isMultiFieldForm) {
      const handleMultiFieldSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const params = new URLSearchParams();
        
        card.formFields.forEach(field => {
          const value = formData.get(field.name);
          if (value) {
            if (field.name === 'firstName') params.append('givenName', value);
            else if (field.name === 'lastName') params.append('surname', value);
            else if (field.name === 'placeLived') params.append('place', value);
            else if (field.name === 'birthYear') params.append('birthYear', value);
          }
        });
        
        const searchUrl = `${card.buttons?.[0]?.link}?${params.toString()}`;
        window.open(searchUrl, '_blank');
      };

      return (
        <article className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{card.header}</h2>
              <p className="text-lg text-gray-700">{card.subheader}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enter your ancestor information:</h3>
              <p className="text-sm text-gray-600 mb-4">Not sure who to search for? Try a grandparent or great-grandparent.</p>
              
              <form onSubmit={handleMultiFieldSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {card.formFields.slice(0, 2).map((field, idx) => (
                    <div key={idx}>
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}{field.name === 'lastName' ? '*' : ''}
                      </label>
                      <input
                        type="text"
                        id={field.name}
                        name={field.name}
                        required={field.name === 'lastName'}
                        placeholder="Your Text Here"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {card.formFields.slice(2, 4).map((field, idx) => (
                    <div key={idx}>
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        id={field.name}
                        name={field.name}
                        placeholder="Your Text Here"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
                
                {card.buttons && card.buttons.length > 0 && (
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
                  >
                    {card.buttons[0].text.toUpperCase()}
                  </button>
                )}
              </form>
            </div>
          </div>
        </article>
      );
    }
    
    const CardContent = () => (
      <>
        <div className={`p-8 flex flex-col justify-center ${hasImage ? 'order-2 md:order-1' : ''}`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{card.header}</h3>
          {card.subheader && (
            <p className="text-gray-700 mb-4">{card.subheader}</p>
          )}
          
          {card.hasForm && card.formFields && (
            <form onSubmit={(e) => handleFormSubmit(e, card.buttons?.[0]?.link)} className="mb-4">
              <div className="flex flex-col gap-3">
                {card.formFields.map((field, idx) => (
                  <div key={idx}>
                    <input
                      type="text"
                      name={field.name}
                      placeholder={field.label}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-700"
                    />
                  </div>
                ))}
                {card.buttons && card.buttons.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {card.buttons.map((button, idx) => (
                      <button
                        key={idx}
                        type="submit"
                        className={`rounded px-4 py-2 font-medium transition-colors ${getButtonStyle(button.emphasis)}`}
                      >
                        {button.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </form>
          )}

          {!card.hasForm && card.buttons && card.buttons.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {card.buttons.map((button, idx) => (
                <a
                  key={idx}
                  href={button.link}
                  className={`rounded px-4 py-2 font-medium transition-colors ${getButtonStyle(button.emphasis)}`}
                  target={button.link.startsWith('http') ? '_blank' : '_self'}
                  rel={button.link.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  {button.text}
                </a>
              ))}
            </div>
          )}
        </div>

        {hasImage && (
          <div className="order-1 md:order-2">
            {card.image !== 'Placeholder' ? (
              <img 
                src={`${baseUrl}${card.image}`} 
                alt="" 
                className="w-full h-full min-h-[260px] object-cover"
              />
            ) : (
              <div className="bg-gray-300 w-full h-full min-h-[260px]" aria-hidden="true"></div>
            )}
          </div>
        )}
      </>
    );
    
    if (hasLink) {
      return (
        <a
          href={card.link}
          target={card.link.startsWith('http') ? '_blank' : '_self'}
          rel={card.link.startsWith('http') ? 'noopener noreferrer' : ''}
          className={`bg-white rounded-[10px] border border-gray-200 overflow-hidden ${hasImage ? 'grid grid-cols-1 md:grid-cols-[1fr_480px]' : 'flex'} min-h-[260px] w-full hover:shadow-lg transition-shadow cursor-pointer`}
        >
          <CardContent />
        </a>
      );
    }
    
    return (
      <article data-country={country} className={`bg-white rounded-[10px] border border-gray-200 overflow-hidden ${hasImage ? 'grid grid-cols-1 md:grid-cols-[1fr_480px]' : 'flex'} min-h-[260px] w-full`}>
        <CardContent />
      </article>
    );
  };

  // Multi-column cards - vertical layout
  const VerticalCard = ({ card, isFullWidth, country }) => {
    const hasImage = card.image && card.image !== 'None' && card.image !== '';
    const hasLink = card.link && (!card.buttons || card.buttons.length === 0) && !card.hasForm;
    
    if (isFullWidth) {
      // Use horizontal layout when card fills full width
      const CardContent = () => (
        <>
          <div className={`p-8 flex flex-col justify-center ${
            hasImage ? 'order-2 md:order-1' : ''
          }`}>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{card.header}</h3>
            {card.subheader && (
              <p className="text-gray-700 mb-4">{card.subheader}</p>
            )}

            {card.hasForm && card.formFields && (
              <form onSubmit={(e) => handleFormSubmit(e, card.buttons?.[0]?.link)} className="mb-4">
                <div className="flex flex-col gap-3">
                  {card.formFields.map((field, idx) => (
                    <div key={idx}>
                      <input
                        type="text"
                        name={field.name}
                        placeholder={field.label}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-700"
                      />
                    </div>
                  ))}
                  {card.buttons && card.buttons.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {card.buttons.map((button, idx) => (
                        <button
                          key={idx}
                          type="submit"
                          className={`rounded px-4 py-2 font-medium transition-colors ${getButtonStyle(button.emphasis)}`}
                        >
                          {button.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </form>
            )}

            {!card.hasForm && card.buttons && card.buttons.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {card.buttons.map((button, idx) => (
                  <a
                    key={idx}
                    href={button.link}
                    className={`rounded px-4 py-2 font-medium transition-colors ${getButtonStyle(button.emphasis)}`}
                    target={button.link.startsWith('http') ? '_blank' : '_self'}
                    rel={button.link.startsWith('http') ? 'noopener noreferrer' : ''}
                  >
                    {button.text}
                  </a>
                ))}
              </div>
            )}
          </div>

          {hasImage && (
            <div className="order-1 md:order-2">
              {card.image !== 'Placeholder' ? (
                <img 
                  src={`/${card.image}`} 
                  alt="" 
                  className="w-full h-full min-h-[260px] object-cover"
                />
              ) : (
                <div className="bg-gray-300 w-full h-full min-h-[260px]" aria-hidden="true"></div>
              )}
            </div>
          )}
        </>
      );
      
      if (hasLink) {
        return (
          <a
            href={card.link}
            target={card.link.startsWith('http') ? '_blank' : '_self'}
            rel={card.link.startsWith('http') ? 'noopener noreferrer' : ''}
            className={`bg-white rounded-[10px] border border-gray-200 overflow-hidden min-h-[260px] w-full hover:shadow-lg transition-shadow cursor-pointer ${
              hasImage ? 'grid grid-cols-1 md:grid-cols-[1fr_480px]' : 'flex'
            }`}
          >
            <CardContent />
          </a>
        );
      }
      
      return (
        <article data-country={country} className={`bg-white rounded-[10px] border border-gray-200 overflow-hidden min-h-[260px] w-full ${
          hasImage ? 'grid grid-cols-1 md:grid-cols-[1fr_480px]' : 'flex'
        }`}>
          <CardContent />
        </article>
      );
    }

    // Vertical card layout for multi-column grids
    const isMultiFieldForm = card.hasForm && card.formFields && card.formFields.length > 1;
    
    // For multi-field forms, use horizontal layout like DefaultSearchCard
    if (isMultiFieldForm) {
      const handleMultiFieldSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const params = new URLSearchParams();
        
        card.formFields.forEach(field => {
          const value = formData.get(field.name);
          if (value) {
            if (field.name === 'firstName') params.append('givenName', value);
            else if (field.name === 'lastName') params.append('surname', value);
            else if (field.name === 'placeLived') params.append('place', value);
            else if (field.name === 'birthYear') params.append('birthYear', value);
          }
        });
        
        const searchUrl = `${card.buttons?.[0]?.link}?${params.toString()}`;
        window.open(searchUrl, '_blank');
      };

      return (
        <article className="bg-white rounded-lg shadow-sm p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{card.header}</h2>
              <p className="text-lg text-gray-700">{card.subheader}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enter your ancestor information:</h3>
              <p className="text-sm text-gray-600 mb-4">Not sure who to search for? Try a grandparent or great-grandparent.</p>
              
              <form onSubmit={handleMultiFieldSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {card.formFields.slice(0, 2).map((field, idx) => (
                    <div key={idx}>
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}{field.name === 'lastName' ? '*' : ''}
                      </label>
                      <input
                        type="text"
                        id={field.name}
                        name={field.name}
                        required={field.name === 'lastName'}
                        placeholder="Your Text Here"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {card.formFields.slice(2, 4).map((field, idx) => (
                    <div key={idx}>
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        id={field.name}
                        name={field.name}
                        placeholder="Your Text Here"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
                
                {card.buttons && card.buttons.length > 0 && (
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
                  >
                    {card.buttons[0].text.toUpperCase()}
                  </button>
                )}
              </form>
            </div>
          </div>
        </article>
      );
    }
    
    const CardContent = () => (
      <>
        {hasImage && (
          <div>
            {card.image !== 'Placeholder' ? (
              <img 
                src={`/${card.image}`} 
                alt="" 
                className="w-full h-[220px] object-cover"
              />
            ) : (
              <div className="bg-gray-300 w-full h-[220px]" aria-hidden="true"></div>
            )}
          </div>
        )}
        
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{card.header}</h3>
          {card.subheader && (
            <p className="text-gray-700 mb-4 flex-grow">{card.subheader}</p>
          )}

          {card.hasForm && card.formFields && (
            <form onSubmit={(e) => handleFormSubmit(e, card.buttons?.[0]?.link)} className="mb-4">
              <div className="flex flex-col gap-3">
                {card.formFields.map((field, idx) => (
                  <div key={idx}>
                    <input
                      type="text"
                      name={field.name}
                      placeholder={field.label}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-700"
                    />
                  </div>
                ))}
                {card.buttons && card.buttons.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {card.buttons.map((button, idx) => (
                      <button
                        key={idx}
                        type="submit"
                        className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${getButtonStyle(button.emphasis)}`}
                      >
                        {button.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </form>
          )}

          {!card.hasForm && card.buttons && card.buttons.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {card.buttons.map((button, idx) => (
                <a
                  key={idx}
                  href={button.link}
                  className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${getButtonStyle(button.emphasis)}`}
                  target={button.link.startsWith('http') ? '_blank' : '_self'}
                  rel={button.link.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  {button.text}
                </a>
              ))}
            </div>
          )}
        </div>
      </>
    );
    
    if (hasLink) {
      return (
        <a
          href={card.link}
          target={card.link.startsWith('http') ? '_blank' : '_self'}
          rel={card.link.startsWith('http') ? 'noopener noreferrer' : ''}
          className="bg-white rounded-[10px] border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow cursor-pointer"
        >
          <CardContent />
        </a>
      );
    }
    
    return (
      <article data-country={country} className="bg-white rounded-[10px] border border-gray-200 overflow-hidden flex flex-col h-full">
        <CardContent />
      </article>
    );
  };

  const firstCard = cards[0];
  const remainingCards = cards.slice(1);

  return (
    <section className="flex flex-col gap-6" aria-label="Explore your heritage">
      {/* First card - always full width */}
      <FullWidthCard card={firstCard} country={country} />

      {/* Render remaining cards in original order */}
      {remainingCards.map((card, index) => {
        // Check if this is a section header
        if (card.image === 'Section') {
          return <SectionHeader key={`section-${index + 1}`} card={card} />;
        }
        
        if (card.fullWidth) {
          return <FullWidthCard key={`card-${index + 1}`} card={card} country={country} />;
        }
        
        // For non-fullWidth cards, check if we need to group them
        const nextCards = remainingCards.slice(index);
        const consecutiveGridCards = [];
        
        for (let i = 0; i < nextCards.length; i++) {
          if (nextCards[i].fullWidth || nextCards[i].image === 'Section') break;
          consecutiveGridCards.push(nextCards[i]);
        }
        
        // Only render grid wrapper at the start of consecutive grid cards
        if (index === 0 || remainingCards[index - 1].fullWidth || remainingCards[index - 1].image === 'Section') {
          const gridCount = consecutiveGridCards.length;
          let gridClass = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
          if (gridCount === 1) {
            gridClass = 'grid-cols-1';
          } else if (gridCount === 2) {
            gridClass = 'grid-cols-1 md:grid-cols-2';
          }
          
          return (
            <div key={`grid-${index}`} className={gridCount <= 2 ? `grid ${gridClass} gap-4 lg:gap-6` : 'grid-fill-last-row'}>
              {consecutiveGridCards.map((gridCard, gridIndex) => (
                <VerticalCard 
                  key={`card-${index + gridIndex + 1}`} 
                  card={gridCard} 
                  isFullWidth={gridCount === 1} 
                  country={country} 
                />
              ))}
            </div>
          );
        }
        
        return null; // Already rendered in grid above
      })}
    </section>
  );
}
