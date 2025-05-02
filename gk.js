function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let draggedElement = document.getElementById(data);
    if (!ev.target.classList.contains('monuments') && ev.target.children.length === 0) {
      ev.target.appendChild(draggedElement);
    }
  }
  
  function checkAnswer() {
    let correct = 0;
    let total = document.querySelectorAll('.monuments img').length;
  
    document.querySelectorAll('.state').forEach(stateBox => {
      let state = stateBox.getAttribute("data-state");
      let child = stateBox.querySelector("img");
  
      if (child && child.dataset.state === state) {
        child.style.borderColor = "green";
        correct++;
      } else if (child) {
        child.style.borderColor = "red";
      }
    });
  
    document.getElementById("result").innerText = `📘 Out of 8 questions, ${correct} are correct.`;
  }
  