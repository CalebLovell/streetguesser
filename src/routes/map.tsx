import 'mapbox-gl/dist/mapbox-gl.css'

import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import { createFileRoute } from '@tanstack/react-router'
import { MapControls, LayerOption } from '../components/MapControls'
import { LocationSearch } from '../components/LocationSearch'
import { MapAbout } from '../components/MapAbout'

// Initialize MapBox with env token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

export const Route = createFileRoute('/map')({
  component: MapPage,
})

function MapPage() {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [lng, setLng] = useState(-74.006)
  const [lat, setLat] = useState(40.7128)
  const [zoom, setZoom] = useState(12)
  const [layers, setLayers] = useState<LayerOption[]>([
    { id: 'highway', label: 'Highways', layerId: 'road-motorway-trunk', checked: true },
    { id: 'major-roads', label: 'Major Roads', layerId: 'road-primary-secondary', checked: true },
    { id: 'minor-roads', label: 'Minor Roads', layerId: 'road-street', checked: true },
    { id: 'paths', label: 'Paths & Trails', layerId: 'road-path', checked: true },
  ])

  // Handle layer toggling
  const handleLayerToggle = (layerId: string, checked: boolean) => {
    // Update local state
    setLayers(prev => 
      prev.map(layer => 
        layer.layerId === layerId ? { ...layer, checked } : layer
      )
    )
    
    // Update map if it exists
    if (map.current) {
      const visibility = checked ? 'visible' : 'none'
      
      // For complex layer patterns, using a regex pattern to match similar layers
      if (layerId === 'road-motorway-trunk') {
        map.current.setLayoutProperty('road-motorway-trunk', 'visibility', visibility)
        map.current.setLayoutProperty('road-motorway-trunk-case', 'visibility', visibility)
      } else if (layerId === 'road-primary-secondary') {
        map.current.setLayoutProperty('road-primary', 'visibility', visibility)
        map.current.setLayoutProperty('road-primary-case', 'visibility', visibility)
        map.current.setLayoutProperty('road-secondary-tertiary', 'visibility', visibility)
        map.current.setLayoutProperty('road-secondary-tertiary-case', 'visibility', visibility)
      } else if (layerId === 'road-street') {
        map.current.setLayoutProperty('road-street', 'visibility', visibility)
        map.current.setLayoutProperty('road-street-case', 'visibility', visibility)
      } else if (layerId === 'road-path') {
        map.current.setLayoutProperty('road-path', 'visibility', visibility)
        map.current.setLayoutProperty('road-path-bg', 'visibility', visibility)
      }
    }
  }

  // Handle location change from search or manual input
  const handleLocationChange = ({ lng: newLng, lat: newLat, zoom: newZoom }: { lng: number; lat: number; zoom?: number }) => {
    if (map.current) {
      map.current.flyTo({
        center: [newLng, newLat],
        zoom: newZoom !== undefined ? newZoom : map.current.getZoom(),
        essential: true
      })
    }
  }

  useEffect(() => {
    // Avoid duplicating the map
    if (map.current) return

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    })

    // Set up event handlers
    map.current.on('move', () => {
      if (map.current) {
        const center = map.current.getCenter()
        setLng(Number(center.lng.toFixed(4)))
        setLat(Number(center.lat.toFixed(4)))
        setZoom(Number(map.current.getZoom().toFixed(2)))
      }
    })

    // Wait for map to load before managing layers
    map.current.on('load', () => {
      // Initially set the visibility of all layers based on their default state
      layers.forEach(layer => {
        if (!layer.checked) {
          handleLayerToggle(layer.layerId, false)
        }
      })
    })

    // Clean up the map when component unmounts
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  return (
    <div className="max-w-full p-6">
      <div className="flex flex-col gap-6">
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-orange-700">Street Map Explorer</h2>
            <p className="text-orange-600 mt-1">Interactive map showing streets and geography around New York City</p>
          </div>
        </div>
        
        {/* Map interface section */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left side with map and about section */}
          <div className="flex-1 order-1 space-y-6">
            {/* Map container */}
            <div className="bg-orange-50 rounded-xl border border-orange-200 overflow-hidden">
              <div 
                ref={mapContainer} 
                className="w-full h-[600px]"
              />
            </div>
            
            {/* About section - only under the map */}
            <MapAbout />
          </div>
          
          {/* Right column - search and controls on mobile, right on desktop */}
          <div className="lg:w-96 space-y-6 order-2">
            {/* Location search component */}
            <LocationSearch 
              coordinates={{ lng, lat, zoom }}
              onLocationChange={handleLocationChange}
            />
            
            {/* Map controls component */}
            <MapControls 
              layers={layers}
              onLayerToggle={handleLayerToggle}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
