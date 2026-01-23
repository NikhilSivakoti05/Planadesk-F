import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import {
  Calendar,
  Lightbulb,
  Rocket,
  Award,
  Globe,
  TrendingUp,
  Target,
  Users,
  Heart,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bb6 from "/src/components/assets/planadeskimage6.png";
import milestone1 from "/src/components/assets/milestone1.jpg";
import milestone2 from "/src/components/assets/milestone2.jpg";
import milestone3 from "/src/components/assets/milestone3.jpg";
import milestone4 from "/src/components/assets/milestone4.jpg";
import milestone5 from "/src/components/assets/milestone5.jpg";
import planadeskimage1 from "/src/components/assets/planadeskimage1.png";
import boss from "/src/components/assets/WhatsApp Image 2025-10-15 at 15.48.19_e7959d89.jpg";

const cn = (...inputs) => twMerge(clsx(inputs));

const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DialogDescription.displayName = "DialogDescription";

const team = [
  {
    name: "Alex Richmond",
    role: "Product Engineer",
    image: boss,
    socials: { facebook: "#", twitter: "#", instagram: "#" },
  },
  {
    name: "Jeffrey Brown",
    role: "Creative Lead",
    image: boss,
    socials: { facebook: "#", twitter: "#", instagram: "#" },
  },
  {
    name: "Connor Quinn",
    role: "Industrial Designer",
    image: "https://images.pexels.com/photos/2182971/pexels-photo-2182971.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    socials: { facebook: "#", twitter: "#", instagram: "#" },
  },
  {
    name: "Ann Smith",
    role: "Operations Lead",
    image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    socials: { facebook: "#", twitter: "#", instagram: "#" },
  },
  {
    name: "Sarah Johnson",
    role: "Customer Success",
    image: "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    socials: { facebook: "#", twitter: "#", instagram: "#" },
  },
];

const journeyMilestones = [
  {
    year: "Early Years",
    title: "Curiosity Becomes Purpose",
    description: "A hands-on curiosity for how things work laid the foundation for a life of problem-solving.",
    detail:
      "Our founder's real time experience as a barber from the age of 10 in a small island country, the struggles he faced while going home to home for service, driven him to build a portable workstation which changed his business.",
    icon: Lightbulb,
    image: milestone1,
  },
  {
    year: "First Concept",
    title: "From Idea to Physical Form",
    description: "The first attempt at building a solution focused on function, not beauty.",
    detail:
      "Early sketches evolved into rough, handmade prototypes using wood and basic hardware. These early builds were heavy, raw, and imperfect — but they proved something important: a compact, fold-out mobile workstation was possible and genuinely useful.",
    icon: Rocket,
    image: milestone3,
  },
  {
    year: "Professional Growth",
    title: "Learning While Building",
    description: "Career growth ran in parallel with quiet product evolution.",
    detail:
      "While broadcasting became a full-time focus, design never stopped. Each prototype informed the next — drawer placement, fold-out surfaces, storage depth, wheel stability. The product matured slowly, shaped by real use rather than assumptions.",
    icon: Award,
    image: milestone4,
  },
  {
    year: "Reinvention",
    title: "Beyond Barbering",
    description: "The problem was bigger than one profession.",
    detail:
      "Feedback from beauticians, makeup artists, and mobile professionals revealed the same challenges across industries. The design evolved from a barber-specific tool into a broader system — adaptable, modular, and profession-agnostic. This evolution became Belle Booth.",
    icon: TrendingUp,
    image: milestone5,
  },
  {
    year: "Today",
    title: "A Refined, Modular Vision",
    description: "What began as a rough prototype is now a purpose-built platform.",
    detail:
      "Under Randolph, decades of trial & error and live experience come together in a modular workstation system. Every line, hinge, drawer, and surface reflects lessons learned the hard way — proving that meaningful innovation takes time, patience, and respect for the craft.",
    icon: Globe,
    image: planadeskimage1,
  },
];

function AboutUs() {
  const heroRef = useRef(null);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [imageSrc] = useState(boss);

  useEffect(() => {
    const handleScroll = () => {
      void window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap');
        
        :root {
          --font-heading: 'Montserrat', sans-serif;
          --font-body: 'Roboto', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-heading);
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        body, p, span, div, button {
          font-family: var(--font-body);
        }
        
        .luxury-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #000000, transparent);
          opacity: 0.15;
        }
        
        .premium-badge {
          font-family: var(--font-body);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #666666;
          font-weight: 600;
        }
      `}</style>

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="relative min-h-screen lg:h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${bb6})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        
        <div className="relative z-10 text-center px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto w-full">
          <div className="space-y-8 md:space-y-10">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-none text-sm font-semibold animate-pulse">
              <Target className="w-4 h-4" />
              <span>Transforming Mobile Workspaces</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Transforming
              <span className="block text-white/90">Mobile Workspaces,</span>
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white/80 mt-4">
                Everywhere.
              </span>
            </h1>

            <div className="w-20 h-1 bg-[#D84315] mx-auto" />

            <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Plan A Desk exists to help you grow. We target expanding your business and giving you freedom to work anywhere.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link
                to="/contactus"
                className="group relative px-10 md:px-12 py-4 md:py-5 bg-black text-white font-semibold text-base rounded-none shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                style={{
                  fontFamily: "var(--font-body)",
                  letterSpacing: "0.05em",
                }}
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <button className="px-10 md:px-12 py-4 md:py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-none font-semibold text-base transition-all duration-300 hover:bg-white/20 hover:border-white/50">
                Learn More
              </button>
            </div>
          </div>
        </div>

        <a
          href="#principles"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white hover:text-white/70 transition-all duration-300 animate-bounce"
        >
          <ChevronDown size={32} />
        </a>
      </section>

      {/* PRINCIPLES SECTION */}
      <section id="principles" className="relative py-24 md:py-32 lg:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="luxury-divider" style={{ width: "24px" }} />
              <span className="premium-badge">Our Core Principles</span>
              <div className="luxury-divider" style={{ width: "24px" }} />
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-none font-bold text-black mb-8" style={{ fontFamily: "var(--font-heading)" }}>
              Design that Respects
              <br />
              <span className="block">Your Work</span>
            </h2>

            <div className="w-20 h-1 bg-[#d84315] mx-auto mb-8" />

            <p className="text-lg lg:text-xl text-black/70 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Every fold, surface, and proportion in Plan A Desk is intentional — built to support real professionals with real clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Precision",
                description: "We obsess over the millimeters that others overlook so your workspace feels stable, balanced, and dependable.",
                icon: Target,
              },
              {
                title: "Materials",
                description: "Durable shells, reinforced joints and thought-through hardware give you a desk that's built to move and last.",
                icon: Award,
              },
              {
                title: "Focus",
                description: "No boundaries, no setbacks. Just the features that keep you focused, organised and professional.",
                icon: Heart,
              },
            ].map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div
                  key={index}
                  className="group bg-[#D] border border-black/10 rounded-none p-8 hover:border-[#d84315] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="w-14 h-14 bg-black/8 rounded-none flex items-center justify-center mb-6 group-hover:bg-[#D84315] group-hover:text-white transition-all duration-300">
                    <Icon className="w-7 h-7 text-black group-hover:text-white" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-xl font-bold text-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                    {principle.title}
                  </h3>

                  <p className="text-sm text-black/60 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* JOURNEY SECTION */}
      <section id="journey" className="relative py-24 md:py-32 lg:py-40 bg-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-none font-bold text-black mb-8" style={{ fontFamily: "var(--font-heading)" }}>
              Our Journey
            </h2>
            <p className="text-lg lg:text-xl text-black/70 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
              Our idea born out of real life struggles, engineered to bring freedom to professionals.
            </p>
            <p className="text-lg lg:text-xl text-black font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
              Founder Randolph&apos;s Story
            </p>
          </div>

          <div className="hidden lg:block relative max-w-6xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/15 transform -translate-x-1/2"></div>

            <div className="space-y-20">
              {journeyMilestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={milestone.year}
                    className={`relative flex items-stretch ${isEven ? "flex-row" : "flex-row-reverse"} gap-12`}
                  >
                    <div className={`flex-1 ${isEven ? "pr-12" : "pl-12"}`}>
                      <div className="bg-white border border-black/10 rounded-none p-8 hover:border-black/25 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                        <div className="text-3xl font-bold text-black mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                          {milestone.year}
                        </div>
                        <h3 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                          {milestone.title}
                        </h3>
                        
                        {milestone.image && (
                          <div className="mb-6 overflow-hidden rounded-none">
                            <img
                              src={milestone.image}
                              alt={milestone.title}
                              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        
                        <p className="text-sm text-black/60 leading-relaxed mb-6 flex-grow" style={{ fontFamily: "var(--font-body)" }}>
                          {milestone.description}
                        </p>

                        <button
                          onClick={() => setSelectedMilestone(milestone)}
                          className="bg-black text-white px-6 py-3 rounded-none font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          Read More
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedMilestone(milestone)}
                      className="absolute left-1/2 top-8 transform -translate-x-1/2 w-16 h-16 bg-white border-4 border-black rounded-full flex items-center justify-center z-10 hover:bg-black hover:text-white transition-all duration-300 group shadow-lg flex-shrink-0"
                    >
                      <Icon className="text-black group-hover:text-white transition-colors duration-300" size={24} />
                    </button>

                    <div className="flex-1" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6 lg:hidden">
            {journeyMilestones.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.year} className="bg-white border border-black/10 rounded-none p-6 hover:border-black/25 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#D84315] rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-black uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                        {step.year}
                      </div>
                      <h3 className="text-lg font-bold text-black" style={{ fontFamily: "var(--font-heading)" }}>
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {step.image && (
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-40 object-cover rounded-none mb-4"
                    />
                  )}

                  <p className="text-sm text-black/60 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
                    {step.description}
                  </p>

                  <button
                    onClick={() => setSelectedMilestone(step)}
                    className="text-black font-semibold text-sm hover:text-black/70 transition-colors flex items-center gap-2"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DIALOG */}
      <Dialog open={!!selectedMilestone} onOpenChange={() => setSelectedMilestone(null)}>
        <DialogContent className="max-w-4xl bg-white rounded-none border-2 border-black/10 max-h-[90vh] overflow-y-auto">
          {selectedMilestone && (
            <>
              <DialogHeader className="border-b border-black/10 pb-6">
                <DialogTitle className="text-3xl font-bold text-black mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {selectedMilestone.title}
                </DialogTitle>
                <p className="text-black font-semibold text-sm" style={{ fontFamily: "var(--font-body)" }}>
                  {selectedMilestone.year}
                </p>
              </DialogHeader>

              <div className="space-y-6 py-6">
                <div className="relative h-64 bg-black/5 overflow-hidden rounded-none">
                  <img
                    src={selectedMilestone.image}
                    alt={selectedMilestone.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <p className="text-lg text-black/70 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {selectedMilestone.detail}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* FOUNDER SECTION */}
      <section id="founder" className="relative py-24 md:py-32 lg:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <p className="text-sm font-bold text-black uppercase tracking-wider mb-4" style={{ fontFamily: "var(--font-body)" }}>
                  Founder & CEO
                </p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black" style={{ fontFamily: "var(--font-heading)" }}>
                  Randolph
                  <br />
                  <span className="block">Rolle</span>
                </h2>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-black/5 text-black px-4 py-3 rounded-none border border-black/15">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-body)" }}>User-first mindset</span>
                </div>
                <div className="flex items-center gap-2 bg-black/5 text-black px-4 py-3 rounded-none border border-black/15">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-body)" }}>Built with teams</span>
                </div>
              </div>

              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light italic text-[#D84315] border-l-4 border-black pl-6 my-8" style={{ fontFamily: "var(--font-body)" }}>
                "Innovation begins when frustration meets purpose."
              </blockquote>

              <div className="space-y-6 text-base md:text-lg text-black/70 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                <p>
                  My journey spans decades of working in real, unpredictable environments — from mobile barbering to broadcast media. Those experiences taught me that professionalism is not defined by skill alone, but by how efficiently, confidently, and consistently you are able to work wherever you are.
                </p>
                <p>
                  Plan A Desk is the result of years of observation, refinement, and lived problem-solving — a workspace designed to adapt instantly, move effortlessly, and respect the expertise of the person using it. <span className="text-black font-semibold">Because your workspace should elevate your work, wherever it takes you.</span>
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white border-2 border-black/10 rounded-none p-6 shadow-lg">
                <img
                  src={imageSrc}
                  alt="Founder portrait"
                  className="w-full h-96 md:h-[500px] object-cover"
                />
                <div className="absolute top-12 right-12 bg-black text-white px-4 py-2 rounded-none shadow-lg">
                  <span className="text-sm font-bold uppercase tracking-wider" style={{ fontFamily: "var(--font-body)" }}>Founder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="relative py-24 md:py-32 lg:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {team.slice(0, 2).map((member, index) => (
                  <div
                    key={index}
                    className="bg-white border border-black/10 rounded-none p-6 hover:border-black/25 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 text-center"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 overflow-hidden border-2 border-black/15">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                      {member.name}
                    </h3>
                    <p className="text-black font-semibold text-sm" style={{ fontFamily: "var(--font-body)" }}>
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {team.slice(2, 5).map((member, index) => (
                  <div
                    key={index + 2}
                    className="bg-white border border-black/10 rounded-none p-6 hover:border-black/25 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 overflow-hidden border-2 border-black/15">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-base font-bold text-black mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                      {member.name}
                    </h3>
                    <p className="text-black font-semibold text-xs" style={{ fontFamily: "var(--font-body)" }}>
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8 lg:pl-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black" style={{ fontFamily: "var(--font-heading)" }}>
                Our Team
              </h2>

              <div className="space-y-6 text-base md:text-lg text:black/70 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                <p>
                  Plan A Desk is built by designers, engineers, and operators who believe that <span className="underline decoration-black underline-offset-4 font-semibold text-black">every professional deserves a workspace that reflects their expertise</span>. Our team brings together practical engineering, thoughtful design, and firsthand operational experience to solve problems that appear only when work is done in motion.
                </p>
                <p>
                  We combine Indian manufacturing strength with a global design perspective — balancing durability, precision, and affordability — to create workstations that perform reliably in real environments. Every product is shaped by real-world constraints, real workflows, and real budgets, ensuring that professionals never have to choose between quality, mobility, and value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-16 md:py-20 bg-gray-200">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-white border-4 border-black/20 rounded-none shadow-lg p-8 md:p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#D84315]"></div>
            
            <div className="text-center space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                Ready to transform how you
                <span className="block">work on the move?</span>
              </h2>

              <p className="text-lg md:text-xl text-black/70 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
                Plan A Desk is more than a mobile desk — it&apos;s a daily reminder that your workspace can match your ambition, wherever your work takes you.
              </p>

              <Link
                to="/contactus"
                className="inline-flex items-center gap-3 bg-black hover:bg:black/90 text-white px-10 md:px-12 py-4 md:py-5 rounded-none font-semibold text-base transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
                style={{
                  fontFamily: "var(--font-body)",
                  letterSpacing: "0.05em",
                }}
              >
                <span>Talk to Sales</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORT SECTION */}
      <section id="contact" className="relative py-24 md:py-32 lg:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-none font-bold text-black mb-8" style={{ fontFamily: "var(--font-heading)" }}>
              We&apos;re here to help
            </h2>
            <p className="text-lg lg:text-xl text-black/70 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Whether you&apos;re exploring, evaluating, or ready to roll out, our team is one message away.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MessageCircle,
                title: "Live Chat",
                description: "Quick answers for quick decisions",
              },
              {
                icon: Mail,
                title: "Email Support",
                description: "support@planadesk.com",
              },
              {
                icon: Phone,
                title: "Call Us",
                description: "+1 (555) 123-4567",
              },
              {
                icon: Clock,
                title: "Always On",
                description: "We align with your workday",
              },
            ].map((support, index) => {
              const Icon = support.icon;
              return (
                <div 
                  key={index} 
                  className="group bg-white border border-black/10 rounded-none p-8 hover:border-black/25 hover:shadow-lg transition-all duration-300 text-center hover:scale-105 transform"
                >
                  <div className="w-14 h-14 bg-[#D83415] rounded-none flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-white w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-black mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    {support.title}
                  </h3>

                  <p className="text-sm text-black/60 mb-4" style={{ fontFamily: "var(--font-body)" }}>
                    {support.description}
                  </p>

                  <button className="text-sm font-semibold text-black hover:text-black/70 transition-colors" style={{ fontFamily: "var(--font-body)" }}>
                    Learn More →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;

