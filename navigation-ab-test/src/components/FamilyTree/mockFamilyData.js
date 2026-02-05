// Mock family tree data with generic names
export const familyTreeData = {
  // Current person (viewing user)
  currentPerson: {
    husband: {
      name: 'Michael Anderson',
      lifespan: '1982-Living',
      id: 'ABCD-123',
      verified: true
    },
    wife: {
      name: 'Sarah Thompson',
      lifespan: '1985-Living',
      id: 'EFGH-456',
      verified: false
    },
    marriage: {
      date: '15 June 2008',
      place: 'Portland, Oregon, United States'
    }
  },

  // Children
  children: [
    {
      husband: {
        name: 'Emma Anderson',
        lifespan: '2010-Living',
        id: 'IJKL-789',
        verified: false
      },
      wife: {
        name: 'Oliver Garcia',
        lifespan: '2009-Living',
        id: 'QRST-345',
        verified: false
      },
      marriage: {
        date: '18 April 2030',
        place: 'Portland, Oregon, United States'
      }
    },
    {
      husband: {
        name: 'Noah Anderson',
        lifespan: '2013-Living',
        id: 'MNOP-012',
        verified: false
      },
      wife: {
        name: 'Sophia Martinez',
        lifespan: '2014-Living',
        id: 'UVWX-678',
        verified: false
      },
      marriage: {
        date: '22 June 2033',
        place: 'Seattle, Washington, United States'
      }
    }
  ],

  // Parents (husband's side)
  husbandParents: {
    husband: {
      name: 'Robert Anderson',
      lifespan: '1955-Living',
      id: 'QRST-345',
      verified: true
    },
    wife: {
      name: 'Jennifer Wilson',
      lifespan: '1958-Living',
      id: 'UVWX-678',
      verified: false
    },
    marriage: {
      date: '12 May 1980',
      place: 'Seattle, Washington, United States'
    }
  },

  // Parents (wife's side)
  wifeParents: {
    husband: {
      name: 'David Thompson',
      lifespan: '1960-Living',
      id: 'YZAB-901',
      verified: false
    },
    wife: {
      name: 'Emily Davis',
      lifespan: '1962-Living',
      id: 'CDEF-234',
      verified: false
    },
    marriage: {
      date: '8 August 1983',
      place: 'Denver, Colorado, United States'
    }
  },

  // Grandparents (husband's father's side)
  husbandPaternalGrandparents: {
    husband: {
      name: 'James Anderson',
      lifespan: '1930-2015',
      id: 'GHIJ-567',
      verified: false
    },
    wife: {
      name: 'Mary Johnson',
      lifespan: '1932-2018',
      id: 'KLMN-890',
      verified: false
    },
    marriage: {
      date: '20 March 1954',
      place: 'Boston, Massachusetts, United States'
    }
  },

  // Grandparents (husband's mother's side)
  husbandMaternalGrandparents: {
    husband: {
      name: 'William Wilson',
      lifespan: '1935-2012',
      id: 'OPQR-123',
      verified: false
    },
    wife: {
      name: 'Patricia Brown',
      lifespan: '1937-Living',
      id: 'STUV-456',
      verified: false
    },
    marriage: {
      date: '5 July 1957',
      place: 'Chicago, Illinois, United States'
    }
  },

  // Grandparents (wife's father's side)
  wifePaternalGrandparents: {
    husband: {
      name: 'Richard Thompson',
      lifespan: '1938-2010',
      id: 'WXYZ-789',
      verified: false
    },
    wife: {
      name: 'Linda Martinez',
      lifespan: '1940-Living',
      id: 'ABCD-012',
      verified: false
    },
    marriage: {
      date: '14 November 1959',
      place: 'Phoenix, Arizona, United States'
    }
  },

  // Grandparents (wife's mother's side)
  wifeMaternalGrandparents: {
    husband: {
      name: 'Charles Davis',
      lifespan: '1940-2016',
      id: 'EFGH-345',
      verified: false
    },
    wife: {
      name: 'Susan Miller',
      lifespan: '1942-Living',
      id: 'IJKL-678',
      verified: false
    },
    marriage: {
      date: '22 April 1961',
      place: 'Atlanta, Georgia, United States'
    }
  }
};
