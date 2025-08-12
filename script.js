console.log("henlo");

//////////////////////////////////Back End Stuff//////////////////////////////////////////////////////

const { createClient } = supabase;

// Create a single supabase client for interacting with your database
supabase = createClient(
  "https://xpgmemabdeoopiskviwc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwZ21lbWFiZGVvb3Bpc2t2aXdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NTc0OTcsImV4cCI6MjA3MDUzMzQ5N30.RSrii0Faellpnb8eTL4npC93Ucsv9oAKDCVwq2O_UeY"
);

const form = document.getElementById("contactForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formInputs = form.querySelectorAll("input");

  let submission = {};

  formInputs.forEach((e) => {
    const { value, name } = e;
    if (value && name != "additional") {
      submission[name] = value;
    } else if (value) {
      submission[name] = compileGuests();
    }
  });
  submission["total"] = totalGuests();

  console.log(submission);

  const { error } = await supabase
    .from("guestinfo")
    .insert([submission], { returning: "minimal" });

  if (error) {
    alert("There was an error please try again");
  } else {
    alert("Thanks for contacting us");
  }

  formInputs.forEach((e) => (e.value = ""));
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////ADDITIONAL GUEST SLIDER

// let addSlider = document.getElementById('additional');
// let addNum = document.getElementById('add-num');
// let guestBox = document.getElementById('guest-box');

// function guestNumber(num){
//     addNum.innerHTML = '';
//     addNum.innerHTML = num;
// }

// function guestLines(num){

// }

// addSlider.addEventListener("input", () =>{
//     let num = addSlider.value;
//     guestNumber(num);
// })

let addGuestButton = document.getElementById("add-guest");
let guestBox = document.getElementById("guest-box");

function newGuestLine() {
  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", "additional");
  input.setAttribute("class", "additional");

  guestBox.appendChild(input);
}

addGuestButton.addEventListener("click", () => {
  newGuestLine();
});

function compileGuests() {
  let guests = [];
  let adds = document.querySelectorAll(".additional");
  adds.forEach((e) => {
    if (e.value) {
      guests.push(e.value);
    }
  });
  return guests;
}

function totalGuests() {
  return compileGuests().length + 1;
}

let yesButton = document.getElementById("yes-rsvp");
let noButton = document.getElementById("no-rsvp");
let yesBox = document.getElementById("yes-box");
let noBox = document.getElementById("no-box");
let submit = document.getElementById("submit");

let rsvp = "";

yesButton.addEventListener("click", () => {
  rsvp = true;
  rsvpSelect();
  console.log(rsvp);
});

noButton.addEventListener("click", () => {
  rsvp = false;
  rsvpSelect();

  console.log(rsvp);
});

function rsvpSelect() {
  if (rsvp == true) {
    yesBox.classList.remove("bye");
    noBox.classList.add("bye");
    yesButton.classList.add("selected");
    noButton.classList.remove("selected");
    submit.classList.remove("bye");
  } else {
    noBox.classList.remove("bye");
    yesBox.classList.add("bye");
    noButton.classList.add("selected");
    yesButton.classList.remove("selected");
    submit.classList.remove("bye");
  }
}
