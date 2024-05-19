// Password generation logic and other functions here...
let lowerData = "abcdefghijklmnopqrstuvwxyz";
let upperData = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numData = "1234567890";
let symData = "!@#$%^&*()";

let passwordInput = document.getElementById("passwordInput");
let passwordLength = document.getElementById("passwordLength");
let upper = document.getElementById("upper");
let lower = document.getElementById("lower");
let num = document.getElementById("num");
let sym = document.getElementById("sym");
let copyButton = document.getElementById("copyButton");

function generateNumber(data){
   return data[Math.floor(Math.random() * data.length)];
}

function generate(password=""){
   if(upper.checked){
      password += generateNumber(upperData)
   }
   if(lower.checked){
       password += generateNumber(lowerData)
    }
    if(num.checked){
       password += generateNumber(numData)
    }
    if(sym.checked){
       password += generateNumber(symData)
    }
    if(password.length < passwordLength.value){
      return generate(password)
    }
    
    console.log(password);
    passwordInput.value = password;
    copyButton.disabled = false; // Enable copy button when password is generated
 }

 function myFun(){
   copyButton.disabled = true; // Disable copy button until password is generated
   generate();
}

function copied(){
   navigator.clipboard.writeText(passwordInput.value)
   .then(() => {
      alert("Password copied to clipboard");
   })
   .catch((error) => {
      console.error("Error copying to clipboard: ", error);
      alert("Error copying to clipboard");
   });
}

// Function to fetch a random image from Unsplash
async function getRandomImage() {
    try {
        const response = await fetch('https://source.unsplash.com/random');
        if (response.ok) {
            const imageUrl = response.url;
            document.body.style.backgroundImage = `url("${imageUrl}")`;
        } else {
            console.error('Failed to fetch random image');
        }
    } catch (error) {
        console.error('Error fetching random image:', error);
    }
}

// Call the function to set random background image
getRandomImage();
