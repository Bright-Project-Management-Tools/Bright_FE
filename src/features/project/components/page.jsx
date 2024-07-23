import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  CircleDot,
  Heart,
  Settings,
  ShieldMinus,
  UserRoundPlus,
} from 'lucide-react';
import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';

import Divider from '../../../components/general/divider';
import BoardTabGroup from '../../../components/general/tab-group';
import { UnderDevDialog } from '../../../components/general/under-development-dialog';
import { SYSTEM_ALERT } from '../../../config/constants/strings.global';
import ProjectBreadCrumbs from './breadcrumbs';
import { KanbanBoard } from './kanban-board';
import { MemberList } from './member-list';

export const Page = () => {
  const [isFavoured, setFavourite] = useState(false);
  const [isUnderDevDialogOpen, setIsUnderDevDialogOpen] = useState(false);
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);

  return (
    <div className="px-2 py-1 w-full h-dvh overflow-auto">
      <div className="px-4">
        {/* Project Headers */}
        <ProjectBreadCrumbs projectType="SOFTWARE" projectOwner="MUDOKER" />

        {/* Title + Util Buttons */}
        <div className=" flex justify-between items-center">
          <h1 className="text-4xl font-bold text-project_text mb-3 mt-4">
            Bright
          </h1>

          <div className="flex gap-4">
            <Button
              className={isFavoured ? 'bg-rose-500 hover:bg-red-500' : ''}
              onClick={() => setFavourite(!isFavoured)}
            >
              <Heart className="mr-2 h-4 w-4" />{' '}
              {isFavoured ? 'Favourred' : 'Favour'}
            </Button>

            <Button
              className="border-black/15"
              variant="outline"
              onClick={() => setIsUnderDevDialogOpen(true)}
            >
              <CircleDot className="mr-2 h-4 w-4" /> Issues
            </Button>

            <Button
              className="border-black/15"
              variant="outline"
              onClick={() => setIsUnderDevDialogOpen(true)}
            >
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Creation Date + Member List + Privacy */}
      <div className="mb-1 flex items-center h-10 gap-4 ">
        {/* Board Tab */}
        <div className="flex items-center pl-4">
          <BoardTabGroup
            selected={selectedTabIdx}
            setSelected={setSelectedTabIdx}
            isUnderDevDialogOpen={isUnderDevDialogOpen}
            setIsUnderDevDialogOpen={setIsUnderDevDialogOpen}
          />
        </div>

        <Divider width="1.5px" height="70%" color="rgba(0,0,0,0.2)" />

        <div className="flex items-center">
          <MemberList width={7} height={7} />

          <Button
            className="h-8 border-black/15"
            variant="outline"
            onClick={() => setIsUnderDevDialogOpen(true)}
          >
            <UserRoundPlus className="h-4" /> Invite
          </Button>
        </div>

        <Divider width="1.5px" height="70%" color="rgba(0,0,0,0.2)" />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="text-rose-500 bg-white border-black/15 hover:bg-slate-200/75 h-8"
              variant="outline"
            >
              <ShieldMinus className="h-4" />
              Private
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold">
                {SYSTEM_ALERT.PRJ_ALT_ACC_TITLE}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {SYSTEM_ALERT.PRJ_ALT_ACC_DES}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => setIsUnderDevDialogOpen(true)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Task Management Board */}
      <KanbanBoard />

      {/* Others */}
      {isUnderDevDialogOpen && (
        <UnderDevDialog
          isOpen={isUnderDevDialogOpen}
          setIsOpen={setIsUnderDevDialogOpen}
        />
      )}
    </div>
  );
};

Page.propTypes = {
  title: PropTypes.string,
};
