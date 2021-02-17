<header>
	<nav>
		<a href="http://theringer.com" class="logo"><img src="./dist/img/logo.png" alt="The Ringer Logo" /></a>
		<ul class="main-nav">
			<li><a target="_blank" href="https://www.theringer.com/pages/podcasts">PODCASTS</a></li>
			<li><a target="_blank" href="https://www.theringer.com/nfl">NFL</a></li>
			<li><a target="_blank" href="https://www.theringer.com/college-football">COLLEGE FOOTBALL</a></li>
		</ul>
	</nav>
	<div class="heading-wrapper">
		<div class="heading-text">
			<h1>
				<span class="small">The Ringer's</span>
				<span class="big"><em>2020</em> NFL <br/>Draft Guide </span>
			 </h1>
			 <div class="header-secondary-text">
			 	<h2>With scouting reports by Danny Kelly</h2>
			 	<div class="header-updated-text">{{page.intro_updated}}</div>
			</div>
		 </div>
		 <div class="heading-opener">
			{#
			 	// $frameCount = 0;
			 	// foreach($page['open_images'] as $frame){
				// 	$frameCount++;
				// 	$frame['title'] = preg_replace('/(https:\/\/heddek.s3.amazonaws.com)/i', 'https://d3gmc2itu3p9gx.cloudfront.net', $frame['title']);
				// 	if($frameCount === 1){
				// 		echo '<img class="show-img frame" src="' . $frame['title'] . '" data-frame-id="' . $frameCount . '" alt="Graphic with player"/>';
				// 	} else {
				// 		echo '<img class="frame" data-src="' . $frame['title'] . '" data-frame-id="' . $frameCount . '" alt="Graphic with player"/>';
				// 	}
				//  }
			 #}
		 </div>
		 <!-- <div class="header-sponsor-statefarm">
	 		<span>Presented by</span> <img src="./dist/img/state-farm.svg" alt="State Farm Logo" />
	 	</div> -->
	</div>
</header>
