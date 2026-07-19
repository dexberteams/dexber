"use client";

import { notFound } from "next/navigation";
import teamData from "@/data/team.json";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Mail, Phone, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// This is a client component to avoid issues with generateStaticParams on dynamic routes if not needed
// In a full implementation, you could use server components and generateStaticParams
export default function TeamMemberDetails({ params }: { params: { id: string, locale: string } }) {
  const member = teamData.members.find(m => m.id === params.id);

  if (!member) {
    notFound();
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <Link href={`/${params.locale}/about`} className="inline-block mb-8">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to About
          </Button>
        </Link>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-12"
        >
          {/* Header Section */}
          <motion.div variants={fadeIn} className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-48 h-48 rounded-2xl overflow-hidden bg-muted shrink-0 border border-brand-blue/20">
              <img
                src={`/images/about/${member.id.replace(/-/g, '')}.png`}
                alt={member.name}
                className="object-cover w-full h-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=0D8ABC&color=fff';
                }}
              />
            </div>
            
            <div className="space-y-4 flex-1">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">{member.name}</h1>
                <p className="text-xl text-brand-blue font-semibold mt-2">{member.role}</p>
              </div>
              
              <div className="flex flex-wrap gap-4 text-muted-foreground pt-2">
                <a href={`mailto:${member.contact.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                  {member.contact.email}
                </a>
                <a href={`tel:${member.contact.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                  {member.contact.phone}
                </a>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {member.links.map((link, idx) => (
                  <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer">
                    <Badge variant="outline" className="hover:bg-brand-blue/10 cursor-pointer">
                      {link.name} <ExternalLink className="w-3 h-3 ml-1" />
                    </Badge>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-bold text-white border-b border-border pb-2">Skills</h2>
            <div className="grid gap-4">
              {member.skills.map((skillGroup, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <span className="font-semibold text-brand-blue min-w-[120px]">{skillGroup.category}:</span>
                  <span className="text-muted-foreground">{skillGroup.items}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experience Section */}
          <motion.div variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-bold text-white border-b border-border pb-2">Experience</h2>
            <div className="space-y-6">
              {member.experience.map((exp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <h3 className="text-xl font-semibold text-foreground">{exp.role}</h3>
                    <span className="text-sm text-brand-blue">{exp.duration}</span>
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {exp.company} | {exp.location}
                  </div>
                  <ul className="list-disc list-inside text-muted-foreground/80 space-y-1 pt-2">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Projects Section */}
          <motion.div variants={fadeIn} className="space-y-4">
            <h2 className="text-2xl font-bold text-white border-b border-border pb-2">Projects</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {member.projects.map((project, idx) => (
                <Card key={idx} className="bg-muted/30 border-brand-blue/20">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">{project.name}</h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {project.features.map((feature, fIdx) => (
                        <li key={fIdx} className="line-clamp-2" title={feature}>{feature}</li>
                      ))}
                    </ul>
                    <div className="pt-2 text-xs">
                      <span className="text-brand-blue font-semibold">Tech: </span>
                      <span className="text-muted-foreground">{project.technologies}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Education & Languages */}
          <motion.div variants={fadeIn} className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white border-b border-border pb-2">Education</h2>
              {member.education.map((edu, idx) => (
                <div key={idx}>
                  <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                  <p className="text-muted-foreground">{edu.institution}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white border-b border-border pb-2">Languages</h2>
              {member.languages.map((lang, idx) => (
                <div key={idx}>
                  <h3 className="font-semibold text-foreground">{lang.language}</h3>
                  <p className="text-muted-foreground text-sm">{lang.proficiency}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
