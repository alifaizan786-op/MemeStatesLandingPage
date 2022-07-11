var info = {
    timeOpened: new Date(), //string
    timezone: (new Date()).getTimezoneOffset() / 60,//int
    locationPathname: window.location.pathname,//string
    referrer : document.referrer,
    history : history.length,//string
    Language : navigator.language,//string
    OnLine : navigator.onLine,//boolean
    Platform : navigator.platform,//string
    JavaEnabled : navigator.javaEnabled(),//boolean
    CookieEnabled : navigator.cookieEnabled,//boolean
    documentCookie : document.cookie,//string
    screenWidth : screen.width ,//int
    screenHeight : screen.height,//int
    documentWidth : document.width,//int
    documentHeight : document.Height,//int
    innerHeight : innerHeight,//int
    innerWidth : innerWidth,//int
    screenAvailWidth : screen.availWidth,//int
    screenAvailHeight : screen.availHeight,//int
    architecture : window.session.architecture.arch,//string
    browser : window.session.browser.browser,//string
    browserV : window.session.browser.version,//int
    operatingSystem : window.session.browser.os,//string
    country : window.session.locale.country//string
};

console.log(info);