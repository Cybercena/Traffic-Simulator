document.addEventListener('DOMContentLoaded', () => {
    const car = document.getElementById('car');
    const redLight = document.getElementById('redLight');
    const greenLight = document.getElementById('greenLight');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const restartButton = document.getElementById('restart');
    const checkpoint = document.getElementById('checkpointLine');

    let carInterval;
    let carSpeed = 20; // Increased car speed for clearer visualization
    let carPosition = 0;
    let light = 'green';
    let stoppedAtCheckpoint = false;
    let hasCrossedCheckpoint = false;

    function updateCarPosition() {
        // Only update car position if not stopped at the checkpoint
        if (!stoppedAtCheckpoint) {
            carPosition += carSpeed;
            car.style.left = carPosition + 'px';
        }

        // Check if car reaches the checkpoint
        const carRightEdge = carPosition + car.offsetWidth;
        const checkpointLeftEdge = checkpoint.offsetLeft;

        // Only stop if the car touches the left side of the checkpoint and the light is red
        if (carRightEdge >= checkpointLeftEdge && !hasCrossedCheckpoint) {
            if (light === 'red') {
                stopCar(); // Stop the car if it reaches the checkpoint and the light is red
                stoppedAtCheckpoint = true; // Set flag indicating car stopped at checkpoint
            } else {
                hasCrossedCheckpoint = true; // Mark as crossed checkpoint if light is green
            }
        }

        // Stop the car at the end of the screen and prompt for restart
        if (carPosition >= window.innerWidth - car.offsetWidth) {
            stopCar();
            restartButton.disabled = false; // Enable the Restart button
        }
    }

    function startCar() {
        if (!carInterval) {
            carInterval = setInterval(updateCarPosition, 50);
        }
        restartButton.disabled = true; // Disable the Restart button while running
    }

    function stopCar() {
        clearInterval(carInterval);
        carInterval = null;
    }

    function changeTrafficLight() {
        if (light === 'green') {
            greenLight.classList.remove('active');
            redLight.classList.add('active');
            light = 'red';
        } else {
            redLight.classList.remove('active');
            greenLight.classList.add('active');
            light = 'green';

            // Resume the car if it was stopped at the checkpoint
            if (stoppedAtCheckpoint) {
                stoppedAtCheckpoint = false;
                hasCrossedCheckpoint = true; // Mark as crossed checkpoint
                startCar();
            }
        }
    }

    startButton.addEventListener('click', startCar);
    stopButton.addEventListener('click', stopCar);

    restartButton.addEventListener('click', () => {
        carPosition = 0;
        car.style.left = carPosition + 'px';
        stoppedAtCheckpoint = false;
        hasCrossedCheckpoint = false;
        startCar();
    });

    setInterval(changeTrafficLight, 2000); // Traffic light interval set to 2 seconds
    changeTrafficLight();
});
