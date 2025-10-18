import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Globe, MessageSquare, FileText, Phone, Users, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const features = [
    {
      icon: Globe,
      title: "Website Translation",
      description: "Public and authenticated site translation with dialect support",
      href: "/experiences/web",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Real-time chat translation with dual-pane view",
      href: "/experiences/chat",
    },
    {
      icon: FileText,
      title: "Document Translation",
      description: "Upload and translate documents with bilingual preview",
      href: "/experiences/documents",
    },
    {
      icon: Phone,
      title: "IVR & Voice",
      description: "Speech-to-speech translation for phone interactions",
      href: "/experiences/ivr",
    },
    {
      icon: Users,
      title: "Email Support",
      description: "Inbound and outbound email translation",
      href: "/experiences/email",
    },
    {
      icon: MapPin,
      title: "Field Services",
      description: "In-store and field mobile translation support",
      href: "/experiences/field",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Multilingual CX
            <span className="block text-primary mt-2">Without Boundaries</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience end-to-end multilingual customer experience across Website, Documents, IVR, Chat, Email, and In-Field interactions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/personas">
            <Button size="lg" className="gap-2 text-lg px-8">
              Start the Day in the Life
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/journey">
            <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
              Explore Journey Map
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Coverage Statement */}
      <section className="bg-primary/10 rounded-xl p-8 text-center">
        <p className="text-2xl font-semibold text-foreground">
          Invictus resolves{" "}
          <span className="text-primary text-3xl font-bold">~90%</span>{" "}
          of multilingual friction across the R2B journey.
        </p>
      </section>

      {/* Features Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            Experience Modules
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore how translation works across every customer touchpoint
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={feature.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Value Proposition */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            Why Invictus?
          </h2>
          <p className="text-lg text-muted-foreground">
            Single vendor, end-to-end multilingual coverage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Transparent Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Interactive overlay provides clear visibility into what's covered vs. not across your entire journey.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>150+ Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Support for Spanish dialects (MX, PR, CO, US) and 150+ languages across all channels.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CRM Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All feedback and transcripts automatically captured and written to your CRM for action.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

