/* 
   Improved Flashing Mouse Trail
   Ensures visibility and smooth movement
*/

document.addEventListener('DOMContentLoaded', () => {
    const dots = [];
    const mouse = { x: 0, y: 0 };
    const numDots = 20; // Enough for a solid flashy trail
    const speed = 0.25; // Good balance of flow and response

    // Create the trail elements
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'mouse-trail-dot';

        // Stagger the pulse animation
        dot.style.animationDelay = `${i * 0.05}s`;

        document.body.appendChild(dot);
        dots.push({
            el: dot,
            x: 0,
            y: 0,
            scale: 1 - (i / numDots) * 0.6 // Taper the tail
        });
    }

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    const animate = () => {
        let x = mouse.x;
        let y = mouse.y;

        dots.forEach((dot, index) => {
            // Smoothly move towards previous position
            dot.x += (x - dot.x) * speed;
            dot.y += (y - dot.y) * speed;

            // Apply movement (Must not be clobbered by CSS Keyframes)
            dot.el.style.transform = `translate(${dot.x}px, ${dot.y}px) scale(${dot.scale})`;

            x = dot.x;
            y = dot.y;
        });

        requestAnimationFrame(animate);
    };

    animate();
});
