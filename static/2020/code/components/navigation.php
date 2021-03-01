<div id="sticky-anchor"></div>
<div id="sticky-phantom">&nbsp; &nbsp;</div>
<nav id="mobile-nav">
	<img src="./dist/img/mobile-nav-arrow.svg"  class="mobile-nav-arrow" />
	<div class="toggle-zone"></div>
	<div class="toggle-close"></div>
	<div class="filter-logo">
		<a href="http://theringer.com" target="_blank">
			<img src="./dist/img/logo-square.png" alt="Go To The Ringer" />
		</a>
	</div>
	<div class="toggle"></div>
	<div class="current-sort" >
		{{list_id is same as('ringer') ? 'Big Board' : 'Mock Draft'}}
	</div>
	<div class="nav-contents">
		<div class="current-sort color-theme">
			Ringer NFL Draft 2020
		</div>
		<div class="sort">
			{% if(page.sort_list_id is same as('ringer')) %}

				<div class="filter ringer-sort {{ list_id is same as('ringer') ? 'active_filter' : '' }}" data-sort-id="ringer">
					<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 13.03"><rect class="arrow-fill" y="5.75" width="15" height="1.5"/><rect class="arrow-fill" x="22.59" y="12.58" width="1.5" height="8.15" transform="translate(-16.69 8.13) rotate(-45)"/><rect class="arrow-fill" x="19.26" y="22.11" width="8.15" height="1.5" transform="translate(-21.08 9.95) rotate(-45)"/></svg>
					<span class="name">Big Board by Danny Kelly</span>
					<span class="updated">{{page.players_to_watch_updated}}</span>
				</div>
				<div class="filter ringer-sort  {{ list_id is same as('mock') ? 'active_filter' : '' }}" data-sort-id="mock">
					<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 13.03"><rect class="arrow-fill" y="5.75" width="15" height="1.5"/><rect class="arrow-fill" x="22.59" y="12.58" width="1.5" height="8.15" transform="translate(-16.69 8.13) rotate(-45)"/><rect class="arrow-fill" x="19.26" y="22.11" width="8.15" height="1.5" transform="translate(-21.08 9.95) rotate(-45)"/></svg>
					<span class="name">Mock Draft</span>
					<span class="updated">{{page.danny_updated}}</span>
				</div>
				<div class="filter team">
					<span>Team Needs by Robert Mays</span>
					<span class="updated">{{page.breakdown_updated}}</span>
				</div>
			{% elseif(page.sort_list_id is same as('mock')) %}
				<div class="filter mock-sort  {{ list_id is same as('mock') ? 'active_filter' : '' }}" data-sort-id="mock">
					<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 13.03"><rect class="arrow-fill" y="5.75" width="15" height="1.5"/><rect class="arrow-fill" x="22.59" y="12.58" width="1.5" height="8.15" transform="translate(-16.69 8.13) rotate(-45)"/><rect class="arrow-fill" x="19.26" y="22.11" width="8.15" height="1.5" transform="translate(-21.08 9.95) rotate(-45)"/></svg>
					<span class="name">Mock Draft</span>
					<span class="updated">{{page.danny_updated}}</span>
				</div>
				<div class="filter ringer-sort {{ list_id is same as('ringer') ? 'active_filter' : '' }}" data-sort-id="ringer">
					<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 13.03"><rect class="arrow-fill" y="5.75" width="15" height="1.5"/><rect class="arrow-fill" x="22.59" y="12.58" width="1.5" height="8.15" transform="translate(-16.69 8.13) rotate(-45)"/><rect class="arrow-fill" x="19.26" y="22.11" width="8.15" height="1.5" transform="translate(-21.08 9.95) rotate(-45)"/></svg>
					<span class="name">Big Board by Danny Kelly</span>
					<span class="updated">{{page.players_to_watch_updated}}</span>
				</div>
				<div class="filter team">
					<span>Team Needs by Robert Mays</span>
					<span class="updated">{{page.breakdown_updated}}</span>
				</div>
			{% else %}
				<div class="filter team">
					<span>Team Needs by Robert Mays</span>
					<span class="updated">{{page.breakdown_updated}}</span>
				</div>
				<div class="filter ringer-sort  {{ list_id is same as('mock') ? 'active_filter' : '' }}" data-sort-id="mock">
					<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 13.03"><rect class="arrow-fill" y="5.75" width="15" height="1.5"/><rect class="arrow-fill" x="22.59" y="12.58" width="1.5" height="8.15" transform="translate(-16.69 8.13) rotate(-45)"/><rect class="arrow-fill" x="19.26" y="22.11" width="8.15" height="1.5" transform="translate(-21.08 9.95) rotate(-45)"/></svg>
					<span class="name">Mock Draft</span>
					<span class="updated">{{page.danny_updated}}</span>
				</div>
				<div class="filter ringer-sort {{ list_id is same as('ringer') ? 'active_filter' : '' }}" data-sort-id="ringer">
					<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 13.03"><rect class="arrow-fill" y="5.75" width="15" height="1.5"/><rect class="arrow-fill" x="22.59" y="12.58" width="1.5" height="8.15" transform="translate(-16.69 8.13) rotate(-45)"/><rect class="arrow-fill" x="19.26" y="22.11" width="8.15" height="1.5" transform="translate(-21.08 9.95) rotate(-45)"/></svg>
					<span class="name">Big Board by Danny Kelly</span>
					<span class="updated">{{page.players_to_watch_updated}}</span>
				</div>
			{% endif %}
		</div>
		<div class="nav-actions">
			<div class="actions-column">
				<div class="title">How much do you want to know?</div>
				<div class="filter-links size-toggle">
					<a href="#" class="compact" data-size="small">
						<div class="emoji"></div>
						<span>Skim</span>
					</a>
					<a href="#" class="default active" data-size="medium">
						<div class="emoji"></div>
						<span>Peruse</span>
					</a>
					<a href="#" class="deep" data-size="large">
						<div class="emoji"></div>
						<span>Deep Dive</span>
					</a>
				</div>
			</div>
			<div class="actions-column">
				<div class="title">Sort By Position</div>
				<div class="filter-links filter-position">
					<div class="pointer"></div>
					<a href="javascript:void(0);" data-filter="all"><span>All</span></a>
					<a href="javascript:void(0);" data-filter="all-offense"><span class="above-tablet">All Offense</span></a>
					<a href="javascript:void(0);" data-filter="all-defense"><span class="above-tablet">All Defense</span></a>
					<a href="javascript:void(0);" data-filter="qb"><span class="above-tablet">Quarterbacks</span></a>
					<a href="javascript:void(0);" data-filter="rb"><span class="above-tablet">Running Backs</span></a>
					<a href="javascript:void(0);" data-filter="pc"><span class="above-tablet">Pass Catchers</span></a>
					<a href="javascript:void(0);" data-filter="ol"><span class="above-tablet">Offensive Linemen</span></a>
					<a href="javascript:void(0);" data-filter="de"><span class="above-tablet">Edge Rushers</span></a>
					<a href="javascript:void(0);" data-filter="idl"><span class="above-tablet">Int. Defensive Linemen</span></a>
					<a href="javascript:void(0);" data-filter="lb"><span class="above-tablet">Linebackers</span></a>
					<a href="javascript:void(0);" data-filter="db"><span class="above-tablet">Defensive Backs</span></a>
				</div>
			</div>

		</div>
		<a href="{{page.all_link}}" target="_blank" class="all-coverage" >{{page.all_text}}</a>

	</div>
