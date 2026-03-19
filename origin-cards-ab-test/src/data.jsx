// Country & collections data
// Top countries to display as chips for each test country
export const countryChipsConfig = {
  'United States': ['United States', 'England', 'Germany', 'Mexico', 'Italy'],
  'Philippines': ['Philippines', 'China', 'Spain', 'United States'],
  'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland', 'United States'],
  'Brasil': ['Brazil', 'Portugal', 'Italy', 'Spain', 'Germany'],
  'Egypt': ['Egypt', 'England'],
  'China': ['China', 'Taiwan', 'United States', 'England'],
  'South Africa': ['South Africa', 'England', 'Germany', 'United States', 'Norway'],
  'New Zealand': ['New Zealand', 'Australia', 'England', 'United States'],
  'Japan': ['Japan', 'Korea', 'China', 'United States']
};

// All countries available in the overlay
export const overlayCountries = ['Australia','Brazil','Cambodia','Canada','China','Egypt','England','Germany','Ireland','Italy','Japan','Korea','Mexico','New Zealand','Northern Ireland','Norway','Philippines','Portugal','Scotland','South Africa','Spain','Taiwan','United States','Wales'];

// Origin cards content by country
export const originCardsContent = {
  Australia: [
    {
      customComponent: "LocationSelector",
      config: {
        heading: "Discover Records by State",
        subheading: "Find historical records and common surnames, and unearth stories waiting to be shared.",
        locations: [
          'Tasmania',
          'Western Australia',
          'Victoria',
          'Queensland',
          'Northern Territory',
          'South Australia',
          'Australian Capital Territory',
          'New South Wales'
        ],
        urlPattern: "australia/state",
        mapImage: "australia-map.webp",
        selectPlaceholder: "Select State",
        mapPosition: "right"
      }
    },
    {
      header: "Your birth year was extraordinary!",
      subheader: "Explore interesting facts about the year you were born: sports news, world events, the price of petrol, and more!",
      hasForm: true,
      formFields: [{ name: "birthYear", label: "Birth year" }],
      buttons: [{ text: "Search", link: "https://www.familysearch.org/en/australia/year-born/", emphasis: "high" }],
      image: "Placeholder"
    }
  ],
  Brazil: [
    {
      header: "What will you discover about your ancestors?",
      subheader: "Search billions of ancestor profiles, photographs, and historical documents at once—absolutely FREE.",
      hasForm: true,
      formFields: [
        { name: "firstName", label: "First Names" },
        { name: "lastName", label: "Last Names" },
        { name: "placeLived", label: "Place Lived" },
        { name: "birthYear", label: "Birth Year" }
      ],
      buttons: [{ text: "Search", link: "https://www.familysearch.org/en/search/", emphasis: "high" }],
      image: "None"
    },
    {
      header: "Automated family tree builder",
      subheader: "As you add information, we'll search for ancestor connections.",
      hasForm: false,
      buttons: [{ text: "Start your tree", link: "https://www.familysearch.org/en/tree/guided/connect-to-tree", emphasis: "high" }],
      image: "Placeholder"
    },
    {
      header: "Where does your last name come from?",
      subheader: "Simply enter your surname to explore its origins and family history.",
      hasForm: false,
      buttons: [{ text: "Get started", link: "https://www.familysearch.org/en/surname", emphasis: "high" }],
      image: "Placeholder"
    },
    {
      header: "Discover new ways of exploring your heritage with research tips, engaging experiences, and family history inspiration.",
      subheader: "",
      hasForm: false,
      buttons: [{ text: "View on Instagram", link: "https://www.instagram.com/familysearch", emphasis: "high" }],
      image: "None"
    }
  ],
  Cambodia: [
    {
      header: "About FamilySearch",
      subheader: "Family History is a nonprofit organization that began as a civil society organization in Utah in 1894. We are committed to helping people understand their family history on mobile devices and in person at over 5,000 family history centers around the world. Remembering our ancestors is one way we honor them. You can capture stories, photos, and memories of your ancestors using Family History to make their legacy easy and unforgettable for future generations.",
      hasForm: false,
      buttons: [],
      image: "Placeholder"
    },
    {
      header: "Here are some of the benefits of creating a free FamilySearch account:",
      subheader: "Capture audio, photos, and text Connect with family Preserving history for future generations Free for all accounts. Are you ready to get started? Please follow these steps:",
      hasForm: false,
      buttons: [],
      image: "Section"
    },
    {
      header: "Step 1",
      subheader: "Go to FamilySearch.org and click on the \"Create a Free Account\" button. You can also download the app on your mobile device and create a free account. Search for \"FamilySearch\" in your app store.",
      hasForm: false,
      buttons: [],
      image: "Placeholder"
    },
    {
      header: "Step 2",
      subheader: "Click continue",
      hasForm: false,
      buttons: [],
      image: "Placeholder"
    },
    {
      header: "Step 3",
      subheader: "Create a username and password Enter your phone number or email address as a way to activate your account.",
      hasForm: false,
      buttons: [],
      image: "Placeholder"
    },
    {
      header: "Step 4",
      subheader: "Activate and Sign In Follow these steps to activate and sign in!",
      hasForm: false,
      buttons: [],
      image: "Placeholder"
    }
  ],
  China: [
    {
      header: "Search For Your Clan Genealogy Book",
      subheader: "",
      hasForm: true,
      formFields: [{ name: "clanName", label: "Li, Wong, etc." }],
      buttons: [{ text: "Search", link: "https://www.familysearch.org/en/records/images/search-results?volumeSetSearch=jiapu", emphasis: "high" }],
      image: "Placeholder"
    },
    {
      header: "Tracing Your Chinese Roots",
      subheader: "",
      hasForm: false,
      buttons: [{ text: "Explore the guide", link: "https://www.familysearch.org/en/chinese/research/", emphasis: "medium" }],
      image: "Placeholder"
    },
    {
      header: "Guangdong Village Finder",
      subheader: "",
      hasForm: false,
      buttons: [{ text: "Start searching", link: "https://www.familysearch.org/en/chinese/village-finder/", emphasis: "medium" }],
      image: "Placeholder"
    },
    {
      header: "Explore Chinese Surnames",
      subheader: "",
      hasForm: false,
      buttons: [],
      image: "Placeholder",
      link: "https://www.familysearch.org/en/chinese/surnames/"
    },
    {
      header: "Design & Print Family Trees",
      subheader: "",
      hasForm: false,
      buttons: [],
      image: "Placeholder",
      link: "https://www.familysearch.org/en/tree-designs/chinese"
    },
    {
      header: "Create Family Memory Books",
      subheader: "",
      hasForm: false,
      buttons: [],
      image: "Placeholder",
      link: "https://www.familysearch.org/en/memory-books/chinese"
    }
  ],
  Egypt: [
    {
      header: "Helping families since 1894",
      subheader: "For over 130 years, we have been dedicated to helping people worldwide find more information about their families and origins for free while maintaining privacy and keeping the data safe. We are a nonprofit organization working effortlessly to help people, free of charge, to learn more about their origins and strengthen their connections.",
      hasForm: false,
      buttons: [{ text: "Learn more", link: "https://www.familysearch.org/en/about", emphasis: "high" }],
      image: "Placeholder"
    },
    {
      header: "What is the story of your family?",
      subheader: "You can explore more about your family through searching billions of historical records safely and for free.",
      hasForm: false,
      buttons: [{ text: "Learn more", link: "https://www.familysearch.org/en/family-tree", emphasis: "high" }],
      image: "Placeholder"
    },
    {
      header: "Save family memories",
      subheader: "Save your family memories and photos safely and privately for future generations.",
      hasForm: false,
      buttons: [{ text: "Learn more", link: "https://www.familysearch.org/en/egypt/memories", emphasis: "high" }],
      image: "Placeholder"
    },
    {
      header: "Explore the FamilySearch Wiki",
      subheader: "Learn research strategies for finding more information about your family's story.",
      hasForm: false,
      buttons: [{ text: "Explore Wiki", link: "https://www.familysearch.org/en/wiki/FamilySearchWiki:Middle_East_Page", emphasis: "high" }],
      image: "Placeholder"
    }
  ],
  Germany: [
    {
      customComponent: "SurnameSearchCard",
      config: {
        heading: "Search your Last Name",
        subheading: "",
        urlPattern: "surname?surname=",
        buttonText: "Search",
        placeholder: "Last Name",
        image: "Placeholder"
      }
    }
  ],
  Japan: [
    {
      customComponent: "SurnameSearchCard",
      config: {
        heading: "Search your Last Name",
        subheading: "",
        urlPattern: "japan/surname/",
        buttonText: "Search",
        placeholder: "Last Name",
        image: "Placeholder"
      }
    },
    {
      header: "Get Your Koseki",
      subheader: "Learn what documents you need and how to request your koseki.",
      hasForm: false,
      buttons: [{ text: "Learn More", link: "https://www.familysearch.org/en/japan/koseki", emphasis: "high" }],
      image: "Placeholder"
    },
    {
      header: "Search Ancestors",
      subheader: "Discover ancestors in historical records and more.",
      hasForm: false,
      buttons: [{ text: "Search", link: "https://www.familysearch.org/en/search/discovery/", emphasis: "high" }],
      image: "Placeholder"
    },
    {
      header: "Discover Books",
      subheader: "Explore digitized books, directories, and more.",
      hasForm: false,
      buttons: [{ text: "Explore", link: "https://www.familysearch.org/en/library/books/records/?search=&sort=_score&perpage=10&page=1&fulltext=1&&refine%5BAccessLevel%5D%5B%5D=Full+Permission&r&&refine%5BAccessLevel%5D%5B%5D=Public&r&&refine%5BAccessLevel%5D%5B%5D=Limited+Permission&r&&refine%5BLanguage%5D%5B%5D=Japanese&r&&refine%5BLanguage%5D%5B%5D=jap&r&&refine%5BLanguage%5D%5B%5D=ja&r&&perpage=50#title", emphasis: "high" }],
      image: "Placeholder"
    },
    {
      header: "Your story is worth remembering",
      subheader: "Watch as 5 ordinary people learn about the indelible mark they've left on others.",
      hasForm: false,
      buttons: [{ text: "Watch video", emphasis: "high" }],
      videoUrl: "https://youtu.be/cSfNA86DIUM?si=cXbSPbsw5opMuqw5",
      image: "your-story-worth-remembering.png",
      fullWidth: true
    }
  ],
  Korea: [
    {
      header: "How much do you know about my roots and ancestors?",
      subheader: "Family Resource, which provides the largest shared family lineages in the world, provides a variety of records, resources, and services to help millions of people around the world learn about their family history every year.",
      hasForm: false,
      buttons: [{ text: "Find my ancestors in Family Search!", link: "#", emphasis: "high" }],
      image: "Placeholder"
    },
    {
      header: "Korean family history data",
      subheader: "Learn how to read and understand genealogy, family registers, and copys to start family history activities.",
      hasForm: false,
      buttons: [],
      image: "Placeholder",
      link: ""
    }
  ],
  'New Zealand': [
    {
      header: "Search records from New Zealand",
      subheader: "Search FamilySearch's database of records and find your ancestors",
      hasForm: false,
      buttons: [{ text: "Search", link: "https://www.familysearch.org/en/search/location/australia-&-new-zealand/new-zealand", emphasis: "high" }],
      image: "Placeholder"
    },
    {
      customComponent: "LocationSelector",
      config: {
        heading: "Discover Records by Region",
        subheading: "Find historical records and common surnames, and unearth stories waiting to be shared.",
        locations: [
          'Northland',
          'Auckland',
          'Waikato',
          'Bay of Plenty',
          'Gisborne',
          'Hawkes Bay',
          'Taranaki',
          'Manawatu-Wanganui',
          'Wellington',
          'Tasman',
          'Nelson',
          'Marlborough',
          'Canterbury',
          'West Coast',
          'Otago',
          'Southland'
        ],
        urlPattern: "newzealand/region",
        mapImage: "newzealand-map.svg",
        selectPlaceholder: "Select Region",
        mapPosition: "top"
      }
    },
    {
      header: "Your birth year was extraordinary.",
      subheader: "Explore interesting facts about the year you were born: sports news, world events and more!",
      hasForm: true,
      formFields: [{ name: "birthYear", label: "Birth year" }],
      buttons: [{ text: "Search", link: "https://www.familysearch.org/en/newzealand/year-born/", emphasis: "high" }],
      image: "Placeholder"
    },
    {
      header: "The Whakapapa is more than just genealogy",
      subheader: "Learn more about the importance of the Whakapapa. Discover how it is used for more than just genealogy. Understand how it helps trace ancestry, reveal relationships between people and the land, and establish identity.",
      hasForm: false,
      buttons: [{ text: "Learn more", link: "https://www.familysearch.org/en/blog/new-zealand-and-maori-culture", emphasis: "high" }],
      image: "Placeholder"
    }
  ],
  Norway: [
    {
      header: "What will you discover about your ancestors?",
      subheader: "Search billions of ancestor profiles, photographs, and historical documents at once—absolutely FREE.",
      hasForm: true,
      formFields: [
        { name: "firstName", label: "First Names" },
        { name: "lastName", label: "Last Names" },
        { name: "placeLived", label: "Place Lived" },
        { name: "birthYear", label: "Birth Year" }
      ],
      buttons: [{ text: "Search", link: "https://www.familysearch.org/en/search/", emphasis: "high" }],
      image: "None"
    },
    {
      header: "Commemorate 200 years of Norwegian migration to North America",
      subheader: "On July 4, 1825, a group of 52 Norwegians set sail on the ship Restauration to make the first organized migration from Norway to North America.",
      hasForm: false,
      buttons: [{ text: "Read More", link: "https://www.familysearch.org/en/norge/crossings-200", emphasis: "high" }],
      image: "Placeholder"
    }
  ],
  Philippines: [
    {
      header: "Find Your Ninuno",
      subheader: "Find family, records, photos and more, all from a simple search for your ninuno.",
      hasForm: true,
      formFields: [
        { name: "firstName", label: "First Names" },
        { name: "lastName", label: "Last Names*" }
      ],
      buttons: [{ text: "Ancestor search", link: "#", emphasis: "high" }],
      image: "Placeholder"
    },
    {
      header: "Discover Your Family History",
      subheader: "Discover your ninuno, family photos, and records all for free—no spam and no ads.",
      hasForm: true,
      formFields: [{ name: "surname", label: "Enter your surname" }],
      buttons: [{ text: "Search", link: "#", emphasis: "high" }],
      image: "Placeholder"
    },
    {
      header: "Add What You Know",
      subheader: "When you add what you know on FamilySearch, discovery begins - and your family story grows",
      hasForm: false,
      buttons: [
        { text: "Add a memory", link: "https://www.familysearch.org/en/memories/gallery", emphasis: "high" },
        { text: "start building a tree", link: "https://www.familysearch.org/auth/familysearch/login?returnUrl=https%3A%2F%2Fwww.familysearch.org%2Ftree%2Fguided%2Fconnect-to-tree&lang=en", emphasis: "medium" }
      ],
      image: "PhilippinesAd1.png"
    },
    {
      header: "Your Name in Baybayin",
      subheader: 'Add your name and click "convert" to see your name in Baybayin, and learn about this beautiful pre-colonial writing system.',
      hasForm: true,
      formFields: [{ name: "name", label: "Enter name" }],
      buttons: [{ text: "Convert", link: "#", emphasis: "high" }],
      image: "Placeholder"
    },
    {
      header: "Discover Your Province",
      subheader: "Narrow your search, and find FamilySearch data and records from your province",
      hasForm: false,
      buttons: [],
      image: "Placeholder",
      link: ""
    }
  ],
  Taiwan: [
    {
      header: "Search For Your Clan Genealogy Book",
      subheader: "",
      hasForm: true,
      formFields: [{ name: "clanName", label: "Li, Wong, etc." }],
      buttons: [{ text: "Search", link: "https://www.familysearch.org/en/records/images/search-results?volumeSetSearch=jiapu", emphasis: "high" }],
      image: "Placeholder"
    },
    {
      header: "Tracing Your Chinese Roots",
      subheader: "",
      hasForm: false,
      buttons: [{ text: "Explore the guide", link: "https://www.familysearch.org/en/chinese/research/", emphasis: "medium" }],
      image: "Placeholder"
    },
    {
      header: "Guangdong Village Finder",
      subheader: "",
      hasForm: false,
      buttons: [{ text: "Start searching", link: "https://www.familysearch.org/en/chinese/village-finder/", emphasis: "medium" }],
      image: "Placeholder"
    },
    {
      header: "Explore Chinese Surnames",
      subheader: "",
      hasForm: false,
      buttons: [],
      image: "Placeholder",
      link: "https://www.familysearch.org/en/chinese/surnames/"
    },
    {
      header: "Design & Print Family Trees",
      subheader: "",
      hasForm: false,
      buttons: [],
      image: "Placeholder",
      link: "https://www.familysearch.org/en/tree-designs/chinese"
    },
    {
      header: "Create Family Memory Books",
      subheader: "",
      hasForm: false,
      buttons: [],
      image: "Placeholder",
      link: "https://www.familysearch.org/en/memory-books/chinese"
    }
  ],
  'United States': [
    {
      header: "What will you discover about your ancestors?",
      subheader: "Search billions of ancestor profiles, photographs, and historical documents at once—absolutely FREE.",
      hasForm: true,
      formFields: [
        { name: "firstName", label: "First Names" },
        { name: "lastName", label: "Last Names" },
        { name: "placeLived", label: "Place Lived" },
        { name: "birthYear", label: "Birth Year" }
      ],
      buttons: [{ text: "Search", link: "https://www.familysearch.org/en/search/", emphasis: "high" }],
      image: "None"
    },
    {
      header: "Find your immigrant ancestor in United States records",
      subheader: "Search millions of passenger lists, border crossings, naturalizations, and other records to discover your ancestor's journey in a new land",
      hasForm: false,
      buttons: [],
      image: "Placeholder",
      link: "https://www.familysearch.org/en/united-states/immigration-records"
    },
    {
      header: "Find your African American ancestors.",
      subheader: "Search the largest collection of African American historical records, ancestor profiles, and photographs, at once.",
      hasForm: false,
      buttons: [],
      image: "Placeholder",
      link: "https://www.familysearch.org/en/united-states/ethnicities/african-american"
    },
    {
      header: "Find your family in the 1950 US Census records",
      subheader: "The census is full of rich and interesting details about life in 1950s America. See what you can learn about your own family.",
      hasForm: false,
      buttons: [],
      image: "Placeholder",
      link: "https://www.familysearch.org/en/1950Census"
    }
  ]
};

