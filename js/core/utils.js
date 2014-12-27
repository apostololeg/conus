define(
    ['jquery'],
    function($) {

        function Utils() {};

        function getClassByModName(elem, modName) {
            var rx = new RegExp(modName + '_\\w+(\\S+|)'),
                match = elem[0].className.match(rx);

            return match && match[0];
        }

        function getCls(elem, modName, modVal) {
            return !modVal
                ? getClassByModName(elem, modName)
                : modName + '_' + modVal
        }

        $.extend(Utils.prototype, {

            setMod: function(elem, modName, modVal) {
                var cls = getClassByModName(elem, modName);
                cls && elem.removeClass(cls);
                elem.addClass(modName + '_' + modVal);
            },

            delMod: function(elem, modName, modVal) {
                var cls = getCls(elem, modName, modVal);
                elem.removeClass(cls);
            },

            getMod: function(elem, modName) {
                var cls = getClassByModName(elem, modName),
                    splt = cls && cls.split('_');
                return splt && splt[1];
            },

            hasMod: function(elem, modName, modVal) {
                var cls = getCls(elem, modName, modVal);
                return elem.hasClass(cls);
            },

            toggleMod: function(elem, mode) {
                elem.toggleClass('mode_' + mode);
            },

            isObjEqual: function(obj1, obj2) {
                return JSON.stringify(obj1) === JSON.stringify(obj2);
            }

        });

        return new Utils();

    }
);
