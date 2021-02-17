<div class="video_inter" data-id="{{video.id}}">
	<div class="video-content">
		<div class="video-header">Video</div>
		<div class="video-title">
			{{video.title | raw}}
		</div>
		<div class="video-dek">
			{{video.dek}}
		</div>
		<div class="video-presentedby">
			<span>Presented by</span>
			<img src="./dist/img/state-farm.svg" alt="State Farm Logo" />
		</div>
	</div>
	<div class="video-video">
		<div class="video-image" data-id="{{video.id}}" data-video-id="{{video.video}}" data-background-image="{{video.image_small}}">
			<div class="video-play"></div>
			<div class="video-spinner">
				<div class="double-bounce1"></div>
				<div class="double-bounce2"></div>
			</div>
		</div>
		<div class="youtube-wrapper">
			<div class="current-youtube">
				<p>Currently Playing:</p>
				{{video.title | raw}}
			</div>
			<div id="youtube-{{video.id}}" class="youtube"></div>
			<div class="close">
				<a href="javascript:void(0);" class="hide">Hide</a>
				<a href="javascript:void(0);" class="hide-stop">Stop</a>
			</div>
		</div>
	</div>
</div>
