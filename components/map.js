var globalMapInit = function() {
    bus.$emit('googleMapLoaded');
    console.log('bus emit cause gmap loaded');
};
Vue.component('reso-map', {
    template: jQuery('#reso-map-template').html(),
    data: function() {
        return {
            map: undefined
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
                zoom: 8
            });
        })
    }
});