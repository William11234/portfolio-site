"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useEffect, useState, useRef } from "react"
import StickyHeader from "@/components/StickyHeader"
import ProjectCard from "@/components/ProjectCard"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import TechStack from "@/components/tech-stack"

interface Project {
  id: string
  title: string
  description: string
  imageUrl: string
  images: string[]
  longDescription: string
  technologies: string[]
  demoUrl?: string
  githubUrl?: string
}

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: "1",
      title: "Driessen Offices Reservation System",
      description: "Web app for reserving Driessen office spaces efficiently online.",
      imageUrl: "Driessen_Reserving.png",
      images: [
        "Driessen_Profile.png",
        "Driessen_Reservations.png",
        "Driessen_UserManagement.png",
        "Driessen_Layout.png",
      ],
      longDescription:
        "The Driessen Offices Reservation System is a full-stack web application developed as a group project to streamline the process of reserving office spaces within the Driessen organization. The goal of this system was to provide employees with a clear, fast, and intuitive interface for viewing available office layouts, booking workspaces, and managing their reservations in real-time.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Java", "Spring Boot", "MSSQL", "REST API"],
      demoUrl: "https://ors.jord.cloud/login",
    },
    {
      id: "2",
      title: "Political Bias Classifier",
      description: "An AI tool that classifies a political alignment, like left, center, and right, according to a given piece of text.",
      imageUrl: "ClearScope_enter_text.png",
      images: ["ClearScope.png", "ClearScope_enter_text.png", "ClearScope_Analysis.png"],
      longDescription: "The Political Bias Classifier is an AI-powered tool designed to identify the political alignment—Left, Center, or Right—of a given piece of text, such as news articles or headlines. The project began with traditional NLP techniques using TF-IDF and logistic regression, and evolved into a more advanced pipeline leveraging transformer models like BERT and DeBERTa-v3 for greater accuracy and contextual understanding. The classifier is trained on a labeled dataset of real-world news content, using techniques like Stratified K-Fold Cross-Validation to ensure balanced evaluation. It incorporates curriculum learning to gradually train the model on more complex samples, improving performance and generalization. The primary goal of this project was educational: to deepen my understanding of natural language processing and machine learning workflows. Through this experience, I have gained valuable insights and now have a clearer idea for a different, but related project to explore next.",
      technologies: [
        "Jupyter Notebook",
        "Python",
        "Machine Learning",
        "NLP",
        "BERT",
        "DeBERTa-v3",
        "Logistic Regression",
        "TF-IDF",
        "Flask",
        "Pandas",
        "NumPy"
      ],
      demoUrl: ""
    },
  ]

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsDialogOpen(true)
  }

  useEffect(() => {
    const hi = "Hi, "
    const Im = "I'm "
    const name = "William Terterian. "
    const description = "I'm an ICT student at Fontys, and I'm passionate about finding logical solutions to problems. "
    const seeking = " I'm currently seeking an "
    const internship = "internship "
    const description2 = "to further"
    let hiIndex = 0
    let imIndex = 0
    let nameIndex = 0
    let descriptionIndex = 0
    let seekingIndex = 0
    let internshipIndex = 0
    let description2Index = 0
    const speed = 32 // typing speed in ms
    const typedTextElement = document.getElementById("typed-text-hi")
    const typedTextElement2 = document.getElementById("typed-text-Im")
    const typedTextElement3 = document.getElementById("typed-text-Name")
    const typedTextElement4 = document.getElementById("typed-text-Description")
    const typedTextElement5 = document.getElementById("typed-text-seeking")
    const typedTextElement6 = document.getElementById("typed-text-internship")
    const typedTextElement7 = document.getElementById("typed-text-description2")

    function typeHi() {
      if (hiIndex < hi.length && typedTextElement) {
        typedTextElement.innerHTML += hi.charAt(hiIndex++)
        setTimeout(typeHi, speed)
      } else {
        setTimeout(typeIm, 300)
      }
    }

    function typeIm() {
      if (imIndex < Im.length && typedTextElement2) {
        typedTextElement2.innerHTML += Im.charAt(imIndex++)
        setTimeout(typeIm, speed)
      } else {
        setTimeout(typeName, speed)
      }
    }

    function typeName() {
      if (nameIndex < name.length && typedTextElement3) {
        typedTextElement3.innerHTML += name.charAt(nameIndex++)
        setTimeout(typeName, speed)
      } else {
        setTimeout(typeDescription, 300)
      }
    }

    function typeDescription() {
      if (descriptionIndex < description.length && typedTextElement4) {
        typedTextElement4.innerHTML += description.charAt(descriptionIndex++)
        setTimeout(typeDescription, speed)
      } else {
        setTimeout(typeSeeking, 300)
      }
    }

    function typeSeeking() {
      if (seekingIndex < seeking.length && typedTextElement5) {
        typedTextElement5.innerHTML += seeking.charAt(seekingIndex++)
        setTimeout(typeSeeking, speed)
      } else {
        setTimeout(typeInternship, speed)
      }
    }

    function typeInternship() {
      if (internshipIndex < internship.length && typedTextElement6) {
        typedTextElement6.innerHTML += internship.charAt(internshipIndex++)
        setTimeout(typeInternship, speed)
      } else {
        setTimeout(typeDescription2, speed)
      }
    }

    function typeDescription2() {
      if (description2Index < description2.length && typedTextElement7) {
        typedTextElement7.innerHTML += description2.charAt(description2Index++)
        setTimeout(typeDescription2, speed)
      }
    }

    typeHi()
  }, [])

  const [projectsVisible, setProjectsVisible] = useState(false)
  const [techStackVisible, setTechStackVisible] = useState(false)
  const projectsRef = useRef<HTMLDivElement>(null)
  const techStackRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProjectsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px", // Adjust this to control when the animation triggers
      },
    )

    if (projectsRef.current) {
      observer.observe(projectsRef.current)
    }

    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTechStackVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.05, // Trigger when 5% of the element is visible
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (techStackRef.current) {
      observer.observe(techStackRef.current)
    }

    return () => {
      if (techStackRef.current) {
        observer.unobserve(techStackRef.current)
      }
    }
  }, [])

  return (
    <div className="grid grid-rows-[auto_1fr_auto] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-geist bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <StickyHeader projectsRef={projectsRef} techStackRef={techStackRef} contactRef={contactRef} />

      <main className="row-start-2 w-full flex flex-col items-center justify-center gap-8">
        <div className="flex justify-center w-full sm:w-auto">
          <Avatar className="w-[40vw] h-[40vw] sm:w-[30vw] sm:h-[30vw] md:w-[25vw] md:h-[25vw] lg:w-[20vw] lg:h-[20vw] bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shadow-lg">
            <AvatarImage src="foto.jpg" alt="Your Name" className="w-full h-full object-cover" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col justify-center items-center w-full gap-4 mt-10 sm:mt-0">
          <div className="text-xl sm:text-5xl font-bold text-center h-[120px] sm:h-[200px] flex items-center">
            <p className="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-lg m-0">
              <span id="typed-text-hi"></span>
              <span id="typed-text-Im"></span>
              <span className="text-blue-400" id="typed-text-Name"></span>
              <span id="typed-text-Description"></span>
              <span id="typed-text-seeking"></span>
              <span className="text-blue-400" id="typed-text-internship"></span>
              <span id="typed-text-description2"></span>
            </p>
          </div>
        </div>
      </main>

      <div>
        <div
          ref={projectsRef}
          id="projects_section"
          className={`flex flex-col gap-8 w-full sm:w-[80vw] lg:w-[60vw] transition-all duration-1000 opacity-0 translate-y-10 ${projectsVisible ? "opacity-100 translate-y-0" : ""}`}
        >
          <h1 className="text-center text-3xl sm:text-5xl font-bold text-black dark:text-white">Projects</h1>

          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedProject.title}</DialogTitle>
                  <DialogDescription>{selectedProject.description}</DialogDescription>
                </DialogHeader>

                <div className="my-4">
                  <Carousel className="w-full mb-6">
                    <CarouselContent>
                      {selectedProject.images.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1 flex items-center justify-center h-[400px] sm:h-[450px]">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`${selectedProject.title} - Image ${index + 1}`}
                              className="w-full object-contain h-auto max-h-[400px] sm:max-h-[450px] rounded-md shadow-md"
                              loading="lazy"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>

                  <div className="space-y-4">
                    <p>{selectedProject.longDescription}</p>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter className="flex sm:justify-end gap-2">
                  {selectedProject.demoUrl && (
                    <Button onClick={() => window.open(selectedProject.demoUrl, "_blank")}>
                      <span className="mr-2">Live Demo</span>
                      <ExternalLink size={16} />
                    </Button>
                  )}
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div
        ref={techStackRef}
        className={`flex flex-col gap-8 w-full sm:w-[80vw] lg:w-[60vw] transition-all duration-1000 opacity-0 translate-y-10 ${techStackVisible ? "opacity-100 translate-y-0" : ""}`}
      >
        <div className="space-y- mb-16">
          <TechStack />
        </div>
      </div>

      <Badge
        variant="outline"
        className="flex items-center gap-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-300 rounded-full px-3 py-1 text-sm"
      >
        <svg
          className="w-4 h-4 animate-spin text-yellow-800 dark:text-yellow-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        This page is still a work in progress.
      </Badge>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  )
}
