const extensionId = "agnaejlkbiiggajjmnpmeheigkflbnoo"; //Chrome
let games = {};

(async function() {
    let response = await fetch("https://raw.githubusercontent.com/soap-less/StadiaJSON/master/games.json");
    games = await response.json();
})();

//Register Presence
chrome.runtime.sendMessage(extensionId, { mode: 'active' }, function (response) {
    console.log('Presence registred', response)
});

//Wait for presence Requests
chrome.runtime.onMessage.addListener(function (info, sender, sendResponse) {
<<<<<<< Updated upstream
    console.log('Presence requested', info);
    sendResponse(getPresence());
=======
    if (info.action === "passToken") {
        partyToken = info.partyToken;
        console.log("Recieved Token" + partyToken);
    } else if (info.action === "joinRequest") {
        if (confirm(info.user.username + '#' + info.user.discriminator + ' wants to join you')) {
            sendResponse('YES');
        } else {
            sendResponse('NO');
        }
    } else {
        sendResponse(getPresence());
    }
>>>>>>> Stashed changes
});

//Establish all options
let largeImgTxt = "";
let smallImgTxt = "Online";
let largeImg = "stadialogosquare";
let smallImg = "online";
let detailDisplay = "Using Stadia";
let prevDetailDisplay = "Using Stadia";

let stateDisplay = "";
let time = Date.now();

let tabURL = "";

//Establish settings
let homeOn = true;
let storeOn = true;
let gameOn = true;
let ccOn = false;
let settingsRetrieved = false

