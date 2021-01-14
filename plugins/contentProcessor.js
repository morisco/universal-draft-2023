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
  const orderIds = players.map((player) => { return {id: parseInt(player.id,10), bigBoard: parseInt(player.order,10), mockDraft: parseInt(player.order_mockdraft,10), draftResults: parseInt(player.order_draftresults,10) } });
  const bigBoardSorted = orderIds.sort((playerA, playerB) => (playerA.bigBoard > playerB.bigBoard) ? 1 : -1);
  const mockIds = orderIds.filter(player => player.mockDraft <= 64);
  const draftResultIds = orderIds.filter(player => player.draftResults <= 64);
  const mockDraftSorted = mockIds.sort((playerA, playerB) => (playerA.mockDraft > playerB.mockDraft) ? 1 : -1);
  const draftResultsSorted = draftResultIds.sort((playerA, playerB) => (playerA.draftResults > playerB.draftResults) ? 1 : -1);
  return {
    bigBoard: bigBoardSorted.map(player => player.id),
    mockDraft: mockDraftSorted.map(player => player.id),
    draftResults: draftResultsSorted.map(player => player.id)
  };
}
export function processPlayers(players) {
  let processedPlayers = {};
  const playerPositions = [];
  let teamPlayers = {};
  players.forEach((player) => {
    player = decodeContent(player);
    if(process.env.PROJECT_LEAGUE === 'NBA'){
      console.log(player);
      player.id_string = player.title.replace(/\s/g,'-').replace(/[^A-Za-z-]/g, '').toLowerCase();
    } else {
      player.id_string = player.title.replace(/\s/g,'-').replace(/[^A-Za-z-]/g, '').toLowerCase();
      console.log('hiiii', player.player_position_stats.position);
      player.position = player.player_position_stats.position;
      if(playerPositions.indexOf(player.position) === -1){
        playerPositions.push(player.position);
      }
      player.image_data.image = processImages(player.image_data.image);
      player.offenseDefense = offensePositions.indexOf(player.position) >= 0 ? 'offense' : 'defense' 
      teamPlayers[player.id_string] = {
        title: player.title,
        image: player.image_data.image,
        school: player.player_meta.school,
        position: positionLabelMap[player.position],
        offenseDefense: player.offenseDefense
      }
      processedPlayers[player.id] = player;
    }
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

export function processRelated(related) {
  related.sort((relatedA, relatedB) => parseInt(relatedA.order,10) > parseInt(relatedB.order,10) ? 1 : -1);
  const processedRelated = related.map((related) => {
    related = decodeContent(related);
    related.image = processImages(related.image);
    return related;
  });
  return processedRelated;
}

export function processInterstitials(contents) {
  let processedInterstitials = {
    bigBoard: {},
    mockDraft: {},
    draftResults: {},
    teamNeeds: {},
  };
  const listInters = contents.list_inter.content;
  const videoInters = contents.video_inter.content;

  listInters.forEach((list_inter) => {
    list_inter = decodeContent(list_inter);
    list_inter.data.category = list_inter.category;
    list_inter.data.image = processImages(list_inter.data.image);
    const listPositions = list_inter.list_positions;
    if(listPositions.big_board_position) {
      processedInterstitials.bigBoard[listPositions.big_board_position] = list_inter.data;
    }
    if(listPositions.mock_draft_position) {
      processedInterstitials.mockDraft[listPositions.mock_draft_position] = list_inter.data;
    }
    if(listPositions.team_needs_position) {
      processedInterstitials.teamNeeds[listPositions.team_needs_position] = list_inter.data;
    }
    if(listPositions.draft_results_position) {
      processedInterstitials.draftResults[listPositions.draft_results_position] = list_inter.data;
    }
  });
  videoInters.forEach((video_inter) => {
    video_inter = decodeContent(video_inter);
    const listPositions = video_inter.list_positions;
    video_inter.image = processImages(video_inter.image);
    if(listPositions.big_board_position) {
      processedInterstitials.bigBoard[listPositions.big_board_position] = video_inter;
    }
    if(listPositions.mock_draft_position) {
      processedInterstitials.mockDraft[listPositions.mock_draft_position] = video_inter;
    }
    if(listPositions.team_needs_position) {
      processedInterstitials.teamNeeds[listPositions.team_needs_position] = video_inter;
    }
    if(listPositions.draft_results_position) {
      processedInterstitials.draftResults[listPositions.draft_results_position] = video_inter;
    }
  })
  return processedInterstitials
}