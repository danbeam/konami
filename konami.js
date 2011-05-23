/**
* Konami.js - this script checks the last 10 keystrokes and fires an event if they were the Konami code
* @fileOverview I was bored
* @author       Dan Beam (dan@danbeam.org)
* @license      GPLv3
*/
(function (window, document) {
    var pressed          = [],
        konami           = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13],
        konami_check     = konami.join(','),
        standard         = !!document.addEventListener,
        check_for_konami = function (e) {
            e = e || window.event;
            if (pressed.length > konami.length - 1) {
                pressed.shift();
            }
            pressed.push(e.keyCode || e.charCode);
            if (konami_check === pressed.join(',') && 'function' === typeof document.onKonami) {
                document.onKonami.call(document, e, this, arguments.callee);
            }
        };
    document[standard ? 'addEventListener' : 'attachEvent']((standard ? '' : 'on') + 'keydown', check_for_konami);
}(this, this.document));