// MOBILE NAVIGATION

const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

menuToggle.addEventListener("click", function () {
const isOpen = mainNav.classList.toggle("open");

menuToggle.setAttribute("aria-expanded", String(isOpen));
menuToggle.setAttribute(
"aria-label",
isOpen ? "Close navigation" : "Open navigation"
);
menuToggle.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll("#main-nav a").forEach(function (link) {
link.addEventListener("click", function () {
mainNav.classList.remove("open");
menuToggle.setAttribute("aria-expanded", "false");
menuToggle.setAttribute("aria-label", "Open navigation");
menuToggle.textContent = "☰";
});
});

// AUTOMATIC FOOTER YEAR

document.getElementById("year").textContent =
new Date().getFullYear();

// POPUP FUNCTIONS

const popup = document.getElementById("detail-popup");
const popupTitle = document.getElementById("popup-title");
const popupImage = document.getElementById("popup-image");
const popupDescription = document.getElementById("popup-description");

function showPopup(title, description, imageSource) {
popupTitle.textContent = title || "Portfolio Details";
popupDescription.textContent =
description || "No description has been added yet.";

if (imageSource) {
popupImage.src = imageSource;
popupImage.alt = title || "Portfolio picture";
popupImage.hidden = false;
} else {
popupImage.removeAttribute("src");
popupImage.alt = "";
popupImage.hidden = true;
}

if (!popup.open) {
popup.showModal();
}
}

document.getElementById("close-popup").addEventListener(
"click",
function () {
popup.close();
}
);

// Close when clicking the dark background.

popup.addEventListener("click", function (event) {
if (event.target === popup) {
popup.close();
}
});

// FEATURED PROJECT POPUPS

document.querySelectorAll(".project-view").forEach(function (button) {
button.addEventListener("click", function () {
showPopup(
button.dataset.title,
button.dataset.description,
null
);
});
});

// IMAGE UPLOADS FOR CERTIFICATES AND ACHIEVEMENTS

function setupGallery(kind, number) {
const prefix = kind === "cert" ? "cert" : "ach";

const fileInput = document.getElementById(
prefix + "-file-" + number
);

const preview = document.getElementById(
prefix + "-preview-" + number
);

const placeholder = document.getElementById(
prefix + "-empty-" + number
);

fileInput.addEventListener("change", function () {
const file = fileInput.files[0];

if (!file) {
preview.hidden = true;
preview.removeAttribute("src");
placeholder.hidden = false;
return;
}

if (!file.type.startsWith("image/")) {
alert("Please select an image file.");
fileInput.value = "";
preview.hidden = true;
placeholder.hidden = false;
return;
}

const reader = new FileReader();

reader.onload = function () {
preview.src = reader.result;
preview.hidden = false;
placeholder.hidden = true;
};

reader.readAsDataURL(file);
});

// Clicking the image opens its full version.

preview.addEventListener("click", function () {
if (preview.src) {
const description = document.getElementById(
prefix + "-desc-" + number
).value.trim();

const title = kind === "cert"
? "Certificate " + number
: "Achievement " + number;

showPopup(title, description, preview.src);
}
});
}

// THREE CERTIFICATES

for (let number = 1; number <= 3; number++) {
setupGallery("cert", number);
}

// FIVE ACHIEVEMENTS

for (let number = 1; number <= 5; number++) {
setupGallery("ach", number);
}

// OPEN FULL CERTIFICATE OR ACHIEVEMENT

document.querySelectorAll(".gallery-view").forEach(function (button) {
button.addEventListener("click", function () {
const kind = button.dataset.kind;
const number = button.dataset.number;
const prefix = kind === "cert" ? "cert" : "ach";

const description = document.getElementById(
prefix + "-desc-" + number
).value.trim();

const preview = document.getElementById(
prefix + "-preview-" + number
);

const title = kind === "cert"
? "Certificate " + number
: "Achievement " + number;

if (preview.hidden && !description) {
showPopup(
title,
"Please upload a picture or enter a description first.",
null
);
return;
}

showPopup(
title,
description || "No description added yet.",
preview.hidden ? null : preview.src
);
});
});

// CONTACT FORM

document.getElementById("contact-form").addEventListener(
"submit",
function (event) {
event.preventDefault();

const name = document.getElementById("contact-name")
.value.trim();

const email = document.getElementById("contact-email")
.value.trim();

const message = document.getElementById("contact-message")
.value.trim();

const status = document.getElementById("form-status");

if (!name || !email || !message) {
status.textContent = "Please complete all fields.";
return;
}

// Replace this with your real email address.

const recipient = "YOUR_EMAIL@example.com";

if (recipient === "YOUR_EMAIL@example.com") {
status.textContent =
"Please replace YOUR_EMAIL@example.com in the JavaScript with your email address.";
return;
}

const subject = encodeURIComponent(
"Portfolio message from " + name
);

const body = encodeURIComponent(
"Name: " + name +
"\nEmail: " + email +
"\n\nMessage:\n" + message
);

status.textContent = "Opening your email application...";

window.location.href = "mailto:" + recipient +
"?subject=" + subject + "&body=" + body;
}
);

// HIGHLIGHT THE CURRENT NAVIGATION LINK

const pageSections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("#main-nav a");

function updateActiveLink() {
let currentSection = "home";

pageSections.forEach(function (section) {
if (window.scrollY >= section.offsetTop - 150) {
currentSection = section.id;
}
});

navLinks.forEach(function (link) {
link.classList.toggle(
"active",
link.getAttribute("href") === "#" + currentSection
);
});
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();
