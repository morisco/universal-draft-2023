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
  if(!image) return {}
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
  const orderIds = players.map((player) => { return {id: player.id, bigBoard: parseInt(player.order,10), mockDraft: parseInt(player.order_mockdraft,10), draftResults: parseInt(player.order_draftresults,10) } });
  const bigBoardSorted = orderIds.sort((playerA, playerB) => (playerA.bigBoard > playerB.bigBoard) ? 1 : -1);
  const mockIds = orderIds.filter(player => player.mockDraft <= 31);
  const draftResultIds = orderIds.filter(player => player.draftResults <= 31);
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
      player.id_string = player.title.replace(/\s/g,'-').replace(/[^A-Za-z-]/g, '').toLowerCase();
    } else {
      player.id_string = player.title.replace(/\s/g,'-').replace(/[^A-Za-z-]/g, '').toLowerCase();
      player.position = player.player_position_stats.position;
      if(playerPositions.indexOf(player.position) === -1){
        playerPositions.push(player.position);
      }
      if(player.player_video){
        player.player_video.poster = processImages(player.player_video.poster);
      }
      if(player.image_data){
        player.image_data.image = processImages(player.image_data.image);
      } else {
        player.image_data = { image: {} };
      }
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
  let positionArray = [];
  positionStats.forEach((stat) => {
    if(stats[stat.key]){
      positionArray.push({...stat, value: stats[stat.key], highlight: stat.key === stats.highlight});
    }
  })
  if(stats.position === 'qb'){
    Array.prototype.move = function (from, to) {
      this.splice(to, 0, this.splice(from, 1)[0]);
    };
    positionArray.move(0,1);
  }
  return positionArray;
}

export function processTeams(teams, teamPlayers) {
  let processedTeams = {};
  let teamIds = [];
  let resultsIds = [];
  teams.sort((teamA, teamB) => parseInt(teamA.order,10) > parseInt(teamB.order,10) ? 1 : -1);
  teams.forEach((team) => {
    team = decodeContent(team);
    team.id_string = team.title.replace(/\s/g,'-').replace(/[^A-Za-z-]/g, '').toLowerCase();
    teamIds.push(team.id);
    team.image = processImages(team.image);
    team.players = team.players.map((player) => {
      const id_string = player.title.replace(/\s/g,'-').replace(/[^A-Za-z-]/g, '').toLowerCase();
      return teamPlayers[id_string]
    });
    processedTeams[team.id] = team;
  });
  teams.sort((teamA, teamB) => parseInt(teamA.order_results,10) > parseInt(teamB.order_results,10) ? 1 : -1);
  teams.forEach((team) => {
    resultsIds.push(team.id);
  });
  const teamNameLogo = teams.map((team) => {
    let teamToUse = team;
    let via = '';
    if(team.pick_trades){
      teamToUse = processedTeams[team.pick_trades[0].team];
      via = team.pick_trades[0].via;
    }
    return {teamName: teamToUse.title, logo: teamToUse.image, via: via}
  });
  return {
    teamData: processedTeams,
    teamNeeds: teamIds,
    draftResults: resultsIds,
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
  const videoInters = contents.video_inter ? contents.video_inter.content : [];
  const articleInters = contents.article_inter.content;

  articleInters.forEach((article_inter) => {
    article_inter = decodeContent(article_inter);

    article_inter.image = processImages(article_inter.image);
    const listPositions = article_inter.list_positions;
    if(listPositions.big_board_position) {
      processedInterstitials.bigBoard[listPositions.big_board_position] = article_inter;
    }
    if(listPositions.mock_draft_position) {
      processedInterstitials.mockDraft[listPositions.mock_draft_position] = article_inter;
    }
    if(listPositions.team_needs_position) {
      processedInterstitials.teamNeeds[listPositions.team_needs_position] = article_inter;
    }
    if(listPositions.draft_results_position) {
      processedInterstitials.draftResults[listPositions.draft_results_position] = article_inter;
    }
  });

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