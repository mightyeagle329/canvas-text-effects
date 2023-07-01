window.onload = () => {
    // Get the canvas element
    const canvas = document.getElementById('myCanvas');

    // Set canvas width and height
    canvas.width = document.querySelector(".container").clientWidth;
    canvas.height = window.innerHeight * 0.4;

    // Get canvas context
    const ctx = canvas.getContext('2d');

    // Font for drawing text with effects
    const font = '64px impact';

    // Set width and height variables to the canvas width and height
    const width = canvas.width;
    const height = canvas.height;

    // Angle steps for implementing text effects like bridge, valley, pinch, etc.
    // To implement these effects, we need a curve to crop the rest part.
    const angleSteps = 180 / width;

    // To draw text main canvas, we need template canvas.
    // First, draw text in the template canvas, draw it into main canvas with several text effects.
    const os = document.createElement('canvas');    // Create template canvas
    const octx = os.getContext('2d');               // Get template canvas context.

    // Set template canvas width and height to be the same as main canvas.
    os.width = width;
    os.height = height;

    // Set font of template canvas
    octx.font = font;

    octx.textBaseline = 'top';
    octx.textAlign = 'center';

    // Function for normal effect.
    function renderNormalText(text) {
        let textHeight = 64;
        let top = height * 0.5 - textHeight / 2;

        octx.clearRect(0, 0, width, height);
        ctx.clearRect(0, 0, width, height);

        octx.fillText(text, width * 0.5, 0);

        let i = width;
        let y = 0;
        while (i--) {
            ctx.drawImage(os, i, 0, 1, textHeight, i, top, 1, textHeight);
        }
    }

    // Function for curve effect.
    function renderCurveText(text) {
        let curve = 100;    // To crop the rest part
        let textHeight = 64;    // Text height is same as font size, in other words, it is 64px.
        let top = height * 0.5 - (textHeight * 3 - curve * 2) / 2;      // This is start position for drawing text.

        // Clear context of main and template canvas.
        octx.clearRect(0, 0, width, height);
        ctx.clearRect(0, 0, width, height);

        // First, draw text into the template canvas.
        octx.fillText(text, width * 0.5, 0);

        let i = width;
        let y = 0;
        while (i--) {   // draw text with effects from end to start throughout width side
            y = curve * Math.sin(i * angleSteps * Math.PI / 180);   // get current curve point
            /**
             * Parameters of drawImage function
             * - Image source
             * - Source x-coordinate
             * - Source y-coordinate
             * - Source width
             * - Source height
             * - Destination x-coordinate
             * - Destination y-coordinate
             * - Destination width
             * - Destination height
             */
            ctx.drawImage(os, i, 0, 1, textHeight, i, top - y, 1, textHeight * 3 - y);  // this draws text by one pixel height and implement text effects using destination height
        }
    }

    // Function for arch effect.
    function renderArchText(text) {
        let curve = 100;
        let textHeight = 64;
        let top = height * 0.5 - (textHeight * 3 - curve * 2) / 2;

        octx.clearRect(0, 0, width, height);
        ctx.clearRect(0, 0, width, height);

        octx.fillText(text, width * 0.5, 0);

        let i = width;
        let y = 0;
        while (i--) {
            y = curve * Math.sin(i * angleSteps * Math.PI / 180);

            ctx.drawImage(os, i, 0, 1, textHeight, i, top - y, 1, textHeight * 3 - y);
        }
    }

    // Function for bridge effect.
    function renderBridgeText(text) {
        let curve = 100;

        let textHeight = 64;
        let top = height * 0.5 - textHeight;

        octx.clearRect(0, 0, width, height);
        ctx.clearRect(0, 0, width, height);

        octx.fillText(text, width * 0.5, 0);

        let i = width;
        let y = 0;
        while (i--) {
            y = curve * Math.sin(i * angleSteps * Math.PI / 180);

            ctx.drawImage(os, i, 0, 1, textHeight, i, top, 1, textHeight * 3 - y);
        }
    }

    // Function for valley effect.
    function renderValleyText(text) {
        let curve = 100;
        let textHeight = 64;
        let top = height * 0.5 - textHeight * 2;

        octx.clearRect(0, 0, width, height);
        ctx.clearRect(0, 0, width, height);

        octx.fillText(text, width * 0.5, 0);

        let i = width;
        let y = 0;
        while (i--) {
            y = curve * Math.sin(i * angleSteps * Math.PI / 180);

            ctx.drawImage(os, i, 0, 1, textHeight, i, top + y, 1, textHeight * 3 - y);
        }
    }

    // Function for pinch effect.
    function renderPinchText(text) {
        let curve = 100;

        let textHeight = 64;
        let top = height * 0.5 - textHeight * 2;

        octx.clearRect(0, 0, width, height);
        ctx.clearRect(0, 0, width, height);

        octx.fillText(text, width * 0.5, 0);


        let i = width;
        let y = 0;
        while (i--) {
            y = curve * Math.sin(i * angleSteps * Math.PI / 180);
            ctx.drawImage(os, i, 0, 1, textHeight, i, top + y, 1, textHeight * 4 - 2 * y);
        }
    }

    // Function for bulge effect.
    function renderBulgeText(text) {
        let curve = 100;

        let textHeight = 64;
        let top = height * 0.5 - curve / 2 + textHeight;

        octx.clearRect(0, 0, width, height);
        ctx.clearRect(0, 0, width, height);

        octx.fillText(text, width * 0.5, 0);


        let i = width;
        let y = 0;
        while (i--) {
            y = curve * Math.sin(i * angleSteps * Math.PI / 180);
            ctx.drawImage(os, i, 0, 1, textHeight, i, top - y, 1, 2 * y - textHeight * 2);
        }
    }

    // Function for perspective effect.
    function renderPerspectiveText(text) {
        let tangent = 0.2;

        let textHeight = 64;
        let top = height * 0;

        octx.clearRect(0, 0, width, height);
        ctx.clearRect(0, 0, width, height);

        octx.fillText(text, width * 0.5, 0);


        let i = width;

        let y = 0;
        while (i--) {
            y = (i > width / 2) ? tangent * i : tangent * (width - i);
            ctx.drawImage(os, i, 0, 1, textHeight, i, top + y, 1, textHeight * 5 - y * 2);
        }
    }

    // Function for pointed effect.
    function renderPointedText(text) {
        let tangent = 0.2;
        let textHeight = 64;
        let top = height * 0;

        octx.clearRect(0, 0, width, height);
        ctx.clearRect(0, 0, width, height);

        octx.fillText(text, width * 0.5, 0);

        let i = width;
        let y = 0;
        while (i--) {
            y = (i > width / 2) ? tangent * i : tangent * (width - i);
            ctx.drawImage(os, i, 0, 1, textHeight, i, top + y, 1, textHeight * 3 - y);
        }
    }

    // Function for downward effect.
    function renderDownwardText(text) {
        let tangent = 0.2;

        let textHeight = 64;
        let top = height * 0.5 - (textHeight + width * 0.2) / 2;

        octx.clearRect(0, 0, width, height);
        ctx.clearRect(0, 0, width, height);

        octx.fillText(text, width * 0.5, 0);

        let i = width;
        let y = 0;
        while (i--) {
            y = tangent * i;
            ctx.drawImage(os, i, 0, 1, textHeight, i, top, 1, textHeight + y);
        }
    }

    // Function for upward effect.
    function renderUpwardText(text) {
        let tangent = 0.2;

        let textHeight = 64;
        let top = height * 0.5 - (textHeight + width * 0.2) / 2;

        octx.clearRect(0, 0, width, height);
        ctx.clearRect(0, 0, width, height);

        octx.fillText(text, width * 0.5, 0);


        let i = width;
        let y = 0;
        while (i--) {
            y = tangent * i;
            ctx.drawImage(os, i, 0, 1, textHeight, i, top + (width * 0.2 - y), 1, textHeight + y);
        }
    }

    // Function for cone effect.
    function renderConeText(text) {
        let tangent = 0.2;
        let textHeight = 64;
        let top = height * 0.5 - (textHeight / 4 + width * .4) / 2;

        octx.clearRect(0, 0, width, height);
        ctx.clearRect(0, 0, width, height);

        octx.fillText(text, width * 0.5, 0);

        let i = width;
        let y = 0;
        while (i--) {
            y = tangent * i;
            ctx.drawImage(os, i, 0, 1, textHeight, i, top + (width * 0.2 - y), 1, y * 2);
        }
    }

    // Handle button click event
    document.getElementById('draw').addEventListener('click', function () {
        // Get the text for implementing effects and required effect.
        const text = document.getElementById('textInput').value;
        const effect = document.getElementById('selectInput').value;

        switch (effect) {
            case "normal":
                renderNormalText(text);
                break;

            case "curve":
                renderCurveText(text);
                break;

            case "arch":
                renderArchText(text)
                break;

            case "bridge":
                renderBridgeText(text)
                break;

            case "valley":
                renderValleyText(text)
                break;

            case "pinch":
                renderPinchText(text)
                break;

            case "bulge":
                renderBulgeText(text)
                break;

            case "perspective":
                renderPerspectiveText(text)
                break;

            case "pointed":
                renderPointedText(text)
                break;

            case "downward":
                renderDownwardText(text)
                break;

            case "upward":
                renderUpwardText(text)
                break;

            case "cone":
                renderConeText(text)
                break;

            default:
                break;
        }
    });
}