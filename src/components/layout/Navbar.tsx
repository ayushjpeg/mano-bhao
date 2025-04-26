// src/components/layout/Navbar.tsx

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"

export default function Navbar() {
  return (
    <header className="border-b px-6 py-4 dark:bg-zinc-900">
      <NavigationMenu>
        <NavigationMenuList className="flex space-x-6 text-sm">
          <NavigationMenuItem>
            <NavigationMenuLink href="/video" className="font-medium text-white">Video</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/text" className="text-zinc-400">Text</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
