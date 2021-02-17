<div class="medium-show">
    {% set positions = {
            qb: 'Quarterback',
            rb: 'Running Back',
            wr: 'Wide Receiver',
            te: 'Tight End',
            t: 'Tackle',
            g: 'Guard',
            c: 'Center',
            de: 'Edge Rusher',
            idl: 'Interior Defensive Lineman',
            lb: 'Linebacker',
            db: 'Cornerback',
            s: 'Safety',
        }
    %}
    <div class="player-main">
        <div class="player-rank-name">
            <div class="rank"><span>{{ranking}}</span></div>
            <h3 style="font-size:{{title_font_size}};"><span>{{first_name}}</span> <span>{{last_name}}</span></h3>
        </div>
        <div class="position-school">
            <h4><strong>{{positions[player_position_stats.position]}}</strong></h4>
            <h4>{{player_meta.school}}, {{player_meta.year}}</h4>
        </div>
    </div>
    <div class="player-stats">
        {% set type = player_position_stats.position %}
        {% if type in ['qb'] %}
            {% set stats = [
                {'key': 'passing_yards', 'label':'YDS', 'detail':'YDS'},
                {'key': 'passing_yards_per_attempt', 'label':'YPA', 'detail':'YDS'},
                {'key': 'passing_touchdowns', 'label':'TDS', 'detail':'TDS'},
                {'key': 'interceptions', 'label':'INTS', 'detail':'INTS'},
                {'key': 'rating', 'label':'RTG', 'detail':''}]
            %}
        {% elseif type in ['rb'] %}
            {% set stats = [{'key': 'rushing_yards', 'label':'YDS', 'detail':'YDS'},
                {'key': 'yards_per_carry', 'label':'YPC', 'detail':'YDS'},
                {'key': 'rushing_touchdowns', 'label':'TDS', 'detail':'TDS'},
                {'key': 'receptions', 'label':'REC', 'detail':'INTS'},
                {'key': 'twenty_plus_plays', 'label':'20+', 'detail':''}]
            %}
        {% elseif type in ['wr','te'] %}
            {% set stats =[{'key': 'receiving_yards', 'label':'YDS', 'detail':'YDS'},
                {'key': 'yards_per_catch', 'label':'YPR', 'detail':'YDS'},
                {'key': 'receiving_touchdowns', 'label':'TDS', 'detail':'TDS'},
                {'key': 'receptions', 'label':'REC', 'detail':'INTS'},
                {'key': 'twenty_plus_plays', 'label':'20+', 'detail':''}]
            %}
        {% elseif type in ['c', 't', 'g'] %}
            {% set stats = [{'key': 'games', 'label':'GMS', 'detail':'YDS'},
                    {'key': 'starts', 'label':'STRTS', 'detail':'YDS'},
                    {'key': 'penalties', 'label':'PENS', 'detail':''},
                    {'key': 'sacks_allowed', 'label':'Sk ALL', 'detail':'TDS'}]
            %}
        {% elseif type in ['de','idl'] %}
            {% set stats = [{'key': 'tackles', 'label':'TKLS', 'detail':'YDS'},
                    {'key': 'tackles_for_loss', 'label':'TFL', 'detail':'YDS'},
                    {'key': 'sacks', 'label':'Sacks', 'detail':'TDS'}]
            %}
        {% elseif type in ['s','db'] %}
            {% set stats = [{'key': 'tackles', 'label':'TKLS', 'detail':'YDS'},
                    {'key': 'interceptions', 'label':'INTS', 'detail':''},
                    {'key': 'passes_broken_up', 'label':'PBU', 'detail':'INTS'}]
            %}
        {% elseif type in ['lb'] %}
            {% set stats = [{'key': 'tackles', 'label':'TKLS', 'detail':'YDS'},
                    {'key': 'tackles_for_loss', 'label':'TFL', 'detail':'YDS'},
                    {'key': 'sacks', 'label':'Sacks', 'detail':'TDS'}]
            %}
        {% endif %}
        {% set tooltips = {
            'YDS': 'Yards',
            'YPA': 'Yards Per Attempt',
            'YPC': 'Yards Per Carry',
            'YPR': 'Yards Per Reception',
            'TDS': 'Touchdowns',
            'INTS': 'Interceptions',
            'RTG': 'Passer Rating',
            'REC': 'Receptions',
            '20+': '20-plus Yard Plays',
            'GMS': 'Games Played',
            'STRTS': 'Starts',
            'PENS': 'Penalties',
            'Sk ALL': 'Sacks Allowed',
            'TKLS': 'Tackles',
            'TFL': 'Tackles For Loss',
            'Sacks': 'Sacks',
            'PBU': 'Pass Breakups',
        } 
    %}      
        <ul>
            {% for stat in stats %}
                {% if player_position_stats[stat.key] != '' %}
                    <li>
                        <div class="stat-wrap{% if player_position_stats.highlight is same as(stat.key) %} highlighted-stat{% endif %}">
                            <span class="title">
                                {{stat.label}}
                                <span class="tooltip">
                                    {{tooltips[stat.label]}}
                                </span>
                            </span>
                            <span class="number">{{player_position_stats[stat.key]}}</span>
                            <!-- <span class="detail color-theme">{{stat.detail}}</span> -->
                        </div>
                    </li>
                {% endif %}
            {% endfor %}
        </ul>
        <div class="player-meta">
            <div>
                <div class="medium-column">
                    <div><span class="label">Height/Weight</span><span class="value">{{player_meta.height | trim}}, {{player_meta.weight}}</span></div>
                </div>
                <div class="medium-column">
                    <div><span class="label">Age</span><span class="value">{{player_meta.age}}</span></div>
                </div>
                <div class="medium-column">
                    <div class="ringer-stat"><span class="label">Shades Of</span><span class="value">{{player_meta.shades_of}}</span></div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="player-description">
        <div class="player-headline">{{player_description | raw}}</div>
        <div class="player-subline"><strong>Main Selling Point:</strong> {{player_meta.main_selling_point}}</div>
    </div>
