/**
 * trigger events:
 *   – pointerclick
 *   – pointermove, {delta}
 */
define(
    ['jquery', 'modernizr'],
    function($, Modernizr) {
        var isPressed = false,
            isTouch = Modernizr.touch,
            events = {
                down: isTouch ? 'touchstart' : 'mousedown',
                move: isTouch ? 'touchmove' : 'mousemove',
                up: isTouch ? 'touchend' : 'mouseup'
            },
            target,
            startDelta,
            lastDelta,
            threshold = 15;

        function getPointer(e) {
            return {
                x: isTouch ? e.originalEvent.targetTouches[0].pageX : e.clientX,
                y: isTouch ? e.originalEvent.targetTouches[0].pageY : e.clientY
            };
        }

        function onDown(e) {
            startDelta = getPointer(e);
            isPressed = true
        }

        function onMove(e) {
            var pointer = getPointer(e);

            target = $(e.target);

            if(isPressed) {
                var pointer = getPointer(e),
                    from = lastDelta || startDelta,
                    delta = {
                        x: from.x - pointer.x,
                        y: from.y - pointer.y
                    };

                lastDelta = pointer;

                target.trigger('pointerdrug', {
                    deltaX: delta.x,
                    deltaY: delta.y });
                e.preventDefault();
            }

            target.trigger('pointermove', pointer);
        }

        function onUp() {
            var isTap = !lastDelta;

            isPressed = false;
            if(lastDelta) {
                var deltaX = startDelta.x - lastDelta.x,
                    deltaY = startDelta.y - lastDelta.y,
                    isTap = Math.abs(deltaX) < threshold
                        && Math.abs(deltaY) < threshold;

                lastDelta = null;
            }

            isTap && target.trigger('pointerclick');
        }

        $(document).on(events.down, onDown);
        $(document).on(events.move, $.throttle(30, onMove));
        $(document).on(events.up, onUp);
    }
);
