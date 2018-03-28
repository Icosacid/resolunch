var HomeComponent = {
    template: jQuery('#home-template').html(),
    data: function() {
        return {
            resoHue: 0,
            themes: [
                'creative-coding',
                'digital-music',
                'freelancing',
                'web-development',
                'anything-creative'
            ],
            activeThemeIndex: 0,
            travelOptions: [
                { text: 'On foot', value: 'foot' },
                { text: 'Bike or equivalent', value: 'bike' },
                { text: 'Public transport', value: 'public' }
            ],
            travelOption: 'foot',
            availableTimes: [],
            latestHour: 120
        }
    },
    methods: {
        changeMainHue: function(h) {
            //bus.$emit('mainHue', h);
            this.resoHue = h;
        },
        changeActiveTheme: function(themeIndex) {
            this.activeThemeIndex = themeIndex;
            var newHue = 0;
            switch (themeIndex) {
                case 0: newHue = 0; break;
                case 1: newHue = 40; break;
                case 2: newHue = 150; break;
                case 3: newHue = 190; break;
                case 4: newHue = 290; break;
            }
            this.changeMainHue(newHue);
        }
    },
    mounted: function() {
        // Testing ajax service
        signupService.sendLunchRequest('rien').then(
            function(data) {
                console.log('data is ', data);
            }
        );


        var self = this;
        var canvas = document.createElement('canvas');
        var $hex = jQuery('.resologo .hexagon .content'),
            width = $hex.width(), height = $hex.height(),
            xC = width / 2, yC = height / 2;
        canvas.height = height; canvas.width = width;
        $hex.append(canvas);
        var ctx = canvas.getContext('2d');

        var particles = [];

        // Birth
        for (var i = 0; i < 10; i++) {
            particles.push({
                x: width * Math.random(),
                y: width * Math.random(),
                xSpeed: 0,
                ySpeed: 0
            });
        }

        // Evolve
        function evolve() {
            ctx.beginPath();
            ctx.clearRect(0, 0, width, height);
            for (var j = 0; j < particles.length; j++) {
                var p = particles[j];
                var k = 0.002, noise = 0.5, visc = 0.2;
                var xAcc = noise * (-0.5 + Math.random()) - k * (p.x - xC),
                    yAcc = noise * (-0.5 + Math.random()) - k * (p.y - yC);
                p.xSpeed += xAcc * (1 - visc);
                p.ySpeed += yAcc * (1 - visc);
                p.x += 0.1 * p.xSpeed;
                p.y += 0.1 * p.ySpeed;

                ctx.beginPath();
                ctx.arc(p.x, p.y, 50, 0, 2 * Math.PI, true);
                ctx.fillStyle = 'hsla(' + self.resoHue + ', 70%, 50%, 0.3)';
                ctx.fill();
                ctx.closePath();
            }
        }

        // Go !
        var frame = function() {
            evolve();
            requestAnimationFrame(frame);
        };
        frame();

        // Create available times and fill the array
        for (var times = 40; times <= 120; times += 5) {
          this.availableTimes.push({ text: '' + times, value: times } );
        }

    },
    filters: {
        latestHourAfterNoon: function(value) {
            if (!value) return '';
            var hour = Math.floor( Number(value) / 60 );
            var minutes = Number(value) - 60;

            if (minutes > 60 ) {
              minutes = Number(value) - 120;
            }

            return (minutes == 0  || minutes == 60 ? hour + 'pm' : hour + 'pm and ' + minutes + ' minutes');
        }
    }
};
