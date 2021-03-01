function Card(id, data){
    var card = this;

    this.data = data;
    this.id = id;
    this.el = $('.card-item[data-id="'+this.id+'"]');
    this.size = 'medium';
    this.sort = GLOBALS.current_sort;

    this.infoTemplateSource = $("#info-template").html();
    // this.infoTemplate = Handlebars.compile(this.infoTemplateSource);

    this.coverageTemplateSource = $("#related-coverage-template").html();
    // this.coverageTemplate = Handlebars.compile(this.coverageTemplateSource);

    this.init = function(){
        var self = this;
        
        this.initEvents();
        if(self.visibleElement(self.el)){
            self.setImageToLoad();
        }
        if(card.data.coverage && card.data.coverage !== ''){
            // card.data.coverage = $.map(card.data.coverage, function(value, index) {
            //     return [value];
            // });
        }
    };

    this.visibleElement = function (element, fullyInView) {
        if(!$(element).offset()){
            return;
        }
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top - 1000;
        var elementBottom = elementTop + $(element).outerHeight() + 1000;

        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }


    this.initEvents = function(){
        var self = this;
        this.el.on('click.whole', this.toggleWholeCard);
        // this.el.on('mouseenter', this.showColor);
        // this.el.on('mouseleave', this.hideColor);
        this.el.on('click', '.toggle-card', this.toggleCard);
        this.el.find('img').each(function(){
            $(this).on('load', self.showImage);
        });
        $(window).on('scroll.' + card.data.id, this.cardScroll);
        events.subscribe('filter.update', this.filter);
        events.subscribe('filter.update', this.cardScroll);
        events.subscribe('sort.update', this.sortChange);
        events.subscribe('size.update', this.size);
        events.subscribe('card.expanded', this.openPlayer);
    };

    this.cardScroll = function(){
        if(card.visibleElement(card.el)){
            $(window).off('scroll' + card.data.id);
            card.setImageToLoad();
        }
    }

    this.setImageToLoad = function(){
        this.el.find('.image img').each(function(){
            var src = $(this).data('src');
            if($(this).attr('src') !== src || $(this).attr('src') === ''){
                $(this).attr('src', src);
            }
        });
    }

    this.showImage = function(){
        card.el.find('img').addClass('image-loaded');
    }

    this.openPlayer = function(obj){
        if(obj.id === card.data.filter_id){
            card.el.off('click.whole');
            card.el.off('click.gifs');
            card.toggleCard();
        }
    }

    this.expandedLoadGifs = function() {
        if(card.size === 'large' && !card.loaded){
            card.loadGifs();
        }
    }

    this.toggleCard = function(e) {
        // ga('send', 'event', 'Player Card', 'click', '');


        card.el.toggleClass('expanded-card');
        if(card.el.hasClass('expanded-card')){
            events.publish('card.expanded', {id: card.data.player_id});
            card.el.off('click.whole');
            card.el.off('click.gifs');
            card.hideColor();
        } else {
            card.el.on('click.whole', card.toggleWholeCard);
        }
    }

    this.toggleWholeCard = function(){
        // ga('send', 'event', 'Player Card', 'expand', 'card.data.name');

        if(card.size !== 'large' && card.size !== 'medium' && !card.el.hasClass('expanded-card')){
            events.publish('card.expanded', {id: card.data.player_id});
            card.el.off('click.whole');
            card.el.addClass('expanded-card');
            card.hideColor();
        }
    }

    this.showColor = function(){
        if(!card.el.hasClass('expanded-card') && ($('body').hasClass('small') || $('body').hasClass('medium'))){
            card.el.find('.info-column').attr('style', 'color:' + (GLOBALS.highlight_color + ';'));
            card.el.find('.info-column .player-description, .info-column span.title, .info-column .stat-wrap').attr('style', 'border-color:' + (GLOBALS.highlight_color + '!important;'));
            // card.el.find('.rank-column .rank').attr('style', 'color:' + (GLOBALS.theme_colors[card.sort] + '!important; background-color:transparent !important;'));
            // card.el.find('.rank-column').attr('style', 'background-color:transparent !important; background-image:url(img/dots.png); border-right:1px solid #ccc;');
        }
    }

    this.hideColor = function(){
        card.el.find('.info-column').removeAttr('style');
        card.el.find('.info-column .stat-wrap').removeAttr('style');
        card.el.find('.info-column .player-description').removeAttr('style');
        card.el.find('.info-column span.title').removeAttr('style');
        // card.el.find('.rank-column .rank').removeAttr('style');
        // card.el.find('.rank-column').removeAttr('style');
    }

    this.showMedia = function() {
        if($(window).width() < 768){
            return;
        }
        var showMedia   = $(this).data('media'),
            mediaBG     = $('.plus-minus-media[data-id="'+showMedia+'"]').css('background-image');
        $(this).addClass('color-theme');
        $('.player-stat-image').addClass('media-shown');
        $('.plus-minus-media[data-id="'+showMedia+'"]').addClass('visible');
        $('.plus-minus-media[data-id="'+showMedia+'"] img').attr('src', showMedia);
    }

    this.hideMedia = function() {
        var hideMedia = $(this).data('media');
        $(this).removeClass('color-theme');
        $('.player-stat-image').removeClass('media-shown');
        $('.plus-minus-media[data-id="'+hideMedia+'"]').removeClass('visible');
    }

    this.loadGifs = function(){
        if(card.loaded || $(window).width() <= 767){
            return;
        }
        card.loaded = true;
        _.each(card.el.find('.plus-minus-media'), function(el){
            var img = $(el).find('img');
            img.attr('src', img.data('src') );
        })
    }

    this.sortChange = function(obj){
        card.sort = obj.sort;
    };

    this.size = function(obj){
        card.size = obj.size;
    };

    this.update = function(new_player){
        this.data = new_player;
        this.loaded = false;
        var delay = $('body').hasClass('mobile') ? 1000 : 500;
            classes = '';
        setTimeout(function(){
            if(card.el.hasClass('expanded-card')){
                classes = 'card-item col-xs-12 expanded-card ' + card.data.player_id + ' ' + card.data.player_position_stats.type;
                classes += new_player['image_hover'] ? ' has-hover' : '';
                card.el.attr('class', classes);
            } else {
                classes = 'card-item col-xs-12 ' + card.data.player_id + ' ' + card.data.player_position_stats.type;
                classes += new_player['image_hover'] ? ' has-hover' : '';
                card.el.attr('class', classes);
            }
            card.el.find('.offset-id').attr('id', new_player.player_id);
            card.el.attr('data-player-id', new_player.share_id);
            if(new_player['image_data'].image_sizes){
                card.el.find('.rank-column img.not-hover').attr('src', new_player['image_data']['image_sizes']['small']).data('src', new_player['image_data']['image_sizes']['small']).attr('alt', card.data.title);
                if(card.el.find('.rank-column img.hover-image').length){
                    // card.el.find('.rank-column img.hover-image').attr('src', new_player['image_data']['image_hover_sizes']['medium'] ).data('src', new_player['image_data']['image_hover_sizes']['medium'] ).attr('alt', card.data.title);
                } else {
                    // card.el.find('.rank-column .image').append('<img class="hover-image" src="' + new_player['image_data']['image_hover_sizes']['medium'] + '" data-src="' + new_player['image_data']['image_hover_sizes']['medium']  + '" alt="' + card.data.name + '"');
                }
            }
        }, 500)
        setTimeout(function(){
            $(card.el).find('.info-column').html(card.data.info_html);
            $(card.el).find('.combine-results.non-mobile').html(card.data.combine_html);
            card.el.find('.movement').removeClass('change-down change-up');
            card.el.find('.movement').addClass('change-' + card.data.player_updates.rank_movement);
            card.el.find('.player-rank-name .rank span').text(card.el.data('id'));
            // $(card.el).find('.ringer-coverage').html(card.coverageTemplate(card.data));
        }, delay);
    }

    this.init();

    return card;
}

