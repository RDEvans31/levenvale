'use client';

import CardFood from '@/components/CardFood';
import CardTestimonial from '@/components/CardTestimonial';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-5 text-left"
      >
        <span className="text-lg font-semibold">{question}</span>
        <span className="text-2xl ml-4">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="pb-5 text-gray-600">{answer}</div>}
    </div>
  );
}

export default function PMCPage() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src="/home/cows-chickens-hero.jpg"
            alt="One Tree Farm Cows and Chickens"
            fill
            className="object-cover brightness-[0.6]"
            priority
          />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <Image
            src="/otf-logo.svg"
            alt="One Tree Farm Logo"
            width={80}
            height={80}
            className="mb-6"
          />
          <h1 className="text-[#E5F2C9]">
            <span className="text-2xl md:text-5xl italic font-light">
              Join the
            </span>
            <br />
            <span className="text-3xl md:text-7xl font-bold">
              One Tree Farm
            </span>
            <br />
            <span className="text-2xl md:text-5xl italic font-light">
              Private Members Club
            </span>
          </h1>
          <p className="font-bold text-md md:text-xl mt-8 mb-6 md:mt-16 md:mb-12 max-w-2xl text-white">
            Get direct access to our off grid farm, its real food, and a freedom
            focused like-minded community
          </p>
          <div className="animate-bounce">
            <ArrowDown color="white" size={48} />
          </div>
        </div>
      </section>

      {/* 2. The Mainstream Agenda */}
      <section className="py-12 md:py-20 px-4 bg-[#F9F9F9]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl text-gray-700 mb-6">
            You are probably here because you are aware of what we call
          </p>
          <h2 className="text-xl md:text-2xl font-bold mb-8 text-center">
            &ldquo;The Mainstream Agenda&rdquo;
          </h2>
          <p className="text-gray-600 mb-8">
            The increasing move toward centralised systems of control.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['Digital IDs', 'CBDCs', 'Fake Food', 'Smart Cities'].map(item => (
              <span
                key={item}
                className="bg-white border border-gray-300 px-6 py-3 rounded-full font-semibold text-gray-800"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="text-gray-600 mb-6">
            Left unchecked, this agenda leads to the total loss of our practical
            freedoms.
          </p>
          <p className="text-gray-800 font-semibold">
            The <b>One Tree Farm Private Members Club</b> exists in direct
            response to this agenda.
          </p>
        </div>
      </section>

      {/* 3. Mission / Vision */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto divide-y divide-gray-200 border-t border-b border-gray-200 text-center">
          <div className="py-8">
            <p className="text-lg md:text-xl italic text-gray-700">
              <span className="font-bold not-italic">Our Mission</span> is to
              provide you with real world independence to counter the increasing
              centralisation and control
            </p>
          </div>
          <div className="py-8">
            <p className="text-lg md:text-xl italic text-gray-700">
              <span className="font-bold not-italic">Our Vision</span> is an
              off-grid community farm where your freedom is protected and
              like-minded families stand together
            </p>
          </div>
        </div>
      </section>

      {/* 4. So What Does This Actually Mean For You? */}
      <section className="py-12 md:py-20 px-4 bg-[#F9F9F9]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            So What Does This Actually Mean For You?
          </h2>
          <p className="text-gray-600 mb-4">
            You&apos;ve heard a bit about <em>why</em> the club exists.
          </p>
          <p className="text-gray-800 font-semibold mb-8">
            But what does it actually mean for you and your family?
          </p>
          <p className="text-gray-800 font-bold mb-6">It means this:</p>
          <div className="space-y-4 text-gray-600 mb-8">
            <p>Instead of passively watching the agenda unfold&hellip;</p>
            <p>Instead of hoping the supermarket shelves stay full&hellip;</p>
            <p>
              Instead of wasting time disappearing down endless rabbit
              holes&hellip;
            </p>
          </div>
          <p className="text-gray-800 font-semibold mb-4">
            You take a real and definite step towards independence.
          </p>
          <p className="text-gray-600 mb-4">
            You gain access to a real piece of land, with real off-grid systems
            in place, to produce real nutrient dense food.
          </p>
          <p className="text-gray-600 mb-8">
            You become part of a real, in person, freedom focused community,
            coming together to take real action.
          </p>
          <p className="text-xl text-gray-800">
            You go from <em className="font-bold">worrying</em> about
            what&apos;s happening&hellip;
            <br />
            To <em className="font-bold">positioning yourself</em> so it
            can&apos;t control you
          </p>
        </div>
      </section>

      {/* 5. This Is Already Built */}
      <section className="py-12 md:py-20 px-4 bg-[#002611] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            This Is Already Built
          </h2>
          <div className="space-y-4 text-gray-300 text-lg">
            <p>
              This is not an idea.
              <br />
              It is a working, regenerative, off-grid farm.
            </p>
            <p>
              Land already secured.
              <br />
              Infrastructure already built.
            </p>
            <p>
              Livestock already grazing.
              <br />
              Food already being produced.
            </p>
            <p>
              Members gather on the land.
              <br />
              They access the food produced from the farm.
              <br />
              They meet other families who value independence, responsibility,
              and freedom.
            </p>
            <p>
              Children run in open fields instead of scrolling on screens.
              <br />
              Conversations happen face to face.
            </p>
            <p>
              Skills are learned.
              <br />
              Food is shared.
              <br />
              Freedom is aspired to as well as lived in the moment.
            </p>
            <p className="font-semibold text-white">
              This is not a retreat or a weekend escape.
            </p>
            <p>
              It is a functioning freedom focused land project — and members are
              connected directly to it.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Enterprise Images */}
      <section className="hidden md:block py-12 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-2 md:gap-8">
          <div className="group relative aspect-square max-w-[120px] sm:max-w-[270px] lg:max-w-[360px]">
            <Image
              src="/home/dexter-cow-cropped.jpg"
              alt="Grass-fed Dexter Cattle"
              fill
              className="object-cover rounded-lg brightness-75 group-hover:scale-105 transition duration-300"
            />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-sm sm:text-2xl font-semibold">
                Grass-fed Dexter Cattle
              </h3>
            </div>
          </div>
          <div className="group relative aspect-square mt-8 md:mt-16 max-w-[120px] sm:max-w-[270px] lg:max-w-[360px]">
            <Image
              src="/home/chickens.jpg"
              alt="Pastured Chickens"
              fill
              className="object-cover rounded-lg brightness-75 group-hover:scale-105 transition duration-300"
            />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-sm sm:text-2xl font-semibold">
                Pastured Chickens
              </h3>
            </div>
          </div>
          <div className="group relative aspect-square max-w-[120px] sm:max-w-[270px] lg:max-w-[360px]">
            <Image
              src="/home/browny-calf.jpg"
              alt="Browny and the calf"
              fill
              className="object-cover rounded-lg brightness-75 group-hover:scale-105 transition duration-300"
            />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-sm sm:text-2xl font-semibold">
                Grass-fed Jersey Cattle
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Why We Chose The Private Members Club Structure */}
      <section className="py-12 md:py-20 px-4 bg-[#F9F9F9]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Why We Chose The Private Members Club Structure
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Operating as a Private Members Club allows us and our members a
            greater degree of privacy and autonomy than would be possible under
            a fully public retail structure.
          </p>
          <p className="text-gray-800 font-semibold mb-6">
            Within our private structure:
          </p>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-600 mr-3 mt-1">&#x2022;</span>
              <span>
                Food is allocated within a membership, not sold commercially.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-3 mt-1">&#x2022;</span>
              <span>
                Activity takes place between members, not between a business and
                the public.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-3 mt-1">&#x2022;</span>
              <span>The integrity of the project can be protected.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-3 mt-1">&#x2022;</span>
              <span>
                Membership size can be capped and kept small to protect food
                security.
              </span>
            </li>
          </ul>
          <p className="text-gray-600 mt-8 text-center">
            Operating as a Private Members Club allows the farm to remain
            adaptable and protected in response to the increasing centralisation
            and control within the mainstream system.
          </p>
        </div>
      </section>

      {/* 8. How Membership Works */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            How Membership Works
          </h2>
          <p className="text-gray-600 mb-4 text-center">
            The One Tree Farm Private Members Club is built around three
            practical components.
          </p>
          <p className="text-center text-xl font-semibold text-gray-800 mb-4">
            Land. Food. Community.
          </p>
          <p className="text-gray-600 mb-12 text-center">
            Here is how each one works.
          </p>

          {/* Access to Land */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4">Access to Land</h3>
            <p className="text-gray-600 mb-4">
              As a member, you are granted private access to One Tree Farm.
            </p>
            <p className="text-gray-800 font-semibold mb-3">This includes:</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">&#x2022;</span>
                <span>Monthly in-person gatherings on the land</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">&#x2022;</span>
                <span>Seasonal events and shared meals</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">&#x2022;</span>
                <span>Camping during gathering weekends</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">&#x2022;</span>
                <span>Weekly family farm sessions</span>
              </li>
            </ul>
            <p className="text-gray-700 mt-4 italic">
              A real place, with purpose, that you are directly connected to.
            </p>
          </div>

          {/* Access to Real Food */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4">Access to Real Food </h3>
            <p className="text-gray-600 mb-4">
              The farm produces nutrient-dense food using small-scale
              regenerative methods.
            </p>
            <p className="text-gray-600 mb-4">
              Our practices meet and exceed organic standards — but we are not
              certified as we do not believe in having to pay to produce good
              quality food.
            </p>
            <p className="text-gray-800 font-semibold mb-3">
              As a member, you gain access to:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">&#x2022;</span>
                <span>
                  A decentralised, independent food system built for resilience
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">&#x2022;</span>
                <span>The highest quality meat, dairy, and vegetables</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">&#x2022;</span>
                <span>
                  Food raised without hormones, vaccines or chemical inputs
                </span>
              </li>
            </ul>
            <p className="text-gray-600 mt-4">
              Food can be collected from the farm or shipped anywhere in the UK.
            </p>
            <p className="text-gray-600 mt-4">
              No more relying solely on supermarket supply chains.
            </p>
            <p className="text-gray-600 mt-2">
              No more carrying the responsibility for your family&apos;s food
              security alone.
            </p>
          </div>

          {/* Access to Like-Minded Community */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Access to Like-Minded Community
            </h3>
            <p className="text-gray-600 mb-4">
              Membership connects you to a private group of families and
              individuals who are aware of the mainstream agenda and share the
              belief that land, community and real food are the foundation of
              freedom.
            </p>
            <p className="text-gray-800 font-semibold mb-3">We connect:</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">&#x2022;</span>
                <span>In person at the farm</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">&#x2022;</span>
                <span>Through a private WhatsApp Community</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 mt-1">&#x2022;</span>
                <span>Through shared participation in the project</span>
              </li>
            </ul>
            <p className="text-gray-600 mt-4">
              No more feeling isolated because of your &ldquo;crazy&rdquo;
              worldview.
            </p>
            <p className="text-gray-600">
              And no more feeling like you have to prepare for the future alone.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Food Cards */}
      <section className="py-12 md:py-20 px-4 bg-[#002611] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-4 text-center">Our Food</h2>
            <p className="text-gray-300 text-center">
              All produce available exclusively to our private members club.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <CardFood
              title="100% Grass-Fed Beef"
              image_path="/food/beef-cooked.jpg"
              description="Raised on regenerative pasture and finished exclusively on grass."
            />
            <CardFood
              title="Raw Grass-Fed Dairy"
              image_path="/food/raw-milk.png"
              description="Milk and dairy from 100% grass-fed Jersey cows raised on open pasture."
            />
            <CardFood
              title="Pasture-Raised Chicken & Eggs"
              image_path="/food/chicken-cooked.jpg"
              description="Raised outdoors on open pasture and moved daily for fresh forage."
            />
            <CardFood
              title="Beyond Organic Veg"
              image_path="/home/veg-box.jpg"
              description="No-dig vegetables, seasonal herbs, and fruit grown with regenerative practices."
            />
            <CardFood
              title="Wild Game"
              image_path="/food/venison-haunch.webp"
              description="Seasonally sourced venison, pheasant, and other locally harvested game."
            />
            <CardFood
              title="Traditional Whole Foods"
              image_path="/food/bone-broth.webp"
              description="Grass-fed tallow, bone broth, ferments, and nutrient-dense preserves."
            />
          </div>
        </div>
      </section>

      {/* 10. How One Tree Farm Began */}
      <section className="py-12 md:py-20 px-4 bg-[#002611] text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            How One Tree Farm Began
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              One Tree Farm was built in response to the clear mass manipulation
              of society during the COVID &ldquo;pandemic&rdquo;.
            </p>
            <p>
              During these events we saw just how vulnerable we are when
              entirely dependent on the mainstream system.
            </p>
            <p>At first, we believed the answer was simple:</p>
            <p className="text-white font-semibold">
              Get land. Homestead. Become self-sufficient.
            </p>
            <p>
              But we <em className="font-bold text-white">very quickly</em>{' '}
              realised this was not the case.
            </p>
            <p>
              Self-sufficiency sounds like freedom — but instead, just results
              in being a slave to your own system instead of the system.
            </p>
            <p>
              Real independence cannot be achieved by any individual or single
              family alone.
            </p>
            <p className="text-white font-semibold">It requires community.</p>
            <p>So the vision expanded to a community farm.</p>
            <p>
              And in June 2023 we purchased 13.5 acres and have been busy
              building it up from bare agricultural land into an off-grid,
              food-producing farm.
            </p>
            <p className="font-semibold text-white mt-6">We have:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start">
                <span className="mr-3 mt-1">&#x2022;</span>
                <span>Installed a private water system</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">&#x2022;</span>
                <span>Built solar energy infrastructure</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">&#x2022;</span>
                <span>Established multiple regenerative food enterprises</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">&#x2022;</span>
                <span>
                  And welcomed over 60 like-minded families into the community
                </span>
              </li>
            </ul>
            <p className="mt-6">
              This is not something we are selling from a distance.
            </p>
            <p>
              We live here. Our children are here. We eat the food produced
              here.
            </p>
            <p>
              The mission is personal. If the systems here fail, it impacts us
              too.
            </p>
            <p>
              Which means we are{' '}
              <em className="font-bold text-white">
                as invested as it is possible to be
              </em>{' '}
              in ensuring this works.
            </p>
            <p>
              The <b>Private Members Club</b> simply allows others to connect to
              something that was already being built.
            </p>
          </div>
        </div>
      </section>

      {/* 11. Commitment */}
      <section className="py-12 md:py-20 px-4 bg-[#F9F9F9]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Commitment</h2>
          <p className="text-gray-600 mb-6">Membership consists of:</p>
          <div className="space-y-6 mb-8">
            <div>
              <p className="text-2xl font-bold text-gray-800">
                £50 per month membership fee
              </p>
              <p className="text-gray-600">
                Access to the land, food system, gatherings and private
                community
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                £50 per month minimum food contribution
              </p>
              <p className="text-gray-600">
                Converted into OTF Tokens and used to allocate food
              </p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            This structure keeps the land operational, the food system active,
            and the member community at the centre.
          </p>
          <p className="text-gray-800 font-semibold">
            Membership is intentionally limited.
          </p>
          <p className="text-gray-800 font-semibold">
            Minimum 12-month commitment.
          </p>
        </div>
      </section>

      {/* 12. How The Application Works */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            How The Application Works
          </h2>
          <p className="text-gray-600 mb-10 text-center">
            We keep the process simple and transparent.
          </p>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#002611] text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">
                  Complete the Application
                </h3>
                <p className="text-gray-600">
                  You submit a short form outlining who you are and why
                  you&apos;re interested in joining.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#002611] text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Application Review</h3>
                <p className="text-gray-600">
                  We review each application to ensure alignment and capacity
                  within the Club.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#002611] text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">
                  Receive Full Documentation
                </h3>
                <p className="text-gray-600">
                  If approved, you will receive the full details and a breakdown
                  of how everything works before making any final decision.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#002611] text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Confirm & Join</h3>
                <p className="text-gray-600">
                  If everything feels aligned on both sides, membership is
                  activated and you step into the Club.
                </p>
              </div>
            </div>
          </div>
          <p className="text-gray-600 mt-8 text-center">
            There is no pressure. The application simply begins with a simple
            form to complete.
          </p>
          <div className="mt-10 text-center">
            <Link
              href="/pmc/apply"
              className="border-2 border-[#002611] bg-[#002611] text-white px-8 py-3 rounded-full hover:bg-transparent hover:text-[#002611] transition"
            >
              Apply For Membership
            </Link>
          </div>
        </div>
      </section>

      {/* 13. Who This Is For */}
      <section className="py-12 md:py-20 px-4 bg-[#F9F9F9]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Who This Is For
          </h2>
          <p className="text-gray-700 mb-6 font-semibold">
            This is for you if:
          </p>
          <div className="space-y-4 text-gray-600">
            <p>
              You are aware of the direction the mainstream system is moving —
              and you&apos;ve decided you don&apos;t want to remain fully
              dependent on it.
            </p>
            <p>
              You value land, food, and community as the foundations of real
              freedom.
            </p>
            <p>
              You understand that freedom is not declared, but built —
              deliberately and with action.
            </p>
            <p>
              You are comfortable committing to something that is building for
              the future.
            </p>
            <p>You live nearby and want regular physical involvement.</p>
            <p>
              Or live further away and want secure access to real food and
              periodic gatherings.
            </p>
            <p className="text-gray-800 font-semibold mt-4">
              Either way — you want your position strengthened, and your
              independence secured.
            </p>
          </div>
        </div>
      </section>

      {/* 14. Who This Is Not For */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Who This Is Not For
          </h2>
          <p className="text-gray-700 mb-6 font-semibold">
            This is not for you if:
          </p>
          <div className="space-y-4 text-gray-600">
            <p>
              You are looking for supermarket convenience with a different
              label.
            </p>
            <p>You are searching for a discount farm food subscription.</p>
            <p>You are unwilling to commit beyond a short-term trial.</p>
            <p>You prefer outrage and commentary over practical action.</p>
            <p>
              You are looking for activism, protest, or a reactionary movement.
            </p>
            <p>You want access without contribution.</p>
          </div>
          <p className="text-gray-800 font-semibold mt-6">
            This Club is built for people who want to support — and benefit from
            — a real project delivering real independence from the system.
          </p>
        </div>
      </section>

      {/* 15. Testimonials */}
      <section className="py-12 md:py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            What Our Members Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CardTestimonial
              name="Ricky"
              quote="I cooked dinner for my family with food from the farm, and the value of the project truly sank in. I've seen the animals, met the family, and know exactly where my food comes from."
            />
            <CardTestimonial
              name="Jamie and Lauren"
              quote="We've been visiting the farm for a year — becoming members was the next step. Our kids have freedom here. The food is incredible. It's peace of mind."
            />
            <CardTestimonial
              name="Sarah & Justin"
              quote="Since becoming members of One Tree Farm, we no longer feel like our family's food security rests entirely on our shoulders. There's a deep sense of relief knowing we have direct access to the farm and the food it produces."
            />
          </div>
        </div>
      </section>

      {/* 16. FAQs */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div>
            <FAQItem
              question="How much does membership cost?"
              answer={
                <div className="space-y-3">
                  <p>Membership consists of two monthly components:</p>
                  <p>
                    <b>£50 per month membership fee</b>
                    <br />
                    Access to the land, food system, gatherings and private
                    community
                  </p>
                  <p>
                    <b>£50 per month minimum food contribution</b>
                    <br />
                    Converted into OTF Tokens and used to allocate food
                  </p>
                </div>
              }
            />
            <FAQItem
              question="Is there a minimum commitment?"
              answer={<p>Yes. Membership requires a 12-month commitment.</p>}
            />
            <FAQItem
              question="Do I need to live near the farm?"
              answer={
                <p>
                  No. Our members are based all across the UK. Food can be
                  collected from the farm or shipped nationwide.
                </p>
              }
            />
            <FAQItem
              question="Does membership cover my whole household?"
              answer={
                <p>
                  Yes. One membership covers your entire household — including
                  your partner and children. There is no per-person fee.
                </p>
              }
            />
            <FAQItem
              question="Do I have to work at the farm?"
              answer={
                <p>
                  No. There is no obligation to work. You are free to relax,
                  socialise and enjoy the farm when you visit.
                </p>
              }
            />
            <FAQItem
              question="What happens after I apply?"
              answer={
                <p>
                  If your application is approved, you will receive full
                  documentation and next steps before making any final
                  commitment.
                </p>
              }
            />
          </div>
        </div>
      </section>

      {/* 17. Our Numbers */}
      <section className="py-12 md:py-20 px-4 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto text-center mb-8">
          <h2 className="text-4xl font-bold mb-8">Our Numbers</h2>
          <div>
            <h3 className="text-4xl font-bold mb-2">60+</h3>
            <p className="text-gray-600">Families</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          <div className="mb-8">
            <h3 className="text-3xl md:text-4xl font-bold mb-2">13.5</h3>
            <p className="text-gray-600">
              Acres of <b>owned farmland</b> — the hub of the community and
              regenerative operations
            </p>
          </div>
          <div className="mb-8">
            <h3 className="text-3xl md:text-4xl font-bold mb-2">100+</h3>
            <p className="text-gray-600">
              Acres of <b>regenerative land under development</b> for food
              production
            </p>
          </div>
        </div>
        <div className="text-center my-16">
          <h2 className="text-xl font-bold text-gray-600">
            Our 2026 Projected Output
          </h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="mb-8">
            <h3 className="text-4xl font-bold mb-2">5,000+</h3>
            <p className="text-gray-600">
              kilograms of <b>Beef, Pork, Chicken</b>, and more
            </p>
          </div>
          <div className="mb-8">
            <h3 className="text-4xl font-bold mb-2">2,500+</h3>
            <p className="text-gray-600">
              kilograms of <b>Beyond Organic Vegetables</b>
            </p>
          </div>
          <div className="mb-8">
            <h3 className="text-4xl font-bold mb-2">60,000+</h3>
            <p className="text-gray-600">
              eggs from our <b>Pastured Laying Hens</b>
            </p>
          </div>
        </div>
        <div className="text-center my-16">
          <p className="text-gray-600 px-8 mb-8">
            We are scaling our production across all our regenerative
            enterprises to increase the amount of food we provide to members.
          </p>
          <p className="text-gray-600 px-8 mb-8">
            <b className="text-black">
              By 2028, we will expand to meet <u>the entire food needs</u> of
              our members, using both owned and additional rented land.
            </b>
          </p>
          <p className="text-gray-600 px-8 mb-8">
            While we are working to grow our supply, our priority will always be
            to provide food security and the highest quality food for our
            members.
          </p>
        </div>
      </section>

      {/* 18. Final CTA */}
      <section className="py-12 md:py-20 px-4 bg-[#002611] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Apply For Membership
          </h2>
          <Link
            href="/pmc/apply"
            className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#002611] transition"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </main>
  );
}
