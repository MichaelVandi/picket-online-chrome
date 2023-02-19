
let picketVisible = false;

window.onload = async function() {
    // Should you init a picket line here?
    // Make an API call, if true then init
    const currentHostname = window.location.hostname;

    const checkBoycott = await checkBoycottStatus(currentHostname);

    // get user crossed sites. If user hasn't crossed
    chrome.storage.sync.get("crossedPickets", async function(data) {
        if (data.crossedPickets) {
            // exists
            const crossedPickets = data.crossedPickets;
            if (!crossedPickets.includes(currentHostname)) {
                // User has not crossed
                if (checkBoycott.boycott) {
                    showPicketLine(checkBoycott.data);
                }
            }
            
        } else {
            if (checkBoycott.boycott) {
                showPicketLine(checkBoycott.data);
            }
        }
    });
}

async function checkBoycottStatus(domain) {
    return {
        "boycott": true,
        "data": {
            "header": "Don't cross the picket line",
            "numUsers": "3.4m",
            "site": "YouTube",
            "advocatesLink": "https://www.google.com", 
            "alternatives": [
                {
                    name: "Vimeo",
                    link: "https://www.vimeo.com"
                }, 
                {
                    name: "TikTok",
                    link: "https://www.tiktok.com"
                }, 
                {
                    name: "Twitch",
                    link: "https://www.twitch.com"
                }
            ]
        },
    }
}

function showPicketLine(data) {
    if (picketVisible) return; // Don't show picket if it is already visible
    const picketLine = initPicketLineUI(data);
    const moreInfo = initMoreInfo(data);
    // Get body and append
    const hidePage = document.createElement("div");
    hidePage.setAttribute("class", "overlay");

    document.body.append(hidePage); // hide the page
    document.body.append(picketLine);
    document.body.append(moreInfo); // add more info already but hidden

    // Configure advocates link click
    configureAdvocatesLinkClick(data.advocatesLink);

    picketVisible = true;
}

function initPicketLineUI(data) {
    // Create UI elements and configure
    const container = document.createElement("div");
    container.setAttribute("class", "picket-container");
    container.setAttribute("id", "picket-page1");
    
    const heading = document.createElement("p");
    heading.setAttribute("class", "picket-heading");
    heading.innerHTML = data.header;

    const img = document.createElement("img");
    img.setAttribute("class", "picket-cover");
    img.setAttribute("src", "https://i.imgur.com/pG5GFIw.png");
    img.setAttribute("alt", "picket cover");

    const proposalCount = document.createElement("p");
    proposalCount.setAttribute("class", "proposal-count");
    proposalCount.innerHTML = data.numUsers + " users currently boycotting";

    const proposalTitle = document.createElement("p");
    proposalTitle.setAttribute("class", "proposal-title");
    proposalTitle.innerHTML = "We are currently in negotiations with " + data.site;

    const learnMoreButton = document.createElement("div");
    learnMoreButton.setAttribute("class", "primary-button");
    learnMoreButton.innerHTML = "Learn more";

    const skipButton = document.createElement("p");
    skipButton.setAttribute("class", "cross-picket-button");
    skipButton.innerHTML = "Cross it.";

    // Append all to container
    container.append(heading);
    container.append(img);
    container.append(proposalCount);
    container.append(proposalTitle);
    container.append(learnMoreButton);
    container.append(skipButton);

    // Add click functionality for learn more button, cross picket
    onLearnMoreClick(learnMoreButton);
    onCrossPicketLineClick(skipButton);

    return container;
}

function onCrossPicketLineClick(element) {
    element.addEventListener("click", () => {
        // Cross this picket line
        crossPicketLine();
    })
}

function crossPicketLine() {
    const currentHostname = window.location.hostname;
    chrome.storage.sync.get("crossedPickets", async function(data) {
        if (data.crossedPickets) {
            // exists
            const crossedPickets = data.crossedPickets;
            crossedPickets.push(currentHostname);

            // update crossed pickets
            chrome.storage.sync.set({crossedPickets: crossedPickets});
            
        } else {
            const crossedPickets = [];
            crossedPickets.push(currentHostname);
            // update crossed pickets
            chrome.storage.sync.set({crossedPickets: crossedPickets});
        }
    });

}

function initMoreInfo(data) {
    // Create UI elements and configure
    const container = document.createElement("div");
    container.setAttribute("class", "picket-container");
    container.setAttribute("id", "picket-page2");

    const proposalTitle = document.createElement("p");
    proposalTitle.setAttribute("class", "proposal-title-more");
    proposalTitle.innerHTML = "We are currently in negotiations with " + data.site;

    const subText1 = document.createElement("p");
    subText1.setAttribute("class", "sub-text");
    subText1.innerHTML = "Our lawyers are in discussions over unfair data privacy terms for users in North America";

    const subText2 = document.createElement("p");
    subText2.setAttribute("class", "sub-text");
    subText2.innerHTML = "In the meantime, explore these alternatives:";

    const subText3 = document.createElement("p");
    subText3.setAttribute("class", "sub-text");
    subText3.innerHTML = `
        Learn more about picket.online's advocates <mark class="alternative-site" id="advocates-link">here.</mark>
    `  

    const subText4 = document.createElement("p");
    subText4.setAttribute("class", "sub-text");
    subText4.innerHTML = "We can't do it without you."

    const backButton = document.createElement("p");
    backButton.setAttribute("class", "cross-picket-button");
    backButton.innerHTML = "Back.";

    // Build alternatives
    const alternatives = initAlternatives(data.alternatives);

    // Append all to container
    container.append(proposalTitle);

    const parentDiv1 = document.createElement("div");
    parentDiv1.setAttribute("class", "parents");

    parentDiv1.append(subText1);
    parentDiv1.append(subText2);
    container.append(parentDiv1);

    // Add alternatives
    container.append(alternatives);

    const parentDiv2 = document.createElement("div");
    parentDiv2.setAttribute("class", "parents");

    parentDiv2.append(subText3);
    parentDiv2.append(subText4);

    container.append(parentDiv2);
    const br = document.createElement("br");

    container.append(br);
    container.append(backButton);

    // configure backbutton clikc
    onBackClick(backButton);

    return container;
}

function configureAdvocatesLinkClick(link) {
    const advocatesLink = document.querySelector("#advocates-link");
    if (advocatesLink) {
        advocatesLink.onclick = () => {
            openExternalLink(link);
        }
    }
}

function openExternalLink(link) {
    window.open(link, '_blank');
}

function initAlternatives(alternatives) {
    const alternativesDiv = document.createElement("div");
    alternativesDiv.setAttribute("class", "alternatives-div");

    for (let i = 0; i < alternatives.length; i++) {
        const alt = document.createElement("p");
        alt.setAttribute("class", "alternative-site");

        alt.innerHTML = alternatives[i].name;
        alt.onclick = () => {
            openExternalLink(alternatives[i].link);
        }

        alternativesDiv.append(alt);
    }

    return alternativesDiv;
}


function onLearnMoreClick(element) {
    element.addEventListener("click", () => {
        // Hide page 1, Show page 2
        const picketPage1 = document.getElementById("picket-page1");
        if (picketPage1) {
            // Hide
            picketPage1.style.display = "none";
            const picketPage2 = document.getElementById("picket-page2");
            picketPage2.style.display = "flex";
        }

    })
}

function onBackClick(element) {
    element.addEventListener("click", () => {
        const picketPage2 = document.getElementById("picket-page2");
        if (picketPage2)  {
            picketPage2.style.display = "none";
            const picketPage1 = document.getElementById("picket-page1");
            picketPage1.style.display = "flex";
        }
    })
}
