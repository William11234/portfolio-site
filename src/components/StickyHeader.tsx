"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText, Linkedin } from "lucide-react"
import emailjs from "emailjs-com"
import { toast } from "react-toastify"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface StickyHeaderProps {
  projectsRef: React.RefObject<HTMLElement | null>
  techStackRef: React.RefObject<HTMLElement | null>
  contactRef: React.RefObject<HTMLElement | null>
}

export default function StickyHeader({ projectsRef, techStackRef }: StickyHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [emailError, setEmailError] = useState("")
  const [nameError, setNameError] = useState("")

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault() // Prevents the page from refreshing
    toast.clearWaitingQueue()
    const toastId = toast.loading("Sending email...", {
      position: "top-right",
    })
    setEmailError("")
    setNameError("")

    if (!name || !email || !message) {
      toast.dismiss(toastId)
      toast.error("All fields are required!", {
        position: "top-right",
        autoClose: 3000,
      })
      return
    }

    // Forbidden characters for name, email, and message
    const forbiddenChars = /[<>]/
    if (forbiddenChars.test(name)) {
      toast.dismiss(toastId)
      setNameError("Name contains forbidden characters like < or >")
      return
    }

    if (forbiddenChars.test(email)) {
      toast.dismiss(toastId)
      setEmailError("Email contains forbidden characters like < or >")
      return
    }

    // Custom email validation (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.dismiss(toastId)
      setEmailError("Please enter a valid email address")
      return
    }
    emailjs
      .send(
        "service_rrzktvl",
        "template_pue64w8",
        {
          name: name,
          email: email,
          message: message,
        },
        "C-Rt4CwIxNXMM5nVg",
      )
      .then((res) => {
        toast.dismiss(toastId)
        setName("")
        setEmail("")
        setMessage("")
        setOpen(false)
        toast.success("Email sent successfully!", {
          position: "top-right",
          autoClose: 3000,
        })
        console.log("Email sent!", res.status, res.text)
      })
      .catch((err) => {
        toast.dismiss(toastId)
        toast.error("Failed to send email. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
        })
        console.error("Failed to send email:", err)
      })
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToProjects = () => {
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  const scrollToTechStack = () => {
    if (techStackRef.current) {
      techStackRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  /*const scrollToContact = () => {
            if (contactRef.current) {
                contactRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        };*/

  const toggleContanct = () => {
    if (open) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-opacity duration-300 ${
          scrolled ? "opacity-90" : "opacity-100"
        }`}
      >
        <div className="flex items-center justify-between px-8 py-4 bg-gray-100 dark:bg-gray-900">
            <h1 className="text-2xl sm:text-2xl md:text-4xl font-bold p-2 border-4 border-blue-400 rounded-lg shadow-lg">
                WT.
            </h1>

            <nav className="[@media(max-width:1200px)]:hidden lg:flex flex-1 justify-center gap-4">
                <a
                className="text-sm md:text-base lg:text-lg px-3 py-2 border-2 border-blue-300 rounded-lg shadow-md hover:border-blue-400 cursor-pointer"
                onClick={scrollToProjects}
                >
                Projects
                </a>
                <a
                className="text-sm md:text-base lg:text-lg px-3 py-2 border-2 border-blue-300 rounded-lg shadow-md hover:border-blue-400 cursor-pointer"
                onClick={scrollToTechStack}
                >
                Tech Stack
                </a>
            </nav>

          <div className="[@media(max-width:1200px)]:hidden lg:flex flex-row gap-4 items-center justify-end lg:text-sm w-20">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() =>
                      window.open("https://github.com/William11234?tab=overview&from=2025-05-01&to=2025-05-02", "_blank")
                    }
                    className="bg-white text-black border-2 shadow-md hover:border-black hover:bg-gray-100 hover:cursor-pointer transition duration-300 ease-in-out flex items-center gap-2"
                  >
                    <span className="mr-2">GitHub</span>
                    <ExternalLink size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-yellow-200 text-black text-sm p-2 rounded-md shadow-md">
                  Warning: School Projects are done in GitLab
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              onClick={() => window.open("William_Terterian_cv_en.pdf", "_blank")}
              className="bg-white text-black border-2 shadow-md hover:border-black hover:bg-gray-100 hover:cursor-pointer transition duration-300 ease-in-out flex items-center gap-2"
            >
              <span className="mr-2">CV</span>
              <FileText size={16} />
            </Button>

            <button
              className="flex px-4 py-2 text-blue-400 font-bold border-4 border-blue-400 rounded-lg hover:bg-blue-100 hover:cursor-pointer shadow-md transition duration-300 ease-in-out"
              onClick={toggleContanct}
            >
              Contact
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="[@media(min-width:1201px)]:hidden w-14 h-14">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-menu ease-in-out duration-300 hover:bg-gray-100 hover:cursor-pointer transition"
                >
                  <line x1="1" x2="40" y1="12" y2="12"></line>
                  <line x1="1" x2="40" y1="4" y2="4"></line>
                  <line x1="1" x2="40" y1="20" y2="20"></line>
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] sm:w-[300px]">
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 py-4">
                <Button
                  variant="ghost"
                  className="justify-start text-lg hover:cursor-pointer"
                  onClick={() => {
                    scrollToProjects()
                    document
                      .querySelector('[data-state="open"]')
                      ?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
                  }}
                >
                  Projects
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-lg hover:cursor-pointer"
                  onClick={() => {
                    scrollToTechStack()
                    document
                      .querySelector('[data-state="open"]')
                      ?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
                  }}
                >
                  Tech Stack
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start text-lg hover:cursor-pointer"
                  onClick={() => {
                    toggleContanct()
                    document
                      .querySelector('[data-state="open"]')
                      ?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
                  }}
                >
                  Contact Me
                </Button>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="justify-start text-lg hover:cursor-pointer"
                        onClick={() =>
                          window.open("https://github.com/William11234?tab=overview&from=2025-05-01&to=2025-05-02", "_blank")
                        }
                      >
                        <ExternalLink size={16} className="mr-2" />
                        GitHub
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-yellow-200 text-black text-xs p-2 rounded-md shadow-md">
                      Warning: School Projects are done in GitLab
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                  
                <Button
                  variant="ghost"
                  className="justify-start text-lg hover:cursor-pointer"
                  onClick={() => window.open("William_Terterian_cv_en.pdf", "_blank")}
                >
                  <FileText size={16} className="mr-2" />
                  CV
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="hidden" />
            <SheetContent side="right" className="w-1/2">
              <SheetHeader>
                <SheetTitle className="text-4xl text-center text-blue-400 font-bold">Contact Me</SheetTitle>
                <SheetDescription className="flex flex-col items-center justify-center gap-4 mt-4 w-full px-4">
                  <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center gap-4">
                      <label htmlFor="name" className="block text-lg text-gray-700 dark:text-gray-300 mb-1 font-bold">
                        Your Name:
                      </label>
                      <Input
                        id="name"
                        type="name"
                        placeholder="Name"
                        className="w-full !text-lg text-gray-700 dark:text-gray-300 border-2 border-blue-300 rounded-lg shadow-md focus:border-blue-400 focus:ring focus:ring-blue-200 p-4"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                      />
                      {nameError && <p className="text-sm text-red-500 mt-1">{nameError}</p>}
                    <div className="w-full">
                      <label htmlFor="email" className="block text-lg text-gray-700 dark:text-gray-300 mb-1 font-bold">
                        Your Email Address:
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="w-full !text-lg text-gray-700 dark:text-gray-300 border-2 border-blue-300 rounded-lg shadow-md focus:border-blue-400 focus:ring focus:ring-blue-200 p-4"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />
                      {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="message"
                        className="block text-lg text-gray-700 dark:text-gray-300 mb-1 font-bold"
                      >
                        Your Message:
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Your Message"
                        className="w-full !text-lg text-gray-700 dark:text-gray-300 border-2 border-blue-300 rounded-lg shadow-md focus:border-blue-400 focus:ring focus:ring-blue-200 p-4 mt-4"
                        rows={10}
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        required
                        maxLength={500}
                      />
                    </div>
                    <button
                      className="flex px-4 py-2 text-blue-400 font-bold border-3 border-blue-400 rounded-lg hover:bg-blue-100 hover:cursor-pointer shadow-md transition duration-300 ease-in-out mt-4"
                      onClick={handleSubmit}
                    >
                      Send Message
                    </button>
                  </form>

                  <Button
                    variant="outline"
                    className="mt-4 flex items-center gap-2 text-blue-400 border-blue-400 hover:bg-blue-100 hover:cursor-pointer shadow-md transition duration-300 ease-in-out"
                    asChild
                  >
                    <a
                      href="https://www.linkedin.com/in/william-terterian-625860259/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-5 h-5" />
                      LinkedIn
                    </a>
                  </Button>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  )
}
