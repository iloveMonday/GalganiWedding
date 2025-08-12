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

  const formInputs = form.querySelectorAll("input, textarea");

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
    alert("Oh no. Oh jeez. There was an error. Maybe your forgot your name. Please try again.");
  } else {
    alert(`See you October 18th, ${yesName.value}!  -  No dress code, just dress for the weather!`);
    // showRSVP();
  }

  formInputs.forEach((e) => (e.value = ""));
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let addGuestButton = document.getElementById("add-guest");
let guestBox = document.getElementById("guest-box");
let yesName = document.getElementById("name");
let noName = document.getElementById("no-name");

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
  if (yesName.value) {
    return compileGuests().length + 1;
  } else {
    return 0;
  }
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
    yesName.required = true;
    submit.classList.remove("bye");
  } else {
    yesBox.classList.add("bye");
    noBox.classList.remove("bye");
    yesButton.classList.remove("selected");
    noButton.classList.add("selected");
    yesName.required = false;
    submit.classList.remove("bye");
  }
}

function showRSVP() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
  popup.innerHTML = `See you in the field October 18th, ${yesName.value}! No Dress Code, Just Dress for the Weather!`
}








function populateNo() {
  let span = document.createElement("span");
  span.innerHTML = "Sorry You Can't Make It! Please Send Regrets";
  let p1 = document.createElement("p");
  let name1 = document.createElement("label");
  name1.innerHTML = "Name:";
  let inName = document.createElement("input");
  inName.setAttribute("type", "text");
  inName.setAttribute("name", "no-name");
  inName.required = true;
  p1.appendChild(name1);
  p1.appendChild(inName);
  let p2 = document.createElement("p");
  let message = document.createElement("label");
  message.innerHTML = "Would You Like to Send a Message?";
  let inMessage = document.createElement("textarea");
  inMessage.setAttribute("id", "message");
  inMessage.setAttribute("name", "message");
  inMessage.setAttribute("rows", "2");
  p2.appendChild(message);
  p2.appendChild(inMessage);
  noBox.appendChild(span);
  noBox.appendChild(p1);
  noBox.appendChild(p2);
}

function populateYes() {
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  let p3 = document.createElement("p");
  let p4 = document.createElement("p");
  let nameLab = document.createElement("label");
  let yourName = document.createElement("input");
  nameLab.innerHTML = "Your Name:";
  yourName.setAttribute("type", "text");
  yourName.setAttribute("name", "name");
  yourName.setAttribute("id", "name");
  yourName.required = true;
  p1.appendChild(nameLab);
  p1.appendChild(yourName);
  let bringLab = document.createElement("label");
  let bringBox = document.createElement("div");
  let bringButton = document.createElement("button");
  bringLab.innerHTML = "Will You Be Bringing Anyone Else?";
  bringBox.setAttribute("id", "guest-box");
  bringButton.innerHTML = "add guest";
  bringBox.setAttribute("id", "add-guest");
  bringBox.setAttribute("type", "button");
  p2.appendChild(bringLab);
  p2.appendChild(bringBox);
  p2.appendChild(bringButton);
  let allLabel = document.createElement("label");
  let allergy = document.createElement("input");
  allLabel.innerHTML = "Any Food Allergies?";
  allergy.setAttribute("type", "text");
  allergy.setAttribute("name", "allergy");
  allergy.setAttribute("id", "allergy");
  p3.appendChild(allLabel);
  p3.appendChild(allergy);
  let songLab = document.createElement("label");
  let song = document.createElement("input");
  songLab.innerHTML = "Do You Have a Song Request?";
  song.setAttribute("type", "text");
  song.setAttribute("name", "song");
  song.setAttribute("id", "song");

  yesBox.appendChild(p1);
  yesBox.appendChild(p2);
  yesBox.appendChild(p3);
  yesBox.appendChild(p4);
}
