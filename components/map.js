var globalMapInit = function() {
    bus.$emit('googleMapLoaded');
};
Vue.component('reso-map', {
    template: jQuery('#reso-map-template').html(),
    data: function() {
        return {
            map: undefined,
            markers: [],
            // Creates users locations, backend will give this later
            userLocs: [
                        {lat: -33.865, lng: 151.209},
                        {lat: -35.542, lng: 150.305},
                        {lat: -32.777, lng: 151.402},
                        {lat: -34.666, lng: 151.802},
            ],
            currentUserLoc: {}
        }
    },
    methods: {
        addMarker: function(loc, isDrag, mrkType) {
            var marker = new google.maps.Marker({
                position: loc,
                draggable: isDrag,
                type: mrkType
            });
            this.markers.push(marker);
        },
        hideMarkers: function (map, markers) {
            this.drawMarkers(null);
        },
        removeCustomMarker: function() {
            for (var i = 0; i < this.markers.length; i++) {
                if(this.markers[i].type === "custom"){
                    this.markers.splice(i, 1);
                }
            }
        },
        drawMarkers: function(map) {
            for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].setMap(map);
            }
        }
    },
    mounted: function() {
        var self = this;
        bus.$on('googleMapLoaded', function() {
            if (!config.muteGoogleMaps) {
                self.map = new google.maps.Map(document.getElementById('reso-map'), {
                    center: {lat: -34.397, lng: 150.644},
                    zoom: 6
                });

                // Create each location markers
                self.userLocs.forEach(function(userLoc) {
                    // Add markers in array and draw them
                    self.addMarker(userLoc, false, "fix");
                    self.drawMarkers(self.map);
                });

                self.map.addListener('click', function(e) {
                    self.hideMarkers();
                    self.removeCustomMarker();
                    // Set the current user location
                    self.currentUserLoc = e.latLng.toJSON();
                    // Add new custom marker
                    self.addMarker(e.latLng.toJSON(), true, "custom");
                    // Draw fix markers and add the new custom one
                    self.drawMarkers(self.map);
                });
            }
        })
    }
});
