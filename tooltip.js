
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

