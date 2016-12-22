var techModule = (function() {
    // increase Array object capabilities for the use of the playlist
    Array.prototype.next = function() {
        return this[++this.current];
    };
    Array.prototype.current = 0;
})();