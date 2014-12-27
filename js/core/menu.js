define(
    [
        'jquery',
        'core/utils',
        'lib/pointer',
    ],
    function($, $$) {

        /**
         * @contructor
         */
        function Menu(domElem) {
            this.domElem = domElem;
            this.state = {};

            this.domElem.on('pointerclick', '.item', $.throttle(100, this._onClick.bind(this)));
        }

        $.extend(Menu.prototype, {

            _onClick: function(e) {
                var elem = $(e.target),
                    val = $$.getMod(elem, 'type');

                val && this.setItem(val);
            },

            _setActive: function(mode) {
                mode && this.domElem.find('.item.type_' + mode).addClass('active');
            },

            _clearActive: function() {
                this.domElem.find('.item.active').removeClass('active');
            },


            setItem: function(mode) {
                var current = this.state,
                    newMode = !current || mode !== current ? mode : null;

                this.state = newMode;

                this._clearActive();
                newMode && this._setActive(mode);

                this.domElem.trigger('check', this.state);
            }

        });

        return Menu;

    }
);
