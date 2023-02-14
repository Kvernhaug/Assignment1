//================================================================================
//  Initiate field variables
//================================================================================

let laptops = []; // array to contain laptop json objects
let price = 0;
let title = null;
let img = new Image(width = 200); // initiate laptop images with a set width of 200px


//================================================================================
//  Get html elements
//================================================================================

const titleElement = document.getElementById("title");
const selectLaptops = document.getElementById("selectLaptops");
const priceElement = document.getElementById("price");
const descriptionElement = document.getElementById("description");
const featuresElement = document.getElementById("features");
const imageElement = document.getElementById("image");
const insufficientFundsText = document.getElementById("insufficientFundsText");
insufficientFundsText.style.visibility="hidden";


//================================================================================
//  Fetch laptop data from API
//================================================================================

// Fetch json data from url and save to laptops array
fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptopsToSelector(laptops))

/**
 * Function adding laptops to the laptop selector
 * @param {Array} laptops array of laptop json objects
 */
const addLaptopsToSelector = (laptops) => {
    // Add each laptop to the laptop selector iteratively using the  addLaptopToSelector function
    laptops.forEach(element => {
        addLaptopToSelector(element);
    });
    // Initiate selector with first item in laptops array
    displayCurrentLaptop(laptops[0])
}

/**
 * Add single laptop to laptop selector
 * @param {json} laptop laptop element to add to selector
 */
const addLaptopToSelector = (laptop) => {
    const laptopElement = document.createElement("option"); 
    laptopElement.value = laptop.id; // option position matches laptop id
    laptopElement.appendChild(document.createTextNode(laptop.title)); // set laptop title as option text
    selectLaptops.appendChild(laptopElement); // add laptop option to laptop selector
}


//================================================================================
//  Handle laptop data
//================================================================================

/**
 * Update html to display information from the selected laptop
 * @param {json} laptop laptop to display information from
 */
const displayCurrentLaptop = (laptop) => {
    // Update title
    title = laptop.title;
    titleElement.innerText = title;
    // Update price
    price = laptop.price;
    updateNOK(priceElement, price);
    // Update description
    descriptionElement.innerText = laptop.description;
    // Update feature list
    featuresElement.innerText = ""; // reset list to remove specs from previous laptop
    laptop.specs.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item;
        featuresElement.appendChild(li);
    })
    // Update image
    // Image 5 has wrong image type (.jpg vs .png) in the json file, so the url is hard coded here
    if (laptop.id === 5) {
        img.src = "https://hickory-quilled-actress.glitch.me/assets/images/5.png";
    } else {
        img.src = "https://hickory-quilled-actress.glitch.me/" + laptop.image;
    }
    imageElement.appendChild(img); // display laptop image
}


/**
 * Changes the displayed laptop information based on laptop selector input
 */
const laptopSelectorChange = e => {
    const selectedLaptop = laptops[e.target.selectedIndex];
    displayCurrentLaptop(selectedLaptop);
}

/**
 * Event listener for the laptop selector. Calls the laptopSlectorChange function
 */
selectLaptops.addEventListener("change", laptopSelectorChange);

/**
 * Function excecuted when 'BUY NOW' button is pressed
 */
const buyLaptop = () => {
    // Notify user if laptop is too expensive
    if (price > balance) {
        insufficientFundsText.style.visibility="visible";
    } 
    // Otherwise remove price from salary and alert user that laptop is purchased
    else {
        insufficientFundsText.style.visibility="hidden";
        balance -= price;
        updateNOK(balanceElement, balance);
        window.alert("You are now the proud owner of a " + title);
    }
}