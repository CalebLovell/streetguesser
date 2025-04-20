import * as React from 'react'

export interface LayerOption {
  id: string
  label: string
  layerId: string
  checked: boolean
}

interface MapControlsProps {
  layers: LayerOption[]
  onLayerToggle: (layerId: string, checked: boolean) => void
}

export function MapControls({ layers, onLayerToggle }: MapControlsProps) {
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 w-full h-auto">
      <h3 className="text-lg font-semibold text-orange-800 mb-4">Map Controls</h3>
      
      <div className="space-y-3">
        <div className="mb-4">
          <h4 className="text-sm font-medium text-orange-700 mb-2">Road Types</h4>
          <div className="space-y-2">
            {layers.map((layer) => (
              <div key={layer.id} className="flex items-center">
                <input
                  id={layer.id}
                  type="checkbox"
                  className="h-4 w-4 text-orange-500 rounded border-orange-300 focus:ring-orange-500"
                  checked={layer.checked}
                  onChange={(e) => onLayerToggle(layer.layerId, e.target.checked)}
                />
                <label htmlFor={layer.id} className="ml-2 text-sm text-orange-700">
                  {layer.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-orange-200">
        <p className="text-xs text-orange-600">
          Toggle map features to customize your view. Changes will apply immediately.
        </p>
      </div>
    </div>
  )
}
