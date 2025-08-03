import { getRecipesCard } from "./getRecipesCard.js"



const URL = "https://dummyjson.com/recipes"


const cardParentElement = document.querySelector(".main");

const createElement = (element) => document.createElement(element)

const getRecipes = async (URL) => {
    try {
        const { data } = await axios.get(URL);
        return data;

    }
    catch (err) {
        console.error("Error fetching recipes:", err);
    }
}

const recipesObj = await getRecipes(URL);

const recipesArray = recipesObj.recipes;
console.log(recipesArray);

getRecipesCard(recipesArray, cardParentElement, createElement);




