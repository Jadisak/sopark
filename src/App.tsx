import React, { useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Linkedin, Mail, Phone } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  const headerRef = useRef<HTMLDivElement>(null);
  const filmRef = useRef<HTMLSpanElement>(null);
  const nickRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const workItemsRef = useRef<HTMLDivElement[]>([]);
  const aboutItemsRef = useRef<HTMLDivElement[]>([]);
  const pageTransitionRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Page load animation
  useEffect(() => {
    // Initial page transition
    const tl = gsap.timeline();
    
    if (pageTransitionRef.current) {
      tl.fromTo(
        pageTransitionRef.current,
        { y: 0 },
        { y: '-100%', duration: 1.2, ease: 'power4.out', delay: 0.5 }
      );
    }

    // Header animations
    if (filmRef.current && nickRef.current && descRef.current) {
      tl.fromTo(
        filmRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
        .fromTo(
          nickRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          descRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.2'
        );
    }

    // Navbar animation
    if (navRef.current) {
      tl.fromTo(
        navRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      );
    }

    // Setup scroll animations
    if (workItemsRef.current.length > 0) {
      workItemsRef.current.forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        );
      });
    }

    if (aboutItemsRef.current.length > 0) {
      aboutItemsRef.current.forEach((item, index) => {
        gsap.fromTo(
          item,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        );
      });
    }

    // Parallax effect for header
    if (headerRef.current) {
      gsap.to(headerRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    return () => {
      // Clean up all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle section transitions
  const handleNavClick = (sectionId: string) => {
    setMenuOpen(false);
    
    // Create transition effect
    if (pageTransitionRef.current) {
      const tl = gsap.timeline();
      
      tl.fromTo(
        pageTransitionRef.current,
        { y: '-100%' },
        { 
          y: 0, 
          duration: 0.6, 
          ease: 'power3.in',
          onComplete: () => {
            // Scroll to section
            const section = document.getElementById(sectionId);
            if (section) {
              window.scrollTo({
                top: section.offsetTop - 80,
                behavior: 'auto'
              });
            }
            
            // Hide transition overlay
            gsap.to(pageTransitionRef.current, {
              y: '-100%',
              duration: 0.6,
              delay: 0.2,
              ease: 'power3.out'
            });
          }
        }
      );
    }
  };

  // Add work item to refs
  const addToWorkRefs = (el: HTMLDivElement) => {
    if (el && !workItemsRef.current.includes(el)) {
      workItemsRef.current.push(el);
    }
  };

  // Add about item to refs
  const addToAboutRefs = (el: HTMLDivElement) => {
    if (el && !aboutItemsRef.current.includes(el)) {
      aboutItemsRef.current.push(el);
    }
  };

  return (
    <>
      {/* Page transition overlay */}
      <div 
        ref={pageTransitionRef} 
        className="fixed top-0 left-0 w-full h-screen bg-black z-50 transform"
      ></div>

      <div className="bg-[url('img/image-7.jpg')] bg-cover bg-top w-full h-[150vh] bg-fixed">
        <nav ref={navRef} className="bg-black/90 backdrop-blur-sm fixed w-full z-30">
          <div className="max-w-5xl mx-auto px-4 lg:px-0">
            <div className="relative flex items-center justify-between h-fit py-3">
              <div className="uppercase text-white font-bold text-3xl">
                Sopark <span className="font-thin text-yellow-300">vfx</span>
              </div>
              
              {/* Desktop Menu */}
              <ul className="md:flex items-center space-x-8 text-yellow-300 text-lg hidden">
                <li><a href="#" onClick={() => handleNavClick('home')} className="hover:text-white transition-colors duration-300">Home</a></li>
                <li><a href="#work" onClick={() => handleNavClick('work')} className="hover:text-white transition-colors duration-300">Work</a></li>
                <li><a href="#about" onClick={() => handleNavClick('about')} className="hover:text-white transition-colors duration-300">About</a></li>
                <li><a href="#contact" onClick={() => handleNavClick('contact')} className="hover:text-white transition-colors duration-300">Contact</a></li>
              </ul>
              
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button 
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="text-yellow-300 hover:text-white transition-colors duration-300"
                >
                  {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Mobile Menu */}
        <div 
          ref={menuRef}
          className={`fixed top-[56px] left-0 w-full bg-black/95 backdrop-blur-sm z-20 transform transition-transform duration-500 ease-in-out ${
            menuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <ul className="flex flex-col items-center space-y-6 py-8 text-yellow-400 text-xl">
            <li><a href="#" onClick={() => handleNavClick('home')} className="hover:text-white transition-colors duration-300">Home</a></li>
            <li><a href="#work" onClick={() => handleNavClick('work')} className="hover:text-white transition-colors duration-300">Work</a></li>
            <li><a href="#about" onClick={() => handleNavClick('about')} className="hover:text-white transition-colors duration-300">About</a></li>
            <li><a href="#contact" onClick={() => handleNavClick('contact')} className="hover:text-white transition-colors duration-300">Contact</a></li>
          </ul>
        </div>
        
        <div className="absolute w-full h-auto backdrop-blur hover:backdrop-blur-none duration-1000 bg-gray-600/30">
          <header ref={headerRef} className="-pt-6 overflow-hidden" id="home">
            <div className="h-[150vh] max-w-5xl mx-auto py-0 px-4 lg:px-0">
              <div className="md:flex flex flex-col h-[120vh] z-10 pt-48">
                {/* title */}
                <h1 className="font-bold text-[12rem] flex flex-col text-gray-200">
                  <span 
                    ref={filmRef} 
                    id="film" 
                    className="drop-shadow-lg leading-[6rem] space-grotesk-20x tracking-tighter animate-pulse"
                  >
                    film
                  </span>
                    <span 
                    ref={nickRef} 
                    id="nick" 
                    className="text-[2.6rem] md:text-[3rem] font-thin leading-[6rem] z-10 tracking-wider text-yellow-300"
                    >
                        [<span className="text-white/0">.</span>my<span className="text-white/0">.</span>nickname<span className="text-white/0">.</span>]
                    </span>
                </h1>
                <p 
                  ref={descRef} 
                  className="text-white pl-4 pr-6 mt-16 border-l md:w-2/3 tracking-wider text-lg font-thin text-pretty md:text-balance"
                >
                  "FILM" Thailand-based CG artist with a strong foundation in visual effects, cultivated since the age of 19. Transitioned to a professional career in 2014, and have since delivered compelling composite, lighting, and FX work for feature films and games.
                </p>
              </div>
            </div>
          </header>
          
          {/* Contents */}
          <div id="work" className="bg-stone-900 text-white">
            {/* Work */}
            <div className="bg-white/0 w-full h-12 spacer"></div>
            <p ref={addToWorkRefs} className='font-thin text-4xl text-white pt-12 text-center w-full'>Work</p>
            <section className="h-fit max-w-5xl mx-auto md:grid sm:grid-cols-4 pb-24 md:px-4 px-12 md:gap-4 gap-y-8 z-10">
              <a href="https://youtu.be/Q2VFl91oa0Q?si=nppflZkEbS8pKTaK" target="_blank">
              <div ref={addToWorkRefs} className="overflow-hidden bg-cover rounded-md aspect-video my-6 bg-[url('img/ElexII.webp')]">
              </div></a>

              <a href="https://youtu.be/uQqOwM4XjpY?si=4cFvQSCyezX7yFXn" target="_blank">
              <div ref={addToWorkRefs} className="overflow-hidden bg-cover rounded-md aspect-video my-6 bg-[url('img/Elex.webp')]">
              </div></a>
              
              <div ref={addToWorkRefs} className="overflow-hidden bg-cover rounded-md aspect-video my-6">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/ZXApnj-ztIE?si=jCHe33la91pH29pj" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              </div>
              
              <div ref={addToWorkRefs} className="overflow-hidden bg-cover rounded-md aspect-video my-6">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/nXXXah2pmXk?si=CmH1q-OFqCpVvIEG" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              </div>
              
              <div ref={addToWorkRefs} className="overflow-hidden bg-cover rounded-md aspect-video my-6">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/B5_aRsGiHwo?si=OiBdZHmZjs-_L60y" title="YouTube video player"  frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              </div>

              <div ref={addToWorkRefs} className="overflow-hidden bg-cover rounded-md aspect-video my-6">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/1TIa042jr_k?si=z-JENw-LbrGftXU9" title="YouTube video player"  frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              </div>

              <div ref={addToWorkRefs} className="overflow-hidden bg-cover rounded-md aspect-video my-6">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/4Qtg08pWdiM?si=h4rWM1F7heujgwHi" title="YouTube video player"  frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              </div>

              <div ref={addToWorkRefs} className="overflow-hidden bg-cover rounded-md aspect-video my-6">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/yT73JXfVVLc?si=ySLSg6gqhHdCAonh" title="YouTube video player"  frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              </div>

              <div ref={addToWorkRefs} className="overflow-hidden bg-cover rounded-md aspect-video my-6">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/mwqSJ_oNSz4?si=tkcIF99xwaB7B7r3" title="YouTube video player"  frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              </div>

              <div ref={addToWorkRefs} className="overflow-hidden bg-cover rounded-md aspect-video my-6">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/2ELWjhXLE40?si=yUAe4ottgr5Ql-LM" title="YouTube video player"  frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              </div>

              <div ref={addToWorkRefs} className="overflow-hidden bg-cover rounded-md aspect-video my-6">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/ZBwV-MzmZS4?si=uSOaeQPEeedxB7wT" title="YouTube video player"  frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              </div>

              <div ref={addToWorkRefs} className="overflow-hidden bg-cover rounded-md aspect-video my-6">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/2Ns08qn7qUg?si=RWPx0aoL6PW9liLN" title="YouTube video player"  frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              </div>
              
            </section>
            
            {/* About */}
            <section id="about" className="z-20 grid grid-cols-1 md:grid-cols-3 grid-rows-none gap-4 max-w-5xl mx-auto pb-20 px-8">
              <h1 className="col-start-2 col-end-4 font-thin text-4xl py-6">Professional Experience</h1>
              <div ref={addToAboutRefs} className="col-start-2 col-end-4 space-y-4">
                <h3 className="text-2xl font-bold">The Monk Studio</h3>
                <h4 className="text-yellow-300">Feb 2023 - Sep 2023 | FX Artist</h4>
                <p className="text-sm">FX Water Simulation: Developed and executed complex water simulations for animated features, ensuring realistic and visually compelling effects. Houdini Master Scene Setup: Led the creation of a robust Houdini master scene setup for the river sequence, empowering junior FX artists to efficiently contribute to the project. Cinematic Game FX: Designed and implemented dynamic fire explosion effects for cinematic game sequences, enhancing visual impact and player immersion.</p>
              </div>
              <div ref={addToAboutRefs} className="col-start-2 col-end-4 space-y-4">
                <h3 className="text-2xl font-bold">Yggdrazil Group</h3>
                <h4 className="text-yellow-300">May 2020 - Dec 2021 | FX Artist</h4>
                <p className="text-sm">Composite Lighting shot • Animation feature film • Fx Water Simulation animation feature film • Lead River Sequence Creat Houdini master scene setup for Junior Fx Artist • River surface lookdev wite RedShift Render • Fx Fire Explosion for Cinematic game.</p>
              </div>
              <div ref={addToAboutRefs} className="col-start-2 col-end-4 space-y-4">
                <h3 className="text-2xl font-bold">RiFF Studio</h3>
                <h4 className="text-yellow-300">Dec 2014 - Apr 2020 | Computer Graphic Artist</h4>
                <p className="text-sm">Shading ,Lighting Shot and Composite ,Cinematic game Animation Feature Film.
                Animation feature Film , Fx Water Simulation.</p>
              </div>
              <div ref={addToAboutRefs} className="col-start-2 col-end-4 space-y-4">
                <h3 className="text-2xl font-bold">Renegade Post</h3>
                <h4 className="text-yellow-300">Feb 2014 - Jun 2014 | VFX Artist</h4>
                <p className="text-sm">Composite & Lighting: Produced high-quality composite and lighting shots for animated feature films. FX Water Simulation: Created realistic water simulations for animated feature films.</p>
              </div>
              <div ref={addToAboutRefs} className="col-start-2 col-end-4 space-y-4">
                <h3 className="text-2xl font-bold">Imagimax Studio</h3>
                <div className="">
                  <h4 className="text-yellow-300">May 2012 - Jan 2014 | Digital Compositor</h4>
                  <h4 className="text-yellow-300">Oct 2011 - Mar 2012 | Trainee</h4>
                </div>
                <p className="text-sm">Composite Animation TV Series, VFX TVC ,Shading Lighting Look Dev
                Match move, On set VFX.</p>
              </div>
            </section>
            
            {/* Contact Section */}
            <section id="contact" className="bg-stone-700 pt-16 pb-24 px-4">
              <div className="max-w-4xl mx-auto px-4 sm:px-0">
                <h2 className="text-4xl font-thin mb-8 text-center">Get In Touch</h2>
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="w-full mx-8 md:w-1/2">
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          className="w-full px-4 py-2 bg-stone-600 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          className="w-full px-4 py-2 bg-stone-600 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                        <textarea 
                          id="message" 
                          rows={4} 
                          className="w-full px-4 py-2 bg-stone-600 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                          placeholder="Your message"
                        ></textarea>
                      </div>
                      <button 
                        type="submit" 
                        className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium rounded-md transition-colors duration-300"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                  <div className="w-full mx-8 md:w-1/2 flex flex-col items-start space-y-0 border-y border-gray-500">
                    <div className='pb-6'>
                      <h3 className="text-xl font-semibold py-3 text-yellow-400">Contact Information</h3>
                      <p className="text-gray-300 text-lg">Feel free to reach out for collaborations or just a friendly hello!</p>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300 border-t border-gray-500 w-full px-0">
                      <a href="mailto:filmvideomaker@gmail.com" target="_blank" className="text-yellow-400 hover:text-white px-2">
                        <Mail size={24} />
                      </a><p className='border-l border-gray-500 px-3 py-2.5'>filmvideomaker@gmail.com</p> 
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300 border-t border-gray-500 w-full px-0">
                      <a href="tel:+660840227272" target="_blank" className="text-yellow-400 hover:text-white px-2">
                        <Phone size={24} />
                      </a><p className='border-l border-gray-500 px-3 py-2.5'>(+66) 084 022 7272</p> 
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300 border-t border-gray-500 w-full px-0">
                      <a href="https://www.linkedin.com/in/sopark-chatarasopark-vfx/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B5iXnULnVR2quGHS3tmpxJw%3D%3D" target="_blank" className="text-yellow-400 hover:text-white px-2">
                        <Linkedin size={24} />
                      </a><p className='border-l border-gray-500 px-3 py-2.5'>Sopark (Film) Chatarasopark</p> 
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="bg-white/0 w-full h-12 spacer"></div>
          </div>
        </div>

        <footer className="fixed w-full bottom-0 z-50 bg-gray-950">
          <div className="max-w-5xl mx-auto h-fit flex items-center justify-center md:justify-between text-white px-4 py-3">
            <div className="uppercase text-white font-bold text-xl md:block hidden">
              Sopark <span className="font-thin text-yellow-400">vfx</span>
            </div>
            <p className="flex items-center space-x-4 text-gray-300 text-sm font-extralight tracking-widest">
            Copyright © 2025 | All rights reserved.
            </p>
          </div>
        </footer>
      </div>
      
      {/* Vimeo Script */}
      <script src="https://player.vimeo.com/api/player.js"></script>
    </>
  );
}

export default App;
