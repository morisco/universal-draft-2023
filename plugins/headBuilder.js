function headBuilder(context) {
  const baseUrl = process.env.HEDDEK_LOCATION === 'staging' ? context.configuration.staging_url  : context.configuration.production_url
  let metaTitle = context.$route.name === 'index' || context.$route.name === 'big_board_player_share' 
  ? context.configuration.facebook_page_share_title
  : context.$route.name === 'mock-draft' || context.$route.name === 'mock_draft_player_share' 
  ? context.settings['mock-draft-page-title']
  : context.$route.name === 'draft-grades' || context.$route.name === 'draft_grades_player_share' 
  ? context.settings['draft-results-page-title']
  : context.$route.name === 'team-needs' || context.$route.name === 'team_needs_team_share'
  ? context.settings['team-needs-page-title']
  : ''; 
  let metaDescription = context.$route.name === 'index' || context.$route.name === 'big_board_player_share' 
  ? context.configuration.facebook_page_share_description
  : context.$route.name === 'mock-draft' || context.$route.name === 'mock_draft_player_share' 
  ? context.settings['mock-draft-page-description']
  : context.$route.name === 'draft-grades' || context.$route.name === 'draft_grades_player_share' 
  ? context.settings['draft-results-page-description']
  : context.$route.name === 'team-needs' || context.$route.name === 'team_needs_team_share'
  ? context.settings['team-needs-page-description']
  : '';
  if(context.sharedPlayer){
    const routeName = context.$route.name === 'mock_draft_player_share' 
      ? 'mock-draft' 
      : context.$route.name === 'big_board_player_share' ? 'big-board' 
      : context.$route.name === 'draft_grades_player_share' ? 'draft-results' : 'null'; 
    const playerName = context.sharedPlayer.first_name.trim() + ' ' + context.sharedPlayer.last_name.trim();
    metaTitle = context.settings[routeName + '-share-title'].replace(/XXXPLAYERXXX/g, playerName);
    metaDescription = context.settings[routeName + '-share-description'].replace(/XXXPLAYERXXX/g, playerName);
  }
  if(context.sharedTeam){
    metaTitle = context.settings['team-needs-share-title'].replace(/XXXTEAMXXX/g, context.sharedTeam.title);
    metaDescription = context.settings['team-needs-share-description'].replace(/XXXTEAMXXX/g, context.sharedTeam.title);
  }

  const pageTitle = context.$route.name === 'index' || context.$route.name === 'big_board_player_share' 
  ? context.settings.title
  : context.$route.name === 'mock-draft' || context.$route.name === 'mock_draft_player_share' 
  ? context.settings['mock-draft-page-title']
  : context.$route.name === 'draft-grades' || context.$route.name === 'draft_grades_player_share' 
  ? context.settings['draft-results-page-title']
  : context.$route.name === 'team-needs' || context.$route.name === 'team_needs_team_share'
  ? context.settings['team-needs-page-title']
  : '';

  const pageDescription = context.$route.name === 'index' || context.$route.name === 'big_board_player_share' 
  ? context.settings.description
  : context.$route.name === 'mock-draft' || context.$route.name === 'mock_draft_player_share' 
  ? context.settings['mock-draft-page-description']
  : context.$route.name === 'draft-grades' || context.$route.name === 'draft_grades_player_share' 
  ? context.settings['draft-results-page-description']
  : context.$route.name === 'team-needs' || context.$route.name === 'team_needs_team_share'
  ? context.settings['team-needs-page-description']
  : '';
  return {
    title: pageTitle,
    description: pageDescription,
    meta: [{ 
      hid: 'description', 
      name: 'description', 
      content: context.settings.description 
    }
    ,{
      hid: 'og:title',
      name: 'og:title',
      content: metaTitle
    },
    {
      hid: 'og:description',
      name: 'og:description',
      content: metaDescription
    },
    {
      hid: 'og:image',
      name: 'og:image',
      content: context.configuration.facebook_page_share_image
    },
    {
      hid: 'og:url',
      name: 'og:url',
      content: baseUrl  + context.$route.path
    }]
  }
}

export default headBuilder;