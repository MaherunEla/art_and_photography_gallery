import Image from "next/image";
import HomeHero from "./components/home/components/HomeHero";
import HomeTeam from "./components/home/components/HomeTeam";
import HomeLatest from "./components/home/components/HomeLatest";
import HomeTestimonial from "./components/home/components/HomeTestimonial";
import HomeArtist from "./components/home/components/HomeArtist";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <HomeTeam />
      <HomeLatest />
      <HomeTestimonial />
      <HomeArtist />
    </main>
  );
}
