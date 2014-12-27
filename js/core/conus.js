define(
    [
        'jquery',
        'modernizr',
        'lib/snap-svg',
        'lib/pointer'
    ],
    function($, Modernizr, Snap) {

        var prefix = Modernizr.prefixed,
            transformProp = prefix('transform'),
            strokeColor = '#000';

        /**
         * @constructor
         */
        function Conus(domElem) {
            this.domElem = domElem.find('.inner');
            this.height = domElem.height();
            this.width = domElem.width();
            this.branches = [];
            this._rotate = 0;

            $(document).on('pointermove', this._onPointerMove.bind(this));
        }

        $.extend(Conus.prototype, {

            add: function(id, points) {
                var plot = this._build(id, points);

                this.branches.push(plot);
                this._recalc();
            },

            _build: function(id, points) {
                var elem = Snap(this.width, this.height).addClass('plot id_' + id),
                    startPoint;

                elem.appendTo(this.domElem[0])

                points.forEach(function(point, i) {
                    if(!point[2]) {
                        point[2] = startPoint ? startPoint[2] : strokeColor;
                    }

                    console.log(i, point);
                    i > 0 && elem
                        .line(startPoint[0], startPoint[1], point[0], point[1])
                        .attr({ stroke: point[2] });

                    startPoint = point;
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

            _onPointerMove: function(e, data) {
                this._rotate += data.deltaY;
                this.domElem.css(transformProp, 'rotateX(' +this._rotate+ 'deg)');
            }

        });

        return Conus;

    }
);
