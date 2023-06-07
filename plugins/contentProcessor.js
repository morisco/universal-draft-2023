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

function processOrders(players, draftRounds) {
  const orderIds = players.map((player) => { return {id: player.id, bigBoard: parseInt(player.order,10), mockDraft: parseInt(player.order_mockdraft,10), draftResults: parseInt(player.order_draftresults,10) } });
  const bigBoardSorted = [...orderIds].sort((playerA, playerB) => (playerA.bigBoard > playerB.bigBoard) ? 1 : -1);
  const draftResultIds = players.filter(player => player.drafted_team);
  const mockDraftSorted = [...orderIds].sort((playerA, playerB) => (playerA.mockDraft > playerB.mockDraft) ? 1 : -1);
  const draftResultsSorted = draftResultIds.sort((playerA, playerB) => (playerA.order_draftresults > playerB.order_draftresults) ? 1 : -1);
  return {
    bigBoard: bigBoardSorted.map(player => player.id),
    mockDraft: mockDraftSorted.slice(0,(30 * draftRounds)).map(player => player.id),
    draftResults: draftResultsSorted.map(player => player.id)
  };
}
export function processPlayers(players, draftRounds) {
  let processedPlayers = {};
  const playerPositions = [];
  let teamPlayers = {};
  const bigBoardZeroBase = players.sort((a,b) => a.order < b.order ? -1 : 1)[0].order === 0;
  const mockDraftZeroBase = players.sort((a,b) => a.order_mockdraft < b.order_mockdraft ? -1 : 1)[0].order_mockdraft === 0;
  const draftResultsZeroBase = players.sort((a,b) => a.order_draftresults < b.order_draftresults ? -1 : 1)[0].order_draftresults === 0;
  players.forEach((player) => {
    player.order = bigBoardZeroBase ? player.order : player.order - 1;
    player.order_mockdraft = mockDraftZeroBase ? parseInt(player.order_mockdraft,10) : parseInt(player.order_mockdraft,10) - 1;
    player.order_draftresults = draftResultsZeroBase ? player.order_draftresults : player.order_draftresults - 1;
    player = decodeContent(player);

    player.fan_letter = !player.fan_letter ? false : player.fan_letter === '<p><br></p>' ? false : player.fan_letter;
    // if(process.env.PROJECT_LEAGUE === 'NBA'){
    //   player.id_string = player.title.replace(/\s/g,'-').replace(/[^A-Za-z-]/g, '').toLowerCase();
    // } else {
      player.id_string = player.title.replace(/\s/g,'-').replace(/[^A-Za-z-]/g, '').toLowerCase();
      player.position = player.player_position_stats.position;
      player.position_label = player.player_position_stats.position_label;
      if(playerPositions.indexOf(player.position) === -1){
        playerPositions.push(player.position);
      }
      if(player.player_video){
        player.player_video.poster = processImages(player.player_video.poster);
      }
      if(player.image_data){
        player.image_data.image = processImages(player.image_data.image);
        if(player.image_data.image_hover) {
          player.image_data.imageHover = processImages(player.image_data.image_hover);
        }
      } else {
        player.image_data = { image: {} };
      }
      player.offenseDefense = offensePositions.indexOf(player.position) >= 0 ? 'offense' : 'defense' 
      teamPlayers[player.id] = {
        title: player.title,
        firstName: player.first_name,
        lastName: player.last_name,
        id: player.id,
        id_string: player.id_string,
        image: player.image_data.image,
        school: player.player_meta.school,
        position: positionLabelMap[player.position],
        offenseDefense: player.offenseDefense
      }
      processedPlayers[player.id] = player;
    // }
  });
  const orderedIds = processOrders(players, draftRounds);
  return {
    playerData: processedPlayers,
    teamPlayers,
    ...orderedIds,

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

export function processTeams(teams, teamPlayers, pageTeams) {
  let processedTeams = {};
  let teamIds = [];
  let resultsIds = [];
  teams.sort((teamA, teamB) => parseInt(teamA.order,10) > parseInt(teamB.order,10) ? 1 : -1);
  teams.forEach((team) => {
    team = decodeContent(team);
    team.id_string = team.title.replace(/\s/g,'-').replace(/[^A-Za-z-]/g, '').toLowerCase();
    teamIds.push(team.id);
    team.image = processImages(team.image);
    processedTeams[team.id] = team;
  });
  teams.sort((teamA, teamB) => parseInt(teamA.order,10) > parseInt(teamB.order,10) ? 1 : -1);
  let alphabeticTeams = [...teams]
  alphabeticTeams.sort((teamA, teamB) => teamA.title > teamB.title ? 1 : -1);
  alphabeticTeams = alphabeticTeams.map((team) => team.id);
  teams.forEach((team) => {
    resultsIds.push(team.id);
  });

  const teamsInOrder = teams.map((team) => {
    return team;
  })
  let teamPicks = {} 
  teams.forEach((team) => {
    teamPicks[team.id] = team.pick_trades;
  })


  let resultsTeamPicks = JSON.parse(JSON.stringify({...teamPicks}));
  const resultsTeamNameLogo = [...teams].sort((teamA, teamB) => parseInt(teamA.order_results,10) > parseInt(teamB.order_results,10) ? 1 : -1).map((team, index) => {
    let teamToUse = team;
    let via = '';
    const tradeToUse = Math.floor(index/29);
    if(resultsTeamPicks[team.id] && resultsTeamPicks[team.id].length && index+1 === parseInt(resultsTeamPicks[team.id][0].pick, 10)){      
      teamToUse = processedTeams[resultsTeamPicks[team.id][0].team];
      via = resultsTeamPicks[team.id][0].via;
      resultsTeamPicks[team.id].shift();
    }
    return {teamName: teamToUse.title, logo: teamToUse.image, via: via}
  });
  
  const teamNameLogo = teamsInOrder.map((team, index) => {
    let teamToUse = team;
    let via = '';
    const tradeToUse = Math.floor(index/29);
    if(teamPicks[team.id] && teamPicks[team.id].length){  
      if(index+1 === parseInt(teamPicks[team.id][0].pick, 10)){
        teamToUse = processedTeams[teamPicks[team.id][0].team];
        via = teamPicks[team.id][0].via;
        teamPicks[team.id].shift();
      }
    }
    return {teamName: teamToUse.title, logo: teamToUse.image, via: via}
  });

  let teamNameLogoResults = {};
  teams.forEach((team) => {
    let teamToUse = team;
    let via = '';
    if(team.pick_trades && team.pick_trades[0]){
      teamToUse = processedTeams[team.pick_trades[0].team];
      via = null;
    }
    teamNameLogoResults[teamToUse.id] =  {teamName: teamToUse.title, logo: teamToUse.image, via: via}
  });
  return {
    teamData: processedTeams,
    teamNeeds: teamIds,
    draftResults: resultsIds,
    teamNameLogo: [...teamNameLogo, ...teamNameLogo],
    resultsTeamNameLogo: [...resultsTeamNameLogo, ...resultsTeamNameLogo],
    teamNameLogoResults: teamNameLogoResults,
    alphabeticTeams: alphabeticTeams
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
  const articleInters = contents.article_inter ? contents.article_inter.content : [];
  const podcastInters = contents.podcast_inter ? contents.podcast_inter.content : [];
  const writeupInters = contents.writeup_inter ? contents.writeup_inter.content : [];
  const toutInters = contents.tout ? contents.tout.content : [];

  toutInters.forEach((tout_inter) => {
    tout_inter = decodeContent(tout_inter);
    tout_inter.image = processImages(tout_inter.image);
    tout_inter.image_mobile = processImages(tout_inter.image_mobile);
    const listPositions = tout_inter.list_positions;
    if(listPositions){
      if(listPositions.big_board_position) {
        processedInterstitials.bigBoard[listPositions.big_board_position] = tout_inter;
      }
      if(listPositions.mock_draft_position) {
        processedInterstitials.mockDraft[listPositions.mock_draft_position] = tout_inter;
      }
      if(listPositions.team_needs_position) {
        processedInterstitials.teamNeeds[listPositions.team_needs_position] = tout_inter;
      }
      if(listPositions.draft_results_position) {
        processedInterstitials.draftResults[listPositions.draft_results_position] = tout_inter;
      }
    }
  });

  writeupInters.forEach((writeup_inter) => {
    writeup_inter = decodeContent(writeup_inter);
    writeup_inter.image = processImages(writeup_inter.image);
    const listPositions = writeup_inter.list_positions;
    if(listPositions){
      if(listPositions.big_board_position) {
        processedInterstitials.bigBoard[listPositions.big_board_position] = writeup_inter;
      }
      if(listPositions.mock_draft_position) {
        processedInterstitials.mockDraft[listPositions.mock_draft_position] = writeup_inter;
      }
      if(listPositions.team_needs_position) {
        processedInterstitials.teamNeeds[listPositions.team_needs_position] = writeup_inter;
      }
      if(listPositions.draft_results_position) {
        processedInterstitials.draftResults[listPositions.draft_results_position] = writeup_inter;
      }
    }
  });

  articleInters.forEach((article_inter) => {
    article_inter = decodeContent(article_inter);
    article_inter.image = processImages(article_inter.image);
    const listPositions = article_inter.list_positions;
    if(listPositions){
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
    }
  });

  listInters.forEach((list_inter) => {
    list_inter = decodeContent(list_inter);
    list_inter.data.category = list_inter.category;
    list_inter.data.image = processImages(list_inter.data.image);
    const listPositions = list_inter.list_positions;
    if(listPositions){
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
    }
  });
  podcastInters.forEach((podcast_inter) => {
    podcast_inter = decodeContent(podcast_inter);
    podcast_inter.image = processImages(podcast_inter.image);
    const listPositions = podcast_inter.list_positions;
    if(listPositions){
      if(listPositions.big_board_position) {
        processedInterstitials.bigBoard[listPositions.big_board_position] = podcast_inter;
      }
      if(listPositions.mock_draft_position) {
        processedInterstitials.mockDraft[listPositions.mock_draft_position] = podcast_inter;
      }
      if(listPositions.team_needs_position) {
        processedInterstitials.teamNeeds[listPositions.team_needs_position] = podcast_inter;
      }
      if(listPositions.draft_results_position) {
        processedInterstitials.draftResults[listPositions.draft_results_position] = podcast_inter;
      }
    }
  })
  videoInters.forEach((video_inter) => {
    video_inter = decodeContent(video_inter);
    const listPositions = video_inter.list_positions;
    video_inter.image = processImages(video_inter.image);
    if(listPositions){
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
    }
  })
  return {
    toutInters,
    writeupInters,
    podcastInters,
    listInters: processedInterstitials
  }
}