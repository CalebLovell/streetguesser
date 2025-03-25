import 'mapbox-gl/dist/mapbox-gl.css'

import * as React from 'react'

import { createFileRoute } from '@tanstack/react-router'
import mapboxgl from 'mapbox-gl'

export const Route = createFileRoute('/map')({
  component: MapPage,
})

function MapPage() {
  const mapContainer = React.useRef<HTMLDivElement>(null)
  const map = React.useRef<mapboxgl.Map | null>(null)
  // New York City coordinates as an example
  const [lng, setLng] = React.useState(-74.006)
  const [lat, setLat] = React.useState(40.7128)
  const [zoom, setZoom] = React.useState(12)

  React.useEffect(() => {
    // Initialize MapBox only once when component mounts
    if (map.current) return

    // Use environment variable for MapBox access token
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoicmVwbGFjZXdpdGh5b3VydG9rZW4iLCJhIjoiY2xhc2lkIn0.Y291aDIsZmFrZXRva2Vu'
    
    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
      })

      // Add navigation controls (zoom, rotation)
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

      // Update state when map moves
      map.current.on('move', () => {
        if (map.current) {
          setLng(parseFloat(map.current.getCenter().lng.toFixed(4)))
          setLat(parseFloat(map.current.getCenter().lat.toFixed(4)))
          setZoom(parseFloat(map.current.getZoom().toFixed(2)))
        }
      })
    }

    // Clean up the map when component unmounts
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-amber-50
    ">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          {/* Header section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Street Map Explorer</h2>
              <p className="text-gray-600 mt-1">Interactive map showing streets and geography around New York City</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-3 flex items-center gap-4 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-500">Longitude</span>
                <span className="font-medium text-indigo-600">{lng}</span>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-gray-500">Latitude</span>
                <span className="font-medium text-indigo-600">{lat}</span>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-gray-500">Zoom</span>
                <span className="font-medium text-indigo-600">{zoom}</span>
              </div>
            </div>
          </div>
          
          {/* Map container */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div 
              ref={mapContainer} 
              className="w-full h-[600px]"
            />
          </div>
          
          {/* Information card */}
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">About This Map</h3>
            <p className="text-gray-600">
              This interactive map displays the streets and geography around New York City. You can pan, zoom, and explore the area.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
