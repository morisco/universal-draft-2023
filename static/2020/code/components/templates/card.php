<div class="card-item col-xs-12 combine-count-{{player_.combine_results|length}} {{player_.player_position_stats.position}} {{ rank > 32 ? 'hide-mock' : '' }} {% if(player_.image_data.image_hover) %}has-hover{%endif%}" data-player-id="{{player_.share_id}}" data-id="{{rank}}">
    <div id="{{player_.share_id}}" class="offset-id"></div>
    {% if player_.show_updated %}
        <div class="new">
            <div class="new-wrap">
                <span>New!</span>
                <span>{{player_.player_updates.player_updated_date}}</span>
            </div>
        </div>
    {% endif %}
    <div class="card-info show-info-{{player_.show_updated}}">
        <div class="movement change-{{player_.player_updates.rank_movement}}">
            <div class="move-up">
            </div>
            <div class="move-down">
            </div>
        </div>
        {% if team %}
            <div class="nfl-team-wrapper">
                <span>{{team}}</span>
            </div>
        {% endif %}
    </div>
    <div class="wrapper">
        <div class="rank-column">
            <!-- <div class="rank"><span>{{player_.rank}}</span></div> -->
            {% if team %}
                <div class="nfl-team-wrapper">
                    <span>{{team}}</span>
                </div>
            {% endif %}

            {% if rankings.ringer_movement %}
                <div class="movement change-{{player_.rankings.ringer_movement}}">
                    <div class="move-up">
                    </div>
                    <div class="move-down">
                    </div>
                </div>
            {% endif %}
            <div class="image">
                <div class="image-backdrop"></div>
                <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="{{player_.image_data.image_sizes.small}}" alt="{{player_.title}}" class="not-hover" />
                {% if player_.image_data.image_hover %}
                    <img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="{{player_.image_data.image_hover_sizes.small}}" alt="{{player_.title}}" class="hover-image" />
                {% endif %}
            </div>
            {% if team %}
            <div class="info-bubble team-info-bubble">
                <div class="team">
                    <img src="{{team.image}}" class="team-logo" alt="{{team.title}} Logo"  />
                    <span class="team-name">
                      {{team.title|raw}}
                      {% if team.trade %}
                      <br/>{{team.trade|raw}}
                      {% endif %}
                    </span>
                </div>
            </div>
            {% endif %}
            {% if show_combine %}
                <div class="combine-results non-mobile">
                    <h4 class="combine-h4"><strong>Combine Results</strong></h4>
                    {% if(player_.combine_results|length) %}
                    <ul class="">
                        {% for result in player_.combine_results %}
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
            <div class="ringer-coverage">
                {% if coverage.length %}
                    <h5>Ringer Coverage</h5>
                    <ul>
                        {% for story in coverage %}
                            <li>
                                <a href="{{player_.story.link}}" target="_blank">
                                    {{story.title}}
                                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 13.03"><rect class="white-fill" y="5.75" width="15" height="1.5"/><rect class="white-fill" x="22.59" y="12.58" width="1.5" height="8.15" transform="translate(-16.69 8.13) rotate(-45)"/><rect class="white-fill" x="19.26" y="22.11" width="8.15" height="1.5" transform="translate(-21.08 9.95) rotate(-45)"/></svg>
                                </a>
                            </li>
                        {% endfor %}
                    </ul>
                {% endif %}
            </div>
        </div>
        <div class="info-column">
            {% set player = player_|merge({'ranking': rank, 'show_combine': show_combine}) %}
            {% include 'components/templates/info.php' with player %}
        </div>
        <div class="toggle-card">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 39.5 39.5"><defs><clipPath><rect class="cls-1" width="39.5" height="39.5"/></clipPath></defs><g class="cls-2"><path class="" d="M19.75,39.5A19.75,19.75,0,1,1,39.5,19.75,19.75,19.75,0,0,1,19.75,39.5Zm0-38A18.25,18.25,0,1,0,38,19.75,18.25,18.25,0,0,0,19.75,1.5Z"/></g><rect class="" x="19" y="11.75" width="1.5" height="15"/><rect class="" x="18.77" y="22.59" width="8.15" height="1.5" transform="translate(-9.81 22.99) rotate(-45)"/><rect class="" x="15.89" y="19.26" width="1.5" height="8.15" transform="translate(-11.63 18.6) rotate(-45)"/></svg>
            <span class="more">MORE</span>
            <span class="less">LESS</span>
            {% if card_index < 6 %}
                <div class="info-bubble">
                    <span>{{bubble_text|raw}}</span>
                </div>
            {% endif %}
        </div>
    </div>
</div>
