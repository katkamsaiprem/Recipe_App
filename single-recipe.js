import { createSingleRecipePage } from './getSingle-Recipe.js';

const recipeID = localStorage.getItem("recipeID");

const recipeURL = `https://dummyjson.com/recipes/${recipeID}`;

const cardParentElement = document.querySelector(".recipe-container");
const createElement = (element)=> document.createElement(element);
const getData = async (URL) => {
    try {
        const { data } = await axios.get(URL);
        return data;

    }
    catch (err) {
        console.error("error fetching recipe:", err);
        return null;
    }
}

const singleRecipe = await getData(recipeURL);

console.log("singleRecipe:", singleRecipe);


createSingleRecipePage(singleRecipe);
