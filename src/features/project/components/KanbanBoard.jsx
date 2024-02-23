import {Button} from '@/components/ui/button';
import {PlusCircle} from 'lucide-react';
import {useState} from 'react';
import {Column, Task} from '../utils/class';
import {ColumnContainer} from './column/ColumnContainer';
import {DndContext, DragOverlay, useSensors, useSensor, PointerSensor} from '@dnd-kit/core';
import {SortableContext, arrayMove} from '@dnd-kit/sortable';
import {useMemo} from 'react';
import {createPortal} from 'react-dom';
import {TaskContainer} from './task/TaskContainer';

export const KanbanBoard = () => {
  const [columns, setColumn] = useState([]);
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [tasks, setTaskList] = useState([]);

  const columnId = useMemo(() => columns.map((col) => col.id), [columns]);

  // Only trigger drag event on desired distance
  const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          distance: 3,
        },
      }),
  );

  // Columns
  const createColumn = () => {
    const newColumn = new Column('TODO');
    setColumn([...columns, newColumn]);
  };

  const deleteColumn = (id) => {
    const filteredColumn = columns.filter((col) => col.id !== id);
    setColumn(filteredColumn);
  };

  const updateColumnTitle = (id, title) => {
    const updatedColumn = columns.map((col) => {
      if (col.id !== id) {
        return col;
      }
      col.title = title;
      return col;
    });

    setColumn(updatedColumn);
  };

  // Event Handlers
  const handleDragStart = (event) => {
    // On move column
    if (event.active.data.current.type === 'Column') {
      setActiveColumn(event.active.data.current.col);
    }

    // On move task
    if (event.active.data.current.type === 'Task') {
      setActiveTask(event.active.data.current.task);
    }
  };

  const handleDragEnd = (event) => {
    // Reset states
    setActiveTask(null);
    setActiveColumn(null);

    const {active, over} = event;

    if (!over) return;

    const {id: activeColumnId} = active;
    const {id: overColumnId} = over;

    if (activeColumnId === overColumnId) return;

    setColumn((column) => {
      const activeIndex = column.findIndex((col) => col.id === activeColumnId);
      const overIndex = column.findIndex((col) => col.id === overColumnId);

      // Check if both indexes are valid
      if (activeIndex !== -1 && overIndex !== -1) {
        return arrayMove(column, activeIndex, overIndex);
      }
      return column; // Return the original array if indexes are invalid
    });
  };

  const handleDragOver = (event) => {
    const {active, over} = event;

    if (!over || !active || active.id === over.id) return;

    const {id: activeTaskId} = active;
    const {id: overTaskId} = over;

    const isTaskActive = active.data.current.type === 'Task';
    const isOverTask = over.data.current.type === 'Task';
    const isOverColumn = over.data.current.type === 'Column';

    if (!isTaskActive) return;

    setTaskList((tasks) => {
      const activeIndex = tasks.findIndex((t) => t.id === activeTaskId);

      if (isOverTask) {
        const overIndex = tasks.findIndex((t) => t.id === overTaskId);
        tasks[activeIndex].columnId = tasks[overIndex].columnId;
        return arrayMove(tasks, activeIndex, overIndex);
      }

      if (isOverColumn) {
        tasks[activeIndex].columnId = overTaskId;
      }

      return arrayMove(tasks, activeIndex, activeIndex);
    });
  };

  // Tasks
  const createTask = (colId) => {
    const newTask = new Task(colId, 'Code DashBoard UI', 'Follow design on figma');
    setTaskList([...tasks, newTask]);
  };

  return (
    <div className="mt-2 overflow-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent scrollbar-thumb-rounded-lg">
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        sensors={sensors}
      >
        <div className={`flex ${columns.length === 0 ? 'gap-0 px-4' : 'gap-3'} mb-2`}>
          <div className='flex gap-3'>
            <SortableContext items={columnId}>
              {columns.map((col, index) => (
                <div key={index}>
                  <ColumnContainer
                    key={col.id}
                    col={col}
                    deleteColumn={deleteColumn}
                    updateColumnTitle={updateColumnTitle}
                    createTask={createTask}
                    taskList={tasks.filter((task) => task.columnId === col.id)}
                  />
                </div>
              ))}
            </SortableContext>
          </div>

          <Button onClick={createColumn}>
            <PlusCircle className='mr-2'/> Create new column
          </Button>
        </div>

        {createPortal(
            <DragOverlay >
              {activeColumn && (
                <ColumnContainer
                  col={activeColumn}
                  deleteColumn={deleteColumn}
                  taskList={tasks.filter((task) => task.columnId === activeColumn.id)}
                />
              )}

              {activeTask && (
                <TaskContainer task={activeTask}/>
              )}
            </DragOverlay>,
            document.body,
        )}
      </DndContext>
    </div>
  );
};
