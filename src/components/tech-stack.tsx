"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Code2, Coffee, PenTool, Atom, FileCode, Database, Brain, FileJson } from "lucide-react"

interface TechItem {
  name: string
  icon: React.ReactNode
  color: string
}

export default function TechStack() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const techItems: TechItem[] = [
    {
      name: "C#",
      icon: <span className="text-sm font-bold">CS</span>,
      color: "bg-purple-100 dark:bg-purple-900/30",
    },
    { name: "Java", icon: <Coffee size={24} />, color: "bg-orange-100 dark:bg-orange-900/30" },
    { name: "Python", icon: <PenTool size={24} />, color: "bg-blue-100 dark:bg-blue-900/30" },
    { name: "React", icon: <Atom size={24} />, color: "bg-cyan-100 dark:bg-cyan-900/30" },
    { name: "TypeScript", icon: <FileCode size={24} />, color: "bg-blue-100 dark:bg-blue-900/30" },
    { name: "MSSQL", icon: <Database size={24} />, color: "bg-gray-100 dark:bg-gray-800" },
    { name: "Machine Learning", icon: <Brain size={24} />, color: "bg-green-100 dark:bg-green-900/30" },
    { name: "HTML", icon: <Code2 size={24} />, color: "bg-red-100 dark:bg-red-900/30" },
    { name: "CSS", icon: <FileJson size={24} />, color: "bg-blue-100 dark:bg-blue-900/30" },
  ]

  useEffect(() => {
    const currentSection = sectionRef.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (currentSection) {
      observer.observe(currentSection)
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection)
      }
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      className={`w-full transition-all duration-1000 opacity-0 translate-y-10 ${isVisible ? "opacity-100 translate-y-0" : ""}`}
    >
      <h1 className="text-center text-3xl sm:text-5xl font-bold text-black dark:text-white mb-8">Tech Stack</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {techItems.slice(0, 4).map((tech, index) => (
          <div
            key={tech.name}
            className={`transition-all duration-500 opacity-0 translate-y-4 ${
              isVisible ? "opacity-100 translate-y-0" : ""
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className={`flex flex-col items-center justify-center p-6 ${tech.color} h-full`}>
                <div className="mb-3">{tech.icon}</div>
                <p className="font-medium text-center">{tech.name}</p>
              </CardContent>
            </Card>
          </div>
        ))}

        <div className="col-span-2 sm:col-span-3 md:col-span-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:max-w-[90%] mx-auto">
            {techItems.slice(4).map((tech, index) => (
              <div
                key={tech.name}
                className={`transition-all duration-500 opacity-0 translate-y-4 ${
                  isVisible ? "opacity-100 translate-y-0" : ""
                }`}
                style={{ transitionDelay: `${(index + 4) * 100}ms` }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className={`flex flex-col items-center justify-center p-6 ${tech.color} h-full`}>
                    <div className="mb-3">{tech.icon}</div>
                    <p className="font-medium text-center">{tech.name}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
