import App from "./app";
import MovieController from "./controllers/movieController";

const app = new App([new MovieController()], Number(process.env.PORT) || 5000);

app.listen();
