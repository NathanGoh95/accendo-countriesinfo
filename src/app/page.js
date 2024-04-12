import Image from "next/image";
import CardInfo from "./components/CardInfo";
import { pageModeStore } from "./store/PageModeStore";

export default function Home() {
  return (
    <div>
      <CardInfo />
    </div>
  );
}