window.events = (function(){
    var topics = {};
    var hOP = topics.hasOwnProperty;
  
    return {
      subscribe: function(topic, listener) {
        // Create the topic's object if not yet created
        if(!hOP.call(topics, topic)) topics[topic] = [];
  
        // Add the listener to queue
        var index = topics[topic].push(listener) -1;
  
        // Provide handle back for removal of topic
        return {
          remove: function() {
            delete topics[topic][index];
          }
        };
      },
      publish: function(topic, info) {
        // If the topic doesn't exist, or there's no listeners in queue, just leave
        if(!hOP.call(topics, topic)) return;
  
        // Cycle through topics queue, fire!
        topics[topic].forEach(function(item) {
                item(info != undefined ? info : {});
        });
      }
    };
})();
  
$(document).ready(function(){
    window.masterList = new CardList();
    var mobile = new Mobile(masterList);
    var videoPlayer = new VideoPlayer(masterList);
    var playCount = 0;
});

function CardList() {
    var cardlist = this;

    this.$el = $('#item-list');

    this.cards = [];

    this.teams = [];
    
    var currentQuery = location.search.substring(1);
        currentQuery = currentQuery ? JSON.parse('{"' + decodeURI(currentQuery).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}') : {}

    this.sort_id = currentQuery.list ? currentQuery.list : GLOBALS.current_sort;
    this.filter_id = 'all';

    GLOBALS.player = currentQuery.player ? currentQuery.player : GLOBALS.player;

    this.initial_player = false;

    this.filterOffsetPos = $(window).width() < 768 ? $('#sticky-anchor').offset().top : $('#sticky-anchor').offset().top;

    this.introOffsetPos = $('#intro').offset().top;
    this.trackedCards = [];
    this.trackedVideos = [];
    this.size = currentQuery.view === 'deep' ? 'large' : (currentQuery.view === 'skim' ? 'small' : 'medium');
    this.filter_id = currentQuery.position ? currentQuery.position : 'all';
    this.cards = [];

    this.init = function() {
        if(typeof ga !== 'undefined'){
            ga('create', 'XXX', 'auto');
            ga('send', 'pageview');
        } else {
            cardlist.adblocker = true;
        }

        this.initialLoad = true;
        if(window.location.hash){
            var hash = window.location.hash.replace(/[^A-Za-z_]/g, '');
            if(hash === 'teams') {
                this.showTeams();
            } else if($('#' + hash) && $('#' + hash).parents('.card-item').length){
                this.hasPlayer      = true;
                GLOBALS.player      = hash;
                this.initial_player = hash;
            }
        }

        $('header').addClass('fonts-loaded');
        this.initEvents();
        this.scrollWatch();
        if(this.initial_player){
            var initlal = this.initial_player;
            if($(window).width() < 768){
                $('#mobile-nav a[data-filter="' + cardlist.filter_id + '"]').click();
            } else {
                $('#filter-bar .filter[data-sort-id="ringer"]').click();

            }
            setTimeout(function(){
                cardlist.openPlayer();
                $('html,body').animate({
                    scrollTop: $('#' + initlal).offset().top
                }, function(){
                    $('#item-list').css('opacity', 1);
                })
            }.bind(this), 500);
        } else {
            $('#item-list').css('opacity', 1);
            if($(window).width() < 768){
                $('#mobile-nav a[data-size="' + this.size + '"]').click();
                // $('#mobile-nav a[data-size="' + this.size + '"]').addClass('active');
                $('#mobile-nav a[data-filter="' + cardlist.filter_id + '"]').click();
            } else {
                
                $('.person[data-list-id="' + this.sort_id + '"]').click();
            }
        }

        if($(window).width() < 768){
            $('#mobile-nav a[data-size="' + this.size + '"]').click();
        } else {
            $('.size-filter a[data-size="' + this.size + '"]').click();
        }

        if($('body').hasClass('show-teams')){
            this.initTeams();
        } else {
            this.initCards();
        }
        this.initOpener();
        // if(GLOBALS.current_sort === 'mock'){
        //     this.initialSort();
        // }

        if(GLOBALS.isTablet || GLOBALS.isMobile){
            // window.podcast = new PodcastPlayer(window.masterList);
        }
        cardlist.bodyAnimation = false;
        
        
        // setTimeout(function(){
            $('.filter-position a[data-filter="' + cardlist.filter_id + '"]').click();
        // }, (currentQuery.position ? 1000 : 0))
        setTimeout(function(){
            cardlist.bodyAnimation = true
        }, 2000)
        
    }

    this.initTeams = function(){
        var teamCard;
        var teamCount = 0;
        _.each(GLOBALS.teams, function(team, index){
            if(team){
                teamCount++;
                teamCard = new Team(team.id, team);
                cardlist.teams.push(teamCard);
            } else{
                // console.log('missing player', player);
            }
        });
    }

    this.initCards = function(){
        var playerCard;
        var playerCount = 0;

        _.each(GLOBALS.lists[GLOBALS.current_sort], function(player, index){
            if(player){
                playerCount++;
                playerCard = new Card(playerCount, player);
                cardlist.cards.push(playerCard);
            } else{
                // console.log('missing player', player);
            }
        });
    }

    this.initialSort = function(){
        var personEl = $('.dropdown .person[data-list-id="' + GLOBALS.current_sort + '"]');
        if(personEl && personEl.length){
            cardlist.personSort(null, personEl);
            $('#mobile-nav .current-sort').text(personEl.find('.name').text());
        }
    }

    this.trackExpand = function(data) {
        if(cardlist.trackedCards.indexOf(data.id) === -1 && !cardlist.adblocker){
            cardlist.trackedCards.push(data.id)
            ga('send', 'event', 'Player Card', 'expand', data.id);
        }
    }

    this.trackVideoPlay = function(title){
        if(cardlist.trackedVideos.indexOf(title) === -1 && !cardlist.adblocker){
            cardlist.trackedVideos.push(title);
            ga('send', 'event', 'Video', 'play', title);
        }
    }

    this.initEvents = function() {
        $('#filters').on('click', '.filter-position a', this.filter);
        $('#filter-bar').on('click', '.teams', this.showTeams);
        $('.filter.team').on('click', this.showTeams);
        $('#filter-bar').on('click', '.ringer-sort', this.sort);
        $('#filter-bar').on('click', '.danny-sort', this.sort);
        $('#mobile-nav').on('click', '.ringer-sort', this.sort);
        if($('body').hasClass('mobile')){
            $('.dropdown').on('click', '.person', function(e){
                if($(this).parents('.dropdown').hasClass('open')){
                    if($(e.currentTarget).data('list-id') === 'default'){
                        $(this).parents('.dropdown').removeClass('open');
                    } else {
                        cardlist.personSort(e);
                    }
                } else {
                    $(this).parents('.dropdown').addClass('open');
                }
            });
        } else {
            $('.dropdown').on('click', '.person', this.personSort);
        }
        $('.nav-contents').on('click', '.person', this.personSort);
        $('.size-toggle').on('click', 'a', this.changeSize);
        $('.video-image').on('click', this.playVideo);
        $(window).on('scroll.initial', cardlist.initialScroll);
        if(!$('body').hasClass('mobile')){
            $('.dropdown').hover(function () { $(this).addClass('open'); }, function () { $(this).removeClass('open'); });
        }
        $(window).on( "orientationchange", this.orientationChange );
        if(!GLOBALS.player){
            $(window).on('scroll', cardlist.scrollWatch);
        }
    }

    cardlist.initialScroll = function(){    
        $(window).off('scroll.initial');
        cardlist.initInterImages();
    }

    this.initOpener = function() {
        var self = this,
            count = 0;

        // $('.heading-opener img').each(function(){
        //     $(this).attr('src', $(this).data('src'));
        // });
        // $('.heading-opener img').load(function(){
        //     count++;
        //     if(count === $('.heading-opener img').length-1){
        //         $('.heading-opener').addClass('loaded');
        //         self.animateHeader();
        //     }
        // })
    }

    this.initInterImages = function(){
        $('.list_inter img').each(function(){
            $(this).attr('src', $(this).data('src'));
        })
        $('.video-image').each(function(){
            $(this).css('background-image', 'url(' + $(this).data('background-image') + ')');
        });

        $('.more-coverage .img').each(function(){
            $(this).css('background-image', 'url(' + $(this).data('background-image') + ')');
        });
    }

    this.pauseVideo = function(){
        if(cardlist.youtubePlayer && cardlist.youtubePlayer.getPlayerState() === 1){
            cardlist.youtubePlayer.stopVideo();
        }
    }

    this.playVideo = function() {
        if(!window.youtubeReady){
            return;
        }
        var playerCard;
        var videoPlayerId = $(this).data('id');
        cardlist.current_video_list = cardlist.sort_id;
        if($('body').hasClass('show-teams')){
            cardlist.video_list = 'teams';
            playerCard = $('#list-teams .video_inter[data-id="' + videoPlayerId + '"]');
        } else {
            cardlist.video_list = 'players';
            playerCard = $('#list-players .video_inter[data-id="' + videoPlayerId + '"]');
        }

        if(cardlist.youtubePlayer){
            cardlist.youtubePlayer.destroy();
            $('.video_inter.playing').find('.youtube-wrapper').removeClass('fixed');
            $('.video_inter.playing').removeClass('loaded playing');
            $(window).off('scroll.youtube');
            $('.hidden-stop').off('click.youtube');
            $('.close').off('click.youtube');
            $('.close').off('click.youtube');
        }

        var videoId = $(this).data('video-id');
        var height = $(window).width() > 768 ? playerCard.outerHeight() : playerCard.outerWidth();
        playerCard.find('.video-title').css('height', playerCard.find('.video-title').outerHeight());
        playerCard.find('.video-presentedby').css('width', playerCard.find('.video-presentedby').width());
        var width = height * 1.50687623;
        playerCard.addClass('playing');
        cardlist.trackVideoPlay(playerCard.find('.video-title').text());

        $(window).on('scroll.youtube', function(){
            if(!cardlist.visibleElement(playerCard.find('.video-video')) && cardlist.noFixedPlayer && cardlist.youtubePlayer.getPlayerState() === 1){
                $('.hidden-stop').addClass('playing-hidden');
            }

            if($(window).scrollTop() <= cardlist.filterOffsetPos && playerCard.hasClass('playing')){
                playerCard.addClass('cant-show');
            } else {
                playerCard.removeClass('cant-show');
            }

            if(cardlist.sort_id !== cardlist.current_video_list ){
                return;
            }

            if(!(!cardlist.visibleElement(playerCard.find('.video-video')) && cardlist.noFixedPlayer && cardlist.youtubePlayer.getPlayerState() === 1)){
                $('.hidden-stop').removeClass('playing-hidden');
            }

            if(!cardlist.visibleElement(playerCard.find('.video-video'), false) && !playerCard.find('.youtube-wrapper').hasClass('fixed') && !cardlist.noFixedPlayer){
                var offset = $('#amplitude').offset();
                var styles = {
                    'left'  : offset.left,
                    'minHeight': $('#amplitude').outerHeight(),
                };
                playerCard.find('.youtube-wrapper').addClass('fixed');
                playerCard.find('.youtube-wrapper').css(styles)
            } else if(cardlist.visibleElement(playerCard.find('.video-video'), false) && playerCard.find('.youtube-wrapper').hasClass('fixed')){
                playerCard.find('.youtube-wrapper').removeClass('fixed').removeAttr('style');
            }
        });

        $('.hidden-stop').on('click.youtube', function(){
            cardlist.youtubePlayer.stopVideo();
            $(this).removeClass('playing-hidden');
        });

        $('.close').on('click.youtube', '.hide', function(){
            cardlist.noFixedPlayer = true;
            playerCard.find('.youtube-wrapper').removeClass('fixed').removeAttr('style');
            playerCard.find('.youtube-wrapper .stop-audio').addClass();
            $('.hidden-stop').addClass('playing-hidden');
        });

        $('.close').on('click.youtube', '.hide-stop', function(){
            cardlist.noFixedPlayer = true;
            playerCard.find('.youtube-wrapper').removeClass('fixed').removeAttr('style');
            cardlist.youtubePlayer.stopVideo();
            $('.hidden-stop').removeClass('playing-hidden');
        });

        setTimeout(function(){
            cardlist.youtubePlayer = new YT.Player('youtube-' + cardlist.video_list + '-' + videoPlayerId, {
                width   : width,
                height  : height,
                videoId : videoId,
                playerVars : {
                    modestbranding  : 1,
                    rel             : 0,
                },
                events: {
                    'onReady': function(event){
                        playerCard.addClass('loaded');
                        event.target.playVideo();
                    },
                    'onStateChange': function(event){
                        if(event.data === 0){
                            playerCard.find('.youtube-wrapper').removeClass('fixed');
                            cardlist.youtubePlayer.destroy()
                            $(playerCard).removeClass('playing loaded');
                            $('.hidden-stop').removeClass('playing-hidden');
                        } else if(event.data === 1){
                            podcast.pausePodcast();
                        }
                    }
                }
            });
        }, 750);

    }


    this.visibleElement = function (element, fullyInView) {
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).outerHeight();

        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }

    this.animateHeader = function() {
        var self = this;
        var visibleId = 1;
        var interval = setInterval(function(){
            visibleId++;
            $('.heading-opener img.show-img').removeClass('show-img');
            $('.heading-opener img[data-frame-id='+visibleId+']').addClass('show-img');
            if(visibleId === $('.heading-opener img').length){
                visibleId = 1;
                window.clearInterval(interval);
                setTimeout(function(){
                    self.animateHeader();
                },500);
            }
        }, 300);

    }

    this.orientationChange = function(){
        setTimeout(function(){
            cardlist.filterOffsetPos = $('#sticky-anchor').offset().top;
        }, 500);
    };

    this.previewSize = function(){
        cardlist.size_preview = $(this).data('size');
        $('.size-indicator').attr('class', 'size-indicator').addClass(cardlist.size_preview);
    };

    this.revertSize = function(){
        $('.size-indicator').attr('class', 'size-indicator').addClass(cardlist.size);
    };

    this.openPlayer = function() {
        var timeout = false,
            openCard = $('.card-item[data-player-id="' + GLOBALS.player + '"]'),
            openScrollPos = $('#' + GLOBALS.player).offset().top,
            // openScrollPos = openCard.offset().top,
            // scrollOffset = $(window).width() < 768 ? $('#mobile-nav').height() + 40 : 0,
            delay = $(window).width() < 768 ? 500 : 0;

        if(this.hasPlayer){
            events.publish('card.expanded', {id: GLOBALS.player})
            openCard.addClass('expanded-card')
            $(window).on('scroll.scrollWatch', cardlist.scrollWatch);
            this.scrollWatch();

        } else {
            setTimeout(function(){
                $('body,html').animate({scrollTop: openScrollPos}, function(){
                    $('body').addClass('filter-fixed');
                    clearTimeout(timeout);
                    timeout = setTimeout(function(){
                        openCard.addClass('expanded-card');
                        events.publish('card.expanded', {id: GLOBALS.player})
                        $(window).on('scroll.scrollWatch', cardlist.scrollWatch);
                    },100);
                });
            }, delay);
        }

    }

    this.changeSize = function(e, size){
        e.preventDefault();
        if($('body').hasClass('show-teams') || $(this).hasClass('disabled')){
            return;
        }
        var transitionClass;
        cardlist.old_size = cardlist.size;
        cardlist.size = size || $(this).data('size');
        events.publish('size.update', {size: cardlist.size});
        transitionClass = cardlist.old_size + '-to-' + cardlist.size;
        $('.size-indicator').attr('class', 'size-indicator').addClass(cardlist.size);
        $('.size-toggle .active').removeClass('active');
        $(this).addClass('active');
        $('body').removeClass('small medium large').addClass(cardlist.size + ' ' + transitionClass);
        if(!cardlist.initialLoad){
            if($(window).width() < 767){
                $('html,body').scrollTop((cardlist.filterOffsetPos + 40));
            } else if(cardlist.bodyAnimation) {
                $('body,html').animate({scrollTop:cardlist.filterOffsetPos+1});
            }
        }
        cardlist.initialLoad = false;
        setTimeout(function(){
            $('body').removeClass(transitionClass);
        }, 1000);
    };

    this.scrollWatch = function() {
        var scrollPos = $(window).scrollTop();
        cardlist.filterOffsetPos = $('#sticky-anchor').offset().top;
        if(scrollPos > cardlist.filterOffsetPos && !cardlist.hasClass){
            cardlist.hasClass = true;
            $('body').addClass('filter-fixed');
            if(!window.podcast){
                window.podcast = new PodcastPlayer(window.masterList);
            }
            $('#sticky-phantom').show();
        } else if (scrollPos <= cardlist.filterOffsetPos && cardlist.hasClass) {
            cardlist.hasClass = false;
            $('body').removeClass('filter-fixed');
            $('#sticky-phantom').hide();
        }
    }

    this.showTeams = function() {
        if($(this).hasClass('disabled')){
            return;
        }
        var teams = $('<textarea />').html(GLOBALS.teamsHTML).text();
        $('#list-players').after(teams);
        cardlist.initInterImages();
        if(!cardlist.teams.length){
            cardlist.initTeams();
        }
        cardlist.sort_id = 'team';
        $('#mobile-nav').removeClass('open');
        $('.active_filter').removeClass('active_filter');
        $('body').addClass('show-teams');
        
        $('.filter.teams, .filter.team').addClass('active_filter');
        $('body').removeClass('kevin danny jonathan az');
        $('.dropdown .person[data-list-id="default"]').show();
        $('.dropdown .person[data-list-id="default"]').prependTo('.dropdown .ranking_list');
        $('#mobile-nav .current-sort').text('Team Needs by Robert Mays');
        if($(window).width() < 767){
            $('html,body').scrollTop($('#sticky-anchor').offset().top + 40);
        } else {
            var position = $('#sticky-phantom').offset().top;
            if(!position){
                position = $('#main-content').offset().top - $('#filter-bar-wrapper').height();
            }
            $('body,html').animate({scrollTop:position + (parseInt($('#main-content').css('marginTop'),10)/2 + 5)});
        }
    }

    this.personSort = function(e, initial) {
        if(!$('.dropdown').hasClass('open')){
            $('.dropdown').addClass('open');
            return;
        }
        if($('body').hasClass('show-teams')){
            setTimeout(cardlist.initCards,500);
        }

        $('body').addClass('personSorting');

        var personEl = initial ? initial : $(e.currentTarget);
        $('body').removeClass('show-teams');
        $('.active_filter').removeClass('active_filter');
        if(cardlist.youtubePlayer && cardlist.youtubePlayer.getPlayerState() === 1){
            $('.video_inter.playing').addClass('fixed');
        }
        if(personEl.parents('.dropdown').length){
            personEl.prependTo('.dropdown .ranking_list');
            $('.dropdown').removeClass('open');
            $('.dropdown').addClass('active_filter');
        } else {
            $('#mobile-nav').removeClass('open');
        }
        personEl.addClass('active_filter');


        $('body').addClass('rebuilding');

        cardlist.sort_id = personEl.data('list-id');

        cardlist.buildList(GLOBALS.data.players);

        events.publish('sort.update', {sort: cardlist.sort_id});
        $('.dropdown .person[data-list-id="default"]').hide();
    }

    this.sort = function(e){
        e.preventDefault();
        e.stopPropagation();
        if($('body').hasClass('show-teams')){
            setTimeout(cardlist.initCards,500);
        }
        $('body').removeClass('show-teams');
        if(cardlist.sort_id == $(e.currentTarget).data('sort-id')){
            return;
        }

        $('body').removeClass('personSorting');
        if(cardlist.youtubePlayer && cardlist.youtubePlayer.getPlayerState() === 1){
            $('.video_inter.playing').addClass('fixed');
        }

        $('body').removeClass('kevin danny jonathan az');
        if($(e.currentTarget).parents('#filter-bar-wrapper').length){
            $('.dropdown .person[data-list-id="default"]').show();
            $('.dropdown .person[data-list-id="default"]').prependTo('.dropdown .ranking_list');
        } else {
            $('#mobile-nav').removeClass('open');
            $('#mobile-nav .current-sort').text($(e.currentTarget).find('.name').text());
        }

        var player,
            coverage_count = 5;
        if($(this).data('sort-id') === 'mock'){
            $('body').addClass('mock-draft');

        } else {
            $('body').removeClass('mock-draft');
        }
        $('body').addClass('rebuilding');
        $('.active_filter').removeClass('active_filter');
        $(e.currentTarget).addClass('active_filter');
        cardlist.sort_id = $(e.currentTarget).data('sort-id');
        cardlist.buildList(GLOBALS.data.players);
        events.publish('sort.update', {sort: cardlist.sort_id});

        if(cardlist.sort_id === 'mock'){
            $('.card-item').each(function(index){
                if(index > 31){
                    $(this).hide();
                }
            })
        } else {
            $('.card-item').show();
        }

        if(cardlist.filter_id === 'rb' && !$('.card-item.' + cardlist.filter_id + ':visible').length){
            // $('.credits').hide();
            $('.no-players').show();
        } else {
            $('.credits').show();
            $('.no-players').hide();
        }
    }

    this.filter = function(e, mobile){
        if($('body').hasClass('show-teams')){
            return;
        }

        cardlist.filter_id = $(e.currentTarget).data('filter');

        if(cardlist.filter_id === 'rb' && !$('.card-item.' + cardlist.filter_id + ':visible').length){
            // $('.credits').hide();
            $('.no-players').show();
        } else {
            $('.credits').show();
            $('.no-players').hide();
        }

        if(cardlist.filter_id === 'rb' && $('.card-item.' + cardlist.filter_id).length){
            $('.credits').show();
        } else {
            // $('.credits').hide();
            cardlist.initInterImages();
        }
        if(!mobile){
            $('.filter-links .pointer').css({top: $(e.currentTarget).position().top - 2})
        }

        $('#filters .filter-position a.active, #mobile-nav .filter-links a').removeClass('active');
        $(e.currentTarget).addClass('active');
        if($(window).scrollTop() > cardlist.filterOffsetPos){
            if($(window).width() < 767 && !cardlist.initial_player){
                $('html,body').scrollTop((cardlist.filterOffsetPos));
            } else if(cardlist.bodyAnimation) {
                $('body,html').animate({scrollTop:cardlist.filterOffsetPos+1});
            }
            cardlist.initial_player = false;
        }

        if(cardlist.filter_id === 'all'){
            cardlist.$el.removeClass('filtered qb rb pc ol de idl lb db all-offense all-defense');
        } else {
            cardlist.$el.removeClass('qb rb pc ol de idl lb db all-offense all-defense');
            cardlist.$el.addClass('filtered ' + cardlist.filter_id);
        }

        // Hide all ads in the card list
        cardlist.$el[0].querySelectorAll('.m-ad').forEach(function(s) {
            s.style.display = 'none';
        });

        // Re-insert ads after a 500s delay to allow transition to complete
        setTimeout(function() {
            ChorusAds.reinsertSlots(cardlist.$el[0]);
        }, 500);

        // events.publish('filter.update', { filter: cardlist.filter_id });
    }

    this.buildList = function() {
        var playerCount = 0;
        if($(window).width() < 767){
            $('html,body').scrollTop((cardlist.filterOffsetPos + 10));
        } else {
            $('html,body').animate({scrollTop: cardlist.filterOffsetPos + (parseInt($('#main-content').css('marginTop'),10)/2 + 5)})
        }
        cardlist.sort_id = cardlist.sort_id !== 'ringer' ? 'mock' : 'ringer';
        


        _.each(GLOBALS.lists[cardlist.sort_id], function(player, index){
            // player = _.findWhere(GLOBALS.data.players, { filter_id: player.filter_id});
            if(player){
                if(cardlist.cards[index]){
                    playerCount++;
                    cardlist.cards[index].update(player);
                }
            }
        });
        setTimeout(function(){
            $('body').removeClass('rebuilding');
        },1000);
    }

    this.init();

    return cardlist;
}

