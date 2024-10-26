import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@components/ui/sidebar';
import {
  ArrowRight,
  Bell,
  Cable,
  ChevronDown,
  ChevronUp,
  Circle,
  CircleUser,
  Gem,
  HelpCircle,
  Home,
  Inbox,
  Layers2,
  Newspaper,
  PanelsTopLeft,
  Plus,
  Quote,
  UserCircle,
} from 'lucide-react';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/user/dashboard',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '/user/inbox',
    icon: Inbox,
  },
  {
    title: 'Projects',
    url: '/user/project',
    icon: PanelsTopLeft,
  },
  {
    title: 'Notifications',
    url: '/user/notification',
    icon: Bell,
  },
];

const itemsHelp = [
  {
    title: 'Help',
    url: '#',
    icon: HelpCircle,
  },
  {
    title: 'Support',
    url: '#',
    icon: Cable,
  },
];

const itemsAbout = [
  {
    title: 'About Us',
    url: '#',
    icon: Quote,
  },
  {
    title: 'Subscription',
    url: '#',
    icon: Gem,
  },
  {
    title: "What's New",
    url: '#',
    icon: Newspaper,
  },
];

const listOfProjects = [
  {
    title: 'Bright',
    url: '#',
    icon: Plus,
  },
  {
    title: 'Eternal',
    url: '#',
    icon: Plus,
  },
  {
    title: 'Hive',
    url: '#',
    icon: Plus,
  },
];

// Define the type for menu items
interface MenuItem {
  title: string;
  url: string;
  icon: any;
}

interface CollapsibleSidebarGroupProps {
  label: string;
  items: MenuItem[];
  actionTitle?: string;
  open?: boolean;
}

const CollapsibleSidebarGroup: React.FC<CollapsibleSidebarGroupProps> = ({
  label,
  items,
  open,
}) => (
  <Collapsible defaultOpen className="group/collapsible">
    <SidebarGroup>
      <SidebarGroupLabel asChild>
        <CollapsibleTrigger>
          {label}
          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
        </CollapsibleTrigger>
      </SidebarGroupLabel>
      <CollapsibleContent>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item, index) => {
              const key = `${item.title}-${index}`;
              if (item.title === 'Projects') {
                return (
                  <Collapsible key={key} defaultOpen className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <div className="flex">
                          <SidebarMenuButton asChild>
                            <NavLink to={item.url}>
                              <item.icon />
                              <span>{item.title}</span>
                            </NavLink>
                          </SidebarMenuButton>

                          {item.title === 'Projects' && open && (
                            <button
                              onClick={(e: any) => {
                                e.stopPropagation();
                                console.log('ok');
                              }}
                            >
                              <Plus className="ml-auto h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {listOfProjects.map(project => (
                            <SidebarMenuSubItem key={project.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={project.url}>
                                  <span>{project.title}</span>
                                  <ArrowRight className="ml-auto" />
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              } else {
                return (
                  <SidebarMenuItem key={key}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className="flex items-center gap-4"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </CollapsibleContent>
    </SidebarGroup>
  </Collapsible>
);

export function AppSidebar({ setOpen, open }: { setOpen: any; open: boolean }) {
  const [shouldCheckMousePosition, setShouldCheckMousePosition] = React.useState(false);
  const sidebarWidth = 14 * parseFloat(getComputedStyle(document.documentElement).fontSize);

  const handleMouseMove = (event: MouseEvent) => {
    if (event.clientX > sidebarWidth) {
      setOpen(false);
      setShouldCheckMousePosition(false);
      return
    }

    setOpen(true);
  };

  useEffect(() => {
    if (!shouldCheckMousePosition) {
      window.removeEventListener('mousemove', handleMouseMove);
      return;
    }

    // Add mouse move event listener
    window.addEventListener('mousemove', handleMouseMove);
  }, [shouldCheckMousePosition]);

  return (
    <Sidebar
      collapsible="icon"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setShouldCheckMousePosition(true);
      }}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="py-6 text-base">
                  <Layers2 />
                  Workspace
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Zen Bright</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Tutur3u</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <CollapsibleSidebarGroup
          label="Project Management"
          items={items}
          actionTitle="Add Project"
          open={open}
        />
        <CollapsibleSidebarGroup label="Help" items={itemsHelp} />
        <CollapsibleSidebarGroup label="About" items={itemsAbout} />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <UserCircle /> Mudoker
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
                close={!open}
              >
                <DropdownMenuItem>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <NavLink to={`/user/settings`}>
                    <span className="text-base">{'Settings'}</span>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
