'use client'

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useState, useEffect } from 'react';
import Todo, { TodoProps } from '../todo/Todo';
import { reorderTodos } from '@/actions/todoActions';

interface DraggableTodoListProps {
    initialTodos: TodoProps['todo'][];
}

export default function DraggableTodoList({ initialTodos }: DraggableTodoListProps) {
    const [todos, setTodos] = useState(initialTodos);

    useEffect(() => {
        setTodos(initialTodos);
    }, [initialTodos]);


    const onDragEnd = async (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newTodos = Array.from(todos);
        const [movedTodo] = newTodos.splice(source.index, 1);
        newTodos.splice(destination.index, 0, movedTodo);

        setTodos(newTodos);

        const updates = newTodos.map((todo, index) => ({
            id: todo._id,
            order: index
        }));


        await reorderTodos(updates);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>

            <Droppable droppableId="todo-list">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex flex-col gap-4 w-full"
                    >
                        {todos.map((todo, index) => (
                            <Draggable
                                key={todo._id}
                                draggableId={todo._id}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <Todo todo={todo} />
                                    </div>
                                )}
                            </Draggable>
                        ))}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