function Mobile(list) {
    var mobile = this;
        mobile.list = list;
        mobile.filterOffsetPos = $('#content').offset().top;
        mobile.size = 'medium';


    mobile.init = function(){
        mobile.initEvents();
    }

    mobile.initEvents = function(){
        $('#mobile-nav').on('click', '.toggle-zone', mobile.toggleMobileNav);
        $('#mobile-nav').on('click', '.toggle-close', mobile.toggleMobileNav);
        $('#mobile-nav').on('click', '.person', mobile.mobileSort);
        $('#mobile-nav').on('click', '.filter-position a', mobile.mobileFilter);
        // $('#mobile-nav').on('click', '.ringer-sort', mobile.mobileRingerSort);
        $('#mobile-nav .nav-actions').on('click', '.size-toggle a', mobile.mobileChangeSize);
        $(window).on( "orientationchange", mobile.orientationChange );
    }

    this.toggleMobileNav = function(){
        window.clearTimeout(mobile.navTimeout);
        if($(window).scrollTop() < mobile.filterOffsetPos && !$('#mobile-nav').hasClass('open')){
            $('body,html').scrollTop((mobile.filterOffsetPos + 1));
        }

        $('#mobile-nav').toggleClass('open');

    };

    this.mobileRingerSort = function(e){
        $('#mobile-nav .active_filter').removeClass('active_filter');
        $(e.currentTarget).addClass('active_filter');
    }

    this.mobileChangeSize = function(e){
        e.preventDefault();
        var newSize = $(this).data('size');
        $('#mobile-nav').removeClass('open');
        mobile.old_size = mobile.size;
        mobile.size = $(this).data('size');
        events.publish('size.update', {size: mobile.size});
        transitionClass = mobile.old_size + '-to-' + mobile.size;

        $('.size-indicator').attr('class', 'size-indicator').addClass(mobile.size);
        $('#mobile-nav .size-toggle .active').removeClass('active background-theme');
        $('#mobile-nav .size-toggle li[data-size="'+mobile.size+'"]').addClass('active background-theme');
        $('#mobile-nav .size-toggle a').removeClass('active');
        $(e.currentTarget).addClass('active');

        setTimeout(function(){
            $('body').removeClass('small medium large').addClass(mobile.size + ' ' + transitionClass);
        },100);
    }

    mobile.mobileSort = function(e){
        e.preventDefault();
        $('#mobile-nav').removeClass('open');
        setTimeout(function(){
            $('#mobile-nav .current-sort').text($(e.currentTarget).find('.name').text());
            $('#mobile-nav .sort li').removeClass('active_filter color-theme');
            $(e.currentTarget).addClass('active_filter color-theme');
            mobile.list.sort(e);
        },100);
    }

    mobile.mobileFilter = function(e){
        e.preventDefault();
        $('.filter-links .pointer').css('top', $(e.currentTarget)[0].offsetTop - 2);
        $('#mobile-nav').removeClass('open');
        setTimeout(function(){
            mobile.list.filter(e, true);
        },100);
    }

    mobile.init();

    return mobile;
};

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

