var eventsModule = (function(playlistModule, staticElementsModule, actionsModule) {
    // handle events
    staticElementsModule.videoControls.addEventListener('click', function(e) { // event delegation for performance and possible future button updates
        var buttonIds = {
            'play-btn': actionsModule.playVideo,
            'pause-btn': actionsModule.pauseVideo,
            'stop-btn': actionsModule.stopVideo,
            'exit-fullscreen': actionsModule.exitFullScreen
        };
        
        if (buttonIds[e.target.id]) {
            buttonIds[e.target.id]();
        }
    });
    
    staticElementsModule.video.addEventListener('ended', function() {
        playlistModule.hideContentUntilReady();
        if (playlistModule.playlist.current !== playlistModule.playlist.length - 1) {
            setTimeout(function() { // smooth loader instead of a sudden blink
                playlistModule.loadNextInPlaylist();
            }, 500);
        } else {
            playlistModule.loadNextInPlaylist();
        }
    });
    
    staticElementsModule.video.addEventListener('loadeddata', playlistModule.showContentWhenReady);
    
    staticElementsModule.repeatEl.addEventListener('change', function() {
        staticElementsModule.isRepeatActive = this.checked;
    });
    
    staticElementsModule.shuffleEl.addEventListener('change', function() {
        staticElementsModule.isShuffleActive = this.checked;
        
        //shuffle only on STOPPED
        if (staticElementsModule.isShuffleActive && (stateModule.getCurrentState(staticElementsModule.playerState) !== 'PLAYING' && stateModule.getCurrentState(staticElementsModule.playerState) !== 'PAUSED')) {
            playlistModule.shufflePlaylist(playlistModule.playlist);
            staticElementsModule.video.src = playlistModule.playlist[0];
        }
    });
    
    staticElementsModule.fullScreenEl.addEventListener('change', function() {
        staticElementsModule.enableFullScreen = this.checked;
        
        if (staticElementsModule.enableFullScreen) {
            staticElementsModule.bodyEl.className = 'fullscreen';
            actionsModule.handleFullscreen();
        }
    });
    
    document.addEventListener('keyup', function(e) { // handle exiting fullscreen by a user with the ESC key
        if (e.keyCode === 27) {
            actionsModule.exitFullScreen();
        }
    });
    
    document.addEventListener("mozfullscreenchange", function () { // above for the  Firefox
        if (!document.mozFullScreen) {
            actionsModule.exitFullScreen();
        }
    });
})(playlistModule, staticElementsModule, actionsModule);