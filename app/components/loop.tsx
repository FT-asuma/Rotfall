"use client";
import React from "react";
const LOOP_STEPS = [
  {
    step: "01",
    title: "Scavenge & Secure",
    desc: "Harvest vital tech fragments and raw ammo caches from hostile domains.",
  },
  {
    step: "02",
    title: "Reinforce Node",
    desc: "Fortify grid outposts and construct barricades before the daylight dies.",
  },
  {
    step: "03",
    title: "Endure the Purge",
    desc: "Defend against non-linear waves of otherworldly horrors that morph to counter you.",
  },
];

export const Loop = () => {
  return (
    <div className="space-y-4 pt-6">
      {LOOP_STEPS.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col sm:flex-row gap-4 p-5 md:p-6 border border-emerald-950/60 rounded-xl bg-[#030303] hover:border-emerald-500/30 transition-colors"
        >
          <div className="text-emerald-500 font-mono font-bold text-xl">
            {item.step}/
          </div>
          <div>
            <h4 className="text-slate-200 font-bold uppercase text-lg">
              {item.title}
            </h4>
            <p className="text-slate-500 text-sm md:text-base mt-2">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