var events = (function(){
  var topics = {};
  var hOP = topics.hasOwnProperty;

  return {
    subscribe: function(topic, listener) {
      // Create the topic's object if not yet created
      if(!hOP.call(topics, topic)) topics[topic] = [];

      // Add the listener to queue
      var index = topics[topic].push(listener) -1;

      // Provide handle back for removal of topic
      return {
        remove: function() {
          delete topics[topic][index];
        }
      };
    },
    publish: function(topic, info) {
      // If the topic doesn't exist, or there's no listeners in queue, just leave
      if(!hOP.call(topics, topic)) return;

      // Cycle through topics queue, fire!
      topics[topic].forEach(function(item) {
      		item(info != undefined ? info : {});
      });
    }
  };
})();

function PodcastPlayer(cardlist){
    var player = this;

	this.init = function() {
        this.initEvents();
		this.parseFeed('https://feeds.feedburner.com/ringernbashow');
        this.playedPodcasts = [];
	}

    this.initEvents = function() {
        $('#amplitude').on('click', '.toggle-click', this.togglePodcast);
        $('#amplitude').on('click', '.more-podcasts-toggle', this.toggleMorePodcasts);
        $('#amplitude').on('click', '.more-podcasts li', this.playNewPodcast);
        $('.amplitude-play-pause').on('click', '.play', this.trackListen);
    }

    this.initPodcast = function(podcast) {
        Amplitude.init({
            "songs": [
                {
                    "name": this.podcast.title,
                    "artist": this.podcast.podcastTitle,
                    "url": this.podcast.url,
                    "cover_art_url": this.podcast.image
                }
            ],
            "callbacks": {
                'before_play': function(){
                    cardlist.pauseVideo();
                }
            }
         });

        document.getElementById('song-played-progress').addEventListener('click', function( e ){
            var offset = this.getBoundingClientRect();
            var x = e.pageX - offset.left;
            Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100 );
        });
    }

    this.parseFeed = function(url) {
        var self = this;
        self.podcastItems = [];
        
        var CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
        var parser = new RSSParser();

        var originalURL = "https://rss.art19.com/the-ringer-nfl-show";
        var queryURL = "https://cors-anywhere.herokuapp.com/" + originalURL

        $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "XML",
        // this headers section is necessary for CORS-anywhere
        headers: {
            "x-requested-with": "xhr" 
        }
        }).done(function(response) {
            console.log('CORS anywhere response', response["#document"]);
        }).fail(function(jqXHR, textStatus) { 
            console.log(jqXHR);
            console.log(textStatus)
        })
        // parser.parseURL(CORS_PROXY + 'https://rss.art19.com/the-ringer-nfl-show', function(err, feed) {
        //     $.each(feed.items.splice(0,4), function(index, item){
        //         var parsedItem = {};
        //         parsedItem.podcastTitle = feed.title;
        //         parsedItem.title        = item.title;
        //         parsedItem.dateTime     = new Date(item.pubDate);
        //         parsedItem.dateTime     = parsedItem.dateTime.getTime();
        //         parsedItem.url          = item.enclosure.url;
        //         parsedItem.image        = item.itunes.image
        //         self.podcastItems.push(parsedItem);
        //     });

        //     self.podcastItems = _.sortBy( self.podcastItems, function( item ) { return -item.dateTime; } );

        //     self.buildPodcast(self.podcastItems[0]);
        // });
    };

     
