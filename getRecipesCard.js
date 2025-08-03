export const getRecipesCard = (recipesArray, cardParentElement, createElement) => {
    for (let recipe of recipesArray) {


        /** Card Parent Container */
        const cardContainer = createElement("div");
        cardContainer.classList.add("card", "shadow");

        /** Card Image Container */
        const cardImageContainer = createElement("div");
        cardImageContainer.classList.add("card-image-container");

        /** Card Image Element */
        const imageElement = createElement("img");
        imageElement.classList.add("card-image");
        imageElement.setAttribute("src", recipe.image);
        imageElement.setAttribute("alt", recipe.name);
        imageElement.setAttribute("data-id", recipe.ID);
        cardImageContainer.appendChild(imageElement);

        cardContainer.appendChild(cardImageContainer);

        /** Card Details Container */
        const cardDetailsContainer = createElement("div");
        cardDetailsContainer.classList.add("recipe-details");

        /** Card Title Container */
        const cardTitleElement = createElement("div");
        cardTitleElement.classList.add("title");
        cardTitleElement.innerText = recipe.name;
        cardDetailsContainer.appendChild(cardTitleElement);

        /** Card Rating & Duration Container */
        const cardRatingAndLength = createElement("div");
        cardRatingAndLength.classList.add("ratings");

        /** Rating Element */
        const cardRatingContainer = createElement("div");

        const ratingValueElement = createElement("span");
        ratingValueElement.innerText = `Cuisine: ${recipe.cuisine}`;
        cardRatingContainer.appendChild(ratingValueElement);

        cardRatingAndLength.appendChild(cardRatingContainer);

        /** Duration */
        const lengthElement = createElement("div");
        lengthElement.classList.add("star-rating");

        const ratingIconElement = createElement("span");
        ratingIconElement.classList.add("time", "material-icons-outlined");
        ratingIconElement.innerText = "timer";
        lengthElement.appendChild(ratingIconElement);
        const duration = createElement("span");
        duration.innerText = `${recipe.prepTimeMinutes} mins`;
        lengthElement.appendChild(duration);
        // lengthElement.innerText = `${recipe.TotalTimeInMins} mins`;
        cardRatingAndLength.appendChild(lengthElement);

        cardDetailsContainer.appendChild(cardRatingAndLength);

        cardContainer.appendChild(cardDetailsContainer);

        cardParentElement.appendChild(cardContainer);


    }
}