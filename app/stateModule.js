var stateModule = (function(staticElementsModule, playlistModule) {
    // set initial state of the application
    var setInitialState = function() {
        staticElementsModule.video.src = playlistModule.first;
        setCurrentState('STOPPED', staticElementsModule.playerState);
        staticElementsModule.video.addEventListener('loadeddata', playlistModule.showContentWhenReady); // prevents initial blinking
    }
    
    // handle static elements' behavior
    var showPoster = function() {
        staticElementsModule.poster.style.display = 'block';
    }
    
    var hidePoster = function() {
        staticElementsModule.poster.style.display = 'none';
    }
    
    var setCurrentState = function(state, element) {
        var options = {
            'STOPPED' : 'STOPPED',
            'PLAYING' : 'PLAYING',
            'PAUSED' : 'PAUSED'
        }
        
        if (options[state]) {
            element.innerText = options[state];
        }
    }
    
    var getCurrentState = function(element) {
        return element.innerText;
    }
    
    return {
        setInitialState: setInitialState,
        showPoster: showPoster,
        hidePoster: hidePoster,
        setCurrentState: setCurrentState,
        getCurrentState: getCurrentState
    }
})(staticElementsModule, playlistModule);