this.XML2jsobj = function(node) {

	var	data = {};

	// append a value
	function Add(name, value) {
		if (data[name]) {
			if (data[name].constructor != Array) {
				data[name] = [data[name]];
			}
			data[name][data[name].length] = value;
		}
		else {
			data[name] = value;
		}
	};
	
	// element attributes
	var c, cn;
	for (c = 0; cn = node.attributes[c]; c++) {
		Add(cn.name, cn.value);
	}
	
	// child elements
	for (c = 0; cn = node.childNodes[c]; c++) {
		if (cn.nodeType == 1) {
			if (cn.childNodes.length == 1 && cn.firstChild.nodeType == 3) {
				// text value
				Add(cn.nodeName, cn.firstChild.nodeValue);
			}
			else {
				// sub-object
				Add(cn.nodeName, XML2jsobj(cn));
			}
		}
	}

	return data;

}

    this.trackListen = function() {
        if(player.playedPodcasts.indexOf(player.podcast.title) === -1){
            player.playedPodcasts.push(player.podcast.title);
            ga('send', 'event', 'Podcast', 'play', player.podcast.title);
        }
    }

    this.pausePodcast = function(){
        Amplitude.pause();
        $('.amplitude-playing').removeClass('amplitude-playing');
    }

    this.toggleMorePodcasts = function() {
        $('#amplitude').toggleClass('open');
    };

    this.buildPodcast = function(podcast) {
        this.podcast = {
            url             : podcast.url,
            title           : podcast.title,
            image           : podcast.image,
            podcastTitle    : podcast.podcastTitle,
        }
        this.initPodcast();
        this.buildMorePodcasts();
    }

    this.buildMorePodcasts = function() {
        var self = this;
        var podcastMarkup = '';
        $.each(self.podcastItems, function(index, podcast){
            if(podcast.title !== self.podcast.title){
                podcastMarkup += '<li data-index=' + index + '>' +
                    '<button>' +
                        '<span class="artist">' + podcast.podcastTitle + '</span>' +
                        '<span class="episode">' + podcast.title + '</span>' +
                    '</button>' +
                '</li>';
            }
        });
        $('.more-podcasts ul').html(podcastMarkup);
    };

    this.togglePodcast = function(){
        $('body').toggleClass('podcast-open');
    }

    this.playNewPodcast = function(e) {
        var podcast = player.podcastItems[$(e.currentTarget).data('index')];
        $(e.currentTarget).addClass('active');
        player.toggleMorePodcasts();

        player.podcast = podcast;
        Amplitude.playNow({
            "name": podcast.title,
            "artist": podcast.podcastTitle,
            "url": podcast.url,
            "cover_art_url": podcast.image
        });

        player.trackListen();

        setTimeout(function(){
            player.buildMorePodcasts();
            $('.more-podcasts').scrollTop(0);
        }, 500);
    }

	player.init();

}

