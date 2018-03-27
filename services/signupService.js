var backend = 'http://localhost:3000';

var signupService = {
    sendLunchRequest: function(lunch) {
        return $.post(backend + '/lunch-request', {
            email: lunch.email,
            themeID: lunch.themeID,
            position: {
                lat: lunch.position.lat,
                lng: lunch.position.lng
            },
            travelOptionID: lunch.travelOptionID,
            availableTime: lunch.availableTime,
            latestHour: lunch.latestHour
        });
    }
};
