const {faker} = require('@faker-js/faker');


const screenSizes =[
    {
        width : 1920,
        height : 1080
    },
    {
        width : 1366,
        height : 768
    },
    {
        width : 360,
        height : 640
    },
    {
        width : 414,
        height : 896
    },
    {
        width : 1536,
        height : 864
    },
    {
        width : 375,
        height : 667
    }
]
const architectures = ["x86", "x64"]

const browsers = ["Chrome", "Safari", "Opera", "Brave", "Edge", "Firefox"]

const OSs = ["ios", "Macistosh", "Ubuntu", "Linux", "windows", "Android"]

let os = OSs[Math.floor(Math.random() * OSs.length)]

let screenSize = screenSizes[Math.floor(Math.random() * screenSizes.length)]

let architecture = architectures[Math.floor(Math.random() * architectures.length)]

let browser = browsers[Math.floor(Math.random() * browsers.length)]


let session = {
    timeOpened: faker.date.past(),
    timezone: faker.address.timeZone(),//int
    locationPathname: faker.internet.domainName(),//string
    referrer : faker.internet.domainName(),//string
    history : faker.internet.domainName(),//string
    Language : "",//string
    OnLine : faker.datatype.boolean(),//Boolean
    Platform : "",//string
    JavaEnabled : faker.datatype.boolean(),//Boolean
    CookieEnabled : faker.datatype.boolean(),//Boolean
    documentCookie : "",//string
    screenWidth : screenSize.width,//int
    screenHeight : screenSize.height,//int
    documentWidth : screenSize.width,//int
    documentHeight : screenSize.height,//int
    innerHeight : screenSize.height,//int
    innerWidth : screenSize.width,//int
    screenAvailWidth : screenSize.width,//int
    screenAvailHeight : screenSize.height,//int
    architecture : architecture,//string
    browser : browser,//string
    browserV : Math.floor(Math.random() * 100),//int
    operatingSystem : os,//string
    country : faker.address.country()//string
}

console.log(session);
