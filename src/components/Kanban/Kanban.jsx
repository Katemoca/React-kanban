import React from "react";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Card from "../Card/Card";
import mockData from "../../mockData";

import "./Kanban.scss";

function Kanban() {
  // Traemos la primera info o data de mockData.jsx
  const [data, setData] = useState(mockData);
  // Traemos el comportamiento de arrastrar dentro del contexto de arrastrar-soltar (drag-drop). Esto me da un resultado (result) del movimiento/traslado/evento.
  const onDragEnd = (result) => {
    // Si el resultado del movimiento no es el destino correcto que haga un "return" para que pare y no haga nada.
    if (!result.destination) return;
    const { source, destination } = result; // Si el id de source (el origen) NO es igual al id del destino (destination) entonces el movimiento/traslado de la tarjeta SÍ SE PUEDE HACER.
    if (source.droppableId !== destination.droppableId) {
      // Vamos a capturar el index de la columna en la cual estamos ubicados tanto en el SOURCE como en el DESTINATION.
      const sourceColIndex = data.findIndex(
        (element) => element.id === source.droppableId
      );
      const destinationColIndex = data.findIndex(
        (element) => element.id === destination.droppableId
      );
      // Identificamos cuál es nuestra columna SOURCE y cuál es nuestra columna DESTINATION dentro de nuestra DATA.
      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      // Pasamos los ids (array) a una lista para poder entrar a sus propiedades con SPREAD OPERATOR

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      //Hacemos desaparecer la tarjeta seleccionada de la columna "source" ya que se traslada a "destination"
      const [removed] = sourceTask.splice(source.index, 1);

      // Directamente traemos y agregamos a "destination" aquel index de la tarjeta removida
      destinationTask.splice(destination.index, 0, removed);

      //Ahora actualizamos la data(array) debido al traslado de la tarjeta. Accedemos a las tareas de data y le pasamos sourceTask (LO QUE SE HA CAMBIADO)
      data[sourceColIndex].tasks = sourceTask;
      data[destinationColIndex].tasks = destinationTask;

      // Pasamos esta INFORMACIÓN con la función SETEADORA => setData es lo que va a modificar a la variable "data"
      setData(data);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban">
        {data.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                className="kanban__section"
                ref={provided.innerRef}>
                <div className="kanban__section__title">{section.title}</div>
                <div className="kanban__section__content">
                  {section.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? "0.5" : "1",
                          }}>
                          <Card>{task.title}</Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

export default Kanban;

//! [NOTAS GENERALES]
// 1. Instalamos useState de REACT ya que necesitamos saber cuál es el estado de cada una de las cards
// 2. La función onDragEnd nos mantiene dentro de la condicón de que el drag-and-drop se haga dentro del límite.
// 3. Para el método DragDropContext tengo el "source" o "punto de arranque" lo que es el evento (drag o drop) y el "destination" para validar si el area del evento es el adecuado.
// 4. "droppableId" es una propiedad para identificar el id en el cual se está arrastrando en ese preciso momento.
// 5. En un "kanban" tenemos al menos 3 columnas estas también poseen un ID. Tenemos que capturar el index de ambas columma, esto se hace aplicando un método de array findIndex() que retorna el index del "primer elemento" que satisface la condición.
// El método splice() toma el punto de partida, la cantidad de elementos a partir de ese punto de origen y devuelve el array modificado/actualizado.  Nos funciona para cuando se haga el DROP de la tarjeta y se remueva de "source" y se agrege en "destination"

// MDN: El método splice() cambia el contenido de un array eliminando elementos existentes y/o agregando nuevos elementos.

// <DragDropContext></DragDropContext> Son los espacios permitidos para ejecutar la función "onDragEnd" según "react-beautiful-dnd"

// Este componente se agrega a App.jsx

// En este documento vamos a mapear datos y para poder generar las secciones y generar la info.

// ASIGNAR KEYS:  <Droppable key={section.id} => para el elemento que estoy arrastrando  droppableId={section.id} => para el area de donde estoy arrastrando>

// USING innerRef : https://github.com/atlassian/react-beautiful-dnd/blob/HEAD/docs/guides/using-inner-ref.md  ===> En el innerRef incluimos la información de las tarjetas par así empezar el arrastre.

// provided => Es la vista que se "prepara" para luego almacenar los elementos que se van a arrastrar <Draggable>
