var actionsModule = (function(stateModule, staticElementsModule, playlistModule) {
    var playVideo = function() {
        stateModule.hidePoster();
        staticElementsModule.video.play();
        stateModule.setCurrentState('PLAYING', staticElementsModule.playerState);
    };
    
    var pauseVideo = function() {
        stateModule.hidePoster();
        staticElementsModule.video.pause();
        stateModule.setCurrentState('PAUSED', staticElementsModule.playerState);
    };
    
    var stopVideo = function() {
        staticElementsModule.video.src = playlistModule.first;
        playlistModule.playlist.current = 0;
        stateModule.setCurrentState('STOPPED', staticElementsModule.playerState);
        stateModule.showPoster();
    };
    
    var exitFullScreen = function() {
        staticElementsModule.bodyEl.className = '';
        
        if (navigator.userAgent.indexOf("Chrome") !== -1 || navigator.userAgent.indexOf("Safari") !== -1) {
            staticElementsModule.video.webkitExitFullscreen();
        }  else if (navigator.userAgent.indexOf("Firefox") !== -1) {
            document.mozCancelFullScreen();
        }
        
        staticElementsModule.fullScreenEl.checked = false;
    }
    
    var handleFullscreen = function() {
        if (navigator.userAgent.indexOf("Chrome") !== -1 || navigator.userAgent.indexOf("Safari") !== -1) {
            if (staticElementsModule.video.webkitRequestFullscreen) {
                staticElementsModule.video.webkitRequestFullscreen();
            }
        }  else if (navigator.userAgent.indexOf("Firefox") !== -1) {
            if (staticElementsModule.videoContainerEl.mozRequestFullScreen) {
                staticElementsModule.videoContainerEl.mozRequestFullScreen();
            }
        }
    }
    
    return {
        playVideo: playVideo,
        pauseVideo: pauseVideo,
        stopVideo: stopVideo,
        exitFullScreen: exitFullScreen,
        handleFullscreen: handleFullscreen
    }
})(stateModule, staticElementsModule, playlistModule);