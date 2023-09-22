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
    const img = document.createElement('img');
    const baseUrl = "https://cms.mpdev.nl";
    if(element.attributes.image != null) {

      // const path = element.attributes.image.data.attributes.url;
      // console.log(path)
    }
    // const imageUrl = `${baseUrl}${path}`

    // img.setAttribute(`src`, imageUrl)

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
    const categories = element.attributes.project_categories.data;
    const tag = document.createElement("ul");
    if(categories != null) {
      tag.classList.add("languages")
      categories.forEach(element => {
        const listItem = document.createElement("li")
        listItem.innerText = element.attributes.tag;
        tag.appendChild(listItem);
      });
      card.appendChild(tag);
    }
  });
}

fetchData()
  .then(processData)
  .catch((error) => {
    console.log(error);
  });
