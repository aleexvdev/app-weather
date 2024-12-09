/* "use client";

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)
const DynamicMapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
  ssr: false,
  loading: () => <p>Loading map...</p>
})
export const DynamicMapbox = () => {
  const [position, setPosition] = useState<LatLngExpression>([51.505, -0.09])
  const [isClient, setIsClient] = useState(false)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const changeLocation = () => {
    const newLat = Math.random() * 180 - 90
    const newLng = Math.random() * 360 - 180
    setPosition([newLat, newLng])
  }

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(position as L.LatLngExpression, 13)
    }
  }, [position])

  if (!isClient) return null

  return (
    <div className="w-full h-full min-h-[300px] flex flex-col">
      <button 
        onClick={changeLocation}
        className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Change Location
      </button>
      <div className="flex-grow">
        <DynamicMapContainer 
          center={position} 
          zoom={13} 
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
          ref={(mapInstance) => {
            if (mapInstance && !mapRef.current) {
              mapRef.current = mapInstance;
            }
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </DynamicMapContainer>
      </div>
    </div>
  )
}
 */