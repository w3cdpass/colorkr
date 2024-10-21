// Function to load and apply colors dynamically
export function initColorPicker(selector) {
    
    async function loadColors() {
        try {
            const colors = await (await fetch('./data.json')).json();
            const colorDiv = document.getElementById(`${selector}`);

            // Create color picker container dynamically
            const pickContainer = document.createElement('div');
            pickContainer.classList.add('pick-container');

            const colorPicker = document.createElement('div');
            colorPicker.classList.add('color-picker');
            colorPicker.title = 'Text Color';

            const colorOptions = document.createElement('div');
            colorOptions.id = 'color-options';

            const arrow = document.createElement('div');
            arrow.classList.add('arrow');
            arrow.classList.add('arrow-bottom-center');
            colorOptions.appendChild(arrow); // Add arrow to the options div

            // Populate color options dynamically
            colors.forEach(colorObj => {
                const colorOption = document.createElement('div');
                colorOption.classList.add('color-option');
                colorOption.style.backgroundColor = colorObj.color;
                colorOption.setAttribute('data-color', colorObj.color);

                const tooltip = document.createElement('span');
                tooltip.classList.add('tooltip');
                tooltip.textContent = colorObj.color;

                colorOption.appendChild(tooltip);
                colorOptions.appendChild(colorOption);
            });

            // Append color picker to container
            colorPicker.appendChild(colorOptions);
            pickContainer.appendChild(colorPicker);

            // Append the dynamic color picker to the user's div
            colorDiv.appendChild(pickContainer);

            // Add event listeners for color selection
            addColorPickerListeners();
        } catch (error) {
            console.error('Error loading colors:', error);
        }
    }

    // Function to dynamically add CSS styles
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
        .pick-container {
            display: flex;
            gap: 30px;
            position: relative;
        }
        
        .color-picker {
            display: flex;
            align-items: center;
            position: relative;
            height: 40px;
        }
        
        #color-options {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            position: absolute;
            top: 0px;
            left: 0px;
            z-index: 10;
            background-color: white;
            border: 1px solid #d3d1d1;
            border-radius: 5px;
            padding: 5px;
        }
        
        .arrow {
            position: absolute;
            top: -9px;
            left: 8px;
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 10px solid #d3d1d1;
        }
        
        .color-option {
            width: 30px;
            height: 30px;
            cursor: pointer;
            border-radius: 0px;
            border: 1px solid rgba(0, 0, 0, 0);
            transition: border 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);
            box-sizing: border-box;
            margin: 0;
        }
        
        .color-option:hover {
            border: 4px solid rgb(254, 254, 254);
        }
        
        .tooltip {
            visibility: hidden;
            background-color: #333;
            color: #fff;
            text-align: center;
            border-radius: 4px;
            padding: 5px;
            position: absolute;
            z-index: 100;
            bottom: 85px;
            left: 14%;
            transform: translateX(-50%);
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .color-option:hover .tooltip {
            visibility: visible;
            opacity: 1;
        }
        
        .arrow-bottom-center {
            top: 70px;
            left: 87px;
            transform: rotate(180deg);
        }
    `;
        document.head.appendChild(style);
    }

    // Function to toggle color options visibility and arrow position
    function toggleColorOptions() {
        const colorOptions = document.getElementById('color-options');
        const arrow = document.querySelector('.arrow');

        colorOptions.classList.toggle('show');

        if (colorOptions.classList.contains('show')) {
            arrow.style.display = 'block';
        } else {
            arrow.style.display = 'none';
        }
    }

    // Add listeners for color picker interaction
    function addColorPickerListeners() {
        const colorOptions = document.getElementById('color-options');
        const arrow = document.querySelector('.arrow');

        // Toggle color options when clicking the picker
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
    }

    // Call the functions to load the color picker and inject CSS
    addDynamicStyles();
    loadColors();
}