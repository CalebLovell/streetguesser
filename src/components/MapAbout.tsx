import * as React from 'react'

interface MapAboutProps {
  title?: string
  description?: string
}

export function MapAbout({ 
  title = "About This Map", 
  description = "This interactive map displays the streets and geography around New York City. You can pan, zoom, and explore the area. Use the controls to customize which road types are displayed and the search bar to find specific locations."
}: MapAboutProps) {
  return (
    <div className="bg-orange-50 p-5 rounded-xl border border-orange-200">
      <h3 className="text-lg font-semibold text-orange-700 mb-2">{title}</h3>
      <p className="text-orange-600">
        {description}
      </p>
    </div>
  )
}
