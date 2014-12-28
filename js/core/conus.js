define(
    [
        'jquery',
        'modernizr',
        'lib/snap-svg',
        'lib/pointer'
    ],
    function($, Modernizr, Snap) {

        var _sqr = function(a) {return Math.pow(a, 2)},
            _sqrt = Math.sqrt,
            prefix = Modernizr.prefixed,
            transformProp = prefix('transform'),
            strokeColor = '#000';

        /**
         * @constructor
         */
        function Conus(domElem, menu) {
            this.domElem = domElem.find('.inner');
            this.height = domElem.height();
            this.width = domElem.width();
            this.branches = [];
            this._rotate = 0;

            $(document).on('pointerdrug', this._onDrug.bind(this));
            menu.domElem.on('check', this._onMenu.bind(this));
        }

        $.extend(Conus.prototype, {

            add: function(id, points) {
                var plot = this._build(id, points);

                this.branches.push(plot);
                this._recalc();
            },

            _build: function(id, points) {
                var elem = Snap(this.width, this.height).addClass('plot id_' + id),
                    from;

                elem.appendTo(this.domElem[0])

                points.forEach(function(to, i) {
                    if(!to[3]) {
                        to[3] = from ? from[3] : strokeColor;
                    }

                    console.log(i, from, to);
                    if(i > 0) {
                        var length = _sqrt(
                                _sqr(from[0] + to[0]) +
                                _sqr(from[1] + to[1]) +
                                _sqr(from[2] + to[2])),
                            sqrt = _sqrt(
                                _sqr(to[0] - from[0]),
                                _sqr(to[1] - from[1])),
                            C = {
                                x: +(from[0] + length * (to[0] - from[0]) / sqrt).toFixed(3),
                                y: +(from[0] + length * (to[1] - from[1]) / sqrt).toFixed(3)
                            },
                            angleY = +Math.cos(
                                from[0]*to[0] + _sqr(from[2]) /
                                (
                                    _sqrt(_sqr(from[0]) + _sqr(from[2])) *
                                    _sqrt(_sqr(to[0]) + _sqr(to[2]))
                                )
                            ).toFixed(3) * 180/Math.PI;

                        console.log(sqrt, C, angleY);

                        elem
                            .line(from[0], from[1], C.x, C.y)
                            .attr({ stroke: to[3] })
                            .transform('rotateY(' +angleY+ ')')

                    }

                    from = to;
                });

                return {
                    id: id,
                    domElem: this.domElem.find('.id_' + id)
                };
            },

            _recalc: function() {
                var deg = 0,
                    step = 360 / this.branches.length;

                this.branches.forEach(function(item) {
                    item.domElem.css(transformProp, 'translateY(100%) rotateX(' +(deg-180)+ 'deg)');
                    deg += step;
                });
            },

            _updateRotation: function() {
                this.domElem.css(transformProp, 'rotateX(' +this._rotate+ 'deg)');
            },

            _onDrug: function(e, data) {
                this._rotate += data.deltaY;
                this._updateRotation();
            },

            _onMenu: function(e, data) {
                this.domElem.toggleClass('animate', data.item === 'animate')
            }

        });

        return Conus;

    }
);
