function DragAndDrop() {
    const boards = document.querySelectorAll(".board");

    boards.forEach(board => {
        // Permitir que o item seja solto no board
        board.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        // Quando o item é solto no board
        board.addEventListener("drop", (e) => {
            e.preventDefault();
            const data = e.dataTransfer.getData("text");
            const draggedElement = document.getElementById(data);

            if (draggedElement) {
                board.appendChild(draggedElement);
                draggedElement.dataset.newBoardId = board.id;
            }
        });
    });

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        // Inicia o processo de arrastar
        card.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text", e.target.id);
            e.target.classList.add("drag");
        });

        card.addEventListener("dragend", async (e) => {
            e.target.classList.remove("drag");
            const cardId = e.target.id.split("_")[1];
            const newBoardId = e.target.dataset.newBoardId;

            if (newBoardId) {
                try {
                    console.log(`Card ${cardId} moved to board ${newBoardId}`);
                    const response = await fetch(`http://localhost:5129/api/tarefa/atualizar/quadro/${cardId}/`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                        body: JSON.stringify({
                            IdQuadro: newBoardId
                        })
                    });

                    await response.json();
                } catch (error) {
                    console.error("Erro ao mover o card:", error);
                }
            }
        });
    });
}

export default DragAndDrop;
