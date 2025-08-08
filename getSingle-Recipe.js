export const createSingleRecipePage = (recipe) => {
    // 1. Create main container with .single-card-main
    const main = document.createElement('main');
    main.className = 'single-card-main';
    
    // Create a flex container to hold card and ingredients side by side
    const contentContainer = document.createElement('div');
    contentContainer.className = 'recipe-content-container';
    
    // 2. Create the recipe card
    const card = document.createElement('div');
    card.className = 'card shadow';
    
    // 3. Add image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'card-image-container';
    
    const image = document.createElement('img');
    image.className = 'card-image';
    image.src = recipe.image;
    image.alt = recipe.name;
    
    imageContainer.appendChild(image);
    
    // 4. Create info section with centered content
    const info = document.createElement('div');
    info.className = 'info';
    
    // 5. Add title with large font size
    const title = document.createElement('h1');
    title.className = 'title fs-large';
    title.textContent = recipe.name;
    
    // 6. Add ratings section
    const ratings = document.createElement('div');
    ratings.className = 'ratings';
    ratings.innerHTML = `
        <span>Cuisine: ${recipe.cuisine}</span>
        <span class="time">⏱ ${recipe.prepTimeMinutes} mins</span>
    `;
    
    const starRating = document.createElement('div');
    starRating.className = 'star-rating';
    starRating.innerHTML = `<span>⭐ ${recipe.rating}</span>`;
    
    // Assemble the card
    info.appendChild(title);
    info.appendChild(ratings);
    info.appendChild(starRating);
    
    card.appendChild(imageContainer);
    card.appendChild(info);
    
    // Create ingredients sidebar
    const ingredientsSidebar = document.createElement('div');
    ingredientsSidebar.className = 'ingredients-sidebar';
    
    if (recipe.ingredients && recipe.ingredients.length > 0) {
        const ingredientsTitle = document.createElement('h2');
        ingredientsTitle.textContent = 'Ingredients';
        
        const ingredientsList = document.createElement('ul');
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ingredientsList.appendChild(li);
        });
        
        ingredientsSidebar.appendChild(ingredientsTitle);
        ingredientsSidebar.appendChild(ingredientsList);
    }
    
    // Add card and ingredients to content container
    contentContainer.appendChild(card);
    contentContainer.appendChild(ingredientsSidebar);
    main.appendChild(contentContainer);
    
    // 7. Create instructions section (below the card and ingredients)
    const instructionsSection = document.createElement('section');
    instructionsSection.className = 'recipe-instructions';
    
    if (recipe.instructions && recipe.instructions.length > 0) {
        const instructionsTitle = document.createElement('h2');
        instructionsTitle.textContent = 'Instructions';
        
        const instructionsList = document.createElement('ol');
        recipe.instructions.forEach(instruction => {
            const li = document.createElement('li');
            li.textContent = instruction;
            instructionsList.appendChild(li);
        });
        
        instructionsSection.appendChild(instructionsTitle);
        instructionsSection.appendChild(instructionsList);
    }
    
    // Add to page
    document.body.appendChild(main);
    document.body.appendChild(instructionsSection);
}