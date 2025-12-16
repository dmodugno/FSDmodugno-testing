// Country & collections data// Country & collections data

export const defaultCountries = ['United States','United Kingdom','Germany','Brazil','Mexico','Italy','China','More...'];export const defaultCountries = ['United States','United Kingdom','Germany','Brazil','Mexico','Italy','China','More...'];

export const phCountries = ['Philippines','Indonesia','Malaysia','China','Spain','More...'];export const phCountries = ['Philippines','Indonesia','Malaysia','China','Spain','More...'];

export const overlayCountries = ['Australia','Brazil','Cambodia','Canada','Germany','Japan','Korea','New Zealand','Norway','Pacific Islands','Philippines','Portugal','Taiwan','United Kingdom','United States'];export const overlayCountries = ['Australia','Brazil','Cambodia','Canada','Germany','Japan','Korea','New Zealand','Norway','Pacific Islands','Philippines','Portugal','Taiwan','United Kingdom','United States'];



// SVG icon markup stored as stringsexport const countryCollections = {

const icons = {  'United States': [

  census: '<rect width="38" height="38" rx="8" fill="#d6e8e6"/><rect x="11" y="12" width="16" height="14" rx="2" fill="#006666"/><rect x="14" y="15" width="10" height="8" rx="1" fill="#fff"/>',    { title:'1950 US Census', desc:'Search millions of names and households in the 1950 U.S. Census index.', link:'#', icon:`<rect width="38" height="38" rx="8" fill="#d6e8e6"/><rect x="11" y="12" width="16" height="14" rx="2" fill="#006666"/><rect x="14" y="15" width="10" height="8" rx="1" fill="#fff"/>` },

  immigration: '<rect width="38" height="38" rx="8" fill="#e1f5f2"/><path d="M12 26h14l-2-8h-10l-2 8z" fill="#006666"/><rect x="17" y="10" width="4" height="8" fill="#009999"/>',    { title:'Immigration & Naturalization', desc:'Passenger lists and naturalization records that trace immigrant journeys.', link:'#', icon:`<rect width="38" height="38" rx="8" fill="#e1f5f2"/><path d="M12 26h14l-2-8h-10l-2 8z" fill="#006666"/><rect x="17" y="10" width="4" height="8" fill="#009999"/>` },

  heritage: '<rect width="38" height="38" rx="8" fill="#ffe082"/><circle cx="19" cy="19" r="7" fill="#b27d00"/><circle cx="19" cy="19" r="3" fill="#fff"/>',    { title:'African American Heritage', desc:'Freedmen's Bureau, USCT, church, and census records for African American research.', link:'#', icon:`<rect width="38" height="38" rx="8" fill="#ffe082"/><circle cx="19" cy="19" r="7" fill="#b27d00"/><circle cx="19" cy="19" r="3" fill="#fff"/>` }

  parish: '<rect width="38" height="38" rx="8" fill="#e1f5f2"/><polygon points="19,10 25,28 13,28" fill="#e6b800"/><circle cx="19" cy="19" r="3" fill="#009999"/>',  ],

  civil: '<rect width="38" height="38" rx="8" fill="#ffe7ba"/><rect x="11" y="17" width="16" height="4" rx="2" fill="#e6b800"/><circle cx="19" cy="19" r="2" fill="#b27d00"/>',  'Philippines': [

  historical: '<rect width="38" height="38" rx="8" fill="#d6e8e6"/><circle cx="19" cy="19" r="7" fill="#006666"/><circle cx="19" cy="19" r="3" fill="#fff"/>',    { title:'Parish Registers', desc:'Baptism, marriage, and burial entries across Philippine parishes.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#e1f5f2"/><polygon points="19,10 25,28 13,28" fill="#e6b800"/><circle cx="19" cy="19" r="3" fill="#009999"/>' },

  church: '<rect width="38" height="38" rx="8" fill="#ffe082"/><circle cx="19" cy="19" r="7" fill="#b27d00"/><circle cx="19" cy="19" r="3" fill="#fff"/>',    { title:'Civil Registration', desc:'Birth, marriage, and death certificates from civil archives.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#ffe7ba"/><rect x="11" y="17" width="16" height="4" rx="2" fill="#e6b800"/><circle cx="19" cy="19" r="2" fill="#b27d00"/>' },

  household: '<rect width="38" height="38" rx="8" fill="#e1f5f2"/><path d="M12 26h14l-2-8h-10l-2 8z" fill="#006666"/><rect x="17" y="10" width="4" height="8" fill="#009999"/>',    { title:'Spanish-era Records', desc:'Historical documents and notarial records from the colonial period.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#d6e8e6"/><circle cx="19" cy="19" r="7" fill="#006666"/><circle cx="19" cy="19" r="3" fill="#fff"/>' }

  probate: '<rect width="38" height="38" rx="8" fill="#d6e8e6"/><polygon points="19,10 25,28 13,28" fill="#e6b800"/><circle cx="19" cy="19" r="3" fill="#009999"/>',  ],

  genealogy: '<rect width="38" height="38" rx="8" fill="#e1f5f2"/><polygon points="19,10 25,28 13,28" fill="#e6b800"/><circle cx="19" cy="19" r="3" fill="#009999"/>'  'Mexico': [

};    { title:'Catholic Church Registers', desc:'Extensive baptism, marriage, and burial entries nation-wide.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#ffe7ba"/><rect x="11" y="17" width="16" height="4" rx="2" fill="#e6b800"/><circle cx="19" cy="19" r="2" fill="#b27d00"/>' },

    { title:'Civil Registration', desc:'Birth, marriage, and death records starting in the 1800s.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#e1f5f2"/><rect x="11" y="12" width="16" height="14" rx="2" fill="#006666"/><rect x="14" y="15" width="10" height="8" rx="1" fill="#fff"/>' }

export const countryCollections = {  ],

  'United States': [  'United Kingdom': [

    { title:'1950 US Census', desc:'Search millions of names and households in the 1950 U.S. Census index.', link:'#', icon:icons.census },    { title:'Census & Household Schedules', desc:'Enumerations of families and residences across England, Wales, Scotland.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#e1f5f2"/><path d="M12 26h14l-2-8h-10l-2 8z" fill="#006666"/><rect x="17" y="10" width="4" height="8" fill="#009999"/>' },

    { title:'Immigration & Naturalization', desc:'Passenger lists and naturalization records that trace immigrant journeys.', link:'#', icon:icons.immigration },    { title:'Parish Registers', desc:'Anglican baptisms, marriages, and burials (1500s forward).', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#ffe082"/><circle cx="19" cy="19" r="7" fill="#b27d00"/><circle cx="19" cy="19" r="3" fill="#fff"/>' },

    { title:'African American Heritage', desc:'Freedmen\'s Bureau, USCT, church, and census records for African American research.', link:'#', icon:icons.heritage }    { title:'Probate & Wills', desc:'Testaments and probate calendars revealing family relationships.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#d6e8e6"/><polygon points="19,10 25,28 13,28" fill="#e6b800"/><circle cx="19" cy="19" r="3" fill="#009999"/>' }

  ],  ],

  'Philippines': [  'Germany': [

    { title:'Parish Registers', desc:'Baptism, marriage, and burial entries across Philippine parishes.', link:'#', icon:icons.parish },    { title:'Civil Registration', desc:'Standesamt records of births, marriages, and deaths.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#d6e8e6"/><rect x="11" y="12" width="16" height="14" rx="2" fill="#006666"/><rect x="14" y="15" width="10" height="8" rx="1" fill="#fff"/>' },

    { title:'Civil Registration', desc:'Birth, marriage, and death certificates from civil archives.', link:'#', icon:icons.civil },    { title:'Church Books', desc:'Evangelical and Catholic parish registers across German states.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#ffe082"/><circle cx="19" cy="19" r="7" fill="#b27d00"/><circle cx="19" cy="19" r="3" fill="#fff"/>' }

    { title:'Spanish-era Records', desc:'Historical documents and notarial records from the colonial period.', link:'#', icon:icons.historical }  ],

  ],  'Brazil': [

  'Mexico': [    { title:'Civil Registration', desc:'Births, marriages, deaths from cartórios throughout Brazil.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#e1f5f2"/><path d="M12 26h14l-2-8h-10l-2 8z" fill="#006666"/><rect x="17" y="10" width="4" height="8" fill="#009999"/>' },

    { title:'Catholic Church Registers', desc:'Extensive baptism, marriage, and burial entries nation-wide.', link:'#', icon:icons.civil },    { title:'Catholic Church Records', desc:'Sacramental registers from dioceses across Brazil.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#ffe7ba"/><rect x="11" y="17" width="16" height="4" rx="2" fill="#e6b800"/><circle cx="19" cy="19" r="2" fill="#b27d00"/>' }

    { title:'Civil Registration', desc:'Birth, marriage, and death records starting in the 1800s.', link:'#', icon:icons.census }  ],

  ],  'Italy': [

  'United Kingdom': [    { title:'Stato Civile', desc:'Municipal civil registrations of births, marriages & deaths.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#e1f5f2"/><rect x="11" y="12" width="16" height="14" rx="2" fill="#006666"/><rect x="14" y="15" width="10" height="8" rx="1" fill="#fff"/>' },

    { title:'Census & Household Schedules', desc:'Enumerations of families and residences across England, Wales, Scotland.', link:'#', icon:icons.household },    { title:'Parish Registers', desc:'Catholic baptism, marriage, burial records from Italian parishes.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#ffe082"/><circle cx="19" cy="19" r="7" fill="#b27d00"/><circle cx="19" cy="19" r="3" fill="#fff"/>' }

    { title:'Parish Registers', desc:'Anglican baptisms, marriages, and burials (1500s forward).', link:'#', icon:icons.church },  ],

    { title:'Probate & Wills', desc:'Testaments and probate calendars revealing family relationships.', link:'#', icon:icons.probate }  'China': [

  ],    { title:'Clan Genealogies (Zupu)', desc:'Lineage books documenting multi-generational Chinese families.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#d6e8e6"/><circle cx="19" cy="19" r="7" fill="#006666"/><circle cx="19" cy="19" r="3" fill="#fff"/>' }

  'Germany': [  ],

    { title:'Civil Registration', desc:'Standesamt records of births, marriages, and deaths.', link:'#', icon:icons.census },  'Indonesia': [

    { title:'Church Books', desc:'Evangelical and Catholic parish registers across German states.', link:'#', icon:icons.church }    { title:'Parish & Church Records', desc:'Select baptism and marriage records from Indonesian parishes.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#ffe082"/><circle cx="19" cy="19" r="7" fill="#b27d00"/><circle cx="19" cy="19" r="3" fill="#fff"/>' }

  ],  ],

  'Brazil': [  'Malaysia': [

    { title:'Civil Registration', desc:'Births, marriages, deaths from cartórios throughout Brazil.', link:'#', icon:icons.household },    { title:'Church & Mission Records', desc:'Limited baptism and marriage entries from missions.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#e1f5f2"/><path d="M12 26h14l-2-8h-10l-2 8z" fill="#006666"/><rect x="17" y="10" width="4" height="8" fill="#009999"/>' }

    { title:'Catholic Church Records', desc:'Sacramental registers from dioceses across Brazil.', link:'#', icon:icons.civil }  ],

  ],  'Spain': [

  'Italy': [    { title:'Parish Registers', desc:'Catholic sacramental records from dioceses across Spain.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#ffe7ba"/><rect x="11" y="17" width="16" height="4" rx="2" fill="#e6b800"/><circle cx="19" cy="19" r="2" fill="#b27d00"/>' }

    { title:'Stato Civile', desc:'Municipal civil registrations of births, marriages & deaths.', link:'#', icon:icons.census },  ],

    { title:'Parish Registers', desc:'Catholic baptism, marriage, burial records from Italian parishes.', link:'#', icon:icons.church }  'Australia': [

  ],    { title:'Convict & Transportation', desc:'Registers and muster lists of transported convicts.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#d6e8e6"/><polygon points="19,10 25,28 13,28" fill="#e6b800"/><circle cx="19" cy="19" r="3" fill="#009999"/>' },

  'China': [    { title:'Civil Registration', desc:'Birth, marriage, death records from Australian states.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#e1f5f2"/><rect x="11" y="12" width="16" height="14" rx="2" fill="#006666"/><rect x="14" y="15" width="10" height="8" rx="1" fill="#fff"/>' }

    { title:'Clan Genealogies (Zupu)', desc:'Lineage books documenting multi-generational Chinese families.', link:'#', icon:icons.historical }  ],

  ],  'Canada': [

  'Indonesia': [    { title:'Census Records', desc:'Enumerations of households across Canadian provinces.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#ffe082"/><circle cx="19" cy="19" r="7" fill="#b27d00"/><circle cx="19" cy="19" r="3" fill="#fff"/>' },

    { title:'Parish & Church Records', desc:'Select baptism and marriage records from Indonesian parishes.', link:'#', icon:icons.church }    { title:'Parish Registers', desc:'Catholic and Protestant church books documenting vital events.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#e1f5f2"/><path d="M12 26h14l-2-8h-10l-2 8z" fill="#006666"/><rect x="17" y="10" width="4" height="8" fill="#009999"/>' }

  ],  ],

  'Malaysia': [  'Portugal': [

    { title:'Church & Mission Records', desc:'Limited baptism and marriage entries from missions.', link:'#', icon:icons.household }    { title:'Catholic Parish Registers', desc:'Baptisms, marriages, burials from Portuguese parishes.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#ffe7ba"/><rect x="11" y="17" width="16" height="4" rx="2" fill="#e6b800"/><circle cx="19" cy="19" r="2" fill="#b27d00"/>' }

  ],  ],

  'Spain': [  'Norway': [

    { title:'Parish Registers', desc:'Catholic sacramental records from dioceses across Spain.', link:'#', icon:icons.civil }    { title:'Church Books', desc:'Norwegian parish registers of births, marriages, deaths.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#d6e8e6"/><circle cx="19" cy="19" r="7" fill="#006666"/><circle cx="19" cy="19" r="3" fill="#fff"/>' }

  ],  ],

  'Australia': [  'Korea': [

    { title:'Convict & Transportation', desc:'Registers and muster lists of transported convicts.', link:'#', icon:icons.probate },    { title:'Family Genealogies (Jokbo)', desc:'Lineage records tracing Korean family histories.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#e1f5f2"/><polygon points="19,10 25,28 13,28" fill="#e6b800"/><circle cx="19" cy="19" r="3" fill="#009999"/>' }

    { title:'Civil Registration', desc:'Birth, marriage, death records from Australian states.', link:'#', icon:icons.census }  ],

  ],  'Cambodia': [],

  'Canada': [  'New Zealand': [

    { title:'Census Records', desc:'Enumerations of households across Canadian provinces.', link:'#', icon:icons.church },    { title:'Birth, Marriage & Death', desc:'Civil registration indexes from New Zealand.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#e1f5f2"/><rect x="11" y="12" width="16" height="14" rx="2" fill="#006666"/><rect x="14" y="15" width="10" height="8" rx="1" fill="#fff"/>' }

    { title:'Parish Registers', desc:'Catholic and Protestant church books documenting vital events.', link:'#', icon:icons.household }  ],

  ],  'Pacific Islands': [

  'Portugal': [    { title:'Missionary Records', desc:'Select mission and church entries from Pacific Island communities.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#ffe082"/><circle cx="19" cy="19" r="7" fill="#b27d00"/><circle cx="19" cy="19" r="3" fill="#fff"/>' }

    { title:'Catholic Parish Registers', desc:'Baptisms, marriages, burials from Portuguese parishes.', link:'#', icon:icons.civil }  ],

  ],  'Taiwan': [

  'Norway': [    { title:'Household Registers', desc:'Family groupings and residence data from select periods.', link:'#', icon:'<rect width="38" height="38" rx="8" fill="#d6e8e6"/><circle cx="19" cy="19" r="7" fill="#006666"/><circle cx="19" cy="19" r="3" fill="#fff"/>' }

    { title:'Church Books', desc:'Norwegian parish registers of births, marriages, deaths.', link:'#', icon:icons.historical }  ]

  ],};

  'Korea': [
    { title:'Family Genealogies (Jokbo)', desc:'Lineage records tracing Korean family histories.', link:'#', icon:icons.genealogy }
  ],
  'Cambodia': [],
  'New Zealand': [
    { title:'Birth, Marriage & Death', desc:'Civil registration indexes from New Zealand.', link:'#', icon:icons.census }
  ],
  'Pacific Islands': [
    { title:'Missionary Records', desc:'Select mission and church entries from Pacific Island communities.', link:'#', icon:icons.church }
  ],
  'Taiwan': [
    { title:'Household Registers', desc:'Family groupings and residence data from select periods.', link:'#', icon:icons.historical }
  ]
};
