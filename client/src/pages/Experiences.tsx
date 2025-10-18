import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, MessageSquare, FileText, Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Experiences() {
  const experiences = [
    {
      icon: Globe,
      title: "Website Translation",
      description: "Public and authenticated site translation with dialect support",
      href: "/experiences/web",
      color: "text-blue-600",
    },
    {
      icon: Mail,
      title: "Email Viewer",
      description: "Inbound and outbound email translation with dual-pane view",
      href: "/experiences/email",
      color: "text-purple-600",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Real-time chat translation with sentiment analysis",
      href: "/experiences/chat",
      color: "text-green-600",
    },
    {
      icon: Phone,
      title: "IVR & Voice",
      description: "Speech-to-speech translation for phone interactions",
      href: "/experiences/ivr",
      color: "text-orange-600",
    },
    {
      icon: FileText,
      title: "Document Translation",
      description: "Upload and translate documents with bilingual preview",
      href: "/experiences/documents",
      color: "text-red-600",
    },
    {
      icon: MapPin,
      title: "Field Services",
      description: "In-store and field mobile translation support",
      href: "/experiences/field",
      color: "text-teal-600",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Experience Modules
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore how multilingual translation works across every customer touchpoint
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((experience, index) => {
          const Icon = experience.icon;
          return (
            <motion.div
              key={experience.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={experience.href}>
                <Card className="h-full hover:shadow-lg transition-all cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg bg-primary/10 ${experience.color} group-hover:bg-primary group-hover:text-primary-foreground transition-colors`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-xl">{experience.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {experience.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

