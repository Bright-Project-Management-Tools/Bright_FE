import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ListTodo, Plus } from 'lucide-react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import { Column, Task } from '../../utils/class';
import { TaskContainer } from '@/features/project/components/task/task-container';
import TaskCreationForm from '@/features/project/components/task/task-creation-form';
import { ColumnDropdownMenu } from './column-action-list';

interface ColumnContainerProps {
    col: Column;
    deleteColumn: (id: string) => void;
    taskList?: Task[];
    updateColumnTitle: (id: string, title: string) => void;
    createTask: (colId: string, task: Task) => void;
}

export function ColumnContainer({
    col,
    deleteColumn,
    taskList = [],
    updateColumnTitle,
    createTask,
}: ColumnContainerProps) {
    const [isCreateNewTask, setIsCreateNewTask] = useState(false);

    const taskId = useMemo(() => taskList.map(task => task.id), [taskList]);

    // Drag n Drop handler
    const {
        setNodeRef,
        attributes,
        transform,
        transition,
        listeners,
        isDragging,
    } = useSortable({
        id: col.id,
        data: {
            type: 'Column',
            col,
        },
    });

    const style: React.CSSProperties = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    // On drag placeholder
    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                className="mb-1 h-auto w-fit overflow-hidden rounded-md bg-gray-800/20"
                style={style}
            >
                <div>
                    <Button className="w-80 bg-transparent">
                        <div className="flex items-center font-bold" />
                    </Button>
                </div>

                <div className="mt-1 h-[70vh] w-80 rounded-md bg-transparent"></div>
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            className="mb-1 h-auto w-fit rounded-md text-black"
            style={style}
        >
            <div {...attributes} {...listeners}></div>
            <div>
                <div className="bg-card text-foreground flex w-80 max-w-80 justify-between overflow-hidden rounded-md border p-3.5 text-xs">
                    <div className="flex items-center font-bold">
                        <ListTodo className="mr-1 h-4 w-4" />
                        <span className="mr-1 max-w-36 truncate">
                            {col.title}
                        </span>
                        ({taskList ? taskList.length : 0})
                    </div>

                    {/* Helper buttons */}
                    <div className="flex items-center">
                        <Plus
                            className="mr-2 h-5 w-5 hover:rounded-md hover:bg-slate-300/50 dark:hover:bg-slate-600"
                            onClick={() => {
                                setIsCreateNewTask(true);
                            }}
                        />

                        <ColumnDropdownMenu
                            id={col.id}
                            deleteColumn={deleteColumn}
                            updateColumnTitle={updateColumnTitle}
                        />
                    </div>
                </div>
            </div>

            <div>
                <OverlayScrollbarsComponent
                    element="div"
                    options={{ scrollbars: { autoHide: 'move' } }}
                    defer
                >
                    {/* Task Containers */}
                    <div className="mt-1 h-[70vh] w-80 rounded-md">
                        <SortableContext items={taskId}>
                            {taskList &&
                                taskList.map((task, index) => (
                                    <div key={index}>
                                        <TaskContainer task={task} />
                                    </div>
                                ))}
                        </SortableContext>
                    </div>
                </OverlayScrollbarsComponent>

                {isCreateNewTask && (
                    <TaskCreationForm
                        isOpen={isCreateNewTask}
                        onOpenChange={setIsCreateNewTask}
                        createTask={createTask}
                        colId={col.id}
                    />
                )}
            </div>
        </div>
    );
}
