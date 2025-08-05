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
let arrayOfSelectedCuisines = [];
let cuisineArray = [];

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
    cuisineArray = cuisineObj.cuisines;
    console.log("Cuisines loaded:", cuisineArray.length);
    getCuisine(cuisineArray, cuisineParentElement, createElement);
} else {
    console.error(" Failed to load cuisines");
}


function getFilteredData() {
    if (!recipesArray || recipesArray.length === 0) {
        return [];
    }

    let filteredArrOfRecipes = 
        searchValue.length > 0
            ? recipesArray.filter((recipe) =>
                recipe.name.toLowerCase().includes(searchValue)
            )
            : recipesArray;

    if (arrayOfSelectedCuisines.length > 0) {
        filteredArrOfRecipes = searchValue.length < 1 ? recipesArray : filteredArrOfRecipes;
        filteredArrOfRecipes = filteredArrOfRecipes.filter(recipe => 
            arrayOfSelectedCuisines.includes(recipe.cuisine)
        );
    }

    return filteredArrOfRecipes;
}

const inputEventHandler = (e) => {
   
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

// Cuisine click handler for checkboxes
// This function handles the click event on cuisine checkboxes
const cuisineClickHandler = (e) => {
    const cuisineID = e.target.dataset.id;
    if (!cuisineID) console.warn("No cuisine ID found in the clicked element.");
    const isSelected = e.target.checked;
    console.log("Cuisine clicked:", cuisineID, "Selected:", isSelected);
    const selectedCuisine = cuisineArray.reduce((acc, curr) => curr.id == cuisineID ? curr.name : acc, cuisineID);
    arrayOfSelectedCuisines = isSelected ? [...arrayOfSelectedCuisines, selectedCuisine] : arrayOfSelectedCuisines.filter(cuisine => cuisine !== selectedCuisine);
    console.log("Array of selected cuisines:", arrayOfSelectedCuisines); 
    
    // Get filtered recipes, not cuisines
    const filteredRecipes = getFilteredData();
    cardParentElement.innerHTML = "";
    
    // Display filtered recipes, not cuisines
    if (filteredRecipes.length > 0) {
        getRecipesCard(filteredRecipes, cardParentElement, createElement);
    } else {
        cardParentElement.innerHTML = "<p>No recipes found matching your filters.</p>";
    }
}

const debounceInput = debounce(inputEventHandler, delay);

inputElement.addEventListener("keyup", debounceInput);
cuisineParentElement.addEventListener("click", cuisineClickHandler);

