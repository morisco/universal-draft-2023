<div id="filters">
	{% if page.whats_new and page.whats_new_list and (page.whats_new_list | length > 0) %}
		<div class="whats-new">
			<div class="title">What's New</div>
			{% for new in page.whats_new_list %}
				<div class="new-item"><span class="date">{{new.date}}</span> <span class="message">{{new.message}}</span></div>
			{% endfor %}
		</div>
	{% endif %}
	<div class="size-filter">
		<div class="title">How much do you <br/>want to know?</div>
		<div class="filter-links size-toggle">
			<div class="info-bubble">
				<span>{{page.filter_bubble_text|raw}}  <img src="./dist/img/down-left-arrow.svg" /></span>
			</div>
			<a href="#" class="compact" data-size="small">
				<div class="emoji"></div>
				<span>Skim</span>
			</a>
			<a href="#" class="default" data-size="medium">
				<div class="emoji"></div>
				<span>Peruse</span>
			</a>
				<a href="#" class="deep" data-size="large">
					<div class="emoji"></div>
					<span>Deep Dive</span>
				</a>
		</div>
		<div class="title">Sort By Position</div>
		<div class="filter-links filter-position">
			<div class="pointer"></div>
			<a href="javascript:void(0);" data-filter="all"><span>All</span></a>
			<a href="javascript:void(0);" data-filter="all-offense"><span class="above-tablet">All Offense</span><span class="tablet-below">Offense</span></a>
			<a href="javascript:void(0);" data-filter="all-defense"><span class="above-tablet">All Defense</span> <span class="tablet-below">Defense</span></a>
			<a href="javascript:void(0);" data-filter="qb"><span class="above-tablet">Quarterbacks</span> <span class="tablet-below">QB</span></a>
			<a href="javascript:void(0);" data-filter="rb"><span class="above-tablet">Running Backs</span><span class="tablet-below">RB</span></a>
			<a href="javascript:void(0);" data-filter="pc"><span class="above-tablet">Pass Catchers</span><span class="tablet-below">WR/TE</span></a>
			<a href="javascript:void(0);" data-filter="ol"><span class="above-tablet">Offensive Linemen</span><span class="tablet-below">OL</span></a>
			<a href="javascript:void(0);" data-filter="de"><span class="above-tablet">Edge Rushers</span><span class="tablet-below">DE</span></a>
			<a href="javascript:void(0);" data-filter="idl"><span class="above-tablet">Int. Defensive Linemen</span><span class="tablet-below">IDL</span></a>
			<a href="javascript:void(0);" data-filter="lb"><span class="above-tablet">Linebackers</span><span class="tablet-below">LB</span></a>
			<a href="javascript:void(0);" data-filter="db"><span class="above-tablet">Defensive Backs</span><span class="tablet-below">DB</span></a>
		</div>
		<div class="filter-links filter-all-coverage">
			<a href="{{page.all_link}}" target="_blank">{{page.all_text}}</a>
		</div>
	</div>
</div>
