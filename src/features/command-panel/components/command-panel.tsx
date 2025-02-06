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
  const location = useLocation()

  // Only enable on pages not in landing or auth routes
  const isEnabled = !/^(\/(auth|landing)?)/.test(location.pathname)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (isEnabled && e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(prev => !prev)
        setNestedCommands(null) // always start from top level when opening
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [isEnabled])

  // Handle selection of a command item
  const handleSelect = (item: CommandType) => {
    if (item.children) {
      setNestedCommands(item.children)
    } else if (item.title.toLowerCase() === "back") {
      setNestedCommands(null)
    } else {
      if (item.action) item.action()
      setOpen(false)
      setNestedCommands(null)
    }
  }

  // Since mobile isn't supported, we only check for a Mac desktop.
  const isMac = typeof window !== "undefined" && /Mac/.test(navigator.platform)
  const modKey = isMac ? "⌘" : "Ctrl"

  if (!open) return null

  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {nestedCommands
          ? (
            // Render nested view as a flat list
            nestedCommands.map((item, index) => (
              <CommandItem
                key={index}
                disabled={item.disabled}
                onSelect={() => handleSelect(item)}
              >
                {item.icon || null}
                <span>{item.title}</span>
              </CommandItem>
            ))
          )
          : (
            // Render grouped top-level commands
            Object.entries(commandData).map(
              ([groupName, items], groupIndex, groups) => (
                <React.Fragment key={groupName}>
                  <CommandGroup heading={groupName}>
                    {(items as CommandType[]).map((item) => (
                      <CommandItem
                        key={item.title}
                        disabled={item.disabled}
                        onSelect={() => handleSelect(item)}
                      >
                        {item.icon || null}
                        <span>{item.title}</span>
                        {item.shortcut && (
                          <CommandShortcut>{modKey + item.shortcut}</CommandShortcut>
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  {groupIndex < groups.length - 1 && <CommandSeparator />}
                </React.Fragment>
              )
            )
          )
        }
      </CommandList>
    </Command>
  )
}
