import React from 'react'
import {
  MousePointer,
  Globe,
  Layout,
  Activity,
  ZoomIn,
  Sun,
  Database,
} from 'lucide-react'

// Dummy action functions (also reusing dev-dock functions)
const toggleSelectionMode = () => console.log('Toggled selection mode')
const setLanguage = (lang: string) => console.log(`Language set to ${lang}`)
const toggleTheme = () => console.log('Theme toggled')
const changeDataView = () => console.log('Data view changed')
const showDimensions = () => console.log('Displaying dimensions')
const reloadPerformance = () => window.location.reload()
const showZoomLevel = () => console.log('Showing zoom level')

export const commandData = {
  Developer: [
    {
      title: "Toggle Selection Mode",
      icon: <MousePointer className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      shortcut: "S",
      action: toggleSelectionMode,
    },
    {
      title: "Select Language",
      icon: <Globe className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      shortcut: "L",
      children: [
        {
          title: "English",
          action: () => setLanguage("English"),
        },
        {
          title: "Spanish",
          action: () => setLanguage("Spanish"),
        },
        {
          title: "French",
          action: () => setLanguage("French"),
        },
        {
          title: "Back",
          action: () => {}, // Handled in the panel via title check
        },
      ],
    },
    {
      title: "Show Dimensions",
      icon: <Layout className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      shortcut: "D",
      action: showDimensions,
    },
  ],
  System: [
    {
      title: "Reload Performance",
      icon: <Activity className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      shortcut: "R",
      action: reloadPerformance,
    },
    {
      title: "Zoom Level",
      icon: <ZoomIn className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      shortcut: "Z",
      action: showZoomLevel,
    },
  ],
  Appearance: [
    {
      title: "Toggle Theme",
      icon: <Sun className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      shortcut: "T",
      action: toggleTheme,
    },
    {
      title: "Change Data View",
      icon: <Database className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      shortcut: "V",
      action: changeDataView,
    },
  ],
}
// ...existing code if any...
