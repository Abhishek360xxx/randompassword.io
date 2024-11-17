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
const excludeChars = document.getElementById("excludeChars");
const strengthBar = document.getElementById("strengthBar");
const strengthMessage = document.getElementById("strengthMessage");

// Fetch random background image from Unsplash API
async function getRandomImage() {
    try {
        const response = await fetch('https://picsum.photos/1920/1080?greyscale'); // Get random image
        if (response.ok) {
            const imageUrl = response.url;
            document.body.style.backgroundImage = `url("${imageUrl}")`;
            document.body.style.backgroundSize = "cover"; // Make it cover full viewport
            document.body.style.backgroundRepeat = "no-repeat"; // No repetition of image
            document.body.style.backgroundPosition = "center"; // Center the image
        } else {
            console.error('Failed to fetch random image');
        }
    } catch (error) {
        console.error('Error fetching random image:', error);
    }
}

// Call function to set background on page load
getRandomImage();

// Password generation logic
function generateNumber(data) {
    return data[Math.floor(Math.random() * data.length)];
}

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
    while (password.length < passwordLength.value) {
        const randomSet = generateNumber(availableSets);
        password += generateNumber(randomSet);
    }

    password = filterExcludedChars(password, excludeChars.value);
    passwordInput.value = password.slice(0, passwordLength.value);
    copyButton.disabled = false;
    updateStrengthIndicator(password);
}

function filterExcludedChars(password, excluded) {
    const excludeSet = new Set(excluded.split(''));
    return [...password].filter(char => !excludeSet.has(char)).join('');
}

function updateStrengthIndicator(password) {
    let strength = 0;

    // Check password strength
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const percentage = (strength / 4) * 100;
    strengthBar.style.width = `${percentage}%`;
    
    // Color and message based on strength
    if (percentage === 100) {
        strengthBar.style.background = "green";
        strengthMessage.textContent = "Strength: Strong";
    } else if (percentage >= 50) {
        strengthBar.style.background = "orange";
        strengthMessage.textContent = "Strength: Medium";
    } else {
        strengthBar.style.background = "red";
        strengthMessage.textContent = "Strength: Weak";
    }
}

function myFun() {
    copyButton.disabled = true;
    if (validatePasswordLength()) {
        generate();
    }
}

function validatePasswordLength() {
    const length = parseInt(passwordLength.value, 10);
    if (isNaN(length) || length < 1 || length > 20) {
        alert("Password length must be between 1 and 20.");
        return false;
    }
    return true;
}

function copied() {
    navigator.clipboard.writeText(passwordInput.value)
        .then(() => {
            alert("Password copied to clipboard");
        })
        .catch((error) => {
            console.error("Error copying to clipboard:", error);
            alert("Error copying to clipboard");
        });
}

// Function to download password as a text file
function downloadPassword() {
    const password = passwordInput.value;
    if (!password) {
        alert("No password generated yet!");
        return;
    }
    const blob = new Blob([password], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "password.txt";
    link.click();
}
