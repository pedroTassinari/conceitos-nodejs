const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  let {title, url, techs} = request.body;

  let repository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  let {id} = request.params;
  let {title, url, techs} = request.body;

  let selectedIndex = repositories.findIndex(repository => repository.id === id);

  if (0 > selectedIndex)
    return response.status(400).json({erro: true});

  repositories[selectedIndex] = {...repositories[selectedIndex], title, url, techs}

  return response.json(repositories[selectedIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  let {id} = request.params;

  let selectedIndex = repositories.findIndex(repository => repository.id === id);

  if ( 0 > selectedIndex)
    return response.status(400).json({erro: true});

  repositories.splice(selectedIndex, 1);

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  let {id} = request.params;

  let selectedIndex = repositories.findIndex(repository => repository.id === id);

  if (0 > selectedIndex)
    return response.status(400).json({erro: true});

  let {likes} = repositories[selectedIndex];
  likes+=1;

  repositories[selectedIndex] = {...repositories[selectedIndex], likes}

  return response.json(repositories[selectedIndex]);
});

module.exports = app;
