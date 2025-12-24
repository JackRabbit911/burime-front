import BgLayers from "./BgLayers"
import CoverControls from "./CoverControls"

const CoverWrapper = () => {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="relative border border-neutral-content bg-cover bg-center aspect-2/3 inline-size">
        <BgLayers />
      </div>
      <CoverControls />
     </div>
  )
}

export default CoverWrapper
