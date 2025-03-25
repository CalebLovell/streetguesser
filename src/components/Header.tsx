import * as React from 'react'
import { Link } from '@tanstack/react-router'

export function Header() {
  return (
    <header className="bg-orange-200 border-b border-orange-300">
      <div className="max-w-full px-6">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-orange-800">MapExplorer</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-orange-800 bg-white hover:bg-orange-50 border border-orange-200 rounded-md transition-colors">
              Log in
            </button>
            <button className="px-4 py-2 text-sm font-medium text-orange-50 bg-orange-500 hover:bg-orange-400 border border-orange-300 rounded-md transition-colors">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
