var videoModule = (function(staticElementsModule, playlistModule, stateModule) {
    return {
        init: function() {
            stateModule.setInitialState();
        }
    }
})(staticElementsModule, playlistModule, stateModule);