// SVG icon markup stored as strings - keeping them simple without JSX issues
const icons = {
  census: '<rect width="38" height="38" rx="8" fill="#d6e8e6"/><rect x="11" y="12" width="16" height="14" rx="2" fill="#006666"/><rect x="14" y="15" width="10" height="8" rx="1" fill="#fff"/>',
  immigration: '<rect width="38" height="38" rx="8" fill="#e1f5f2"/><path d="M12 26h14l-2-8h-10l-2 8z" fill="#006666"/><rect x="17" y="10" width="4" height="8" fill="#009999"/>',
  heritage: '<rect width="38" height="38" rx="8" fill="#ffe082"/><circle cx="19" cy="19" r="7" fill="#b27d00"/><circle cx="19" cy="19" r="3" fill="#fff"/>',
  parish: '<rect width="38" height="38" rx="8" fill="#e1f5f2"/><polygon points="19,10 25,28 13,28" fill="#e6b800"/><circle cx="19" cy="19" r="3" fill="#009999"/>',
  civil: '<rect width="38" height="38" rx="8" fill="#ffe7ba"/><rect x="11" y="17" width="16" height="4" rx="2" fill="#e6b800"/><circle cx="19" cy="19" r="2" fill="#b27d00"/>',
  historical: '<rect width="38" height="38" rx="8" fill="#d6e8e6"/><circle cx="19" cy="19" r="7" fill="#006666"/><circle cx="19" cy="19" r="3" fill="#fff"/>',
  church: '<rect width="38" height="38" rx="8" fill="#ffe082"/><circle cx="19" cy="19" r="7" fill="#b27d00"/><circle cx="19" cy="19" r="3" fill="#fff"/>',
  household: '<rect width="38" height="38" rx="8" fill="#e1f5f2"/><path d="M12 26h14l-2-8h-10l-2 8z" fill="#006666"/><rect x="17" y="10" width="4" height="8" fill="#009999"/>',
  probate: '<rect width="38" height="38" rx="8" fill="#d6e8e6"/><polygon points="19,10 25,28 13,28" fill="#e6b800"/><circle cx="19" cy="19" r="3" fill="#009999"/>',
  genealogy: '<rect width="38" height="38" rx="8" fill="#e1f5f2"/><polygon points="19,10 25,28 13,28" fill="#e6b800"/><circle cx="19" cy="19" r="3" fill="#009999"/>'
};

