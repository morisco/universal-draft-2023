{% spaceless %}
<div id="list-teams">
            {% for team in teams %}
                {% include 'components/templates/team.php' with team %}
                {% if (loop.index is divisible by(12) and inters|length >= (loop.index/12)) %}
                    {% if(inters[(loop.index/12) - 1].category is same as('video_inter')) %}
                        {% include 'components/templates/video.php' with {'video' : inters[(loop.index/12) - 1]} %}
                    {% else %}
                        {% include 'components/templates/list.php' with {'list_inter' : inters[(loop.index/12) - 1]} %}
                    {% endif %}
                {% endif %}
            {% endfor %}
</div>
{% endspaceless %}
