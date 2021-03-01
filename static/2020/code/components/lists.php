<div style="position:relative; z-index:6;">
    <div id="item-list" class="grid">
        <div id="list-players">
            <div class="list-intro">
                <div class="list-intro-big-board">
                    {{page.big_board_intro|raw}}
                    <a href="#" class="go-to-mock" data-sort-id="mock">{{page.big_board_link}}</a>
                </div>
                <div class="list-intro-mock">
                    {{page.mock_draft_intro|raw}}
                    <a href="#" class="go-to-big" data-sort-id="ringer">{{page.mock_draft_link}}</a>
                </div>
            </div>
            {% for player in players %}
                {% include 'components/templates/card.php' with {'player_': player, 'rank': loop.index, 'show_combine': page.enable_combine, 'card_index': loop.index, 'team': mock_teams.length <= loop.index ? mock_teams[loop.index-1] : false, bubble_text: page.card_bubble_text } %}
                {% if (loop.index is divisible by(12) and inters|length >= (loop.index/12)) %}
                    {% if(inters[(loop.index/12) - 1].category is same as('video_inter')) %}
                        {% include 'components/templates/video.php' with {'video' : inters[(loop.index/12) - 1]} %}
                    {% else %}
                        {% include 'components/templates/list.php' with {'list_inter' : inters[(loop.index/12) - 1]} %}
                    {% endif %}
                {% endif %}
            {% endfor %}
        </div>
    </div>
</div>