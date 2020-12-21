import { statMap } from '!~/plugins/playerPositionMap'
function decodeContent(content) {
  Object.keys(content).forEach((key) => {
    var IS_JSON = true;
    try {
      var json = JSON.parse(content[key]);
    }
    catch(err) {
      IS_JSON = false;
    }             

    if(IS_JSON){
      content[key] = json;
    }
  });
  return content;
}

function processImages(image) {
  const imageSplit  = image.split('.');
  const extension   = imageSplit.pop();
  const joinedImg   = imageSplit.join('.');
  let imageSizes = {
    small:    joinedImg + '-small.' + extension,
    medium:   joinedImg + '-medium.' + extension, 
    large:    joinedImg + '-large.' + extension,
    original: image
  };
  return imageSizes;
}

function processOrders(players) {
  const orderIds = players.map((player) => { return {id: parseInt(player.id,10), bigBoard: parseInt(player.order,10), mockDraft: parseInt(player.mock_rank,10) } });
  const bigBoardSorted = orderIds.sort((playerA, playerB) => (playerA.bigBoard > playerB.bigBoard) ? 1 : -1);
  const mockIds = orderIds.filter(player => player.mockDraft > 0);
  const mockDraftSorted = mockIds.sort((playerA, playerB) => (playerA.mockDraft > playerB.mockDraft) ? 1 : -1);
  return {
    bigBoard: bigBoardSorted.map(player => player.id),
    mockDraft: mockDraftSorted.map(player => player.id)
  };
}
export function processPlayers(players) {
  let processedPlayers = {};
  const playerPositions = [];
  players.forEach((player) => {
    player = decodeContent(player);
    if(playerPositions.indexOf(player.player_position_stats.position) === -1){
      playerPositions.push(player.player_position_stats.position);
    }
    player.image_data.image = processImages(player.image_data.image);
    processedPlayers[player.id] = player;
  });
  const orderedIds = processOrders(players);
  return {
    playerData: processedPlayers,
    ...orderedIds
  }
}


export function parseStats(stats) {
  let positionStats = statMap[stats.position];
  positionStats = positionStats.map((stat) => {
    return {...stat, value: stats[stat.key], highlight: stat.key === stats.highlight};
  })
  return positionStats;
}

export function processTeams(teams) {
  let processedTeams = {};
  teams.sort((teamA, teamB) => parseInt(teamA.order,10) > parseInt(teamB.order,10) ? 1 : -1);
  teams.forEach((team) => {
    team = decodeContent(team);
    team.image = processImages(team.image);
    processedTeams[team.id] = team;
  });
  return {
    teamData: processedTeams,
    teamNameLogo: teams.map((team) => {
      return {teamName: team.title, logo: team.image}
    })
  }
}