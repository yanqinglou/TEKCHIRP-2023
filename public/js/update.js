let updateBtn = document.querySelector("#update-btn");

updateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const updatedChirp = {
    chirp: document.querySelector("#chirp-input").value,
  };
  console.log(updatedChirp)
  const id=document.querySelector("#chirp-input").name
  console.log(id)
  fetch( `/api/chirps/${id}`, {
    method: "POST",
    body: JSON.stringify(updatedChirp),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      location.href="/profile"
    } else {
      alert("trumpet sound");
    }
  });
});
