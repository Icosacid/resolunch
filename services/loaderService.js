// Add extra actions before and after all ajax calls
$.ajaxSetup({
    timeout: config.ajaxTimeout,
    beforeSend: function() {
        loaderService.incrementLoader();
    },
    error: function() {
        notificationService.error('Une erreur est survenue, veuillez réessayer ultérieurement.');
    },
    complete: function(jqXHR, textStatus) {
        loaderService.decrementLoader();
    },
    statusCode: {
        404: function() {
            notificationService.error('La page demandée n\'existe pas');
        }
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
