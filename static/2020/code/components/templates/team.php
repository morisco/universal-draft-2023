{% spaceless %}
<div class="team-card" data-id={{id}}>
    <div class="team-top-section">
        <div class="top-title">
            <div class="logo-wrapper">
                <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="{{image}}" class="team-logo" alt="{{title}} Logo"/>
            </div>
            <div class="team-name" style="{{title_font_size ? 'font-size:' ~ title_font_size : ''}}">{{title}}</div>
        </div>
        <div class="team-picks-needs-wrapper">
            <div class="team-picks">
                <ul>
                    <li class="team-picks-header">
                        <span class="team-pick-number">Top Picks</span>
                        <span class="team-pick-text">How They Acquired It</span>
                    </li>
                    {% for pick in picks %}
                        <li class="team-picks-header">
                            <span class="team-pick-number">{{pick.number}}</span>
                            <span class="team-pick-text">{{pick.how | raw}}</span>
                        </li>
                    {% endfor %}
                </ul>
            </div>
            <div class="team-needs">
                <div class="team-needs-header">Team Needs</div>
                <ul>
                    {% for need in needs %}
                        <li class="team-need">
                            <span>{{need.need | raw}}</span>
                        </li>
                    {% endfor %}
                </ul>
            </div>
        </div>
    </div>

    <div class="team-player-section player-count-{{players_count}}">
        <div class="team-players-headline">
            <span>Friendly</span>
            <br/>
            <span>Suggestions</span>
        </div>
        <div class="team-player-wrapper">
            {% set pos = {
                    'quarterback' : 'qb',
                    'running back' : 'rb',
                    'wide receiver' : 'wr',
                    'tackle' : 't',
                    'offensive tackle' : 't',
                    'edge rusher': 'de',
                    'interior defensive lineman': 'idl',
                    'linkebacker': 'lb',
                    'cornerback': 'cb',
                    'safety': 's',
                    'center': 'c',
                }
            %}
            {% for player in players %}
                <a href="{{player.scouting_link}}" target="_blank" class="team-player {{pos[player.position|lower]}} no-silo">
                    <div class="team-player-image-column">
                        <div class="team-player-image-wrapper">
                            <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="{{ player.player_image }}" alt="{{player.title}}" class="team-player-image" style="transform: translate({{player.image_offset_left}}, {{player.image_offset_top}})" />
                        </div>
                    </div>
                    <div class="team-player-info-wrapper">
                        <div class="team-player-name" style="font-size:{{title_size}}">{{player.title}}</div>
                        <div class="team-player-position">{{player.position}}&nbsp;</div>
                        <div class="team-player-school">{{player.school}}</div>
                        <div class="team-player-blurb">{{player.blurb | raw}}</div>
                    </div>
                </a>
            {% endfor %}
        </div>
    </div>

    <div class="team-history-section">
        <div class="team-history-header">Roster Considerations</div>
        <div class="team-history">
          {{history | raw}}
        </div>
    </div>
</div>

{% endspaceless %}