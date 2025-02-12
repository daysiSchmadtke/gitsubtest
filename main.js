import { repositories, profiles } from "./data.js";

// Create a card
const createCard = (object) => {
  // Create tech list items
  const techItems = object.tech.map((tech) => `<li>${tech}</li>`).join("");

  // Create updates list items
  const updatesItems = object.updates
    .map((update) => `<li>${update}</li>`)
    .join("");

  return `
  <div class="card" style="width: 40rem; gap:10px;">
    <div class="card-body">
      <h3 class="card-title">${object.title}</h3>
      <h4 class="card-description">${object.description}</h4>
      <button class="btn rate-btn" data-id="${object.id}"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="22.5" viewBox="0 0 576 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#f1f2f3" d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg> Star</button>
      <ul class="card-tech">
        ${techItems}
      </ul>
      <ul class="card-update">
        ${updatesItems}
      </ul>
    </div>
  </div>`;
};

const displayCards = (array) => {
  let content = "";
  array.forEach((item) => {
    content += createCard(item);
  });

  displayInDom("#cards-cnt", content);

  // Add event listeners to star buttons
  document.querySelectorAll(".rate-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id, 10);
      addOneStar(id);
    });
  });
};

// Display in DOM utility function
const displayInDom = (divID, content) => {
  const findDiv = document.querySelector(divID);
  findDiv.innerHTML = content;
};

// Rate button adds one star
const addOneStar = (id) => {
  const repositoryIndex = repositories.findIndex((repo) => repo.id === id);
  if (repositoryIndex !== -1) {
    const repo = repositories[repositoryIndex];
    const star = 1;
    if (!repo.stars) {
      repo.stars = [];
    }
    repo.stars.push(star);
  }
};

//create new repository form
const form = document.querySelector("#createRepo");

const newRepo = (e) => {
  e.preventDefault();
  //create new repo
  const repo = {
    id: repositories.length + 1,
    title: document.querySelector("#name").value,
    description: document.querySelector("#description").value,
    tech: ["html", "js", "bootstrap", "css", "netlify"],
    updates: ["Javascript", 5, 22, 11],
    stars: [""],
  };
  repositories.push(repo);
  displayCards(repositories);
  form.reset();
};

form.addEventListener("submit", newRepo);

// Search bar
const search = (event) => {
  const eventSearch = event.target.value.toLowerCase();
  const searchResult = repositories.filter((item) => {
    return (
      item.title.toLowerCase().includes(eventSearch) ||
      item.description.toLowerCase().includes(eventSearch)
    );
  });
  displayCards(searchResult);
};

document.querySelector("#search-bar").addEventListener("keyup", search);

// Create Profile
const createProf = (object) => {
  // Create highlights list items
  const highlightsItems = object.highlights
    .map((highlight) => `<li>${highlight}</li>`)
    .join("");

  // Create organizations list items
  const organizationsItems = object.organizations
    .map((organization) => `<li>${organization}</li>`)
    .join("");

  // Create sponsors list items
  const sponsorsItems = object.sponsors
    .map((sponsor) => `<li>${sponsor}</li>`)
    .join("");

  return `
  <div class="card prof-card" style="width: 30rem; gap:20px;">
   <img
        class="card-img-top round-prof"
        src="https://i.tribune.com.pk/media/images/940125-meryemuzerli-1439883698/940125-meryemuzerli-1439883698.jpg"
        alt="profile image of a women"
      />
    <div class="card-body">
      <h2 class="card-name">${object.name}</h2>
      <h3 class="card-title">${object.title}</h3>
      <h4 class="card-summary">${object.summary}</h4>
      <button class="btn follow-btn" data-id="${object.id}">Follow</button>
      <button class="btn heart-btn" data-id="${object.id}"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#af12a2" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>Sponsor</button>
      <button class="btn more-btn" data-id="${object.id}">...</button>
      <h5>${object.followers}</h5>
      <h5>${object.following}</h5>
      <h5>${object.starReviews}</h5>

      <h6>${object.location}</h6>
      <h6>${object.email}</h6>
      <h6>${object.website}</h6>
      <h6>${object.x}</h6>

      <h2>Highlights</h2>
      <ul class="card-highlights">
        ${highlightsItems}
      </ul>
      <h3>Organizations</h3>
      <ul class="card-organizations">
        ${organizationsItems}
      </ul>
      <h3>Sponsors</h3>
      <ul class="card-sponsors">
        ${sponsorsItems}
      </ul>
    </div>
  </div>`;
};

const displayProf = (array) => {
  let content = "";
  array.forEach((item) => {
    content += createProf(item);
  });

  displayInDom("#cnt-prof", content);
};

//display cards when the screen loads
document.addEventListener("DOMContentLoaded", () => {
  displayCards(repositories);
  displayProf(profiles);
});
