import * as React from 'react'
import { Outlet } from '@tanstack/react-router'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      <Header />
      <div className="flex flex-1 h-full">
        <Sidebar />
        <main className="flex-1 overflow-auto border-l border-orange-100">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