//Return presence   
function getPresence() {
    try {
        tabURL = location.href;

        chrome.storage.local.get({rpcHomeOn: true, rpcStoreOn: true, rpcGameOn: true, rpcCCOn: false}, function(items) {
            homeOn = items.rpcHomeOn;
            storeOn = items.rpcStoreOn;
            gameOn = items.rpcGameOn;
            ccOn = items.rpcCCOn;
            settingsRetrieved = true;
        });

        //Updates the options
        if (tabURL === "https://stadia.google.com/home") {
            detailDisplay = "Chilling in Home";
            largeImgTxt = "On the Home Page";
            largeImg = "stadialogosquare";
            smallImg = "online";
            
            if (ccOn) {
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
                let currentlyPlaying = document.getElementsByClassName("HDKZKb  LiQ6Hb");
                console.log(currentlyPlaying);
                
                if (currentlyPlaying === undefined) {
                    return {'action': 'disconnect'}
                }

                for (let i = 0; i < currentlyPlaying.length; i++) {
                    if (!currentlyPlaying[i].getAttribute("class").includes("FW3qke")) {
                        currentlyPlaying = currentlyPlaying[i].textContent;
                        break;
                    }
                }

                if (currentlyPlaying.slice(0, 7) === "Playing") {
                    detailDisplay = currentlyPlaying;
                    smallImgTxt = "on Stadia"

                    //Slice to just game name then make lowercase and remove special characters
<<<<<<< Updated upstream
                    currentlyPlaying = currentlyPlaying.slice(8).toLowerCase().replace(/[^a-zA-Z]/g, "");
=======
                    currentlyPlaying = currentlyPlaying.slice(8).toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(" ", "");
>>>>>>> Stashed changes
                    
                    Object.keys(games).forEach(gameName => {
                        let game = games[gameName];
                        game["aliases"].forEach(alias => {
                            if (alias === currentlyPlaying) {
                                largeImgTxt = gameName;
                                
                                if (game["hasIcon"]) {
                                    largeImg = game["aliases"][0];
                                    smallImg = "stadialogosquare";

                                } else {
                                    largeImg = "stadialogosquare";
                                    smallImg = "online"
                                }
                            }
                        });
                    });
                } else if (!homeOn) {
                    return {action: "disconnect"};
                }
            }
            
            if (!homeOn && !ccOn) {
                return {action: "disconnect"};
            }

        } else if (tabURL.startsWith("https://stadia.google.com/store")) {
            detailDisplay = "Browsing the Store";
            largeImgTxt = "Looking for Something New";
            largeImg = "store";
            smallImg = "online";

            if (!storeOn) {
                return {action: "disconnect"};
            }

            //Displays what game is being viewed on the store
            Object.keys(games).forEach(gameName => {
                let game = games[gameName];
                if (game["store"] === tabURL) {
                    largeImgTxt = "Browsing the Store";
                    detailDisplay = "Checking out " + gameName
                }
            });

        } else {
            Object.keys(games).forEach(gameName => {
                let game = games[gameName];
                if (game["play"] === tabURL) {
                    detailDisplay = "Playing " + gameName;
                    largeImgTxt = gameName;
                    smallImgTxt = "Google Chrome through Stadia"
                    if (game["hasIcon"]) {
                        largeImg = game["aliases"][0];
                        smallImg = "chrome";
                    } else {
                        largeImg = "stadialogosquare";
                        smallImg = "chrome"
                    }
                }
            });

            if (!gameOn) {
                return {action: "disconnect"};
            }
        }

        //Check to see if presence has changed, resets time if so
        if (prevDetailDisplay !== detailDisplay) {
            time = Date.now();
        }
        prevDetailDisplay = detailDisplay;

        //Multi-line drifting
        stateDisplay = ""
        if (detailDisplay.length > 25) {
            for (i = detailDisplay.length - 1; i >= 0; i--) {
                if ((detailDisplay[i] === " " || detailDisplay[i] === ":") && detailDisplay.slice(0, i + 1).length < 25) {
                    stateDisplay = detailDisplay.slice(i + 1);
                    detailDisplay = detailDisplay.slice(0, i + 1);
                    break;
                }
            }
        }
<<<<<<< Updated upstream
=======
        
        /*
        if (partyToken.length > 0) {
            console.log({   
                clientId: '648430151390199818',
                presence: {
                    details: detailDisplay,
                    state: stateDisplay,
                    startTimestamp: time,
                    instance: true,
                    largeImageKey: largeImg,
                    smallImageKey: smallImg,
                    largeImageText: largeImgTxt,
                    smallImageText: smallImgTxt,
                    partyId: "party:" + partyToken,
                    partySize: document.getElementsByClassName("z9e9Hc")[0],
                    partyMax: 6,
                    joinSecret: partyToken
                }
            })

            return {   
                clientId: '648430151390199818',
                presence: {
                    details: detailDisplay,
                    state: stateDisplay,
                    startTimestamp: time,
                    instance: true,
                    largeImageKey: largeImg,
                    smallImageKey: smallImg,
                    largeImageText: largeImgTxt,
                    smallImageText: smallImgTxt,
                    partyId: "party:" + partyToken,
                    partySize: document.getElementsByClassName("z9e9Hc")[0],
                    partyMax: 6,
                    joinSecret: partyToken
                }
            }; 
        }
        */

        console.log("Presence", {
            clientId: '648430151390199818',
            presence: {
                details: detailDisplay,
                state: stateDisplay,
                startTimestamp: time,
                instance: true,
                largeImageKey: largeImg,
                smallImageKey: smallImg,
                largeImageText: largeImgTxt,
                smallImageText: smallImgTxt
            }
        });
>>>>>>> Stashed changes

        return {
            clientId: '648430151390199818',
            presence: {
                details: detailDisplay,
                state: stateDisplay,
                startTimestamp: time,
                instance: true,
                largeImageKey: largeImg,
                smallImageKey: smallImg,
                largeImageText: largeImgTxt,
                smallImageText: smallImgTxt
            }
        };
    } catch (e) {
        console.log("[StadiaRPC] [ERROR] URL:", tabURL, ", detailDisplay:", detailDisplay, ", homeOn:", homeOn, ", storeOn:", storeOn, ", gameOn:", gameOn, ", ccOn:", ccOn, ", settingsRetrieved:", settingsRetrieved);
        console.error(e);
    }
}