function selectDivs(xpath, parent){
    let allElements = [];

    // Select elements by the XPath
    let query = document.evaluate(xpath, parent || document,
        null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    
    for (let i = 0, length = query.snapshotLength; i < length; i++){
        allElements.push(query.snapshotItem(i));
    }
    // Return all elements that match the xpath
    return allElements;
}

setInterval(() => {
    // Select the path of all elements that are links that sends to twitter analytics
    let elementsPathQuery = "//a[contains(@href, 'analytics')]/.."
    
    let usernamePath = "//*/div/div/div[2]/header/div/div/div/div[2]/div/div/div[2]/div/div[2]/div/div/div/span"
    let statsPath = "//*/div/div/div[2]/main/div/div/div/div[1]/div/section/div/div/div[1]/div/div/div[1]/article/div/div/div/div[3]/div[6]/div"
    let stats = selectDivs(statsPath)[0]

    // If the user opened the tweet, adjust the margin of the div
    if(window.location.href.includes("/status")){
		try{
			if (getComputedStyle(selectDivs(elementsPathQuery + "/..")[0])['marginRight'] === "20px"){
                selectDivs(elementsPathQuery + "/..")[0].setAttribute("style", "margin-right: 0")
			}
		}catch{}
	}
    let usernameText = selectDivs(usernamePath)[0].innerText;
    usernameText = usernameText.substr(1);
    
   
    // Return all elements that match the xpath and remove them
    let elementsToBeRemoved = selectDivs(elementsPathQuery);
    for(let j = 0; j < elementsToBeRemoved.length; j++){
	if(elementsToBeRemoved[j].parentNode.parentNode.parentNode.role != "menu"){
	    elementsToBeRemoved[j].remove()
	}  
    }
	
    if(window.location.href.includes(usernameText)){
        stats.firstChild.setAttribute("style", "margin-right: 0");
    }   
}, 80)

