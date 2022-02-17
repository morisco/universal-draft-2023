export default process.env.PROJECT_LEAGUE === 'NFL' ? [
  {
    fullLabel: 'All',
    shortLabel: 'All',
    positionKey: 'all'
  },
  {
    fullLabel: 'All Offense',
    shortLabel: 'Offense',
    positionKey: 'all-offense'
  },
  {
    fullLabel: 'All Defense',
    shortLabel: 'All',
    positionKey: 'all-defense'
  },
  {
    fullLabel: 'Quarterbacks',
    shortLabel: 'QB',
    positionKey: 'qb'
  },
  {
    fullLabel: 'Running Backs',
    shortLabel: 'RB',
    positionKey: 'rb'
  },
  {
    fullLabel: 'Pass Catchers',
    shortLabel: 'WR/TE',
    positionKey: 'pc'
  },
  {
    fullLabel: 'Offensive Linemen',
    shortLabel: 'OL',
    positionKey: 'ol'
  },
  {
    fullLabel: 'Edge Rushers',
    shortLabel: 'DE',
    positionKey: 'de'
  },
  {
    fullLabel: 'Int. Defensive Linemen',
    shortLabel: 'IDL',
    positionKey: 'idl'
  },
  {
    fullLabel: 'Linebackers',
    shortLabel: 'LB',
    positionKey: 'lb'
  },
  {
    fullLabel: 'Defensive Backs',
    shortLabel: 'DB',
    positionKey: 'db'
  }
] : process.env.PROJECT_LEAGUE === 'NBA'? [
  {
    fullLabel: 'All',
    shortLabel: 'All',
    positionKey: 'all'
  },
  {
    fullLabel: 'Bigs',
    shortLabel: 'Bigs',
    positionKey: 'bigs'
  },
  {
    fullLabel: 'Forwards',
    shortLabel: 'Forwards',
    positionKey: 'forwards'
  },
  {
    fullLabel: 'Guards',
    shortLabel: 'Guards',
    positionKey: 'guards'
  }
] : [];