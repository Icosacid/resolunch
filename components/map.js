var globalMapInit = function() {
    bus.$emit('googleMapLoaded');
    console.log('bus emit cause gmap loaded');
};
Vue.component('reso-map', {
    template: jQuery('#reso-map-template').html(),
    data: function() {
        return {
            map: undefined,
            // Creates users locations
            userLocs: [
                        {lat: -33.865, lng: 151.209},
                        {lat: -35.542, lng: 150.305},
                        {lat: -32.777, lng: 151.402},
                        {lat: -34.666, lng: 151.802},
            ]
        }
    },
    methods: {
        addMarker: function(map, loc, index) {
            var marker = new google.maps.Marker({
                position: loc,
                map: map,
                title: "User " + index + 1
            });
        }
    },
    mounted: function() {
        console.log('Map loadede componen');
        var self = this;
        bus.$on('googleMapLoaded', function() {
            console.log('Event recieved, init map');
            self.map = new google.maps.Map(document.getElementById('reso-map'), {
                center: {lat: -34.397, lng: 150.644},
                zoom: 6
            });

            // Draw each location markers on map if there's
            self.userLocs.forEach(function(userLoc, index) {
                self.addMarker(self.map, userLoc, index);
            });

            self.map.addListener('click', function(e) {
                // We push the new user location into the array
                self.userLocs.push( e.latLng.toJSON() );
                // And draw it on map
                self.addMarker(self.map, e.latLng.toJSON());
            });

        })
    }
});
