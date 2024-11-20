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
                // Certifica que o elemento será removido corretamente de seu pai atual
                const currentParent = draggedElement.parentElement;
                if (currentParent && currentParent.contains(draggedElement)) {
                    currentParent.removeChild(draggedElement);
                }

                // Adiciona o elemento ao novo board
                board.appendChild(draggedElement);

                // Define o ID do novo board no dataset do card
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
                    
                    // Envia a atualização para o servidor
                    const response = await fetch(`http://localhost:5129/api/tarefa/atualizar/quadro/${cardId}/`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            IdQuadro: newBoardId
                        })
                    });

                    if (!response.ok) {
                        throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
                    }

                    const result = await response.json();
                    console.log("Resposta da API:", result);
                } catch (error) {
                    console.error("Erro ao mover o card:", error);
                }
            }
        });
    });
}

export default DragAndDrop;
