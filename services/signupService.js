var backend = 'http://localhost:3000';

var signupService = {
    sendLunchRequest: function(form) {
        return $.post(backend + '/lunch-request', {
            email: 'bell@ring.ing',
            themeID: 0,
            travelOptionID: 0,
            availableTime: 0,
            latestHour: 50
        });
    }
};
