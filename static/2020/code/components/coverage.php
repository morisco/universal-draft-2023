<div class="more-coverage">
    <h3>MORE FROM THE RINGER</h3>
    <div>
        {% for article in articles %}
            <a href="{{article.link}}" class="article">
                <span class="img" data-background-image="{{article.image_small}}"></span>
                <h4>{{article.title}}</h4>
            </a>
        {% endfor %}
    </div>
</div>
