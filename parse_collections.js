const fs = require('fs');

// Selected collections per country (top 3-5 most relevant general collections)
const countryCollections = {
  'United States': [
    { title: 'United States Census, 1950', records: '157,892,854', link: 'https://www.familysearch.org/en/search/collection/4464515', icon: 'census' },
    { title: 'United States Census, 1940', records: '134,774,707', link: 'https://www.familysearch.org/en/search/collection/2000219', icon: 'census' },
    { title: 'United States, Social Security Death Index', records: '93,945,910', link: 'https://www.familysearch.org/en/search/collection/1202535', icon: 'historical' }
  ],
  'Philippines': [
    { title: 'Philippines, Catholic Church Records, 1520-2014', records: '12,213,164', link: 'https://www.familysearch.org/en/search/collection/2861657', icon: 'church' },
    { title: 'Philippines Civil Registration (National), 1945-1996', records: '5,264,264', link: 'https://www.familysearch.org/en/search/collection/1852584', icon: 'civil' },
    { title: 'Philippines, Neighborhood Census, 1836-1899', records: '4,388,414', link: 'https://www.familysearch.org/en/search/collection/5000268', icon: 'census' }
  ],
  'Mexico': [
    { title: 'Mexico, Baptisms, 1560-1950', records: '29,523,755', link: 'https://www.familysearch.org/en/search/collection/1473011', icon: 'church' },
    { title: 'Mexico, Guanajuato, Catholic Church Records, 1519-1984', records: '11,057,682', link: 'https://www.familysearch.org/en/search/collection/1860831', icon: 'church' },
    { title: 'Mexico, Jalisco, Civil Registration, 1857-2000', records: '7,166,874', link: 'https://www.familysearch.org/en/search/collection/1918187', icon: 'civil' }
  ],
  'United Kingdom': [
    { title: 'United Kingdom, Outgoing Passenger Lists, 1890-1960', records: '24,113,045', link: 'https://www.familysearch.org/en/search/collection/4229516', icon: 'immigration' },
    { title: 'United Kingdom, World War I Service Records, 1914-1920', records: '4,176,129', link: 'https://www.familysearch.org/en/search/collection/2125045', icon: 'historical' },
    { title: 'United Kingdom, Funeral Notices, 1914-2023', records: '4,987,936', link: 'https://www.familysearch.org/en/search/collection/5000184', icon: 'historical' }
  ],
  'Germany': [
    { title: 'Germany, Lutheran Baptisms, Marriages, and Burials, 1500-1971', records: '76,097,837', link: 'https://www.familysearch.org/en/search/collection/3015626', icon: 'church' },
    { title: 'Germany, Births and Baptisms, 1558-1898', records: '24,603,619', link: 'https://www.familysearch.org/en/search/collection/1473000', icon: 'church' },
    { title: 'Germany, Prussia, Posen, Catholic and Lutheran Church Records, 1430-1998', records: '12,831,327', link: 'https://www.familysearch.org/en/search/collection/4116415', icon: 'church' }
  ],
  'Brazil': [
    { title: 'Brazil, São Paulo, Catholic Church Records, 1640-2013', records: '4,018,558', link: 'https://www.familysearch.org/en/search/collection/2177299', icon: 'church' },
    { title: 'Brazil, Cemetery Records, 1799-2024', records: '4,414,028', link: 'https://www.familysearch.org/en/search/collection/2137269', icon: 'historical' },
    { title: 'Brazil, Rio de Janeiro, Civil Registration, 1804-2013', records: '6,379,080', link: 'https://www.familysearch.org/en/search/collection/1582573', icon: 'civil' }
  ],
  'Italy': [
    { title: 'Italy, Bari, Civil Registration (State Archive), 1809-1908', records: '7,593,992', link: 'https://www.familysearch.org/en/search/collection/1968511', icon: 'civil' },
    { title: 'Italy, Bergamo, Civil Registration (State Archive), 1866-1903', records: '2,538,066', link: 'https://www.familysearch.org/en/search/collection/1986789', icon: 'civil' },
    { title: 'Italy, Births and Baptisms, 1806-1900', records: '1,151,133', link: 'https://www.familysearch.org/en/search/collection/1708706', icon: 'church' }
  ],
  'Spain': [
    { title: 'Spain, Catholic Church Records, 1307-2005', records: '18,518,441', link: 'https://www.familysearch.org/en/search/collection/1784529', icon: 'church' },
    { title: 'Spain, Baptisms, 1502-1940', records: '8,173,079', link: 'https://www.familysearch.org/en/search/collection/1500692', icon: 'church' },
    { title: 'Spain, Marriages, 1565-1950', records: '2,269,515', link: 'https://www.familysearch.org/en/search/collection/1500693', icon: 'church' }
  ],
  'Australia': [
    { title: 'Australia, Victoria, Coastal Passenger Lists, 1852-1924', records: '3,244,620', link: 'https://www.familysearch.org/en/search/collection/2484773', icon: 'immigration' },
    { title: 'Australia, Queensland, Cemetery Records, 1802-1990', records: '2,168,403', link: 'https://www.familysearch.org/en/search/collection/1927198', icon: 'historical' },
    { title: 'Australia, Cemetery Inscriptions, 1802-2005', records: '1,124,406', link: 'https://www.familysearch.org/en/search/collection/2115584', icon: 'historical' }
  ],
  'Canada': [
    { title: 'Canada Census, 1921', records: '360,440', link: 'https://www.familysearch.org/en/search/collection/5000285', icon: 'census' }
  ],
  'Portugal': [
    { title: 'Portugal, Azores, Catholic Church Records, 1542-2019', records: '909,389', link: 'https://www.familysearch.org/en/search/collection/4449047', icon: 'church' },
    { title: 'Portugal, Aveiro, Catholic Church Records, 1550-1957', records: '1,048,310', link: 'https://www.familysearch.org/en/search/collection/1928590', icon: 'church' },
    { title: 'Portugal Baptisms, 1570-1910', records: '304,378', link: 'https://www.familysearch.org/en/search/collection/1520601', icon: 'church' }
  ],
  'Norway': [
    { title: 'Norway, Church Books, 1797-1958', records: '14,398,439', link: 'https://www.familysearch.org/en/search/collection/4237104', icon: 'church' },
    { title: 'Norway, Baptisms, 1634-1927', records: '5,277,294', link: 'https://www.familysearch.org/en/search/collection/1467014', icon: 'church' },
    { title: 'Norway, Census, 1900', records: '2,260,720', link: 'https://www.familysearch.org/en/search/collection/3744863', icon: 'census' }
  ],
  'Egypt': [],
  'Greece': [],
  'Turkey': [],
  'Sudan': []
};

// Map icon names to icon objects
const iconMapping = {
  'census': 'icons.census',
  'immigration': 'icons.immigration',
  'heritage': 'icons.heritage',
  'parish': 'icons.parish',
  'civil': 'icons.civil',
  'historical': 'icons.historical',
  'church': 'icons.church',
  'household': 'icons.household',
  'probate': 'icons.probate',
  'genealogy': 'icons.genealogy'
};

// Generate the countryCollections object for data.jsx
let output = 'export const countryCollections = {\n';

for (const [country, collections] of Object.entries(countryCollections)) {
  output += `  '${country}': [\n`;
  
  collections.forEach((col, index) => {
    const desc = `${col.records} records`;
    const icon = iconMapping[col.icon] || 'icons.historical';
    output += `    { title: '${col.title}', desc: '${desc}', link: '${col.link}', icon: ${icon} }`;
    if (index < collections.length - 1) output += ',';
    output += '\n';
  });
  
  output += '  ],\n';
}

output += '};\n';

console.log(output);
