function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    const animalId = ev.dataTransfer.getData("text");
    const animal = document.getElementById(animalId);
    const habitat = ev.target.closest(".habitat");
  
    const correctHabitat = animal.dataset.habitat;
  
    if (habitat.id === correctHabitat) {
      habitat.appendChild(animal);
      document.getElementById("feedback").innerHTML = "✅ Correct!";
      document.getElementById("feedback").style.color = "green";
    } else {
      document.getElementById("feedback").innerHTML = "❌ Try Again!";
      document.getElementById("feedback").style.color = "red";
    }
  }
  