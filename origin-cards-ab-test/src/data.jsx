// Country & collections data
// Top countries to display as chips for each test country
export const countryChipsConfig = {
  'United States': ['United States', 'England', 'Germany', 'Mexico', 'Italy'],
  'Philippines': ['Philippines', 'China', 'Spain', 'United States'],
  'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland', 'United States'],
  'Brasil': ['Brazil', 'Portugal', 'Italy', 'Spain', 'Germany'],
  'Egypt': ['Egypt', 'England'],
  'China': ['China', 'Taiwan', 'United States', 'England']
};

// All countries available in the overlay
export const overlayCountries = ['Australia','Brazil','Cambodia','Canada','China','Egypt','England','Germany','Ireland','Italy','Japan','Korea','Mexico','New Zealand','Northern Ireland','Norway','Philippines','Portugal','Scotland','Spain','Taiwan','United States','Wales'];

// Origin cards content by country
export const originCardsContent = {
  Australia: [
    {
      header: "Click your state for facts, history, and records",
      subheader: "Ever wonder what makes your state special? Click your home on the map to discover its unique history. Search historical records and unearth stories waiting to be shared.",
      hasForm: false,
      buttons: [],
      image: "Placeholder"
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
      header: "Search your Last Name",
      subheader: "",
      hasForm: true,
      formFields: [{ name: "lastName", label: "Last Name" }],
      buttons: [{ text: "Search", link: "#", emphasis: "high" }],
      image: "Placeholder"
    }
  ],
  Japan: [
    {
      header: "About the Find a Grave Project",
      subheader: "We've teamed up with Find a Grave to bring you more cemetery records.",
      hasForm: false,
      buttons: [{ text: "Learn more", link: "#", emphasis: "high" }],
      image: "Placeholder"
    },
    {
      header: "Create your family tree keepsake!",
      subheader: "Printable family keepsakes are a fun way to display and share your family tree.",
      hasForm: false,
      buttons: [],
      image: "Section"
    },
    {
      header: "Keepsake 1",
      subheader: "",
      hasForm: false,
      buttons: [{ text: "PDF Download", link: "https://cms-z-assets.familysearch.org/6f/53/a62defc146caa1b4fcbb1768e236/keepsake-2.pdf", emphasis: "high" }],
      image: "Placeholder"
    },
    {
      header: "Keepsake 2",
      subheader: "",
      hasForm: false,
      buttons: [{ text: "PDF Download", link: "https://cms-z-assets.familysearch.org/6f/53/a62defc146caa1b4fcbb1768e236/keepsake-2.pdf", emphasis: "high" }],
      image: "Placeholder"
    },
    {
      header: "Keepsake 3",
      subheader: "",
      hasForm: false,
      buttons: [{ text: "PDF Download", link: "https://cms-z-assets.familysearch.org/6f/53/a62defc146caa1b4fcbb1768e236/keepsake-2.pdf", emphasis: "high" }],
      image: "Placeholder"
    },
    {
      header: "Your story is worth remembering",
      subheader: "Watch as 5 ordinary people learn about the indelible mark they've left on others.",
      hasForm: false,
      buttons: [{ text: "Watch video", link: "#", emphasis: "high" }],
      image: "Placeholder",
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
      header: "Discover more about your favorite regions of New Zealand.",
      subheader: "Explore regions and histories across Aotearoa by interacting with the map.",
      hasForm: false,
      buttons: [],
      image: "Placeholder",
      link: ""
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
  'United States': [
    { title: 'United States Census, 1950', desc: '157,892,854 records', description: 'Population schedules and enumeration data', link: 'https://www.familysearch.org/en/search/collection/4464515', icon: icons.census },
    { title: 'United States Census, 1940', desc: '134,774,707 records', description: 'Population schedules and enumeration data', link: 'https://www.familysearch.org/en/search/collection/2000219', icon: icons.census },
    { title: 'United States Census, 1930', desc: '125,136,392 records', description: 'Population schedules and enumeration data', link: 'https://www.familysearch.org/en/search/collection/1810731', icon: icons.census },
    { title: 'United States Census, 1920', desc: '107,660,195 records', description: 'Population schedules and enumeration data', link: 'https://www.familysearch.org/en/search/collection/1488411', icon: icons.census },
    { title: 'United States, Social Security Death Index', desc: '93,945,910 records', description: 'Death benefit claims and social security records', link: 'https://www.familysearch.org/en/search/collection/1202535', icon: icons.historical }
  ],
  'Philippines': [
    { title: 'Philippines, Catholic Church Records, 1520-2014', desc: '12,213,164 records', description: 'Baptisms, marriages, and burials from Catholic parishes', link: 'https://www.familysearch.org/en/search/collection/2861657', icon: icons.church },
    { title: 'Philippines Civil Registration (National), 1945-1996', desc: '5,264,264 records', description: 'Birth, marriage, and death certificates', link: 'https://www.familysearch.org/en/search/collection/1852584', icon: icons.civil },
    { title: 'Philippines, Neighborhood Census, 1836-1899', desc: '4,388,414 records', description: 'Local population counts and household data', link: 'https://www.familysearch.org/en/search/collection/5000268', icon: icons.census },
    { title: 'Philippines, Church Census, 1542-1980', desc: '4,340,954 records', description: 'Parish membership and family records', link: 'https://www.familysearch.org/en/search/collection/5000216', icon: icons.census },
    { title: 'Philippines, Deaths and Burials, 1726-1998', desc: '2,781,591 records', description: 'Mortality records and burial registers', link: 'https://www.familysearch.org/en/search/collection/1500714', icon: icons.historical }
  ],
  'Mexico': [
    { title: 'Mexico, Baptisms, 1560-1950', desc: '29,523,755 records', description: 'Catholic baptismal records nationwide', link: 'https://www.familysearch.org/en/search/collection/1473011', icon: icons.church },
    { title: 'Mexico, Guanajuato, Catholic Church Records, 1519-1984', desc: '11,057,682 records', description: 'Baptisms, marriages, and burials from Guanajuato', link: 'https://www.familysearch.org/en/search/collection/1860831', icon: icons.church },
    { title: 'Mexico, Jalisco, Catholic Church Records, 1590-2022', desc: '8,350,860 records', description: 'Baptisms, marriages, and burials from Jalisco', link: 'https://www.familysearch.org/en/search/collection/1874591', icon: icons.church },
    { title: 'Mexico, México, Catholic Church Records, 1567-1970', desc: '8,394,844 records', description: 'Baptisms, marriages, and burials from México state', link: 'https://www.familysearch.org/en/search/collection/1837908', icon: icons.church },
    { title: 'Mexico, Jalisco, Civil Registration, 1857-2000', desc: '7,166,874 records', description: 'Birth, marriage, and death certificates', link: 'https://www.familysearch.org/en/search/collection/1918187', icon: icons.civil }
  ],
  'United Kingdom': [
    { title: 'United Kingdom, Outgoing Passenger Lists, 1890-1960', desc: '24,113,045 records', description: 'Emigration records and passenger manifests', link: 'https://www.familysearch.org/en/search/collection/4229516', icon: icons.immigration },
    { title: 'United Kingdom, Funeral Notices, 1914-2023', desc: '4,987,936 records', description: 'Obituaries and funeral announcements', link: 'https://www.familysearch.org/en/search/collection/5000184', icon: icons.historical },
    { title: 'United Kingdom, World War I Service Records, 1914-1920', desc: '4,176,129 records', description: 'Military service records from WWI', link: 'https://www.familysearch.org/en/search/collection/2125045', icon: icons.historical },
    { title: 'United Kingdom, British Armed Forces Records, 1761-2005', desc: '2,878,200 records', description: 'Military personnel records', link: 'https://www.familysearch.org/en/search/collection/4324570', icon: icons.historical },
    { title: 'United Kingdom, Merchant Navy Seamen Records, 1835-1941', desc: '2,607,986 records', description: 'Merchant seamen service records', link: 'https://www.familysearch.org/en/search/collection/1762440', icon: icons.historical }
  ],
  'Germany': [
    { title: 'Germany, Lutheran Baptisms, Marriages, and Burials, 1500-1971', desc: '76,097,837 records', description: 'Lutheran parish registers nationwide', link: 'https://www.familysearch.org/en/search/collection/3015626', icon: icons.church },
    { title: 'Germany, Births and Baptisms, 1558-1898', desc: '24,603,619 records', description: 'Birth and baptismal records', link: 'https://www.familysearch.org/en/search/collection/1473000', icon: icons.church },
    { title: 'Germany, Prussia, Posen, Catholic and Lutheran Church Records, 1430-1998', desc: '12,831,327 records', description: 'Church records from Posen province', link: 'https://www.familysearch.org/en/search/collection/4116415', icon: icons.church },
    { title: 'Germany, Baden, Archdiocese of Freiburg, Catholic Church Records, 1463-1931', desc: '11,346,687 records', description: 'Catholic records from Baden region', link: 'https://www.familysearch.org/en/search/collection/2790181', icon: icons.church },
    { title: 'Germany, Prussia, West Prussia, Catholic and Lutheran Church Records, 1537-1981', desc: '10,009,338 records', description: 'Church records from West Prussia', link: 'https://www.familysearch.org/en/search/collection/4111605', icon: icons.church }
  ],
  'Brazil': [
    { title: 'Brazil, Rio de Janeiro, Civil Registration, 1804-2013', desc: '6,379,080 records', description: 'Birth, marriage, and death certificates', link: 'https://www.familysearch.org/en/search/collection/1582573', icon: icons.civil },
    { title: 'Brazil, São Paulo, Civil Registration, 1925-2023', desc: '4,486,374 records', description: 'Birth, marriage, and death certificates', link: 'https://www.familysearch.org/en/search/collection/2765317', icon: icons.civil },
    { title: 'Brazil, Cemetery Records, 1799-2024', desc: '4,414,028 records', description: 'Burial records and cemetery inscriptions', link: 'https://www.familysearch.org/en/search/collection/2137269', icon: icons.historical },
    { title: 'Brazil, São Paulo, Catholic Church Records, 1640-2013', desc: '4,018,558 records', description: 'Baptisms, marriages, and burials from São Paulo', link: 'https://www.familysearch.org/en/search/collection/2177299', icon: icons.church },
    { title: 'Brazil, Ceará, Civil Registration, 1823-2017', desc: '3,393 records', description: 'Birth, marriage, and death certificates', link: 'https://www.familysearch.org/en/search/collection/4157393', icon: icons.civil }
  ],
  'Italy': [
    { title: 'Italy, Bari, Civil Registration (State Archive), 1809-1908', desc: '7,593,992 records', description: 'Vital records from Bari province', link: 'https://www.familysearch.org/en/search/collection/1968511', icon: icons.civil },
    { title: 'Italy, Catania, Civil Registration (State Archive), 1820-1900', desc: '3,020,277 records', description: 'Vital records from Catania province', link: 'https://www.familysearch.org/en/search/collection/2821289', icon: icons.civil },
    { title: 'Italy, Bergamo, Civil Registration (State Archive), 1866-1903', desc: '2,538,066 records', description: 'Vital records from Bergamo province', link: 'https://www.familysearch.org/en/search/collection/1986789', icon: icons.civil },
    { title: 'Italy, Avellino, Civil Registration (State Archive), 1809-1947', desc: '2,324,610 records', description: 'Vital records from Avellino province', link: 'https://www.familysearch.org/en/search/collection/2484771', icon: icons.civil },
    { title: 'Italy, Births and Baptisms, 1806-1900', desc: '1,151,133 records', description: 'Birth and baptismal records nationwide', link: 'https://www.familysearch.org/en/search/collection/1708706', icon: icons.church }
  ],
  'Spain': [
    { title: 'Spain, Catholic Church Records, 1307-2005', desc: '18,518,441 records', description: 'Baptisms, marriages, and burials nationwide', link: 'https://www.familysearch.org/en/search/collection/1784529', icon: icons.church },
    { title: 'Spain, Baptisms, 1502-1940', desc: '8,173,079 records', description: 'Catholic baptismal records', link: 'https://www.familysearch.org/en/search/collection/1500692', icon: icons.church },
    { title: 'Spain, Aragón, Electoral Censuses, 1890-1955', desc: '4,972,408 records', description: 'Voter registration records from Aragón', link: 'https://www.familysearch.org/en/search/collection/2304578', icon: icons.census },
    { title: 'Spain, Diocese of Cartagena, Catholic Church Records, 1503-1969', desc: '2,445,160 records', description: 'Church records from Cartagena diocese', link: 'https://www.familysearch.org/en/search/collection/2345225', icon: icons.church },
    { title: 'Spain, Marriages, 1565-1950', desc: '2,269,515 records', description: 'Catholic marriage records', link: 'https://www.familysearch.org/en/search/collection/1500693', icon: icons.church }
  ],
  'Australia': [
    { title: 'Australia, Victoria, Coastal Passenger Lists, 1852-1924', desc: '3,244,620 records', description: 'Arrival records for coastal ports', link: 'https://www.familysearch.org/en/search/collection/2484773', icon: icons.immigration },
    { title: 'Australia, Victoria, Petty Sessions Registers, 1858-1985', desc: '3,095,843 records', description: 'Local court records', link: 'https://www.familysearch.org/en/search/collection/2485052', icon: icons.historical },
    { title: 'Australia, Queensland, Cemetery Records, 1802-1990', desc: '2,168,403 records', description: 'Burial records and cemetery inscriptions', link: 'https://www.familysearch.org/en/search/collection/1927198', icon: icons.historical },
    { title: 'Australia, Victoria, Outward Passenger Lists, 1852-1924', desc: '1,862,984 records', description: 'Departure records from Victoria', link: 'https://www.familysearch.org/en/search/collection/2527519', icon: icons.immigration },
    { title: 'Australia, Cemetery Inscriptions, 1802-2005', desc: '1,124,406 records', description: 'Gravestone transcriptions nationwide', link: 'https://www.familysearch.org/en/search/collection/2115584', icon: icons.historical }
  ],
  'Canada': [
    { title: 'Canada Census, 1921', desc: '360,440 records', description: 'Population schedules and enumeration data', link: 'https://www.familysearch.org/en/search/collection/5000285', icon: icons.census }
  ],
  'Portugal': [
    { title: 'Portugal, Aveiro, Catholic Church Records, 1550-1957', desc: '1,048,310 records', description: 'Baptisms, marriages, and burials from Aveiro', link: 'https://www.familysearch.org/en/search/collection/1928590', icon: icons.church },
    { title: 'Portugal, Azores, Catholic Church Records, 1542-2019', desc: '909,389 records', description: 'Baptisms, marriages, and burials from Azores', link: 'https://www.familysearch.org/en/search/collection/4449047', icon: icons.church },
    { title: 'Portugal, Beja, Catholic Church Records, 1550-1913', desc: '811,761 records', description: 'Baptisms, marriages, and burials from Beja', link: 'https://www.familysearch.org/en/search/collection/2001878', icon: icons.church },
    { title: 'Portugal Baptisms, 1570-1910', desc: '304,378 records', description: 'Catholic baptismal records nationwide', link: 'https://www.familysearch.org/en/search/collection/1520601', icon: icons.church },
    { title: 'Portugal, Aveiro, Passport Registers, 1882-1965', desc: '165,840 records', description: 'Passport applications and emigration records', link: 'https://www.familysearch.org/en/search/collection/1923672', icon: icons.immigration }
  ],
  'Norway': [
    { title: 'Norway, Church Books, 1797-1958', desc: '14,398,439 records', description: 'Parish registers of baptisms, marriages, and burials', link: 'https://www.familysearch.org/en/search/collection/4237104', icon: icons.church },
    { title: 'Norway, Baptisms, 1634-1927', desc: '5,277,294 records', description: 'Church baptismal records', link: 'https://www.familysearch.org/en/search/collection/1467014', icon: icons.church },
    { title: 'Norway, Census, 1891', desc: '2,727,197 records', description: 'Population schedules and household data', link: 'https://www.familysearch.org/en/search/collection/4067726', icon: icons.census },
    { title: 'Norway, Census, 1900', desc: '2,260,720 records', description: 'Population schedules and household data', link: 'https://www.familysearch.org/en/search/collection/3744863', icon: icons.census },
    { title: 'Norway, Census, 1865', desc: '1,688,075 records', description: 'Population schedules and household data', link: 'https://www.familysearch.org/en/search/collection/3756102', icon: icons.census }
  ],
  'China': [],
  'Indonesia': [],
  'Malaysia': [],
  'Korea': [],
  'Cambodia': [],
  'New Zealand': [],
  'Pacific Islands': [],
  'Taiwan': [],
  'Egypt': [],
  'Greece': [],
  'Turkey': [],
  'Sudan': [],
  'England': [
    { title: 'England and Wales, Birth Registration Index, 1837-2008', desc: '132,174,239 records', description: 'Civil registration birth records index', link: 'https://www.familysearch.org/en/search/collection/2285338', icon: icons.civil },
    { title: 'England and Wales, Marriage Registration Index, 1837-2005', desc: '95,810,879 records', description: 'Civil registration marriage records index', link: 'https://www.familysearch.org/en/search/collection/2285732', icon: icons.civil },
    { title: 'England and Wales, Death Registration Index 1837-2007', desc: '87,446,270 records', description: 'Civil registration death records index', link: 'https://www.familysearch.org/en/search/collection/2285341', icon: icons.civil },
    { title: 'England, Births and Christenings, 1538-1975', desc: '40,718,182 records', description: 'Parish baptism and birth records', link: 'https://www.familysearch.org/en/search/collection/1473014', icon: icons.church },
    { title: 'England and Wales, Census, 1911', desc: '36,354,828 records', description: 'Population schedules and household data', link: 'https://www.familysearch.org/en/search/collection/1921547', icon: icons.census }
  ],
  'Scotland': [
    { title: 'Scotland, Births and Baptisms, 1564-1950', desc: '8,079,105 records', description: 'Parish baptism and birth records', link: 'https://www.familysearch.org/en/search/collection/1771030', icon: icons.church },
    { title: 'Scotland, Civil Registration, 1855-1875, 1881, 1891', desc: '5,147,127 records', description: 'Birth, marriage, and death certificates', link: 'https://www.familysearch.org/en/search/collection/5000163', icon: icons.civil },
    { title: 'Scotland, Marriages, 1561-1910', desc: '1,999,716 records', description: 'Parish marriage records', link: 'https://www.familysearch.org/en/search/collection/1771074', icon: icons.church },
    { title: 'Scotland, Death Records,1998-2015', desc: '429,095 records', description: 'Recent death registration records', link: 'https://www.familysearch.org/en/search/collection/4441753', icon: icons.civil },
    { title: 'Scotland, Church Records and Kirk Session Records, 1658-1919', desc: '227,382 records', description: 'Church session and membership records', link: 'https://www.familysearch.org/en/search/collection/2390848', icon: icons.church }
  ],
  'Wales': [
    { title: 'Wales, Births and Baptisms, 1541-1907', desc: '686,084 records', description: 'Parish baptism and birth records', link: 'https://www.familysearch.org/en/search/collection/1783957', icon: icons.church },
    { title: 'Wales, Denbighshire, Parish Registers, 1538-1912', desc: '685,838 records', description: 'Baptisms, marriages, and burials from Denbighshire', link: 'https://www.familysearch.org/en/search/collection/1419318', icon: icons.church },
    { title: 'Wales, Flintshire, Parish Registers, 1538-1912', desc: '495,063 records', description: 'Baptisms, marriages, and burials from Flintshire', link: 'https://www.familysearch.org/en/search/collection/1426674', icon: icons.church },
    { title: 'Wales, Carmarthenshire, Parish Registers, 1538-1912', desc: '460,262 records', description: 'Baptisms, marriages, and burials from Carmarthenshire', link: 'https://www.familysearch.org/en/search/collection/1403176', icon: icons.church },
    { title: 'Wales, Brecknockshire, Parish Registers, 1538-1912', desc: '202,792 records', description: 'Baptisms, marriages, and burials from Brecknockshire', link: 'https://www.familysearch.org/en/search/collection/2075043', icon: icons.church }
  ],
  'Northern Ireland': [
    { title: 'Northern Ireland, Tithe Applotment Books, 1822-1840', desc: '397,856 records', description: 'Land tax assessment records', link: 'https://www.familysearch.org/en/search/collection/2729531', icon: icons.historical },
    { title: 'Northern Ireland, Death Records, 1998-2015', desc: '72,539 records', description: 'Recent death registration records', link: 'https://www.familysearch.org/en/search/collection/4441751', icon: icons.civil }
  ],
  'Ireland': [
    { title: 'Ireland, Petty Sessions Court Registers, 1828-1912', desc: '21,724,267 records', description: 'Local court records', link: 'https://www.familysearch.org/en/search/collection/2487287', icon: icons.historical },
    { title: 'Ireland, Civil Registration Indexes, 1845-1958', desc: '18,958,897 records', description: 'Birth, marriage, and death indexes', link: 'https://www.familysearch.org/en/search/collection/1408347', icon: icons.civil },
    { title: 'Ireland, Catholic Parish Registers, 1740-1900', desc: '9,535,478 records', description: 'Baptisms, marriages, and burials from Catholic parishes', link: 'https://www.familysearch.org/en/search/collection/2820100', icon: icons.church },
    { title: 'Ireland, Dog License Registrations, 1810-1926', desc: '7,270,375 records', description: 'Dog license registration records', link: 'https://www.familysearch.org/en/search/collection/5000212', icon: icons.household },
    { title: 'Ireland, Census, 1911', desc: '4,385,217 records', description: 'Population schedules and household data', link: 'https://www.familysearch.org/en/search/collection/2854327', icon: icons.census }
  ]
};
