"use client";
import React from "react";
import Image from "next/image";
// import HeroDemo from "./HeroDemo";
import { HeroWithMockup } from "@/components/ui/hero-with-mockup";

export default function ExperimentalPortfolio() {
  return (
    <main>
      <HeroWithMockup
        title="James Geiger"
        description="Product Designer crafting accessible, digital experiences"
        mockupImage={{
          alt: "James Geiger",
          width: 400,
          height: 400,
          src: "/images/5C9FFB1B-4FD1-43F6-8EC0-FC49222D4109_1_105_c.jpeg"
        }}
      />
      {/* Hero Section */}
      {/* <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-block w-10 h-10 bg-yellow-400 rounded-full" />
            <nav className="text-lg text-gray-300 space-x-6">
              <a href="#" className="hover:text-yellow-400">Services</a>
              <a href="#" className="hover:text-yellow-400">Works</a>
              <a href="#" className="hover:text-yellow-400">Blog</a>
            </nav>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-2 leading-tight">Carlos Mendoza.</h1>
          <p className="text-lg text-gray-300 mb-6 max-w-lg">
            Product Designer and Developer, based in California.
          </p>
          <div className="flex items-center gap-4 mb-8">
            <a href="#" className="text-gray-400 hover:text-yellow-400">@</a>
            <a href="#" className="text-gray-400 hover:text-yellow-400">in</a>
          </div>
          <div className="mb-8">
            <span className="uppercase text-xs tracking-widest text-gray-400">Introduction</span>
            <p className="mt-2 text-lg text-gray-200 max-w-md">
              Product Designer and Developer, based in California. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.
            </p>
            <a href="#" className="inline-block mt-4 text-yellow-400 font-semibold underline">My story →</a>
          </div>
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-lg border-4 border-yellow-400">
            <Image src="/images/5C9FFB1B-4FD1-43F6-8EC0-FC49222D4109_1_105_c.jpeg" alt="Profile" width={256} height={256} className="object-cover w-full h-full" />
          </div>
        </div>
      </section> */}

      {/* Grid Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-8 py-12">
        <div className="bg-[#232532] rounded-xl p-6 border border-gray-700">
          <h3 className="text-yellow-400 text-lg font-semibold mb-2">Contact</h3>
          <p className="text-gray-300 mb-2">Any Type Of Query & Discussion.</p>
          <a href="mailto:hi@carlos.com" className="text-yellow-400 underline">hi@carlos.com</a>
        </div>
        <div className="bg-[#232532] rounded-xl p-6 border border-gray-700">
          <h3 className="text-yellow-400 text-lg font-semibold mb-2">Experience</h3>
          <p className="text-gray-300 mb-2">14 Years of Experience</p>
          <p className="text-gray-300">187 Satisfied Clients</p>
        </div>
        <div className="bg-[#232532] rounded-xl p-6 border border-gray-700">
          <h3 className="text-yellow-400 text-lg font-semibold mb-2">Quote</h3>
          <p className="text-gray-300 italic">“You can't use up creativity, the more you use, the more you have in your significant mind.”</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-yellow-400 text-[#232532] rounded-xl p-8 font-bold text-xl shadow-lg">Product Designer.<br /><span className="text-base font-normal">124 Projects</span></div>
          <div className="bg-[#232532] border border-gray-700 rounded-xl p-8 font-bold text-xl text-white shadow-lg">Branding Designer.<br /><span className="text-base font-normal text-gray-300">37 Projects</span></div>
          <div className="bg-[#232532] border border-gray-700 rounded-xl p-8 font-bold text-xl text-white shadow-lg">Full Stack Developer.<br /><span className="text-base font-normal text-gray-300">62 Projects</span></div>
        </div>
      </section>

      {/* Blog & Testimonials Section */}
      <section className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-yellow-400 text-lg font-semibold mb-4">Latest Blog</h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center bg-[#232532] rounded-lg p-4 border border-gray-700">
              <span className="text-gray-200">Let this be a lesson to you</span>
              <span className="text-yellow-400">→</span>
            </li>
            <li className="flex justify-between items-center bg-[#232532] rounded-lg p-4 border border-gray-700">
              <span className="text-gray-200">How do you use time tracking for projects?</span>
              <span className="text-yellow-400">→</span>
            </li>
            <li className="flex justify-between items-center bg-[#232532] rounded-lg p-4 border border-gray-700">
              <span className="text-gray-200">Ego and empathy in design</span>
              <span className="text-yellow-400">→</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-yellow-400 text-lg font-semibold mb-4">Testimonial</h3>
          <div className="bg-[#232532] rounded-xl p-6 border border-gray-700">
            <p className="text-gray-300 italic mb-4">Amazing! At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-600" />
              <div>
                <div className="font-semibold text-white">Jared Warner</div>
                <div className="text-gray-400 text-sm">Lead Developer</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 