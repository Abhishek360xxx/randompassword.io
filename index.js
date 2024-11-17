const lowerData = "abcdefghijklmnopqrstuvwxyz";
const upperData = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numData = "1234567890";
const symData = "!@#$%^&*()";

const passwordInput = document.getElementById("passwordInput");
const passwordLength = document.getElementById("passwordLength");
const upper = document.getElementById("upper");
const lower = document.getElementById("lower");
const num = document.getElementById("num");
const sym = document.getElementById("sym");
const copyButton = document.getElementById("copyButton");

// Generate a random character from a given string
function generateCharacter(data) {
    return data[Math.floor(Math.random() * data.length)];
}

// Main password generation function
function generate() {
    const availableSets = [];
    if (upper.checked) availableSets.push(upperData);
    if (lower.checked) availableSets.push(lowerData);
    if (num.checked) availableSets.push(numData);
    if (sym.checked) availableSets.push(symData);

    if (availableSets.length === 0) {
        alert("Please select at least one character set.");
        return;
    }

    let password = "";

    // Ensure the password includes at least one character from each selected set
    availableSets.forEach(set => {
        password += generateCharacter(set);
    });

    // Fill the rest of the password length with random characters from any set
    while (password.length < passwordLength.value) {
        const randomSet = generateCharacter(availableSets);
        password += generateCharacter(randomSet);
    }

    // Truncate password to the specified length and update the input field
    passwordInput.value = password.slice(0, passwordLength.value);
    copyButton.disabled = false; // Enable copy button
}

function myFun() {
    copyButton.disabled = true; // Disable copy until a password is generated
    if (validatePasswordLength()) {
        generate();
    }
}

// Validate password length
function validatePasswordLength() {
    const length = parseInt(passwordLength.value, 10);
    if (isNaN(length) || length < 1 || length > 20) {
        alert("Password length must be between 1 and 20.");
        return false;
    }
    return true;
}

// Copy password to clipboard
function copied() {
    navigator.clipboard.writeText(passwordInput.value)
        .then(() => {
            alert("Password copied to clipboard!");
        })
        .catch(error => {
            console.error("Error copying to clipboard:", error);
            alert("Failed to copy to clipboard.");
        });
}

// Fetch a random image from Picsum Photos and set it as the background
async function getRandomImage() {
    try {
        const timestamp = new Date().getTime(); // Prevent caching
        const response = await fetch(`https://picsum.photos/1920/1080?random=${timestamp}`);
        if (response.ok) {
            const imageUrl = response.url;
            document.body.style.backgroundImage = `url("${imageUrl}")`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundPosition = "center";
        } else {
            console.error("Failed to fetch a random image.");
        }
    } catch (error) {
        console.error("Error fetching random image:", error);
    }
}

// Call the function on page load
getRandomImage();
