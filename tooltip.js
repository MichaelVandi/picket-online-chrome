
let picketVisible = false;

window.onload = async function() {
    // Should you init a picket line here?
    // Make an API call, if true then init
    const checkBoycott = await checkBoycottStatus("test");
    
    if (checkBoycott.boycott) {
        showPicketLine(checkBoycott.data);
    }
}

async function checkBoycottStatus(domain) {
    return {
        "boycott": true,
        "data": {
            "header": "Don't cross the picket line",
            "numUsers": "3.4m",
            "site": "YouTube", 
            "alternatives": ["Vimeo", "TikTok", "Twitch"]
        },
    }
}

function showPicketLine(data) {
    if (picketVisible) return; // Don't show picket if it is already visible
    const picketLine = initPicketLineUI(data);
    // Get body and append
    const hidePage = document.createElement("div");
    hidePage.setAttribute("class", "overlay");

    document.body.append(hidePage); // hide the page
    document.body.append(picketLine);
    picketVisible = true;
}

function initPicketLineUI(data) {
    // Create UI elements and configure
    const container = document.createElement("div");
    container.setAttribute("class", "picket-container");
    
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

    return container;
}

function initMoreInfo(data) {
    // Create UI elements and configure
    const container = document.createElement("div");
    container.setAttribute("class", "picket-container");

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
        Learn more about picket.online's advocates <mark class"link-advocates">here.</mark>
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
    container.append(subText1);
    container.append(subText2);

    // Add alternatives
    container.append(alternatives);

    container.append(subText3);
    container.append(subText4);
    container.append(backButton);

    return container;
}


function initAlternatives(alternatives) {
    const alternativesDiv = document.createElement("div");
    alternativesDiv.setAttribute("class", "alternatives-div");

    for (let i = 0; i < alternatives.length; i++) {
        const alt = document.createElement("p");
        alt.setAttribute("class", "alternative-site");

        alt.innerHTML = alternatives[i];

        alternativesDiv.append(alt);
    }

    return alternativesDiv;
}

