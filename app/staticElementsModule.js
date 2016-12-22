var staticElementsModule = (function() {
    // get module's static elements
    var elements = {
        video: document.getElementById('video'),
        playerState: document.getElementById('current-state'),
        poster: document.getElementById('poster'),
        videoWrapper: document.getElementsByClassName('video-wrapper')[0],
        loadingArea: document.getElementsByClassName('loading-area')[0],
        videoControls: document.getElementsByClassName('user-controls')[0],
        repeatEl: document.getElementById('repeat-functionality'),
        isRepeatActive: false,
        shuffleEl: document.getElementById('shuffle-functionality'),
        isShuffleActive: false,
        fullScreenEl: document.getElementById('full-screen'),
        enableFullScreen: false,
        bodyEl: document.body,
        extraFeaturesEl: document.getElementsByClassName('extra-features')[0],
        videoContainerEl: document.getElementsByClassName('video-container')[0]
    };
    
    return elements;
})();
