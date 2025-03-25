import * as React from 'react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-orange-200 border-t border-orange-300 text-orange-800">
      <div className="max-w-full px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-orange-700">
            &copy; {currentYear} MapExplorer. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-orange-600 hover:text-orange-900 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-orange-600 hover:text-orange-900 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-orange-600 hover:text-orange-900 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
