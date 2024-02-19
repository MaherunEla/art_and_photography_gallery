import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-md px-4 md:px-8">
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6">
          Unveiling Aesthete Art and Photography Gallery
        </h1>

        <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
          Welcome to Aesthete, a digital haven where creativity converges with
          innovation, bringing art and photography to life in the virtual realm.
          At Aesthete, we believe in the power of visual storytelling and the
          transformative impact it can have on individuals and communities. Our
          platform is more than just an online gallery; it&apos;s a vibrant
          space designed to celebrate artistic diversity, foster creativity, and
          connect artists with enthusiasts worldwide.
        </p>

        <h2 className="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4">
          Our Vision
        </h2>

        <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
          At the heart of Aesthete is a vision to redefine the way art and
          photography are experienced. We envision a global community where
          artists thrive, art lovers explore, and every visual creation finds
          its deserving audience. Through our platform, we seek to break down
          barriers, empower artists, and inspire a deeper appreciation for the
          beauty that visual arts bring to our lives.
        </p>
        <h2 className="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4">
          What Sets Us Apart
        </h2>

        <ul className="mb-6 list-inside list-disc text-gray-500 sm:text-lg md:mb-8">
          <p>
            1. <span className="font-bold">Empowering Creativity:</span>
          </p>
          <li className="pl-8">
            Aesthete is more than just a gallery; it&apos;s a platform that
            empowers artists to share their stories and creations with the
            world. We provide the tools and space for every artist, whether
            emerging or established, to showcase their unique vision.
          </li>
          <p>
            2. <span className="font-bold">Immersive Experience:</span>
          </p>
          <li className="pl-8">
            Step into an online realm where art and photography come to life.
            Our aesthetically pleasing gallery format and user-friendly
            interface create an immersive experience that transcends the
            traditional boundaries of viewing art.
          </li>
          <p>
            3. <span className="font-bold">Community Connection:</span>
          </p>
          <li className="pl-8">
            Aesthete is a community-driven platform. We believe in the strength
            of connections and the support that comes from a community of
            like-minded individuals. Join us to engage with fellow artists, art
            enthusiasts, and creators who share a passion for visual arts.
          </li>
          <p>
            4. <span className="font-bold">Innovation and Technology:</span>
          </p>
          <li className="pl-8">
            We leverage cutting-edge technology to enhance the art and
            photography viewing experience. From high-resolution zoom features
            to seamless transactions, we&apos;re committed to providing a modern
            and efficient platform for both artists and users.
          </li>
          <p>
            5. <span className="font-bold">Transparency and Support:</span>
          </p>
          <li className="pl-8">
            Our commitment to transparency extends to our relationship with
            artists and users alike. We provide a clear understanding of the
            sales process, a transparent 10% commission for our administrative
            services, and detailed monthly sales reports for artists.
          </li>
        </ul>

        <div className="relative h-[400px] w-full mb-6 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:mb-8">
          <Image
            src="/assets/images/home/about.jpg"
            loading="lazy"
            alt="Photo by Minh Pham"
            className="h-full w-full object-cover object-center"
            fill
          />
        </div>

        <h2 className="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4">
          Join Us in the Journey:
        </h2>

        <p className="text-gray-500 sm:text-lg">
          Whether you&apos;re an artist looking to showcase your creations or an
          art enthusiast seeking inspiration, invites you to be part of our
          creative journey. Every click, upload, and interaction contributes to
          the vibrant tapestry of visual storytelling that defines our
          community. Come, explore, and immerse yourself in the world of art and
          photography at Aesthete. Together, let&apos; celebrate the boundless
          possibilities that arise when creativity meets technology on our
          digital canvas.
        </p>
      </div>
    </div>
  );
};

export default page;
