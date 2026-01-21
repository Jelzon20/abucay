import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import abucay_cover from "../assets/abucay_cover.jpg";
import comu1 from "../assets/comu1.jpg";
import comu2 from "../assets/comu2.jpg";
import {
  FlagIcon,
  EyeIcon,
  UsersIcon,
  HomeIcon,
  MapIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";

const HomePage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/activities/getAllActivityImages");
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error("Failed to load images", err);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="bg-gray-100 text-gray-800">
      {/* HERO */}
      <section className="relative h-[95vh] flex items-center justify-center">
        <img
          src={abucay_cover}
          alt="Barangay Abucay"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center px-4 mt-24">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Welcome to Barangay Abucay
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto mb-6">
            Building a progressive, inclusive, and empowered community through
            transparent governance and quality public service.
          </p>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="relative py-16 overflow-hidden">
        <img
          src={abucay_cover}
          className="absolute inset-0 w-full h-full object-cover opacity-10"
          alt=""
        />
        <div className="absolute inset-0 bg-white/85"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card icon={<FlagIcon />} title="Our Mission">
            To empower residents through responsive leadership, innovative
            programs, and sustainable initiatives.
          </Card>

          <Card icon={<EyeIcon />} title="Our Vision">
            A peaceful, progressive, and resilient barangay where every citizen
            thrives with dignity.
          </Card>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-14 overflow-hidden">
        <img
          src={abucay_cover}
          className="absolute inset-0 w-full h-full object-cover opacity-10"
          alt=""
        />
        <div className="absolute inset-0 bg-gray-50/90"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={<UsersIcon />} label="Population" value="9,571" />
          <StatCard icon={<HomeIcon />} label="Households" value="2,111" />
          <StatCard icon={<MapIcon />} label="Land Area" value="3.271 km²" />
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative py-16 overflow-hidden">
        <img
          src={abucay_cover}
          className="absolute inset-0 w-full h-full object-cover opacity-10"
          alt=""
        />
        <div className="absolute inset-0 bg-white/85"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Barangay Services"
            subtitle="Fast, transparent, and citizen-focused public services"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ServiceCard
              title="Certificate of Indigency"
              desc="Issued to residents who require proof for financial or social assistance."
            />
            <ServiceCard
              title="Lupon"
              desc="Lupon Tagapamayapa is a barangay-based justice system that mediates disputes, fostering peace and avoiding costly court cases."
            />
            <ServiceCard
              title="Barangay Certification"
              desc="Official certification confirming residency and barangay records."
            />
            <ServiceCard
              title="Senior Citizen Certification"
              desc="Special certification for senior citizens to access benefits."
            />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="relative py-20 overflow-hidden">
        <img
          src={comu1}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          alt=""
        />
        <div className="absolute inset-0 bg-white/60"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <SectionHeader
            title="Why Choose Barangay Abucay"
            subtitle="Committed to transparency and community development"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard title="Transparent Governance" />
            <InfoCard title="People-Centered Services" />
            <InfoCard title="Community Development" />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="relative py-16 overflow-hidden">
        <img
          // src={}
          className="absolute inset-0 w-full h-full object-cover opacity-10"
          alt=""
        />
        <div className="absolute inset-0 bg-gray-50/90"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Activities Gallery"
            subtitle="Moments from barangay events"
          />

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {images.map((src, i) => (
              <SwiperSlide key={i}>
                <img
                  src={src}
                  className="h-56 w-full object-cover rounded-lg shadow-md"
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-16 overflow-hidden">
        <img
          src={comu2}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt=""
        />
        <div className="absolute inset-0 bg-white/80"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <SectionHeader
            title="What Our Residents Say"
            subtitle="Trusted by the community"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Testimonial />
            <Testimonial />
            <Testimonial />
          </div>
        </div>
      </section>
    </div>
  );
};

/* COMPONENTS */

const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="text-sm text-gray-600">{subtitle}</p>
  </div>
);

const Card = ({ icon, title, children }) => (
  <div className="bg-white p-8 rounded-lg shadow-md text-center">
    {React.cloneElement(icon, {
      className: "h-12 w-12 mx-auto text-blue-600 mb-4",
    })}
    <h3 className="font-bold mb-3">{title}</h3>
    <p className="text-sm text-gray-600">{children}</p>
  </div>
);

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    {React.cloneElement(icon, {
      className: "h-10 w-10 mx-auto text-blue-600 mb-2",
    })}
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const ServiceCard = ({ title, desc }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <CheckBadgeIcon className="h-10 w-10 mx-auto text-green-600 mb-3" />
    <h4 className="font-semibold">{title}</h4>
    <p className="text-sm text-gray-600">{desc}</p>
  </div>
);

const InfoCard = ({ title }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <h4 className="font-semibold mb-2">{title}</h4>
    <p className="text-sm text-gray-600">
      Dedicated to quality service and sustainable growth.
    </p>
  </div>
);

const Testimonial = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <p className="text-sm italic text-gray-600">
      “Very efficient and helpful barangay services.”
    </p>
  </div>
);

export default HomePage;
