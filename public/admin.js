async function main() {
  const response = await fetch("http://localhost:3001/listBooks");
  const books = await response.json();

  const root = document.querySelector("#root");

  books.forEach((book) => {
    const li = document.createElement("li");
    li.innerHTML = `
          <span>${book.title}</span>
          <input type="number" value="${book.quantity}">
          <button>Save</button>
      `;
    const saveButton = li.querySelector("button");
    const quantityInput = li.querySelector("input");

    saveButton.addEventListener("click", async () => {
      const updatedQuantity = quantityInput.value;
      const updatedBook = { id: book.id, quantity: updatedQuantity };

      await fetch("http://localhost:3001/updateBook", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      });
    });

    root.appendChild(li);
  });
}
main();
