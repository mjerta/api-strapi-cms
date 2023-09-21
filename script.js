const url = "https://cms.mpdev.nl/api/projects-cards/";

async function fetchData() {
  const response = await fetch(url);
  if (!response.ok) {
    console.log(response)
    throw { status: response.status, message: 'Server responded with an error status' };
  }
  const data = await response.json();
  return data;
}

function processData(callback) {
const arr = callback.data;

arr.forEach(element => {

  const body = document.querySelector("body");
  const card = document.createElement('div');
  card.classList.add("cards");
  body.appendChild(card);
  const title = document.createElement('h1');
  title.innerText = element.attributes.Title;
  card.appendChild(title);
  const excerpt = document.createElement('p');
  excerpt.classList.add("excerpt")
  excerpt.innerHTML = element.attributes.Description;
  card.appendChild(excerpt);
  console.log(element.attributes.activity)
  
});
}


fetchData()
  .then(processData)
  .catch((error) => {
    console.log(error);
  });
