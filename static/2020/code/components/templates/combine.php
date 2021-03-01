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
