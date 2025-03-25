import * as React from 'react'
import { Link } from '@tanstack/react-router'

export function Sidebar() {
  return (
    <aside className="w-64 bg-orange-100 h-screen sticky top-0 border-r border-orange-200 flex-shrink-0">
      <div className="p-4 h-full overflow-y-auto">
        <h2 className="text-lg font-semibold text-orange-800 mb-6">Navigation</h2>
        <nav className="space-y-2">
          <NavLink to="/" exact>Home</NavLink>
          <NavLink to="/map">Map</NavLink>
          <NavLink to="/posts">Posts</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/route-a">Pathless Layout</NavLink>
          <NavLink to="/deferred">Deferred</NavLink>
        </nav>
      </div>
    </aside>
  )
}

interface NavLinkProps {
  to: string
  children: React.ReactNode
  exact?: boolean
}

function NavLink({ to, children, exact }: NavLinkProps) {
  return (
    <Link
      to={to}
      activeProps={{
        className: 'bg-orange-300 text-orange-900 font-medium',
      }}
      activeOptions={exact ? { exact: true } : undefined}
      className="block px-4 py-2 text-orange-700 hover:bg-orange-200 rounded-md transition-colors"
    >
      {children}
    </Link>
  )
}
