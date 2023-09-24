async function main() {
  const root = document.querySelector("#root");
  const response = await fetch("http://localhost:3001/listBooks");
  const books = await response.json();

  books.forEach((book) => {
    const li = createBookItem(book);

    const removeButton = li.querySelector(".remove-button");
    removeButton.addEventListener("click", async () => {
      await deleteBook(book.id);
    });
    root.appendChild(li);
  });

  const addButton = document.createElement("button");
  addButton.textContent = "Add New Book";
  addButton.addEventListener("click", () => {
    const newBook = { title: "New Book", quantity: 0 };
    createAndAddBook(newBook);
  });
  root.appendChild(addButton);
}

function createBookItem(book) {
  const li = document.createElement("li");
  li.innerHTML = `
        <span>${book.title}</span>
        <input type="number" value="${book.quantity}">
        <button class="save-button">Save</button>
        <button class="remove-button">Remove Book</button>
    `;

  const saveButton = li.querySelector(".save-button");
  const quantityInput = li.querySelector("input");
  saveButton.addEventListener("click", async () => {
    const updatedQuantity = quantityInput.value;
    const updatedBook = { id: book.id, quantity: updatedQuantity };
    await updateBook(updatedBook);
  });

  return li;
}

async function createAndAddBook(newBook) {
  try {
    const response = await fetch("http://localhost:3001/addBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    if (response.ok) {
      const createdBook = await response.json();
      const li = createBookItem(createdBook);
      const root = document.querySelector("#root");
      root.appendChild(li);
    } else {
      console.error("Error adding book:", response.status);
    }
  } catch (error) {
    console.error("Error adding book:", error);
  }
}

main();
