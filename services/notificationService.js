var notificationService = {
    success: function(message) {
        bus.$emit('notification', {
            type: 'success',
            message: message
        });
    },
    warning: function(message) {
        bus.$emit('notification', {
            type: 'warning',
            message: message
        });
    },
    error: function(message) {
        bus.$emit('notification', {
            type: 'error',
            message: message
        });
    }
};
