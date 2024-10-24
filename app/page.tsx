'use client'
import type {NextPage} from 'next'
import React, {useEffect, useRef, useState} from "react";
import VideoThumb from "../public/images/hero-image-01.jpg";
import WorflowImg01 from "../public/images/workflow-01.png";
import WorflowImg02 from "../public/images/workflow-02.png";
import WorflowImg03 from "../public/images/workflow-03.png";
import Image, {type StaticImageData} from "next/image";
import {Dialog, DialogBackdrop, DialogPanel} from "@headlessui/react";
import BlurredShape from "../public/images/blurred-shape.svg";

const Home: NextPage = () => {
    return (
        <>
            <Hero/>
            <Workflows/>
            <Features/>
            <Cta/>
        </>
    )
}

function Hero() {
    return (
        <section className={"mt-[70px]"}>
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                {/* Hero content */}
                <div className="py-12 md:py-20">
                    {/* Section header */}
                    <div className="pb-12 text-center md:pb-10">
                        <h1
                            className="bg-black bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-3xl font-semibold text-transparent md:text-5xl"
                            data-aos="fade-up"
                        >
                            Skyrocket Your Business with AI Agents
                        </h1>
                        <div className="mx-auto max-w-3xl">
                            <p
                                className="mb-8 text-xl text-black"
                                data-aos="fade-up"
                                data-aos-delay={200}
                            >
                                We build custom AI agents designed to meet the unique needs of your business.
                            </p>
                            <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                                <div data-aos="fade-up" data-aos-delay={400}>
                                    <a
                                        className="btn group p-3 rounded-lg w-full bg-gradient-to-t from-green-200 to-green-100 bg-[length:100%_100%] bg-[bottom] text-black shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                                        href="https://calendly.com/tarwiiga/sales"
                                    >
                    <span className="relative inline-flex items-center">
                      Get Your Free AI Consultation
                      <span
                          className="ml-1 tracking-normal text-black transition-transform group-hover:translate-x-0.5">
                        -&gt;
                      </span>
                    </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ModalVideo
                        thumb={VideoThumb}
                        thumbWidth={1104}
                        thumbHeight={576}
                        thumbAlt="Modal video thumbnail"
                        video="videos//video.mp4"
                        videoWidth={1920}
                        videoHeight={1080}
                    />
                </div>
            </div>
        </section>
    );
}

interface ModalVideoProps {
    thumb: StaticImageData;
    thumbWidth: number;
    thumbHeight: number;
    thumbAlt: string;
    video: string;
    videoWidth: number;
    videoHeight: number;
}

function ModalVideo(
    {
        thumb,
        thumbWidth,
        thumbHeight,
        thumbAlt,
        video,
        videoWidth,
        videoHeight,
    }: ModalVideoProps
) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <div className="relative">
            {/* Video thumbnail */}
            <button
                className="group relative flex items-center justify-center rounded-2xl focus:outline-none focus-visible:ring focus-visible:ring-green-200"
                onClick={() => {
                    setModalOpen(true);
                }}
                aria-label="Watch the video"
                data-aos="fade-up"
                data-aos-delay={200}
            >
                <figure
                    className="relative overflow-hidden rounded-2xl before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-gray-900 before:via-green-200/20 before:to-gray-900">
                    <Image
                        className="opacity-50 grayscale"
                        src={thumb}
                        width={thumbWidth}
                        height={thumbHeight}
                        priority
                        alt={thumbAlt}
                    />
                </figure>
                {/* Play icon */}
                <span
                    className="pointer-events-none absolute p-2.5 before:absolute before:inset-0 before:rounded-full before:bg-gray-950 before:duration-300 group-hover:before:scale-110">
          <span className="relative flex items-center gap-3">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="none"
            >
              <path
                  fill="url(#pla)"
                  fillRule="evenodd"
                  d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Zm3.5-10-5-3.5v7l5-3.5Z"
                  clipRule="evenodd"
              />
              <defs>
                <linearGradient
                    id="pla"
                    x1={10}
                    x2={10}
                    y1={0}
                    y2={20}
                    gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#CBFFD6"/>
                  <stop offset={1} stopColor="#CBFFD6" stopOpacity=".72"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-sm font-medium leading-tight text-gray-300">
              See AI in Action: Watch 2-Min Demo
            </span>
          </span>
        </span>
            </button>
            {/* End: Video thumbnail */}

            <Dialog
                initialFocus={videoRef}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 z-[99999] bg-black/70 transition-opacity duration-300 ease-out data-[closed]:opacity-0"
                />
                <div className="fixed inset-0 z-[99999] flex px-4 py-6 sm:px-6">
                    <div className="mx-auto flex h-full max-w-6xl items-center">
                        <DialogPanel
                            transition
                            className="aspect-video max-h-full w-full overflow-hidden rounded-2xl bg-black shadow-2xl duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                        >
                            <video
                                ref={videoRef}
                                width={videoWidth}
                                height={videoHeight}
                                loop
                                controls
                            >
                                <source src={video} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}


