import { withBase } from '../utils.js'

export default function VancouverMap() {
  return <img className="vancouver-map" src={withBase('images/vancouver-pixel-map-v2.png')}
    alt="Pixel-art Vancouver: Stanley Park, Lions Gate Bridge, downtown, Canada Place, Granville Island, and the Burrard, Granville and Cambie bridges across False Creek, framed by ocean and the North Shore mountains."
    width="1672" height="941" fetchpriority="high" draggable="false" />
}
