import { statMap, positionLabelMap, offensePositions } from '!~/plugins/playerPositionMap'
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
    xsmall:    joinedImg + '-xsmall.' + extension,
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
  let teamPlayers = {};
  players.forEach((player) => {
    player = decodeContent(player);
    player.id_string = player.title.replace(/\s/g,'-').replace(/[^A-Za-z-]/g, '').toLowerCase();
    if(playerPositions.indexOf(player.player_position_stats.position) === -1){
      playerPositions.push(player.player_position_stats.position);
    }
    player.image_data.image = processImages(player.image_data.image);
    player.offenseDefense = offensePositions.indexOf(player.player_position_stats.position) >= 0 ? 'offense' : 'defense' 
    teamPlayers[player.id_string] = {
      title: player.title,
      image: player.image_data.image,
      school: player.player_meta.school,
      position: positionLabelMap[player.player_position_stats.position],
      offenseDefense: player.offenseDefense
    }
    processedPlayers[player.id] = player;
  });
  const orderedIds = processOrders(players);
  return {
    playerData: processedPlayers,
    teamPlayers,
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

export function processTeams(teams, teamPlayers) {
  let processedTeams = {};
  let teamIds = [];
  teams.sort((teamA, teamB) => parseInt(teamA.order,10) > parseInt(teamB.order,10) ? 1 : -1);
  teams.forEach((team) => {
    team = decodeContent(team);
    teamIds.push(team.id);
    team.image = processImages(team.image);
    team.players = team.players.map((player) => {
      const id_string = player.title.replace(/\s/g,'-').replace(/[^A-Za-z-]/g, '').toLowerCase();
      return teamPlayers[id_string]
    });
    processedTeams[team.id] = team;

  });
  const teamNameLogo = teams.map((team) => {
    return {teamName: team.title, logo: team.image}
  });
  return {
    teamData: processedTeams,
    teamNeeds: teamIds,
    teamNameLogo: [...teamNameLogo, ...teamNameLogo]
  }
}