</div>
<div class="player-info">
    
    {% if(deep_dives.scouting_report) %}
        <div class="deep-dives">        
            <strong>Scouting Report</strong>
            {{deep_dives.scouting_report | raw}}
            <strong>Why He Could Rise</strong>
            {{deep_dives.why_rise | raw}}
            <strong>Why He Could Fall</strong>
            {{deep_dives.why_fall | raw}}
        </div>
    {% endif %}
    {% if show_combine %}
        <div class="combine-results is-mobile">
            <h4 class="combine-h4"><strong>Combine Results</strong></h4>
            {% if(combine_results|length) %}
                <ul class="">
                    {% for result in combine_results %}
                        <li>
                            <span class="label">{{result.combine_label}}</span>
                            <span class="value">{{result.combine_value}}</span>
                        </li>
                    {% endfor %}
                </ul>
            {% else %}
                <h5>Did not participate in combine drills.</h5>
            {% endif %}
        </div>
    {% endif %}
    {% if disclaimers %}
        <div class="player-disclaimer">
            <i>{{disclaimers}}</i>
        </div>
    {% endif %}
    <h6 class="more-ringer-coverage">
        <a href="{{all_coverage}}" class="color-theme">SEE MORE RINGER COVERAGE</a>
    </h6>
    <div class="player-social">
        <a href="https://www.facebook.com/sharer/sharer.php?u={{facebook_share_url|url_encode}}" target="_blank" class="facebook">Share To Facebook</a>
        <a href="https://twitter.com/intent/tweet?url={{twitter_share_url|url_encode}}&text={{twitter_share_text|url_encode}}" target="_blank" class="twitter">Share To Twitter</a>
    </div>
</div>