const cards = [
    {
        "title": "Tailored AI Solutions",
        "description": "We don’t believe in one-size-fits-all. Our AI agents are custom-built to address your specific business challenges, ensuring seamless integration with your existing systems and processes.",
        "image": WorflowImg01
    },
    {
        "title": "Automate & Innovate",
        "description": "Automate routine tasks, optimize workflows, and deliver personalized experiences to your customers—our AI agents make it possible, saving time and resources while improving efficiency.",
        "image": WorflowImg02
    },
    {
        "title": "Data-Driven Decision Making",
        "description": "Unlock the full potential of your business data with AI-powered insights that help you make smarter, faster decisions. From predictive analytics to real-time reporting, Trawiiga gives you the tools to stay ahead.",
        "image": WorflowImg03
    },
]


function Workflows() {
    return (
        <section>
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="pb-12 md:pb-20">
                    {/* Section header */}
                    <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
                        <div
                            className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-green-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-green-200/50">
              <span className="inline-flex bg-black bg-clip-text text-transparent">
                Why Choose Tarwiiga AI?
              </span>
                        </div>
                        <h2 className="bg-black bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
                            Boost Revenue with Tailored AI Solutions
                        </h2>
                        <p className="text-lg text-black">
                            Whether you're looking to streamline operations or enhance customer engagement,
                            our tailored AI solutions empower your business to thrive in today’s competitive landscape.
                        </p>
                    </div>
                    {/* Spotlight items */}
                    <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
                        {/* Card 1 */}
                        {cards.map((card) => (
                            <div
                                className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-green-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-green-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 after:hover:opacity-20 before:group-hover:opacity-100"
                            >
                                <div
                                    className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-800 after:absolute after:inset-0 after:bg-gradient-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50"
                                >
                                    {/* Image */}
                                    <Image
                                        className="inline-flex"
                                        src={card.image}
                                        width={350}
                                        height={288}
                                        alt="Workflow 01"
                                    />
                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="mb-3">
                    <span
                        className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="bg-white bg-clip-text text-transparent">
                        {card.title}
                      </span>
                    </span>
                                        </div>
                                        <p className="text-white">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Spotlight>
                </div>
            </div>
        </section>
    );
}

type SpotlightProps = {
    children: React.ReactNode;
    className?: string;
};

function Spotlight(
    {
        children,
        className = "",
    }: SpotlightProps
) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mousePosition = useMousePosition();
    const mouse = useRef<{ x: number; y: number }>({x: 0, y: 0});
    const containerSize = useRef<{ w: number; h: number }>({w: 0, h: 0});
    const [boxes, setBoxes] = useState<Array<HTMLElement>>([]);

    useEffect(() => {
        containerRef.current &&
        setBoxes(
            Array.from(containerRef.current.children).map(
                (el) => el as HTMLElement,
            ),
        );
    }, []);

    useEffect(() => {
        initContainer();
        window.addEventListener("resize", initContainer);

        return () => {
            window.removeEventListener("resize", initContainer);
        };
    }, [boxes]);

    useEffect(() => {
        onMouseMove();
    }, [mousePosition]);

    const initContainer = () => {
        if (containerRef.current) {
            containerSize.current.w = containerRef.current.offsetWidth;
            containerSize.current.h = containerRef.current.offsetHeight;
        }
    };

    const onMouseMove = () => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const {w, h} = containerSize.current;
            const x = mousePosition.x - rect.left;
            const y = mousePosition.y - rect.top;
            const inside = x < w && x > 0 && y < h && y > 0;
            if (inside) {
                mouse.current.x = x;
                mouse.current.y = y;
                boxes.forEach((box) => {
                    const boxX =
                        -(box.getBoundingClientRect().left - rect.left) + mouse.current.x;
                    const boxY =
                        -(box.getBoundingClientRect().top - rect.top) + mouse.current.y;
                    box.style.setProperty("--mouse-x", `${boxX}px`);
                    box.style.setProperty("--mouse-y", `${boxY}px`);
                });
            }
        }
    };

    return (
        <div className={className} ref={containerRef}>
            {children}
        </div>
    );
}

