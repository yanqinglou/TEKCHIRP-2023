document.querySelector("#new-chirp-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const chripObj = {
    chirp: document.querySelector("#chirp-input").value,
  };
  console.log(chripObj);
  fetch("/api/chirps", {
    method: "POST",
    body: JSON.stringify(chripObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      location.reload();
    } else {
      alert("trumpet sound");
    }
  });
});

document.addEventListener("click", (e) => {
    // e.preventDefault();
  if (e.target.textContent == "Delete") {
    let id = e.target.name;
    fetch(`/api/chirps/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        location.reload();
      } else {
        alert("trumpet sound");
      }
    });
  }
});
