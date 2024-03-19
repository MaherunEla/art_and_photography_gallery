import Image from "next/image";
import HomeHero from "../../../components/HomeHero";
import HomeTeam from "../../../components/HomeTeam";
import HomeLatest from "../../../components/HomeLatest";
import HomeTestimonial from "../../../components/HomeTestimonial";
import HomeArtist from "../../../components/HomeArtist";

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
