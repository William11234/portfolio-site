"use client"

import type React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

interface ProjectCardProps {
  title: string
  description: string
  imageUrl: string
  onClick?: () => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl, onClick }) => {
  return (
    <Card
      className="w-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-row">
        <div className="flex-1 p-4">
          <CardHeader className="p-0 mb-2">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="p-0" />
        </div>

        <div className="w-48 h-auto">
          <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        </div>
      </div>
    </Card>
  )
}

export default ProjectCard
