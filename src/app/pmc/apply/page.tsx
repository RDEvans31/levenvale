import { ArrowDown, Calendar, MapPin, Sprout, TreePine } from 'lucide-react';

export default function ApplyPage() {
  return (
    <main className="min-h-screen mx-auto">
      {/* Hero Section */}
      <section className="bg-[#F9F9F9] max-h-[400px] pt-24 mx-auto">
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-black">
            Before You Apply
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            Here&apos;s what you need to know
          </p>
          <p className="text-gray-600 italic mb-8">
            Please read through this carefully to make sure we&apos;re a good
            fit for you!
          </p>
          <div className="flex gap-4 mt-8 animate-bounce">
            <ArrowDown color="black" size={64} />
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-20 px-4 bg-[#F9F9F9]">
        <div className="max-w-3xl mx-auto text-center space-y-16">
          {/* Location */}
          <div>
            <div className="font-bold mb-2 flex items-center justify-center text-lg">
              <MapPin size={24} className="mr-2" />
              Location
            </div>
            <p className="text-gray-600">
              One Tree Farm is based just outside <b>Taunton, Somerset, UK</b>.
              Food can be collected locally or shipped nationwide.
            </p>
          </div>

          {/* Membership Commitment */}
          <div>
            <div className="font-bold mb-2 flex items-center justify-center text-lg">
              <Calendar size={24} className="mr-2" />
              Membership Commitment
            </div>
            <div className="text-gray-600 space-y-2">
              <p>
                <b>£50/month</b> Membership Fee
              </p>
              <p>
                <b>£50/month</b> Minimum Monthly Food Contribution
              </p>
              <p className="mt-4">Minimum 12-month commitment</p>
            </div>
          </div>

          {/* Food & Rhythm */}
          <div>
            <div className="font-bold mb-2 flex items-center justify-center text-lg">
              <Sprout size={24} className="mr-2" />
              Food & Rhythm
            </div>
            <div className="text-gray-600 space-y-2">
              <p>
                All food is seasonal, regenerative, and produced in rhythm with
                the land.
              </p>
              <p>Availability varies throughout the year.</p>
              <p>
                This is not a supermarket replacement — it is a regenerative
                farm.
              </p>
            </div>
          </div>

          {/* Farm Access */}
          <div>
            <div className="font-bold mb-2 flex items-center justify-center text-lg">
              <TreePine size={24} className="mr-2" />
              Farm Access
            </div>
            <div className="text-gray-600 space-y-2">
              <p>
                Members are invited to regular gatherings and farm events
                throughout the year.
              </p>
              <p>The farm is not open access or public retail.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-20 px-4 bg-[#002611] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl font-bold mb-4">Apply Now</h2>
              <p className="text-gray-300 mb-6">
                If you&apos;re ready to proceed, please complete the application
                form below.
              </p>
            </div>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSe4c9DdrwZ9P6RytgMlxEihLdqqX2Geh-L7-YSPnVMnQrbxQw/viewform?embedded=true"
              width="640"
              height="6191"
              className="w-full"
            >
              Loading&hellip;
            </iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
