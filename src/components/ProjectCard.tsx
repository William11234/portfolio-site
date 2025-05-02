"use client"

import type React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  description: string
  imageUrl: string
  inProgress?: boolean
  onClick?: () => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl, inProgress = false, onClick }) => {
  return (
    <Card
      className="w-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-row">
        <div className="flex-1 p-4">
          <CardHeader className="p-0 mb-2">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-2xl">{title}</CardTitle>
              {inProgress && (
                <Badge
                  variant="outline"
                  className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-300"
                >
                  In Progress
                </Badge>
              )}
            </div>
            <CardDescription className="text-md">{description}</CardDescription>
          </CardHeader>
          <CardContent className="p-0" />
        </div>

        <div className="w-48 h-auto">
          <img
            src={imageUrl || "/placeholder.svg?height=200&width=200"}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </Card>
  )
}

export default ProjectCard
