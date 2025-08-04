import { getRecipesCard } from "./getRecipesCard.js"
import { getCuisine } from "./getCuisine.js"

const recipeURL = "https://dummyjson.com/recipes"
const cuisineURL = "https://3de2awhcnqrpiue2.public.blob.vercel-storage.com/cusineJSON.json"

const cardParentElement = document.querySelector(".main");
const cuisineParentElement = document.querySelector(".cuisine")
const inputElement = document.querySelector(".input");

const createElement = (element) => document.createElement(element)

let searchValue = "";
let recipesArray = [];
const delay = 300;
let arrayOfCuisines = [];

const getRecipes = async (URL) => {
    try {
        const { data } = await axios.get(URL);
        return data;
    }
    catch (err) {
        console.error("Error fetching recipes:", err);
        return null;
    }
}

const recipesObj = await getRecipes(recipeURL);
const cuisineObj = await getRecipes(cuisineURL);

if (recipesObj && recipesObj.recipes) {
    recipesArray = recipesObj.recipes;
    console.log(" Recipes loaded:", recipesArray.length);
    getRecipesCard(recipesArray, cardParentElement, createElement);
} else {
    console.error(" Failed to load recipes");
    recipesArray = [];
    cardParentElement.innerHTML = "<p>Failed to load recipes. Please try again later.</p>";
}

if (cuisineObj && cuisineObj.cuisines) {
    const cuisineArray = cuisineObj.cuisines;
    console.log("Cuisines loaded:", cuisineArray.length);
    getCuisine(cuisineArray, cuisineParentElement, createElement);
} else {
    console.error(" Failed to load cuisines");
}

function getFilteredData() {
    if (!recipesArray || recipesArray.length === 0) {
        return [];
    }

    if (!searchValue || searchValue.trim() === "") {
        return recipesArray;
    }

    return recipesArray.filter(recipe => {
        return recipe && recipe.name &&
            recipe.name.toLowerCase().includes(searchValue.toLowerCase());
    });
}

const inputEventHandler = (e) => {
    console.log("DEBOUNCED Search executed at:", new Date().toLocaleTimeString());
    searchValue = e.target.value.toLowerCase().trim();
    const filteredRecipes = getFilteredData();
    cardParentElement.innerHTML = "";

    if (filteredRecipes.length > 0) {
        getRecipesCard(filteredRecipes, cardParentElement, createElement);
    } else {
        cardParentElement.innerHTML = "<p>No recipes found matching your search.</p>";
    }

    console.log("Search results:", filteredRecipes.length);
}

function debounce(callback, delay) {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}

const cuisineClickHandler = (e) => {
    const cuisineID = e.target.dataset.id;
    if (!cuisineID) console.warn("No cuisine ID found in the clicked element.");
    const isSelected = e.target.checked;
    console.log("Cuisine clicked:", cuisineID, "Selected:", isSelected);

}

const debounceInput = debounce(inputEventHandler, delay);

inputElement.addEventListener("keyup", debounceInput);
cuisineParentElement.addEventListener("click", cuisineClickHandler)



