import * as React from 'react'
import { useState } from 'react'

// Spinner component for loading state
function Spinner() {
  return (
    <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin mx-auto"></div>
  )
}

interface CoordinateInfo {
  lng: number
  lat: number
  zoom: number
}

interface LocationSearchProps {
  coordinates: CoordinateInfo
  onLocationChange: (location: { lng: number; lat: number; zoom?: number }) => void
}

export function LocationSearch({ coordinates, onLocationChange }: LocationSearchProps) {
  const [searchInput, setSearchInput] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [manualLng, setManualLng] = useState(coordinates.lng.toString())
  const [manualLat, setManualLat] = useState(coordinates.lat.toString())

  // Function to handle location search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchInput.trim()) return
    
    setIsSearching(true)
    setErrorMessage('')
    
    try {
      // Use MapBox Geocoding API to search for locations
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchInput)}.json?access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`
      )
      
      if (!response.ok) {
        throw new Error('Location search failed')
      }
      
      const data = await response.json()
      
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center
        onLocationChange({ lng, lat, zoom: 12 }) // Default zoom level for new locations
        
        // Update manual input fields
        setManualLng(lng.toString())
        setManualLat(lat.toString())
      } else {
        setErrorMessage('No results found for that location')
      }
    } catch (error) {
      setErrorMessage('Error searching for location')
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  // Function to handle manual coordinate input
  const handleManualCoordinates = (e: React.FormEvent) => {
    e.preventDefault()
    
    const lng = parseFloat(manualLng)
    const lat = parseFloat(manualLat)
    
    if (isNaN(lng) || isNaN(lat)) {
      setErrorMessage('Please enter valid coordinates')
      return
    }
    
    if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
      setErrorMessage('Coordinates out of range')
      return
    }
    
    setErrorMessage('')
    onLocationChange({ lng, lat })
  }

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 w-full h-auto">
      <h3 className="text-lg font-semibold text-orange-800 mb-4">Location Search</h3>
      
      {/* Current coordinates display */}
      <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
        <div className="flex flex-col">
          <span className="text-orange-500">Longitude</span>
          <span className="font-medium text-orange-700">{coordinates.lng}</span>
        </div>
        <div className="h-8 w-px bg-orange-200 hidden sm:block"></div>
        <div className="flex flex-col">
          <span className="text-orange-500">Latitude</span>
          <span className="font-medium text-orange-700">{coordinates.lat}</span>
        </div>
        <div className="h-8 w-px bg-orange-200 hidden sm:block"></div>
        <div className="flex flex-col">
          <span className="text-orange-500">Zoom</span>
          <span className="font-medium text-orange-700">{coordinates.zoom}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {/* Search box */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-orange-700 mb-2">Find Location</h4>
          <form onSubmit={handleSearch}>
            <div className="flex">
              <input
                type="text"
                placeholder="Search for a location"
                className="flex-1 px-3 py-2 bg-white border border-orange-200 rounded-l-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 placeholder-orange-300 text-orange-800"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600 transition-colors w-24"
                disabled={isSearching}
              >
                {isSearching ? <Spinner /> : 'Search'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Manual coordinate input */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-orange-700 mb-2">Go to Coordinates</h4>
          <form onSubmit={handleManualCoordinates}>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <label htmlFor="lng" className="block text-xs text-orange-600 mb-1">Longitude</label>
                <input
                  id="lng"
                  type="text"
                  className="w-full px-3 py-1 text-sm bg-white border border-orange-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 placeholder-orange-300 text-orange-800"
                  value={manualLng}
                  onChange={(e) => setManualLng(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="lat" className="block text-xs text-orange-600 mb-1">Latitude</label>
                <input
                  id="lat"
                  type="text"
                  className="w-full px-3 py-1 text-sm bg-white border border-orange-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 placeholder-orange-300 text-orange-800"
                  value={manualLat}
                  onChange={(e) => setManualLat(e.target.value)}
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-orange-100 text-orange-800 px-4 py-1 text-sm rounded border border-orange-200 hover:bg-orange-200 transition-colors"
            >
              Go to Coordinates
            </button>
          </form>
        </div>
      </div>
      
      {/* Error message */}
      {errorMessage && (
        <div className="text-red-500 text-xs mt-1">{errorMessage}</div>
      )}
      
      <div className="mt-6 pt-4 border-t border-orange-200">
        <p className="text-xs text-orange-600">
          Search for locations or directly enter coordinates to navigate the map.
        </p>
      </div>
    </div>
  )
}