function Team(id, data){
    var team = this;
    this.id = id;
    this.data = data;
    this.el = $('.team-card[data-id="'+this.data.id+'"]');

    this.init = function(){
        var self = this;
        this.initEvents();
        if(self.visibleElement(self.el)){
            self.setImageToLoad();
        }
    };

    this.visibleElement = function (element, fullyInView) {
        if(!$(element).offset()){
            return;
        }
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top - 1000;
        var elementBottom = elementTop + $(element).outerHeight() + 1000;

        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }


    this.initEvents = function(){
        var self = this;

        setTimeout(function(){
            $(window).on('scroll.team'+team.id,self.checkVisible);
            self.checkVisible();
        }, 600);
    };

    this.checkVisible = function(){
        if(team.visibleElement(team.el)){
            team.setImageToLoad();
        }
    }

    this.setImageToLoad = function(){
        if(team.loadImages){
            return;
        }
        team.loadImages = true;
        $(window).off('scroll.team' + team.id);
        this.el.find('img').each(function(){
            var src = $(this).data('src');
            if($(this).attr('src') != src || $(this).attr('src') === ''){
                $(this).attr('src', src);
            }
        });
    }

    this.showImage = function(){
        team.el.find('img').addClass('image-loaded');
    }

    this.init();

    return team;
}

function VideoPlayer(id, data){
    var video = this;

	this.init = function() {
        this.initEvents();
	}

    this.initEvents = function() {

    }

	video.init();

	return video;
}
