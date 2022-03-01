let statsMap = {
  qb: [
    { key: 'interceptions', label: 'INTS', tooltip: 'Interceptions' },
    { key: 'passing_touchdowns', label: 'TDS', tooltip: 'Touchdowns' },
    { key: 'passing_yards', label: 'YDS', tooltip: 'Yards' },
    { key: 'passing_yards_per_attempt', label: 'YPA', tooltip: 'Yards Per Attempt' },
    { key: 'rating', label: 'RTG', tooltip: 'Passer Rating' }
  ],
  de: [
    { key: 'tackles', label: 'TKLS', tooltip: 'Tackles' },
    { key: 'tackles_for_loss', label: 'TFL', tooltip: 'Interceptions' },
    { key: 'sacks', label: 'SACKS', tooltip: 'Sacks' },
  ],
  db: [
    { key: 'tackles', label: 'TKLS', tooltip: 'Tackles' },
    { key: 'interceptions', label: 'INTS', tooltip: 'Interceptions' },
    { key: 'passes_broken_up', label: 'PBU', tooltip: 'Pass Breakups' }
  ],
  wr: [
    { key: 'receiving_yards', label: 'YDS', tooltip: 'Yards' },
    { key: 'yards_per_catch', label: 'YPR', tooltip: 'Yards Per Reception' },
    { key: 'receiving_touchdowns', label: 'TDS', tooltip: 'Touchdowns' },
    { key: 'receptions', label: 'REC', tooltip: 'Receptions' },
    { key: 'twenty_plus_plays', label: '20+', tooltip: '20-plus Yard Plays' },
  ],
  rb: [
    { key: 'rushing_yards', label: 'YDS', tooltip: 'Yards' },
    { key: 'yards_per_carry', label: 'YPC', tooltip: 'Yards Per Carry' },
    { key: 'rushing_touchdowns', label: 'TDS', tooltip: 'Touchdowns' },
    { key: 'receptions', label: 'REC', tooltip: 'Receptions' },
    { key: 'twenty_plus_plays', label: '20+', tooltip: '20-plus Yard Plays' },
  ],
  t: [
    { key: 'games', label: 'GMS', tooltip: 'Games' },
    { key: 'starts', label: 'STARTS', tooltip: 'Starts' },
    { key: 'sacks_allowed', label: 'SK ALL', tooltip: 'Sacks Allowed' }
  ]
}
statsMap.lb = statsMap.de;
statsMap.idl = statsMap.de;
statsMap.s = statsMap.db;
statsMap.te = statsMap.wr;
statsMap.c = statsMap.t;
statsMap.g = statsMap.t;
export const statMap = statsMap;

export const positionLabelMap = { "qb": 'Quarterback',  "wr": "Wide Receiver", "t": "Tackle",  "rb": "Running Back", "c": "Center", "g": "Guard", "te": "Tight End", "de": 'Edge Rusher', "lb": "Linebacker", "db": "Defensive Back", "idl": "Interior Defensive Lineman", "s": "Safety"}

export const positionMap =  process.env.PROJECT_LEAGUE === 'NFL' ? {
  'all-offense': ['qb', 'rb', 'wr', 'te', 'c', 't', 'g'],
  'all-defense': ['de', 'ilb', 'lb', 'db', 's'],
  'qb': ['qb'],
  'rb': ['rb'],
  'de': ['de'],
  'idl': ['idl'],
  'lb': ['lb'],
  'db': ['db', 's'],
  'ol': ['t', 'c', 'g'],
  'pc': ['wr', 'te']
} : {
  'bigs': ['bigs'],
  'guards': ['guards'],
  'forwards': ['forwards'],
}

export const offensePositions = ["qb",  "wr", "t",  "rb", "c", "g", "te"]