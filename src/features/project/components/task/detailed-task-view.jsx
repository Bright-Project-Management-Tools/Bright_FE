import TabGroup from '@/components/general/tab-group';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import { Pencil } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import tinycolor from 'tinycolor2';

import { TASK_DETAILED_TABS } from '../../assets/values';
import { Task } from '../../utils/class';
import { MemberList } from '../member-list';
import { AttachmentList } from './detailed-task-view/attachment-list';
import { TaskDiscussion } from './detailed-task-view/task-discussion';
import { TaskTodos } from './detailed-task-view/task-todos';
import TaskCreationForm from './task-creation-form';
import { TaskTagCreationForm } from './task-tag-creation-form';

export const DetailedTaskView = ({
    isShowTaskDetailed,
    setIsShowTaskDetailed,
    task,
}) => {
    const [isOpenTashTagCreationForm, setIsOpenTaskTagCreationForm] =
        useState(false);
    const [tagList, setTagList] = useState(task.tags);
    const [isReloadInnerTabs, setIsReloadInnerTabs] = useState(false);
    const [tabSelectedIndex, setTabSelectedIndex] = useState(0);
    const [isShowTaskEditForm, setIsShowTaskEditForm] = useState(false);

    const task_detail_views = [
        <TaskDiscussion
            isReload={isReloadInnerTabs}
            onReloadTrigger={setIsReloadInnerTabs}
        />,
        <TaskTodos />,
        <AttachmentList
            isReload={isReloadInnerTabs}
            onReloadTrigger={setIsReloadInnerTabs}
        />,
    ];

    const handleDeleteTag = tagId => {
        // Remove the tag from the tagList
        const newTagList = tagList.filter(tag => tag.id !== tagId);

        // Update the tagList
        setTagList(newTagList);

        // Update the task
        task.removeTag(tagId);

        setIsReloadInnerTabs(true);
    };

    useEffect(() => {
        const tagEntries = Array.from(tagList.entries());

        const lastEntry = tagEntries[tagEntries.length - 1];

        if (typeof lastEntry[1] !== 'string') return;
        const newTag = task.createTagfromString(lastEntry[1]);

        // remove the last entry from the tagList
        tagList.pop();

        // Update the new tagList
        setTagList([...tagList, newTag]);

        // Update the task
        task.addTag(newTag);

        setIsReloadInnerTabs(true);
    }, [tagList]);

    return (
        <Sheet open={isShowTaskDetailed} onOpenChange={setIsShowTaskDetailed}>
            {isShowTaskEditForm && (
                <TaskCreationForm
                    isCreateNewTask={isShowTaskEditForm}
                    isOpen={isShowTaskEditForm}
                    onOpenChange={setIsShowTaskEditForm}
                    isInEditView={true}
                    taskToBeEditted={task}
                />
            )}
            <SheetContent className="flex h-full flex-col pt-10">
                <SheetHeader>
                    <SheetTitle className="flex items-center justify-between text-2xl font-bold">
                        <div>{task.title}</div>
                        <div>
                            <Button
                                variant="ghost"
                                className="flex gap-2 text-foreground"
                                onClick={() => setIsShowTaskEditForm(true)}
                            >
                                {'Edit'}
                                <Pencil className="h-4 w-4" />
                            </Button>
                        </div>
                    </SheetTitle>
                    <SheetDescription className="text-md">
                        {task.des}
                    </SheetDescription>
                </SheetHeader>

                {/* Headers */}
                <div className="mt-3 flex flex-1 flex-col gap-4 text-sm">
                    {/* task brief */}
                    <div className="flex items-center gap-11">
                        {'Assignee'}
                        <MemberList width={6} height={6} />
                    </div>

                    <div className="flex items-center gap-12">
                        {'Timeline'}
                        <div className="font-semibold text-gray-500">
                            {`${format(task.startDate, 'MM/dd/yyyy')}`}{' '}
                            {task.endDate &&
                                `- ${format(task.endDate, 'MM/dd/yyyy')}`}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {'Tags'}
                        <div className="ml-16 flex flex-wrap gap-2">
                            {tagList &&
                                tagList.map(tag => (
                                    <DropdownMenu key={tag.id}>
                                        <DropdownMenuTrigger>
                                            <Badge
                                                key={tag.id}
                                                className={`mr-1 h-6`}
                                                style={{
                                                    backgroundColor: tinycolor(
                                                        tag.color
                                                    ).lighten(50),
                                                    color: tinycolor(tag.color),
                                                }}
                                            >
                                                {tag.title}
                                            </Badge>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-44">
                                            <DropdownMenuItem
                                                className="text-red-400 hover:text-red-400"
                                                onClick={() =>
                                                    handleDeleteTag(tag.id)
                                                }
                                            >
                                                {'Delete'}
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ))}

                            <Plus
                                className="h-6 w-6 rounded-md bg-plus_background p-1.5 text-plus_text hover:cursor-pointer hover:bg-plus_background_hover hover:text-plus_text_hover"
                                onClick={() => {
                                    setIsOpenTaskTagCreationForm(true);
                                }}
                            />
                        </div>
                    </div>

                    {/* Inner tabs */}
                    <TabGroup
                        tableNames={TASK_DETAILED_TABS}
                        selected={tabSelectedIndex}
                        setSelected={setTabSelectedIndex}
                    />

                    <div className="mb-2 h-full flex-1">
                        {task_detail_views[tabSelectedIndex]}
                    </div>
                </div>

                {isOpenTashTagCreationForm && (
                    <TaskTagCreationForm
                        isOpen={isOpenTashTagCreationForm}
                        onOpenChange={setIsOpenTaskTagCreationForm}
                        labelTitle={'Add new tag'}
                        tagList={tagList}
                        setTagList={setTagList}
                    />
                )}
            </SheetContent>
        </Sheet>
    );
};

DetailedTaskView.propTypes = {
    isShowTaskDetailed: PropTypes.bool,
    setIsShowTaskDetailed: PropTypes.func,
    task: PropTypes.instanceOf(Task),
};
