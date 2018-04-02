document.addEventListener('DOMContentLoaded', function() {

    // If IE, display fallback view and return false
    if (isIE()) {
        var ieBlock = document.getElementById('ie-fallback');
        var body = document.getElementsByTagName('body')[0];
        body.innerHTML = ieBlock.outerHTML;
        ieBlock.style.display = 'inherit';
        body.className += ' ie';
        return false;
    }

    // App routes
    var routes = [
        { path: '/', component: HomeComponent },
        { path: '/match/:token', component: MatchComponent }
    ];

    // Build router
    var router = new VueRouter({
        routes: routes
    });

    // Scroll to top on route change
    router.beforeEach(function(to, from, next) {
        setTimeout(function() {
            window.scrollTo(0, 0);
        }, 100);
        next();
    });

    var app = new Vue({
        router: router,
        el: '#resolunch-web',
        data: function() {
            return {
                isOpen: false,
                mainHue: 0
            }
        },
        created: function() {
            var self = this;
            /*bus.$on('mainHue', function(h) {
                self.mainHue = h;
            });*/
        }
    });

});