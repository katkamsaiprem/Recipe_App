export const getCuisine = (arrayOfCuisines, parentElement, createElement) => {


    for (let cuisine of arrayOfCuisines) {
        const cuisineContainer = createElement("div");
        cuisineContainer.classList.add("filter");
        cuisineContainer.setAttribute("data-id", cuisine.id);

        // Create the checkbox
        const checkbox = createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add("checkbox");
        checkbox.setAttribute("id", `cuisine-${cuisine.id}`);
        checkbox.setAttribute("data-id", cuisine.id);

        // Create the label
        const label = createElement("label");
        label.classList.add("cuisine-label", "d-flex", "align-items-center", "gap-sm");
        label.setAttribute("for", `cuisine-${cuisine.id}`);
        label.setAttribute("data-id", cuisine.id);


        const labelText = createElement("span");
        labelText.textContent = cuisine.name;

        // Append checkbox first, then text
        label.appendChild(checkbox);
        label.appendChild(labelText);

        cuisineContainer.appendChild(label);
        parentElement.appendChild(cuisineContainer);
    }
}