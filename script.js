function slicePizza() {
    const canvas = document.getElementById("pizzaCanvas");
    const ctx = canvas.getContext("2d");
    const slices = parseInt(document.getElementById("fractionSelect").value);
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;
    const angleStep = (2 * Math.PI) / slices;
  
    // Draw pizza base
    ctx.beginPath();
    ctx.fillStyle = "#f4a261";
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();
  
    // Draw slices
    for (let i = 0; i < slices; i++) {
      const angle = i * angleStep;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + radius * Math.cos(angle),
        centerY + radius * Math.sin(angle)
      );
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
  