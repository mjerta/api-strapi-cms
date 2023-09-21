const url = "https://cms.mpdev.nl/api/projects-cards/";
// const url = "http://example.com/movies.json";

async function fetchData() {
  const response = await fetch(url);
  if (!response.ok) {
    console.log("its not okay");
    return response;
  }
  const data = await response.json();
  return data;
}

fetchData()
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