</nav>
<div id="filter-bar-wrapper">
	<div id="gotolist"></div>
	<div class="info-bubble">
		<span>{{page.navigation_bubble_text|raw}}  <img src="./dist/img/down-left-arrow.svg" /></span>
	</div>
	<div id="filter-bar">

		<div class="filter-logo">
			<a href="http://theringer.com" target="_blank">
				<img src="./dist/img/logo-square.png" alt="Go To The Ringer" />
			</a>
		</div>
		<div class="swiper-container filter-swiper-container">
			<div class="swiper-wrapper">
				{% if(page.sort_list_id is same as('ringer')) %}
					<div class="small filter ringer-sort {{ page.sort_list_id is same as('ringer') ? 'active_filter' : '' }}" data-sort-id="ringer">
						<div class="filter-wrapper">
							<span>Big Board by Danny Kelly</span>
							<span class="updated">{{page.players_to_watch_updated}}</span>
						</div>
					</div>
					<div class="small filter danny-sort {{ page.sort_list_id is same as('mock')  ? 'active_filter' : '' }}" data-sort-id="mock">
						<div class="filter-wrapper">
							<span>Mock Draft</span>
							<span class="updated">{{page.danny_updated}}</span>
						</div>
					</div>
					<div class="large filter teams {{ page.sort_list_id is same as('teams') ? 'active_filter' : '' }}">
						<div class="filter-wrapper">
							<span>Team Needs by Robert Mays</span>
							<span class="updated">{{page['breakdown_updated']}}</span>
						</div>
					</div>
				{% elseif (page.sort_list_id is same as('mock')) %}
					<div class="small filter danny-sort {{ list_id is same as('mock')  ? 'active_filter' : '' }}" data-sort-id="mock">
						<div class="filter-wrapper">
							<span>Mock Draft</span>
							<span class="updated">{{page.danny_updated}}</span>
						</div>
					</div>
					<div class="small filter ringer-sort {{ list_id is same as('ringer') ? 'active_filter' : '' }}" data-sort-id="ringer">
						<div class="filter-wrapper">
							<span>Big Board by Danny Kelly</span>
							<span class="updated">{{page.players_to_watch_updated}}</span>
						</div>
					</div>
					<div class="large filter teams {{ page.sort_list_id is same as('teams') ? 'active_filter' : '' }}">
						<div class="filter-wrapper">
							<span>Team Needs by Robert Mays</span>
							<span class="updated">{{page['breakdown_updated']}}</span>
						</div>
					</div>
				{% else %}
					<div class="large filter teams {{ page.sort_list_id is same as('teams') ? 'active_filter' : '' }}">
						<div class="filter-wrapper">
							<span>Team Needs by Robert Mays</span>
							<span class="updated">{{page['breakdown_updated']}}</span>
						</div>
					</div>
					<div class="small filter ringer-sort {{ list_id is same as('ringer') ? 'active_filter' : '' }}" data-sort-id="ringer">
						<div class="filter-wrapper">
							<span>Big Board by Danny Kelly</span>
							<span class="updated">{{page.players_to_watch_updated}}</span>
						</div>
					</div>
					<div class="small filter danny-sort {{ list_id is same as('mock')  ? 'active_filter' : '' }}" data-sort-id="mock">
						<div class="filter-wrapper">
							<span>Mock Draft</span>
							<span class="updated">{{page.danny_updated}}</span>
						</div>
					</div>
				{% endif %}
				
			</div>
		</div>	
		<!-- <a href="{{page.all_link}}" target="_blank" class="small filter all-coverage">
			<div class="filter-wrapper">
				<span>All Draft Coverage</span>
				<span class="updated">{{page['all_updated']}}</span>
			</div>
		</a> -->
	</div>
</div>
