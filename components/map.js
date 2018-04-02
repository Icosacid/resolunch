var globalMapInit = function() {
    bus.$emit('googleMapLoaded');
    console.log('bus emit cause gmap loaded');
};
Vue.component('reso-map', {
    template: jQuery('#reso-map-template').html(),
    data: function() {
        return {
            map: undefined,
            userLocs: [
                        {lat: -33.865, lng: 151.209},
                        {lat: -35.542, lng: 150.305},
                        {lat: -32.777, lng: 151.402},
                        {lat: -34.666, lng: 151.802},
            ]
        }
    },
    methods: {

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

            self.userLocs.forEach(function(userLoc, index) {
                var marker = new google.maps.Marker({
                  position: userLoc,
                  map: self.map,
                  title: "User " + index + 1
                });
            });

        })

        // map.addListener('click', function(e) {
        //     console.log("coucou");
        // });

    }
});
