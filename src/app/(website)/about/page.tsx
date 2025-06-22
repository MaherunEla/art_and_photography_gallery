import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-md px-4 md:px-8">
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:mb-6">
          Unveiling Aesthete Art and Photography Gallery
        </h1>

        <p className="mb-6 text-gray-600 sm:text-base md:text-lg md:mb-8">
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

        <p className="mb-6 text-gray-600 sm:text-base md:text-lg md:mb-8">
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

        <ul className="space-y-6 text-gray-600 sm:text-base md:text-lg md:mb-8">
          <li>
            <span className="block font-bold mb-1">
              1. Empowering Creativity:
            </span>
            Aesthete is more than just a gallery; it&apos;s a platform that
            empowers artists to share their stories and creations with the
            world. We provide the tools and space for every artist, whether
            emerging or established, to showcase their unique vision.
          </li>
          <li>
            <span className="block font-bold mb-1">
              2. Immersive Experience:
            </span>
            Step into an online realm where art and photography come to life.
            Our aesthetically pleasing gallery format and user-friendly
            interface create an immersive experience that transcends traditional
            boundaries.
          </li>
          <li>
            <span className="block font-bold mb-1">
              3. Community Connection:
            </span>
            Aesthete is a community-driven platform. Join us to engage with
            fellow artists, art enthusiasts, and creators who share a passion
            for visual arts.
          </li>
          <li>
            <span className="block font-bold mb-1">
              4. Innovation and Technology:
            </span>
            We leverage cutting-edge technology to enhance the art and
            photography viewing experience — from high-resolution zoom features
            to seamless transactions.
          </li>
          <li>
            <span className="block font-bold mb-1">
              5. Transparency and Support:
            </span>
            We ensure a clear understanding of the sales process, offer a fair
            10% commission, and provide monthly sales reports to artists.
          </li>
        </ul>

        <div className="relative h-64 sm:h-80 md:h-[400px] w-full mb-6 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:mb-8">
          <Image
            src="/assets/images/home/about.jpg"
            loading="lazy"
            alt="About Aesthete"
            className="h-full w-full object-cover object-center"
            fill
          />
        </div>

        <h2 className="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl md:mb-4">
          Join Us in the Journey:
        </h2>

        <p className="text-gray-600 sm:text-base md:text-lg">
          Whether you&apos;re an artist looking to showcase your creations or an
          art enthusiast seeking inspiration, we invite you to be part of our
          creative journey. Every click, upload, and interaction contributes to
          the vibrant tapestry of visual storytelling that defines our
          community. Come, explore, and immerse yourself in the world of art and
          photography at Aesthete. Together, let&apos;s celebrate the boundless
          possibilities when creativity meets technology.
        </p>
      </div>
    </div>
  );
};

export default page;
