import DashLeftComponent from "@/components/Dashboard/DashLeftComponent";
import RoomHistory from "@/components/Dashboard/RoomHistory";
import SelectLanguage from "@/components/Dashboard/SelectLanguage";
import Particles from "@/components/ui/particles"

const Dashboard = () => {

  return (
    <div className="relative w-screen bg-[#000000] flex min-h-screen flex-col items-center justify-center rounded-lg border bg-background md:shadow-xl">
      <Particles
        className="absolute inset-0"
        quantity={1000}
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
  );
}

export default Dashboard