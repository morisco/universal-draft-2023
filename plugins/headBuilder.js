function headBuilder(context) {
  const baseUrl = process.env.HEDDEK_LOCATION === 'staging' ? context.configuration.staging_url  : context.configuration.production_url
  let metaTitle = context.settings.title
  let metaDescription = context.configuration.facebook_page_share_description;
  if(context.sharedPlayer){
    const routeName = context.$route.name === 'mock_draft_player_share' ? 'mock-draft' : 
      context.$route.name === 'big_board_player_share' ? 'big-board' : 
      context.$route.name === 'draft_results_player_share' ? 'draft-results' : null; 
    const playerName = context.sharedPlayer.first_name.trim() + ' ' + context.sharedPlayer.last_name.trim();
    metaTitle = context.settings[routeName + '-share-title'].replace(/XXXPLAYERXXX/g, playerName);
    metaDescription = context.settings[routeName + '-share-description'].replace(/XXXPLAYERXXX/g, playerName);
  }
  if(context.sharedTeam){
    metaTitle = context.settings['team-needs-share-title'].replace(/XXXTEAMXXX/g, context.sharedTeam.title);
    metaDescription = context.settings['team-needs-share-description'].replace(/XXXTEAMXXX/g, context.sharedTeam.title);
  }
  return {
    title: context.settings.title,
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