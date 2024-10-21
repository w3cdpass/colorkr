async function loadColors() {
    try {
        const colors = await (await fetch('./data.json')).json();
        const colorOptionsContainer = document.getElementById('color-options');

        colors.forEach(colorObj => {
            const colorDiv = document.createElement('div');
            colorDiv.classList.add('color-option');
            colorDiv.style.backgroundColor = colorObj.color;
            colorDiv.setAttribute('data-color', colorObj.color);

            const tooltip = document.createElement('span');
            tooltip.classList.add('tooltip');
            tooltip.textContent = colorObj.color;

            colorDiv.appendChild(tooltip);
            colorOptionsContainer.appendChild(colorDiv);
        });
    } catch (error) {
        console.error('Error loading colors:', error);
    }
}

loadColors();

const colorOptions = document.getElementById('color-options');
const arrow = document.querySelector('.arrow');

// Function to toggle color options visibility and arrow position
function toggleColorOptions() {
    colorOptions.classList.toggle('show'); // Toggle the color options visibility

    if (colorOptions.classList.contains('show')) {
        arrow.style.display = 'block'; // Show arrow when options are visible
        
        // Toggle arrow position
        if (arrow.classList.contains('arrow-left')) {
            arrow.classList.remove('arrow-left');
            arrow.classList.add('arrow-right'); // Move arrow to the right
        } else {
            arrow.classList.remove('arrow-right');
            arrow.classList.add('arrow-left'); // Move arrow to the left
        }
    } else {
        arrow.style.display = 'none'; // Hide arrow when options are hidden
    }
}

// Example of triggering the color options display
document.addEventListener('click', (event) => {
    if (event.target.closest('.color-picker')) {
        toggleColorOptions();
    } else {
        colorOptions.classList.remove('show');
        arrow.style.display = 'none'; // Hide arrow when clicking outside
    }
});

// Handle color selection
colorOptions.addEventListener('click', (e) => {
    if (e.target.classList.contains('color-option')) {
        const selectedColor = e.target.getAttribute('data-color');
        const textarea = document.getElementById('text-area'); // Assuming textarea exists
        const { selectionStart: start, selectionEnd: end } = textarea;
        const selectedText = textarea.value.substring(start, end);

        if (selectedText) {
            const beforeText = textarea.value.substring(0, start);
            const afterText = textarea.value.substring(end);
            textarea.value = beforeText + `[color=${selectedColor}]${selectedText}[/color]` + afterText;
        }
    }
});

// Initialize the arrow position to left by default
arrow.classList.add('arrow-bottom-center');