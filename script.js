const url = "https://cms.mpdev.nl/api/project-cards?populate=*";

async function fetchData() {
  const response = await fetch(url);
  if (!response.ok) {
    console.log(response);
    throw {
      status: response.status,
      message: "Server responded with an error status",
    };
  }
  const data = await response.json();
  return data;
}

function processData(callback) {
  const arr = callback.data;

  arr.forEach((element) => {
    console.log(element);
    const body = document.querySelector("body");
    const card = document.createElement("div");
    card.classList.add("cards");
    body.appendChild(card);
    const title = document.createElement("h1");
    title.innerText = element.attributes.title;
    card.appendChild(title);
    const description = document.createElement("p");
    description.classList.add("description");
    description.innerHTML = element.attributes.description;
    card.appendChild(description);
    const activity = document.createElement("span");
    activity.classList.add("activity");
    card.appendChild(activity);

    if (element.attributes.activity) {
      activity.classList.remove("activity-inactive");
      activity.classList.add("activity-active");
    } else {
      activity.classList.remove("activity-active");
      activity.classList.add("activity-inactive");
    }
    console.log(element.attributes.project_categories.data);
  });
}

fetchData()
  .then(processData)
  .catch((error) => {
    console.log(error);
  });
