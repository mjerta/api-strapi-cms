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
    card.classList.add("card");
    body.appendChild(card);
    if (element.attributes.image.data != null) {
      const img = document.createElement("img");
      const baseUrl = "https://cms.mpdev.nl";
      const path = element.attributes.image.data.attributes.url;
      const imageUrl = `${baseUrl}${path}`;
      img.setAttribute(`src`, imageUrl);
      img.setAttribute('alt', 'screenshot-website')
      card.appendChild(img);
    }

    const article = document.createElement('article');
    article.classList.add('article-cards')
    card.appendChild(article);

    const title = document.createElement("h2");
    title.innerText = element.attributes.title;
    article.appendChild(title);
    const description = document.createElement("p");
    description.classList.add("description");
    description.innerHTML = element.attributes.description;
    article.appendChild(description);
    const activity = document.createElement("span");
    activity.classList.add("activity");
    article.appendChild(activity);
    if (element.attributes.activity) {
      activity.classList.remove("activity-inactive");
      activity.classList.add("activity-active");
    } else {
      activity.classList.remove("activity-active");
      activity.classList.add("activity-inactive");
    }
    const categories = element.attributes.project_categories.data;
    const tag = document.createElement("ul");
    if (categories != null) {
      tag.classList.add("languages");
      categories.forEach((element) => {
        const listItem = document.createElement("li");
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
