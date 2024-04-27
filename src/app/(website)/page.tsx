import Image from "next/image";
import HomeHero from "./components/home/components/HomeHero";
import HomeTeam from "./components/home/components/HomeTeam";
import HomeLatest from "./components/home/components/HomeLatest";
import HomeTestimonial from "./components/home/components/HomeTestimonial";
import HomeArtist from "./components/home/components/HomeArtist";
import { getServerSession } from "next-auth";
import { authOption } from "../utils/auth";

export default function Home() {
  // const session = getServerSession(authOption);
  // console.log({ session });
  // session.then((resolvedSession) => {
  //   console.log(resolvedSession); // Here you can access the resolved session object
  // });

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
