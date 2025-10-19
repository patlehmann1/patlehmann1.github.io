'use client'

import { Download } from 'lucide-react'
import { Button } from './button'

export function ResumeDownloadButton() {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Want to Learn More?</h3>
        <p className="text-muted-foreground">
          Download my resume for a complete overview of my experience and skills.
        </p>
      </div>
      <Button
        asChild
        size="lg"
        className="group"
      >
        <a
          href="/Patrick W. Lehmann - Software Engineer.pdf"
          download="Patrick-Lehmann-Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download Patrick Lehmann's resume as PDF"
        >
          <Download className="mr-2 h-5 w-5 transition-transform group-hover:translate-y-0.5" />
          Download Resume
        </a>
      </Button>
    </div>
  )
}
