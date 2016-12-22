var playlistModule = (function(staticElementsModule, techModule) {
    // get a static, hardcoded sample playlist in case of the playlist file load failure
    var playlistHardcoded = [
        {"url": "samples/sample5.mp4"},
        {"url": "samples/sample2.mp4"},
        {"url": "samples/sample5.mp4"},
        {"url": "samples/sample4.mp4"}
    ], playlistHardcodedFirefox = [
        {"url": "samples/sample5.webm"},
        {"url": "samples/sample2.webm"},
        {"url": "samples/sample5.webm"},
        {"url": "samples/sample4.webm"}
    ];
    
    var rawpPlaylist = {};
    
    var shufflePlaylist = function(array) { //Fisher-Yates algorithm
        var currentIndex = array.length, temporaryValue, randomIndex;
        
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        
        return array;
    }
    
    var getPlaylistData = function(file) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", file, false);
        xhr.send();
        
        if (xhr.status === 200) {
            return JSON.parse(xhr.responseText).playlist;
        } else {
            return null;
        }
    }
    
    // get playlist from a file
    if (navigator.userAgent.indexOf("Chrome") !== -1 || navigator.userAgent.indexOf("Safari") !== -1) {
        rawpPlaylist = getPlaylistData('playlist/playlist.json') || playlistHardcoded;
    }  else if (navigator.userAgent.indexOf("Firefox") !== -1) {
        rawpPlaylist = getPlaylistData('playlist/playlistFirefox.json') || playlistHardcodedFirefox;
    }
    
    var playlist = [];
    
    // get video elements
    for (var i = 0, playlistLength = rawpPlaylist.length; i < playlistLength; i++) {
        playlist.push(rawpPlaylist[i].url);
    }
    
    var first = playlist[0]; //first element
    
    // handle playlist transitions
    var showContentWhenReady = function() {
        staticElementsModule.loadingArea.style.display = 'none';
        staticElementsModule.videoWrapper.style.display = 'block';
        staticElementsModule.extraFeaturesEl.style.display = 'block';
    }
    
    var hideContentUntilReady = function() {
        if (playlist.current !== playlist.length - 1) { // prevent showing loader on playlist end
            staticElementsModule.loadingArea.style.width = staticElementsModule.video.offsetWidth + "px";
            staticElementsModule.loadingArea.style.height = staticElementsModule.video.offsetHeight + "px";
            staticElementsModule.loadingArea.style.display = 'block';
        }
        
        staticElementsModule.videoWrapper.style.display = 'none';
    }
    
    var loadNextInPlaylist = function() {
        var lastInPlaylist = playlist.length - 1;
        
        if (playlist.current === lastInPlaylist) {
            staticElementsModule.video.src = first;
            playlist.current = 0;
            if(staticElementsModule.isRepeatActive) {
                stateModule.setCurrentState('PLAYING', staticElementsModule.playerState);
                staticElementsModule.video.play();
            } else {
                stateModule.setCurrentState('STOPPED', staticElementsModule.playerState);
                stateModule.showPoster();
            }
        } else {
            staticElementsModule.video.src = playlist.next();
            staticElementsModule.video.play();
        }
    }
    
    return {
        shufflePlaylist: shufflePlaylist,
        showContentWhenReady: showContentWhenReady,
        hideContentUntilReady: hideContentUntilReady,
        loadNextInPlaylist: loadNextInPlaylist,
        playlist: playlist,
        first: first,
    }
})(staticElementsModule, techModule);