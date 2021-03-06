/**
 * session.js 0.4.1
 * (c) 2012 Iain, CodeJoust
 * session.js is freely distributable under the MIT license.
 * Portions of session.js are inspired or borrowed from Underscore.js, and quirksmode.org demo javascript.
 * This version uses google's jsapi library for location services.
 * For details, see: https://github.com/codejoust/session.js
 */
 let session_fetch = (function (win, doc, nav) {
    'use strict';
    // Changing the API Version invalidates old cookies with previous api version tags.
    let API_VERSION = 0.4;
    // Settings: defaults
    let options = {
        // Use the HTML5 Geolocation API
        // this ONLY returns lat & long, no city/address
        use_html5_location: false,
        // Attempts to use IPInfoDB if provided a valid key
        // Get a key at https://ipinfodb.com/register.php
        ipinfodb_key: false,
        // Leaving true allows for fallback for both
        // the HTML5 location and the IPInfoDB
        gapi_location: true,
        // Name of the location cookie (set blank to disable cookie)
        //   - WARNING: different providers use the same cookie
        //   - if switching providers, remember to use another cookie or provide checks for old cookies
        location_cookie: 'location',
        // Location cookie expiration in hours
        location_cookie_timeout: 5,
        // Session expiration in days
        session_timeout: 32,
        // Session cookie name (set blank to disable cookie)
        session_cookie: 'session-js',
        get_object: null, set_object: null, // used for cookie session adaptors
        // if null, will be reset to use cookies by default.
        // Tracker ID: initialize with a random string so that repeated visits are
        // easily tracked
        tracker_id: null,
        // Set to true to record extra client data
        extra: false,
    };

    // Session object
    let SessionRunner = function () {
        win.session = win.session || {};
        // Helper for querying.
        // Usage: session.current_session.referrer_info.hostname.contains(['github.com','news.ycombinator.com'])
        win.session.contains = function (other_str) {
            if (typeof (other_str) === 'string') {
                return (this.indexOf(other_str) !== -1);
            }
            for (let i = 0; i < other_str.length; i++) {
                if (this.indexOf(other_str[i]) !== -1) {
                    return true;
                }
            }
            return false;
        };
        // Merge options
        if (win.session && win.session.options) {
            for (let option in win.session.options) {
                options[option] = win.session.options[option];
            }
        }
        // Modules to run
        // If the module has arguments,
        //   it _needs_ to return a callback function.
        let unloaded_modules = {
            api_version: API_VERSION,
            locale: modules.locale(),
            current_session: modules.session(
                null,
                null,
                options.tracker_id,
            ),
            original_session: modules.session(
                options.session_cookie,
                options.session_timeout * 24 * 60 * 60 * 1000,
                options.tracker_id,
            ),
            browser: modules.browser(),
            plugins: modules.plugins(),
            time: modules.time(),
            device: modules.device(),
            architecture: modules.architecture(),
        };
        // Location switch
        if (options.use_html5_location) {
            unloaded_modules.location = modules.html5_location();
        } else if (options.ipinfodb_key) {
            unloaded_modules.location = modules.ipinfodb_location(options.ipinfodb_key);
        } else if (options.gapi_location) {
            unloaded_modules.location = modules.gapi_location();
        }
        // Extra switch
        if (options.extra) {
            unloaded_modules.extra = modules.extra_data()
        }
        // Cache win.session.start
        let start;
        if (win.session && win.session.start) {
            start = win.session.start;
        }
        // Set up checking, if all modules are ready
        let asynchs = 0;
        let module;
        let check_asynch = function (deinc) {
            if (deinc) {
                asynchs--;
            }
            if (asynchs === 0) {
                // Run start calback
                if (start) {
                    start(win.session);
                }
            }
        };
        win.session = {};
        // Run asynchronous methods
        for (let name in unloaded_modules) {
            module = unloaded_modules[name];
            if (typeof module === 'function') {
                try {
                    module(function (data) {
                        win.session[name] = data;
                        check_asynch(true);
                    });
                    asynchs++;
                } catch (err) {
                    if (win.console && typeof (console.log) === 'function') {
                        console.log(err);
                        check_asynch(true);
                    }
                }
            } else {
                win.session[name] = module;
            }
        }
        check_asynch();
    };


    // Browser (and OS) detection
    // noinspection JSUnresolvedVariable
    let browser = {
        detect: function () {
            let ret = {
                browser: this.search(this.data.browser),
                version: this.search(nav.userAgent) || this.search(nav.appVersion),
                os: this.search(this.data.os)
            };
            if (ret.os === 'Linux') {
                let distros = ['CentOS', 'Debian', 'Fedora', 'Gentoo', 'Mandriva', 'Mageia', 'Red Hat', 'Slackware', 'SUSE', 'Turbolinux', 'Ubuntu'];
                for (let i = 0; i < distros.length; i++) {
                    if (nav.userAgent.toLowerCase().match(distros[i].toLowerCase())) {
                        ret.distro = distros[i];
                        break;
                    }
                }
            }
            return ret;
        },
        search: function (data) {
            if (typeof data === 'object') {
                // search for string match
                for (let i = 0; i < data.length; i++) {
                    let dataString = data[i].string,
                        dataProp = data[i].prop;
                    this.version_string = data[i].versionSearch || data[i].identity;
                    if (dataString) {
                        if (dataString.indexOf(data[i].subString) !== -1) {
                            return data[i].identity;
                        }
                    } else if (dataProp) {
                        return data[i].identity;
                    }
                }
            } else {
                // search for version number
                let index = data.indexOf(this.version_string);
                if (index === -1) return;
                return parseFloat(data.substr(index + this.version_string.length + 1));
            }
        },
        data: {
            browser: [
                {string: nav.userAgent, subString: 'Edge', identity: 'Edge'},
                {string: nav.userAgent, subString: 'Chrome', identity: 'Chrome'},
                {string: nav.userAgent, subString: 'OmniWeb', versionSearch: 'OmniWeb/', identity: 'OmniWeb'},
                {string: nav.vendor, subString: 'Apple', identity: 'Safari', versionSearch: 'Version'},
                {prop: win.opera, identity: 'Opera', versionSearch: 'Version'},
                {string: nav.vendor, subString: 'iCab', identity: 'iCab'},
                {string: nav.vendor, subString: 'KDE', identity: 'Konqueror'},
                {string: nav.userAgent, subString: 'Firefox', identity: 'Firefox'},
                {string: nav.vendor, subString: 'Camino', identity: 'Camino'},
                {string: nav.userAgent, subString: 'Netscape', identity: 'Netscape'},
                {string: nav.userAgent, subString: 'MSIE', identity: 'Explorer', versionSearch: 'MSIE'},
                {string: nav.userAgent, subString: 'Trident', identity: 'Explorer', versionSearch: 'rv'},
                {string: nav.userAgent, subString: 'Gecko', identity: 'Mozilla', versionSearch: 'rv'},
                {string: nav.userAgent, subString: 'Mozilla', identity: 'Netscape', versionSearch: 'Mozilla'},
            ],
            os: [
                {string: nav.platform, subString: 'Win', identity: 'Windows'},
                {string: nav.platform, subString: 'Mac', identity: 'Mac'},
                {string: nav.userAgent, subString: 'iPhone', identity: 'iPhone/iPod'},
                {string: nav.userAgent, subString: 'iPad', identity: 'iPad'},
                {string: nav.userAgent, subString: 'Android', identity: 'Android'},
                {string: nav.platform, subString: 'Linux', identity: 'Linux'},
            ]
        }
    };

    let modules = {
        browser: function () {
            return browser.detect();
        },
        time: function () {
            // split date and grab timezone estimation.
            // timezone estimation: https://www.onlineaspect.com/2007/06/08/auto-detect-a-time-zone-with-javascript/
            let d1 = new Date(), d2 = new Date();
            d1.setMonth(0);
            d1.setDate(1);
            d2.setMonth(6);
            d2.setDate(1);
            return ({
                tz_offset: -(new Date().getTimezoneOffset()) / 60,
                observes_dst: (d1.getTimezoneOffset() !== d2.getTimezoneOffset())
            });
            // Gives a browser estimation, not guaranteed to be correct.
        },
        locale: function () {
            let lang = ((
                nav.language ||
                (nav.hasOwnProperty('browserLanguage')
                    ? nav.browserLanguage
                    : nav.systemLanguage)
            ) || '').split('-');
            if (lang.length === 2) {
                return {country: lang[1].toLowerCase(), lang: lang[0].toLowerCase()};
            } else if (lang) {
                return {lang: lang[0].toLowerCase(), country: null};
            } else {
                return {lang: null, country: null};
            }
        },
        device: function () {
            let device = {
                screen: {
                    width: win.screen.width,
                    height: win.screen.height
                }
            };
            let width, height;
            try {
                width = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
            } catch (e) {
                width = 0;
            }
            try {
                height = win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight;
            } catch (e) {
                height = 0;
            }
            device.viewport = {
                width: width,
                height: height
            };
            device.is_tablet = !!nav.userAgent.match(/(iPad|SCH-I800|xoom|kindle)/i);
            device.is_phone = !device.is_tablet && !!nav.userAgent.match(/(iPhone|iPod|blackberry|android|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i);
            device.is_mobile = device.is_tablet || device.is_phone;
            return device;
        },
        plugins: function () {
            let check_plugin = function (name) {
                if (nav.plugins) {
                    let plugin, i = 0, length = nav.plugins.length;
                    for (; i < length; i++) {
                        plugin = nav.plugins[i];
                        if (plugin && plugin.name && plugin.name.toLowerCase().indexOf(name) !== -1) {
                            return true;
                        }
                    }
                    return false;
                }
                return false;
            };
            let check_activex_flash = function (versions) {
                let found = false;
                for (let i = 0; i < versions.length; i++) {
                    try {
                        new ActiveXObject('ShockwaveFlash.ShockwaveFlash' + versions[i]);
                        found = true;
                        break;
                    } catch (e) { /* nil */
                    }
                }
                return found;
            };
            return {
                flash: check_plugin('flash') || check_activex_flash(['.7', '.6', '']),
                silverlight: check_plugin('silverlight'),
                java: check_plugin('java'),
                quicktime: check_plugin('quicktime')
            };
        },
        session: function (cookie, expires, tracker = null) {
            let session = util.get_obj(cookie);
            if (session == null) {
                session = {
                    tracker: tracker,
                    visits: 1,
                    start: new Date().getTime(), last_visit: new Date().getTime(),
                    url: win.location.href, path: win.location.pathname,
                    referrer: doc.referrer, referrer_info: util.parse_url(doc.referrer),
                    search: {engine: null, query: null},
                };
                let search_engines = [
                    {name: 'Google', host: 'google', query: 'q'},
                    {name: 'Bing', host: 'bing.com', query: 'q'},
                    {name: 'Yahoo', host: 'search.yahoo', query: 'p'},
                    {name: 'AOL', host: 'search.aol', query: 'q'},
                    {name: 'Ask', host: 'ask.com', query: 'q'},
                    {name: 'Baidu', host: 'baidu.com', query: 'wd'},
                ];
                let length = search_engines.length;
                let engine;
                let fallbacks = 'q query term p wd query text'.split(' ');
                for (let i = 0; i < length; i++) {
                    engine = search_engines[i];
                    if (session.referrer_info.host.indexOf(engine.host) !== -1) {
                        session.search.engine = engine.name;
                        session.search.query = session.referrer_info.query[engine.query];
                        session.search.terms = session.search.query ? session.search.query.split(' ') : null;
                        break;
                    }
                }
                if (session.search.engine === null && session.referrer_info.search.length > 1) {
                    for (let i = 0; i < fallbacks.length; i++) {
                        let terms = session.referrer_info.query[fallbacks[i]];
                        if (terms) {
                            session.search.engine = 'Unknown';
                            session.search.query = terms;
                            session.search.terms = terms.split(' ');
                            break;
                        }
                    }
                }
            } else {
                // Could've been initialized w/o id, so check and set
                if (tracker && !session.tracker) {
                    session.tracker = tracker;
                }
                session.prev_visit = session.last_visit;
                session.last_visit = new Date().getTime();
                session.visits++;
                session.time_since_last_visit = session.last_visit - session.prev_visit;
            }
            util.set_obj(cookie, session, expires);
            return session;
        },
        html5_location: function () {
            return function (callback) {
                nav.geolocation.getCurrentPosition(function (pos) {
                    pos.source = 'html5';
                    callback(pos);
                }, function (err) {
                    if (options.gapi_location) {
                        modules.gapi_location()(callback);
                    } else {
                        callback({
                            error: true,
                            source: 'html5',
                            message: err.message,
                        });
                    }
                });
            };
        },
        gapi_location: function () {
            return function (callback) {
                let location = util.get_obj(options.location_cookie);
                if (!location || location.source !== 'google') {
                    win.gloader_ready = function () {
                        if ('google' in win
                            && win.google.hasOwnProperty('loader')
                            && win.google.loader.hasOwnProperty('ClientLocation')
                        ) {
                            if (win.google.loader.ClientLocation) {
                                win.google.loader.ClientLocation.source = 'google';
                                callback(win.google.loader.ClientLocation);
                            } else {
                                callback({error: true, source: 'google'});
                            }
                            // noinspection JSUnresolvedVariable
                            util.set_obj(
                                options.location_cookie,
                                win.google.loader.ClientLocation,
                                options.location_cookie_timeout * 60 * 60 * 1000,
                            );
                        }
                    };
                    util.embed_script('https://www.google.com/jsapi?callback=gloader_ready');
                } else {
                    callback(location);
                }
            };
        },
        ipinfodb_location: function (api_key) {
            return function (callback) {
                let location_cookie = util.get_obj(options.location_cookie);
                if (!location_cookie && location_cookie.source === 'ipinfodb') {
                    win.ipinfocb = function (data) {
                        if (data.statusCode === 'OK') {
                            data.source = 'ipinfodb';
                            util.set_obj(
                                options.location_cookie,
                                data,
                                options.location_cookie * 60 * 60 * 1000);
                            callback(data);
                        } else {
                            if (options.gapi_location) {
                                return modules.gapi_location()(callback);
                            } else {
                                callback({error: true, source: 'ipinfodb', message: data.statusMessage});
                            }
                        }
                    };
                    util.embed_script('https://api.ipinfodb.com/v3/ip-city/?key=' + api_key + '&format=json&callback=ipinfocb');
                } else {
                    callback(location_cookie);
                }
            }
        },
        architecture: function () {
            let arch = nav.userAgent.match(/x86_64|Win64|WOW64|x86-64|x64;|AMD64|amd64/) ||
            (nav.hasOwnProperty('cpuClass') && nav.cpuClass === 'x64') ? 'x64' : 'x86';
            return {
                arch: arch,
                is_x64: arch === 'x64',
                is_x86: arch === 'x68',
            }
        },
        extra_data: function () {
            let nav = {};
            for (let obj in navigator) {
                if (typeof (navigator[obj]) === 'string') {
                    nav[obj] = navigator[obj];
                }
            }
            return {
                navigator: nav,
                document: {
                    referrer: document.referrer,
                    clientWidth: document.documentElement.clientWidth,
                    clientHeight: document.documentElement.clientHeight,
                },
                window: {
                    innerWidth: window.innerWidth,
                    innerHeight: window.innerHeight,
                    location: window.location.href,
                },
            }
        }
    };

    // Utilities
    let util = {
        parse_url: function (url_str) {
            let a = doc.createElement('a'), query = {};
            a.href = url_str;
            let query_str = a.search.substr(1);
            // Disassemble query string
            if (query_str !== '') {
                let pairs = query_str.split('&'), i = 0,
                    length = pairs.length, parts;
                for (; i < length; i++) {
                    parts = pairs[i].split('=');
                    if (parts.length === 2) {
                        query[parts[0]] = decodeURI(parts[1]);
                    }
                }
            }
            return {
                host: a.host,
                path: a.pathname,
                protocol: a.protocol,
                port: a.port === '' ? 80 : a.port,
                search: a.search,
                query: query
            }
        },
        set_cookie: function (cname, value, expires, options) { // from jquery.cookie.js
            if (!cname) {
                return null;
            }
            if (!options) {
                options = {};
            }
            if (value === null || value === undefined) {
                expires = -1;
            }
            if (expires) {
                options.expires = (new Date().getTime()) + expires;
            }
            return (doc.cookie = [
                encodeURIComponent(cname), '=',
                encodeURIComponent(String(value)),
                options.expires ? '; expires=' + new Date(options.expires).toUTCString() : '', // use expires attribute, max-age is not supported by IE
                '; path=' + (options.path ? options.path : '/'),
                options.domain ? '; domain=' + options.domain : '',
                (win.location && win.location.protocol === 'https:') ? '; secure' : ''
            ].join(''));
        },
        get_cookie: function (cookie_name, result) { // from jquery.cookie.js
            return (result = new RegExp('(?:^|; )' + encodeURIComponent(cookie_name) + '=([^;]*)').exec(doc.cookie)) ? decodeURIComponent(result[1]) : null;
        },
        embed_script: function (url) {
            let element = doc.createElement('script');
            element.type = 'text/javascript';
            element.src = url;
            (doc.body || doc.getElementsByTagName('body')[0] || doc.head).appendChild(element);
        },
        package_obj: function (obj) {
            if (obj) {
                obj.version = API_VERSION;
                let ret = JSON.stringify(obj);
                delete obj.version;
                return ret;
            }
        },
        set_obj: function (cname, value, expires, options) {
            util.set_cookie(cname, util.package_obj(value), expires, options);
        },
        get_obj: function (cookie_name) {
            let obj;
            try {
                obj = JSON.parse(util.get_cookie(cookie_name));
            } catch (e) {
                console.log(e);
            }
            if (obj && obj.version === API_VERSION) {
                delete obj.version;
                return obj;
            }
        }
    };

    // cookie options override
    if (options.get_object != null) {
        util.get_obj = options['get_object'];
    }
    if (options.set_object != null) {
        util.set_obj = options['set_object'];
    }

    // JSON
    let JSON = {
        parse: (win.hasOwnProperty('JSON') && win.JSON && win.JSON.parse) || function (data) {
            if (typeof data !== 'string' || !data) {
                return null;
            }
            return (new Function('return ' + data))();
        },
        stringify: (win.hasOwnProperty('JSON') && win.JSON && win.JSON.stringify) || function (object) {
            let type = typeof object;
            if (type !== 'object' || object === null) {
                if (type === 'string') {
                    return '"' + object + '"';
                }
            } else {
                let k, v, json = [], isArray = (object && object.constructor === Array);
                for (k in object) {
                    v = object[k];
                    type = typeof v;
                    if (type === 'string')
                        v = '"' + v + '"';
                    else if (type === 'object' && v !== null)
                        v = this.stringify(v);
                    json.push((isArray ? "" : '"' + k + '":') + v);
                }
                return (isArray ? '[' : '{') + json.join(',') + (isArray ? ']' : '}');
            }
        }
    };

    // Initialize SessionRunner
    SessionRunner();

});
// Switch for testing purposes.
if (typeof (window.exports) === 'undefined') {
    session_fetch(window, document, navigator);
} else {
    window.exports.session = session_fetch;
}