<section class="list_inter">
	<div class="image">
		<!-- <div class="inter-subtitle">
			{{list_inter.subtitle}}
		</div> -->
		<div class="inter-title">
			{{list_inter.data.title_html | raw}}
		</div>
		<div class="inter-byline">
			BY {{list_inter.data.byline}}
		</div>
		<img src="{{list_inter.data.image_small}}" data-src="{{list_inter.data.image_small}}" alt="{{list_inter.title}}" />
	</div>
	<div class="content">
		{{list_inter.data.content | raw}}
	</div>
</section>
