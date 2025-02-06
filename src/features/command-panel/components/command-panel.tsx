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
  // showAll flag toggles between compact (flattened) view vs. full grouped view
  const [showAll, setShowAll] = React.useState(false)
  const location = useLocation()

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

  const handleSelect = (item: CommandType) => {
    if (item.children) {
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

  // Prepare a flattened list (in order) from all groups
  const flattenedCommands = React.useMemo(() => {
    const order = ["Common", "Developer", "System", "Appearance"]
    const list: CommandType[] = []
    order.forEach((group) => {
      const cmds = commandData[group as keyof typeof commandData] || []
      list.push(...cmds)
    })
    return list
  }, [])

  // Limit to first 7 items if not showing all
  const displayCommands = !showAll && !nestedCommands ? flattenedCommands.slice(0, 7) : null

  // Determine mod key per platform
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
            <CommandItem
              key={index}
              disabled={item.disabled}
              onSelect={() => handleSelect(item)}
            >
              {item.icon || null}
              <span>{item.title}</span>
            </CommandItem>
          ))
        ) : displayCommands ? (
          // Render flattened view with limited items plus a "Show More" option.
          <>
            {displayCommands.map((item, index) => (
              <CommandItem
                key={index}
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
        )}
      </CommandList>
    </Command>
  )
}
