import CardValue from '@/components/CardValue';
import ImageMarquee from '@/components/ImageMarquee';
import Navbar from '@/components/navbar';
import { LandPlot, Leaf, LeafyGreen, Sprout, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh]">
        {/* Background Image */}
        <Navbar />
        <div className="absolute inset-0">
          <Image
            src="/home/levenvale-hero-mobile.jpg"
            alt="Levenvale"
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 -mt-16">
          <h1 className="text-5xl md:text-7xl mb-6 text-[#E5F2C9]">
            Levenvale Farm <br />
          </h1>
          <p className="font-bold text-white">Belligen, NSW</p>
        </div>
      </section>

      {/* Image Marquee */}
      <ImageMarquee />

      {/* About Section */}
      <section className="py-20 px-4 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <div className="space-y-6 text-gray-600">
              <p>
                Levenvale Farm was one of the original dairy farms of Bellingen,
                spanning the banks of Hydes Creek. At its peak, there were 200
                milking cows roaming these pastures, with 100 acres of
                cultivation, pigs and a busy dairy, producing up to 1 million
                litres of milk annually.
              </p>
              <p>
                In 2019 Sam and Georgina Baker became the stewards of the now
                500 acres of Levenvale Farm, converting it from dairy farm to
                organic beef cattle and have dedicated their time to
                revitalising the soil for small-scale, nutrient dense food
                production.
              </p>
              <p>
                Through education, community and collaboration, we are creating
                a model to reconnect the way we farm, eat and live.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden md:block hidden">
            <Image
              src="/home/levenvale-sam-georgina.webp"
              alt="sam and georgina baker"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-4 bg-cream text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl italic mb-12 text-brown-dark">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            <CardValue
              icon={<Leaf size={32} className="text-brown-light" />}
              title="Share-farming"
              description="We want to empower self-sufficient & successful farming businesses that function together as a collective."
            />
            <CardValue
              icon={<Sprout size={32} className="text-forest" />}
              title="Regenerating our ecosystem"
              description="Our mission is to farm in a more sustainable way, to leave our land in a better condition than we received it."
            />
            <CardValue
              icon={<Users size={32} className="text-brown" />}
              title="Building a Community"
              description="We want to create a place where people can learn together, share experiences and grow together."
            />
            <CardValue
              icon={<LeafyGreen size={32} className="text-brown-light" />}
              title="Reconnecting with Nature"
              description="Whether it's a time to escape, reconnect, immerse yourself in nature, we want to provide a relaxing place for you."
            />
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-4 bg-[#002611] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8 md:mb-0">What We Do</h2>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden md:hidden mb-8">
              <Image
                src="/home/sam-holding-soil.webp"
                alt="Land Regeneration"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h4 className="text-xl font-light mb-8">
              Building resilience in small scale agriculture and food
              production.
            </h4>
            <p className="text-gray-300 mb-4">
              As passionate advocates for regenerative agriculture, animal
              welfare and human health, we have created space to reconnect the
              consumer to the farm and their food.
            </p>
            <p className="text-gray-300 mb-4">
              We grow and produce our own range of organic &amp; grass-fed beef
              products under the brand of Bello Beef and we land-share with The
              Patch Organics, who grow free-range, pastured chickens and a
              market garden.
            </p>
            <p className="text-gray-300 mb-8">
              In addition to Bello Beef and our own off-farm Butchery, we also
              have a Farm Shop, and host many Events, Workshops, Tours, also
              offering Farm Stays and venue hire for private Weddings and
              Functions.
            </p>
            <p className="flex items-start">
              <span className="text-white mr-2 mb-4">
                <Leaf size={20} />
              </span>
              <span>Sustainable food production systems</span>
            </p>
            <p className="flex items-start">
              <span className="text-white mr-2 mb-4">
                <Users size={20} />
              </span>
              <span>Community-based stewardship models</span>
            </p>
            <p className="flex items-start">
              <span className="text-white mr-2 mb-4">
                <Sprout size={20} />
              </span>
              <span>Ecological restoration and soil regeneration</span>
            </p>
            <p className="flex items-start">
              <span className="text-white mr-2 mb-4">
                <LeafyGreen size={20} />
              </span>
              <span>Nature-connected educational experiences</span>
            </p>
            <p className="flex items-start">
              <span className="text-white mr-2 mb-4">
                <LandPlot size={20} />
              </span>
              <span>
                The land is stewarded to model what&apos;s possible when
                agriculture aligns with the rhythms of the land.
              </span>
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden md:block hidden">
            <Image
              src="/home/sam-holding-soil.webp"
              alt="Land Regeneration"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center py-8">
          <h3 className="text-2xl font-bold mb-4">Join the Tribe</h3>
          <Link
            href="mailto:hello@bellobeef.com.au"
            className="border-2 border-black text-black px-8 py-3 rounded-full hover:bg-[#002611] hover:text-black transition"
          >
            Email Us
          </Link>
        </div>
      </section>
    </main>
  );
}
