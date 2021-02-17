<div id="intro">
	<div class="credit">No Credits</div>
	<div class="intro-wrapper">
		<div>
			{{page.intro | raw}}
			<div class="intro-actions">
				<div class="social">
					<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u={{config.production_url}}" class="facebook"></a>
					<a target="_blank" href="https://twitter.com/intent/tweet?text={{config.twitter_page_share| url_encode}}&url={{config.production_url | url_encode}}" class="twitter"></a>
				</div>
			</div>
		</div>
	</div>
</div>