export const countryCollections = {
  'Australia': [
    { title: 'Australia, Victoria, Coastal Passenger Lists, 1852-1924', desc: '3,244,620 records', description: 'Passenger arrival and departure records', link: 'https://www.familysearch.org/en/search/collection/2484773', icon: icons.immigration },
    { title: 'Australia, Victoria, Petty Sessions Registers, 1858-1985', desc: '3,095,843 records', description: 'Historical records and documents', link: 'https://www.familysearch.org/en/search/collection/2485052', icon: icons.historical },
    { title: 'Australia, Queensland, Cemetery Records, 1802-1990', desc: '2,168,403 records', description: 'Cemetery and burial records', link: 'https://www.familysearch.org/en/search/collection/1927198', icon: icons.historical },
    { title: 'Australia, Victoria, Outward Passenger Lists, 1852-1924', desc: '1,862,984 records', description: 'Passenger arrival and departure records', link: 'https://www.familysearch.org/en/search/collection/2527519', icon: icons.immigration },
    { title: 'Australia, Cemetery Inscriptions, 1802-2005', desc: '1,124,406 records', description: 'Cemetery and burial records', link: 'https://www.familysearch.org/en/search/collection/2115584', icon: icons.historical },
  ],
  'Brazil': [
    { title: 'Brazil, Rio de Janeiro, Civil Registration, 1804-2013', desc: '6,379,080 records', description: 'Birth, marriage, and death certificates', link: 'https://www.familysearch.org/en/search/collection/1582573', icon: icons.civil },
    { title: 'Brazil, São Paulo, Civil Registration, 1925-2023', desc: '4,486,374 records', description: 'Birth, marriage, and death certificates', link: 'https://www.familysearch.org/en/search/collection/2765317', icon: icons.civil },
    { title: 'Brazil, Cemetery Records, 1799-2024', desc: '4,414,028 records', description: 'Cemetery and burial records', link: 'https://www.familysearch.org/en/search/collection/2137269', icon: icons.historical },
    { title: 'Brazil, São Paulo, Catholic Church Records, 1640-2013', desc: '4,018,558 records', description: 'Baptisms, marriages, and burials', link: 'https://www.familysearch.org/en/search/collection/2177299', icon: icons.church },
    { title: 'Brazil, Pernambuco, Catholic Church Records, 1762-2019', desc: '2,631,795 records', description: 'Baptisms, marriages, and burials', link: 'https://www.familysearch.org/en/search/collection/2177293', icon: icons.church },
  ],
  'Canada': [
    { title: 'Canada, Census, 1911', desc: '7,246,159 records', description: 'Population schedules and enumeration data', link: 'https://www.familysearch.org/en/search/collection/2143998', icon: icons.census },
    { title: 'Canada, Ontario, Tax Assessment Rolls, 1827-1922', desc: '6,231,709 records', description: 'Tax assessment records', link: 'https://www.familysearch.org/en/search/collection/4130007', icon: icons.census },
    { title: 'Canada, Census, 1901', desc: '5,343,565 records', description: 'Population schedules and enumeration data', link: 'https://www.familysearch.org/en/search/collection/1584557', icon: icons.census },
    { title: 'Canada, Census, 1891', desc: '4,787,225 records', description: 'Population schedules and enumeration data', link: 'https://www.familysearch.org/en/search/collection/1583536', icon: icons.census },
    { title: 'Canada, Census, 1881', desc: '4,281,160 records', description: 'Population schedules and enumeration data', link: 'https://www.familysearch.org/en/search/collection/1804541', icon: icons.census },
  ],
  'China': [
    { title: 'China, Imperial Examinations and Related Papers (Han Yu-shan Collection), 1646-1904', desc: '455 records', description: 'Historical records and documents', link: 'https://www.familysearch.org/en/search/collection/2490249', icon: icons.historical },
  ],
  'England': [
    { title: 'England and Wales, Birth Registration Index, 1837-2008', desc: '132,174,239 records', description: 'Birth registration records', link: 'https://www.familysearch.org/en/search/collection/2285338', icon: icons.civil },
    { title: 'England and Wales, Marriage Registration Index, 1837-2005', desc: '95,810,879 records', description: 'Marriage registration records', link: 'https://www.familysearch.org/en/search/collection/2285732', icon: icons.church },
    { title: 'England and Wales, Death Registration Index 1837-2007', desc: '87,446,270 records', description: 'Death registration records', link: 'https://www.familysearch.org/en/search/collection/2285341', icon: icons.civil },
    { title: 'England, Births and Christenings, 1538-1975', desc: '40,718,182 records', description: 'Church baptismal records', link: 'https://www.familysearch.org/en/search/collection/1473014', icon: icons.church },
    { title: 'England and Wales, Census, 1911', desc: '36,354,828 records', description: 'Population schedules and enumeration data', link: 'https://www.familysearch.org/en/search/collection/1921547', icon: icons.census },
  ],
  'Germany': [
    { title: 'Germany, Lutheran Baptisms, Marriages, and Burials, 1500-1971', desc: '76,097,837 records', description: 'Church baptismal records', link: 'https://www.familysearch.org/en/search/collection/3015626', icon: icons.church },
    { title: 'Germany, Births and Baptisms, 1558-1898', desc: '24,603,619 records', description: 'Church baptismal records', link: 'https://www.familysearch.org/en/search/collection/1473000', icon: icons.church },
    { title: 'Germany, Prussia, Posen, Catholic and Lutheran Church Records, 1430-1998', desc: '12,831,327 records', description: 'Lutheran parish registers', link: 'https://www.familysearch.org/en/search/collection/4116415', icon: icons.church },
    { title: 'Germany, Baden, Archdiocese of Freiburg im Breisgau, Catholic Church Records, 1463-1931', desc: '11,346,687 records', description: 'Baptisms, marriages, and burials', link: 'https://www.familysearch.org/en/search/collection/2790181', icon: icons.church },
    { title: 'Germany, Prussia, West Prussia, Catholic and Lutheran Church Records, 1537-1981', desc: '10,009,338 records', description: 'Lutheran parish registers', link: 'https://www.familysearch.org/en/search/collection/4111605', icon: icons.church },
  ],
  'Ireland': [
    { title: 'Ireland, Petty Sessions Court Registers, 1828-1912', desc: '21,724,267 records', description: 'Court records and legal proceedings', link: 'https://www.familysearch.org/en/search/collection/2487287', icon: icons.historical },
    { title: 'Ireland, Civil Registration Indexes, 1845-1958', desc: '18,958,897 records', description: 'Birth, marriage, and death certificates', link: 'https://www.familysearch.org/en/search/collection/1408347', icon: icons.civil },
    { title: 'Ireland, Catholic Parish Registers, 1740-1900', desc: '9,535,478 records', description: 'Baptisms, marriages, and burials', link: 'https://www.familysearch.org/en/search/collection/2820100', icon: icons.church },
    { title: 'Ireland, Valuation Office Books, 1831-1856', desc: '7,284,359 records', description: 'Historical records and documents', link: 'https://www.familysearch.org/en/search/collection/2329951', icon: icons.historical },
    { title: 'Ireland, Dog License Registrations, 1810-1926', desc: '7,270,375 records', description: 'Historical records and documents', link: 'https://www.familysearch.org/en/search/collection/5000212', icon: icons.historical },
  ],
  'Italy': [
    { title: 'Italy, Bari, Civil Registration (State Archive), 1809-1908', desc: '7,593,992 records', description: 'Birth, marriage, and death certificates', link: 'https://www.familysearch.org/en/search/collection/1968511', icon: icons.civil },
    { title: 'Italy, Toscana, Civil Registration (State Archive), 1804-1874', desc: '6,732,218 records', description: 'Birth, marriage, and death certificates', link: 'https://www.familysearch.org/en/search/collection/1932364', icon: icons.civil },
    { title: 'Italy, Napoli, Civil Registration (State Archive), 1809-1866', desc: '5,113,220 records', description: 'Birth, marriage, and death certificates', link: 'https://www.familysearch.org/en/search/collection/1937990', icon: icons.civil },
    { title: 'Italy, Salerno, Civil Registration (State Archive), 1806-1949', desc: '4,563,213 records', description: 'Birth, marriage, and death certificates', link: 'https://www.familysearch.org/en/search/collection/1935404', icon: icons.civil },
    { title: 'Italy, Torino, Torino, Civil Registration (Tribunale), 1866-1899', desc: '3,631,222 records', description: 'Birth, marriage, and death certificates', link: 'https://www.familysearch.org/en/search/collection/1967801', icon: icons.civil },
  ],
  'Japan': [
    { title: 'Japan, Emigration Records, 1893-1941', desc: '49,794 records', description: 'Emigration records', link: 'https://www.familysearch.org/en/search/collection/1803988', icon: icons.immigration },
  ],
  'Mexico': [
    { title: 'Mexico, Baptisms, 1560-1950', desc: '29,523,755 records', description: 'Church baptismal records', link: 'https://www.familysearch.org/en/search/collection/1473011', icon: icons.church },
    { title: 'Mexico, Guanajuato, Catholic Church Records, 1519-1984', desc: '11,057,682 records', description: 'Baptisms, marriages, and burials', link: 'https://www.familysearch.org/en/search/collection/1860831', icon: icons.church },
    { title: 'Mexico, México, Catholic Church Records, 1567-1970', desc: '8,394,844 records', description: 'Baptisms, marriages, and burials', link: 'https://www.familysearch.org/en/search/collection/1837908', icon: icons.church },
    { title: 'Mexico, Jalisco, Catholic Church Records, 1590-2022', desc: '8,350,860 records', description: 'Baptisms, marriages, and burials', link: 'https://www.familysearch.org/en/search/collection/1874591', icon: icons.church },
    { title: 'Mexico, Jalisco, Civil Registration, 1857-2000', desc: '7,166,874 records', description: 'Birth, marriage, and death certificates', link: 'https://www.familysearch.org/en/search/collection/1918187', icon: icons.civil },
  ],
  'New Zealand': [
    { title: 'New Zealand, Electoral Rolls, 1865-1957', desc: '12,309,008 records', description: 'Electoral rolls and voter registrations', link: 'https://www.familysearch.org/en/search/collection/3662227', icon: icons.census },
    { title: 'New Zealand, Archives New Zealand, Passenger Lists, 1839-1974', desc: '7,264,551 records', description: 'Passenger arrival and departure records', link: 'https://www.familysearch.org/en/search/collection/1609792', icon: icons.immigration },
    { title: 'New Zealand, Obituaries, 1844-1963', desc: '1,768,692 records', description: 'Obituary records', link: 'https://www.familysearch.org/en/search/collection/2538222', icon: icons.historical },
    { title: 'New Zealand, Civil Records Indexes, 1800-1966', desc: '1,758,729 records', description: 'Historical records and documents', link: 'https://www.familysearch.org/en/search/collection/2697870', icon: icons.historical },
    { title: 'New Zealand, Cemetery Transcriptions, 1835-2006', desc: '417,004 records', description: 'Cemetery and burial records', link: 'https://www.familysearch.org/en/search/collection/2780088', icon: icons.historical },
  ],
  'Northern Ireland': [
    { title: 'Northern Ireland, Tithe Applotment Books, 1822-1840', desc: '397,856 records', description: 'Historical records and documents', link: 'https://www.familysearch.org/en/search/collection/2729531', icon: icons.historical },
    { title: 'Northern Ireland, Death Records, 1998-2015', desc: '72,539 records', description: 'Historical records and documents', link: 'https://www.familysearch.org/en/search/collection/4441751', icon: icons.historical },
  ],
  'Norway': [
    { title: 'Norway, Church Books, 1797-1958', desc: '14,398,439 records', description: 'Historical records and documents', link: 'https://www.familysearch.org/en/search/collection/4237104', icon: icons.church },
    { title: 'Norway, Baptisms, 1634-1927', desc: '5,277,294 records', description: 'Church baptismal records', link: 'https://www.familysearch.org/en/search/collection/1467014', icon: icons.church },
    { title: 'Norway, Census, 1891', desc: '2,727,197 records', description: 'Population schedules and enumeration data', link: 'https://www.familysearch.org/en/search/collection/4067726', icon: icons.census },
    { title: 'Norway, Census, 1900', desc: '2,260,720 records', description: 'Population schedules and enumeration data', link: 'https://www.familysearch.org/en/search/collection/3744863', icon: icons.census },
    { title: 'Norway, Census, 1865', desc: '1,688,075 records', description: 'Population schedules and enumeration data', link: 'https://www.familysearch.org/en/search/collection/3756102', icon: icons.census },
  ],
  'Philippines': [
    { title: 'Philippines, Catholic Church Records, 1520-2014', desc: '12,213,164 records', description: 'Baptisms, marriages, and burials', link: 'https://www.familysearch.org/en/search/collection/2861657', icon: icons.church },
    { title: 'Philippines Civil Registration (National), 1945-1996', desc: '5,264,264 records', description: 'Birth, marriage, and death certificates', link: 'https://www.familysearch.org/en/search/collection/1852584', icon: icons.civil },
    { title: 'Philippines, Neighborhood Census, 1836-1899', desc: '4,388,414 records', description: 'Population schedules and enumeration data', link: 'https://www.familysearch.org/en/search/collection/5000268', icon: icons.census },
    { title: 'Philippines, Church Census, 1542-1980', desc: '4,340,954 records', description: 'Population schedules and enumeration data', link: 'https://www.familysearch.org/en/search/collection/5000216', icon: icons.church },
    { title: 'Philippines, Deaths and Burials, 1726-1998', desc: '2,781,591 records', description: 'Historical records and documents', link: 'https://www.familysearch.org/en/search/collection/1500714', icon: icons.church },
  ],
  'Portugal': [
    { title: 'Portugal, Lisbon, Catholic Church Records, 1334-1998', desc: '3,203,007 records', description: 'Baptisms, marriages, and burials', link: 'https://www.familysearch.org/en/search/collection/4449050', icon: icons.church },
    { title: 'Portugal, Porto, Catholic Church Records, 1535-2006', desc: '2,768,292 records', description: 'Baptisms, marriages, and burials', link: 'https://www.familysearch.org/en/search/collection/1913408', icon: icons.church },
    { title: 'Portugal, Viseu, Catholic Church Records, 1523-1989', desc: '2,163,002 records', description: 'Baptisms, marriages, and burials', link: 'https://www.familysearch.org/en/search/collection/1928589', icon: icons.church },
    { title: 'Portugal, Portalegre, Catholic Church Records, 1532-1928', desc: '2,077,104 records', description: 'Baptisms, marriages, and burials', link: 'https://www.familysearch.org/en/search/collection/2014755', icon: icons.church },
    { title: 'Portugal, Coimbra, Catholic Church Records, 1459-1999', desc: '2,022,959 records', description: 'Baptisms, marriages, and burials', link: 'https://www.familysearch.org/en/search/collection/1928593', icon: icons.church },
  ],
  'Scotland': [
    { title: 'Scotland, Births and Baptisms, 1564-1950', desc: '8,079,105 records', description: 'Church baptismal records', link: 'https://www.familysearch.org/en/search/collection/1771030', icon: icons.church },
    { title: 'Scotland, Civil Registration, 1855-1875, 1881, 1891', desc: '5,147,127 records', description: 'Birth, marriage, and death certificates', link: 'https://www.familysearch.org/en/search/collection/5000163', icon: icons.civil },
    { title: 'Scotland, Marriages, 1561-1910', desc: '1,999,716 records', description: 'Historical records and documents', link: 'https://www.familysearch.org/en/search/collection/1771074', icon: icons.church },
    { title: 'Scotland, Death Records,1998-2015', desc: '429,095 records', description: 'Historical records and documents', link: 'https://www.familysearch.org/en/search/collection/4441753', icon: icons.historical },
    { title: 'Scotland, Church Records and Kirk Session Records, 1658-1919', desc: '227,382 records', description: 'Historical records and documents', link: 'https://www.familysearch.org/en/search/collection/2390848', icon: icons.church },
  ],
  'South Africa': [
    { title: 'South Africa, Dutch Reformed Church Registers (Cape Town Archives), 1660-1994 ', desc: '3,030,218 records', description: 'Historical records and documents', link: 'https://www.familysearch.org/en/search/collection/1478678', icon: icons.church },
    { title: 'South Africa, Cape Province, Civil Records, 1840-1972', desc: '2,800,824 records', description: 'Historical records and documents', link: 'https://www.familysearch.org/en/search/collection/1779109', icon: icons.historical },
    { title: 'South Africa, Civil Marriage Records, 1801-1974', desc: '2,557,010 records', description: 'Historical records and documents', link: 'https://www.familysearch.org/en/search/collection/2821281', icon: icons.church },
    { title: 'South Africa, Gauteng, Johannesburg, Cemetery Records, 1840-2019', desc: '2,272,299 records', description: 'Cemetery and burial records', link: 'https://www.familysearch.org/en/search/collection/4453927', icon: icons.historical },
    { title: 'South Africa, Cape, Probate Records of the Master of the High Court, 1822-1990', desc: '2,014,794 records', description: 'Court records and legal proceedings', link: 'https://www.familysearch.org/en/search/collection/2517051', icon: icons.historical },
  ],
  'Spain': [
    { title: 'Spain, Catholic Church Records, 1307-2005', desc: '18,518,441 records', description: 'Baptisms, marriages, and burials', link: 'https://www.familysearch.org/en/search/collection/1784529', icon: icons.church },
    { title: 'Spain, Baptisms, 1502-1940', desc: '8,173,079 records', description: 'Church baptismal records', link: 'https://www.familysearch.org/en/search/collection/1500692', icon: icons.church },
    { title: 'Spain, Aragón, Electoral Censuses, 1890-1955', desc: '4,972,408 records', description: 'Population schedules and enumeration data', link: 'https://www.familysearch.org/en/search/collection/2304578', icon: icons.census },
    { title: 'Spain, Diocese of Cartagena, Catholic Church Records, 1503-1969', desc: '2,445,160 records', description: 'Baptisms, marriages, and burials', link: 'https://www.familysearch.org/en/search/collection/2345225', icon: icons.church },
    { title: 'Spain, Marriages, 1565-1950', desc: '2,269,515 records', description: 'Historical records and documents', link: 'https://www.familysearch.org/en/search/collection/1500693', icon: icons.church },
  ],
  'United States': [
    { title: 'United States, Public Records, 1970-2009', desc: '875,600,997 records', description: 'Historical records and documents', link: 'https://www.familysearch.org/en/search/collection/2199956', icon: icons.historical },
    { title: 'United States, Residence Database, 1970-2024', desc: '413,859,609 records', description: 'Historical records and documents', link: 'https://www.familysearch.org/en/search/collection/5000290', icon: icons.historical },
    { title: 'United States, Census, 1950', desc: '157,892,854 records', description: 'Population schedules and enumeration data', link: 'https://www.familysearch.org/en/search/collection/4464515', icon: icons.census },
    { title: 'United States, Census, 1940', desc: '134,774,707 records', description: 'Population schedules and enumeration data', link: 'https://www.familysearch.org/en/search/collection/2000219', icon: icons.census },
    { title: 'United States, Census, 1930', desc: '125,136,392 records', description: 'Population schedules and enumeration data', link: 'https://www.familysearch.org/en/search/collection/1810731', icon: icons.census },
  ],
  'Wales': [
    { title: 'Wales, Glamorgan, West Glamorgan, Electoral Registers, 1839-1925', desc: '1,643,483 records', description: 'Electoral rolls and voter registrations', link: 'https://www.familysearch.org/en/search/collection/1546473', icon: icons.census },
    { title: 'Wales, Glamorgan Parish Registers, 1558-1900', desc: '921,889 records', description: 'Baptisms, marriages, and burials', link: 'https://www.familysearch.org/en/search/collection/1952632', icon: icons.church },
    { title: 'Wales, Glamorganshire, Parish Registers, 1538-1912', desc: '731,146 records', description: 'Baptisms, marriages, and burials', link: 'https://www.familysearch.org/en/search/collection/2075047', icon: icons.church },
    { title: 'Wales, Births and Baptisms, 1541-1907', desc: '686,084 records', description: 'Church baptismal records', link: 'https://www.familysearch.org/en/search/collection/1783957', icon: icons.church },
    { title: 'Wales, Denbighshire, Parish Registers, 1538-1912', desc: '685,838 records', description: 'Baptisms, marriages, and burials', link: 'https://www.familysearch.org/en/search/collection/1419318', icon: icons.church },
  ],
};
