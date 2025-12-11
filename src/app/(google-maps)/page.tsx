import LayerInformation from "@/components/layers/layerInformation";
import LayerWeatherSampling from "@/components/layers/LayerWeatherSampling";
import GoogleMaps from "../../components/google/maps";

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <GoogleMaps />
      <LayerInformation />
      <LayerWeatherSampling />
    </div>
  );
}