const industries = [
    {
        "name": "Healthcare",
        "description": "Enhance patient care, automate diagnostics, and streamline administration."
    },
    {
        "name": "Finance & Banking",
        "description": "Automate processes, detect fraud, and offer personalized financial services."
    },
    {
        "name": "Retail & E-commerce",
        "description": "Optimize inventory, personalize shopping, and improve customer service."
    },
    {
        "name": "Manufacturing",
        "description": "Automate production, predict maintenance, and optimize supply chains."
    },
    {
        "name": "Logistics & Transportation",
        "description": "Optimize routes, track inventory, and improve fleet management."
    },
    {
        "name": "Education",
        "description": "Create personalized learning, automate grading, and offer AI tutoring."
    },
    {
        "name": "Real Estate",
        "description": "Optimize property valuation, market trends, and customer interactions."
    },
    {
        "name": "Legal Services",
        "description": "Automate document review, legal research, and predict case outcomes."
    },
    {
        "name": "Marketing & Advertising",
        "description": "Analyze behavior, personalize campaigns, and optimize ad spending."
    },
    {
        "name": "Hospitality & Tourism",
        "description": "Enhance guest experiences, automate bookings, and predict demand."
    },
    {
        "name": "Human Resources",
        "description": "Streamline recruitment, monitor performance, and improve engagement."
    },
    {
        "name": "Telecommunications",
        "description": "Optimize networks, improve customer service, and predict churn."
    },
    {
        "name": "Energy & Utilities",
        "description": "Optimize energy consumption, predict malfunctions, and manage grids."
    },
    {
        "name": "Agriculture",
        "description": "Monitor crops, predict yields, and automate farming processes."
    },
    {
        "name": "Entertainment & Media",
        "description": "Personalize content, improve recommendations, and enhance user engagement."
    }
]

function Features() {
    return (
        <section className="relative">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div
                    className="border-t py-12 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.400/.25),transparent)1] md:py-20">
                    {/* Section header */}
                    <div className="mx-auto max-w-3xl pb-4 text-center md:pb-12">
                        <div
                            className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-green-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-green-200/50">
              <span className="inline-flex bg-black bg-clip-text text-transparent">
                Who We Serve?
              </span>
                        </div>
                        <h2 className="bg-black bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
                            Speed up Your Efficiency
                        </h2>
                        <p className="text-lg text-black">
                            Our innovative AI solutions simplify complex processes, boosting productivity across your
                            organization. Let us help you achieve operational excellence and sustainable growth.
                        </p>
                    </div>
                    {/* Items */}
                    <div
                        className="mx-auto grid max-w-sm gap-12 sm:max-w-none sm:grid-cols-2 md:gap-x-14 md:gap-y-16 lg:grid-cols-3">
                        {industries.map((industry, index) => (
                            <article>
                                <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-black">
                                    {industry.name}
                                </h3>
                                <p className="text-black">
                                    {industry.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function Cta() {
    return (
        <section className="relative overflow-hidden">
            <div
                className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-24 ml-20 -translate-x-1/2"
                aria-hidden="true"
            >
                <Image
                    className="max-w-none"
                    src={BlurredShape}
                    width={760}
                    height={668}
                    alt="Blurred shape"
                />
            </div>
            <div className="max-w6xl mx-auto px-4 sm:px-6">
                <div className="bg-gradient-to-r from-transparent via-gray-800/50 py-12 md:py-20">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2
                            className="bg-black bg-[length:200%_auto] bg-clip-text pb-8 font-nacelle text-3xl font-semibold text-transparent md:text-4xl"
                            data-aos="fade-up"
                        >
                            Let’s Transform Your Business Together
                        </h2>
                        <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                            <div data-aos="fade-up" data-aos-delay={400}>
                                <a
                                    className="btn group p-3 rounded-lg w-full bg-gradient-to-t from-green-200 to-green-100 bg-[length:100%_100%] bg-[bottom] text-black shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                                    href="https://calendly.com/tarwiiga/sales?month=2024-10"
                                >
                  <span className="relative inline-flex items-center">
                    Get Your Free AI Consultation
                    <span className="ml-1 tracking-normal text-black transition-transform group-hover:translate-x-0.5">
                      -&gt;
                    </span>
                  </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

interface MousePosition {
    x: number;
    y: number;
}

function useMousePosition(): MousePosition {
    const [mousePosition, setMousePosition] = useState<MousePosition>({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return mousePosition;
}

export default Home
