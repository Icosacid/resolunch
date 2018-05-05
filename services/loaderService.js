// Add extra actions before and after all ajax calls
$.ajaxSetup({
    beforeSend: function() {
        loaderService.incrementLoader();
    },
    complete: function() {
        loaderService.decrementLoader();
    }
});

var loaderService = {
    loadCounter: 0,
    incrementLoader: function() {
        this.loadCounter++;
        // Update value in global component
        bus.$emit('loadCounter', this.loadCounter);
    },
    decrementLoader: function() {
        this.loadCounter--;
        if (this.loadCounter < 0) this.loadCounter = 0;

        // Update value in global component
        bus.$emit('loadCounter', this.loadCounter);
    }
};
