import React from "react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { commandData } from "../data/data"

type CommandType = {
  title: string
  icon?: JSX.Element
  shortcut?: string
  action?: () => void
  children?: CommandType[]
  disabled?: boolean
}

export const CommandPanel: React.FC = () => {
  const [open, setOpen] = React.useState(false)
  const [nestedCommands, setNestedCommands] = React.useState<CommandType[] | null>(null)
  const [showAll, setShowAll] = React.useState(false)
  const location = useLocation()

  // Retrieve current selections from Redux and localStorage.
  const currentTheme = useSelector((state: any) => state.currentTheme.value)
  const currentDataView = useSelector((state: any) => state.dataViewMode.current)
  const [language, setLanguage] = React.useState(localStorage.getItem("devLanguage") || "EN")
  // New: Manage selection mode state.
  const [selectionMode, setSelectionMode] = React.useState(localStorage.getItem("selectionMode") === 'true')

  // Listen for custom events.
  React.useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      setLanguage(e.detail)
    }
    window.addEventListener("languageChanged", handleLanguageChange as EventListener)
    return () => {
      window.removeEventListener("languageChanged", handleLanguageChange as EventListener)
    }
  }, [])

  // Listen for selection mode changes.
  React.useEffect(() => {
    const handleSelectionModeChange = (e: CustomEvent) => {
      setSelectionMode(e.detail)
    }
    window.addEventListener("selectionModeChanged", handleSelectionModeChange as EventListener)
    return () => {
      window.removeEventListener("selectionModeChanged", handleSelectionModeChange as EventListener)
    }
  }, [])

  // Only enable on pages not in landing or auth routes.
  const isEnabled = !/^(\/(auth|landing)?)/.test(location.pathname)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (isEnabled && e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(prev => !prev)
        setNestedCommands(null)
        setShowAll(false)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [isEnabled])

  // New: Toggle selection mode function.
  const toggleSelectionMode = () => {
    setSelectionMode(prev => {
      const newMode = !prev;
      localStorage.setItem("selectionMode", String(newMode));
      window.dispatchEvent(new CustomEvent("selectionModeChanged", { detail: newMode }));
      return newMode;
    });
  };

  // New: Implement selection mode visual logic.
  React.useEffect(() => {
    if (!selectionMode) return;
    const highlighter = document.createElement("div");
    // Set initial styles for the highlighter.
    highlighter.style.position = "absolute";
    highlighter.style.pointerEvents = "none";
    highlighter.style.border = "2px dashed rgba(0, 123, 255, 0.8)";
    highlighter.style.backgroundColor = "rgba(0, 123, 255, 0.2)";
    highlighter.style.transition = "all 0.1s ease";
    document.body.appendChild(highlighter);

    const handleMouseEnter = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      highlighter.style.width = rect.width + "px";
      highlighter.style.height = rect.height + "px";
      highlighter.style.left = (rect.left + window.scrollX) + "px";
      highlighter.style.top = (rect.top + window.scrollY) + "px";
      highlighter.style.zIndex = "9999";
    };

    const handleMouseLeave = () => {
      highlighter.style.width = "0";
      highlighter.style.height = "0";
    };

    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      document.body.removeChild(highlighter);
    };
  }, [selectionMode]);

  const handleSelect = (item: CommandType) => {
    if (item.title === "Toggle Selection Mode") {
      toggleSelectionMode();
      setOpen(false);
      setNestedCommands(null);
      return;
    } else if (item.children) {
      setNestedCommands(item.children)
    } else if (item.title.toLowerCase() === "back") {
      setNestedCommands(null)
    } else if (item.title === "Show More") {
      setShowAll(true)
    } else {
      item.action && item.action()
      setOpen(false)
      setNestedCommands(null)
    }
  }

  // Helper: for selection-based commands, return the current value.
  const getCurrentSelection = (title: string) => {
    if (title === "Toggle Theme") return currentTheme
    if (title === "Select Language") return language
    if (title === "Change Data View") return currentDataView
    if (title === "Toggle Selection Mode") return selectionMode ? "ON" : "OFF"
    return null
  }

  // Prepare a flattened list (in order) from all groups.
  const flattenedCommands = React.useMemo(() => {
    const order = ["Common", "Developer", "System", "Appearance"]
    const list: CommandType[] = []
    order.forEach((group) => {
      const cmds = commandData[group as keyof typeof commandData] || []
      list.push(...cmds)
    })
    return list
  }, [])

  // Limit to first 7 items if not showing all.
  const displayCommands = !showAll && !nestedCommands ? flattenedCommands.slice(0, 7) : null

  const isMac = typeof window !== "undefined" && /Mac/.test(navigator.platform)
  const modKey = isMac ? "⌘" : "Ctrl"

  if (!open) return null

  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {nestedCommands ? (
          // Render nested commands view.
          nestedCommands.map((item, index) => (
            <CommandItem key={index} disabled={item.disabled} onSelect={() => handleSelect(item)}>
              {item.icon || null}
              <span>{item.title}</span>
              {getCurrentSelection(item.title) && (
                <span className="ml-auto text-xs text-muted-foreground">
                  {getCurrentSelection(item.title)}
                </span>
              )}
            </CommandItem>
          ))
        ) : displayCommands ? (
          // Render flattened view with limited items plus "Show More".
          <>
            {displayCommands.map((item, index) => (
              <CommandItem key={index} disabled={item.disabled} onSelect={() => handleSelect(item)}>
                {item.icon || null}
                <span>{item.title}</span>
                {item.shortcut && (
                  <CommandShortcut>{modKey + item.shortcut}</CommandShortcut>
                )}
                {getCurrentSelection(item.title) && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    {getCurrentSelection(item.title)}
                  </span>
                )}
              </CommandItem>
            ))}
            {flattenedCommands.length > 7 && (
              <CommandItem onSelect={() => handleSelect({ title: "Show More" })}>
                <span>Show More</span>
              </CommandItem>
            )}
          </>
        ) : (
          // Render grouped view.
          Object.entries(commandData).map(
            ([groupName, items], groupIndex, groups) => (
              <React.Fragment key={groupName}>
                <CommandGroup heading={groupName}>
                  {(items as CommandType[]).map((item) => (
                    <CommandItem key={item.title} disabled={item.disabled} onSelect={() => handleSelect(item)}>
                      {item.icon || null}
                      <span>{item.title}</span>
                      {item.shortcut && (
                        <CommandShortcut>{modKey + item.shortcut}</CommandShortcut>
                      )}
                      {getCurrentSelection(item.title) && (
                        <span className="ml-auto text-xs text-muted-foreground">
                          {getCurrentSelection(item.title)}
                        </span>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
                {groupIndex < groups.length - 1 && <CommandSeparator />}
              </React.Fragment>
            )
          )
        )}
      </CommandList>
    </Command>
  )
}
