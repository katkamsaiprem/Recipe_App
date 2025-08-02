
const URL= "https://dummyjson.com/recipes"


const getRecipes = async (url) =>{
    try{
        const {data} = await axios.get(URL);
        return data;

    }
    catch (err){
        console.error("Error fetching recipes:",err);
    }
}

const Recipes = await getRecipes(URL);
console.log(Recipes);