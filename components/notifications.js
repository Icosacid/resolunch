// Events for this component are emitted from notificationService
Vue.component('notifications', {
    template: jQuery('#notifications-template').html(),
    data: function() {
        return {
            notifications: []
        }
    },
    methods: {
        dismiss: function(notification) {
            this.notifications = this.notifications.filter(function(el) {
                return el.tag !== notification.tag;
            });
        }
    },
    created: function() {
        var self = this;
        // Notification service binding
        bus.$on('notification', function(n) {
            // Add new notif with random ID
            var tag = 'notif' + Math.floor(1000000 * Math.random()),
            notif = {
                tag: tag,
                type: n.type,
                message: n.message
            };
            self.notifications.push(notif);

            // Kill this notification in a little while, if not already click-killed
            setTimeout(function() {
                self.dismiss(notif);
            }, 10000);
        });
    }

});
