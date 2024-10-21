import Particles from "../ui/particles"
import DashLeftComponent from "./DashLeftComponent"
import RoomHistory from "./RoomHistory"
import SelectLanguage from "./SelectLanguage"


const DashboardComponent = () => {
  return (
    <div className="relative w-full flex min-h-screen flex-col items-center justify-center rounded-lg border bg-background md:shadow-xl z-30">
      <Particles
        className="absolute inset-0"
        quantity={300}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      
      <div className="flex gap-5">
        <DashLeftComponent />
        <div className="flex flex-col gap-y-6">
        <SelectLanguage />
        <RoomHistory />
        </div>
      </div>
    </div>
  )
}

export default DashboardComponent