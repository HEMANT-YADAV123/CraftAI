import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { AnalyticsAnimation } from "./AnalyticsAnimation";
import { motion } from "motion/react";
import {
  Phone,
  Zap,
  Shield,
  BarChart,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Target
} from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { useBreadcrumbSchema } from "../hooks/useBreadcrumbSchema";
import shubhamLogo from "../assets/images/shubham.png";
import heroHousingLogo from "../assets/images/heroHousing.png";
import srgHousingLogo from "../assets/images/srgHousing.png";

interface HomePageProps {
  onNavigateToDemo: () => void;
}

export function HomePage({ onNavigateToDemo }: HomePageProps) {
  // SEO meta tags for homepage
  usePageMeta({
    title: "CraftAI - Voice AI Platform for Lenders | Debt Collection & Lead Generation",
    description: "Transform your lending operations with CraftAI's intelligent Voice AI agents. Automate debt collection, EMI reminders, and lead generation with 70% cost reduction and 3x higher on-time payments. 100% FDCPA & TCPA compliant.",
    keywords: "voice AI, lending platform, debt collection AI, EMI reminders, lead generation, AI voice agents, FDCPA compliant, TCPA compliant, collection automation, lending technology",
    canonicalUrl: "https://app.craftai.tech/"
  });

  // Breadcrumb structured data for SEO
  useBreadcrumbSchema([
    { name: "Home", url: "https://app.craftai.tech/" }
  ]);
  const features = [
    {
      icon: Phone,
      title: "AI-Powered Outbound Calls",
      description: "ML based strategy driven voice AI calls for debt collection and lead generation that understands past context and adapts tone and strategies in real-time"
    },
    {
      icon: BarChart,
      title: "Real-Time Analytics",
      description: "Track contactibility, promise to pay rates, and payment intent with comprehensive dashboards and actionable insights"
    },
    {
      icon: Zap,
      title: "Automated Omnichannel Outreach",
      description: "Reach more debtors and potential leads at the right time by leveraging WhatsApp, SMS, Rich Communication Service, and email in addition to voice calling all driven using a co-ordinated strategy"
    },
    {
      icon: TrendingUp,
      title: "Increase Recovery Rates",
      description: "Boost your recovery rates by up to 40% with personalized, empathetic conversations at scale"
    },
    {
      icon: Target,
      title: "Smart Prioritization",
      description: "AI-powered scoring helps you focus on high-value accounts with the best probability of payment"
    },
    {
      icon: Shield,
      title: "100% Compliant",
      description: "Stay compliant with FDCPA, TCPA, and state regulations. Our AI is trained on the latest compliance requirements"
    }
  ];

  const benefits = [
    "Reduce operational costs by up to 70%",
    "Improve right party contact rates",
    "Scale your collections effortlessly",
    "Maintain compliance automatically",
    "Increase promise-to-pay conversions",
    "Real-time payment processing"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Zap className="w-4 h-4" />
                <span className="text-sm">Voice AI for Lenders</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
                Transform Your Lending Operations with Voice AI
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Scale lending with higher recoveries and lower costs. Transform your debt collection operations with intelligent AI voice agents, ML-driven strategies, and real-time co-pilots designed specifically for lenders.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  onClick={onNavigateToDemo}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 cursor-pointer"
                >
                  Try Live Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 border-primary/20 hover:border-primary cursor-pointer">
                  Schedule a Call
                </Button>
              </div>

              <div className="flex items-center gap-8 mt-12">
                <div>
                  <div className="text-3xl text-primary">500K+</div>
                  <div className="text-sm text-muted-foreground">Calls Completed</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <div className="text-3xl text-accent">3x</div>
                  <div className="text-sm text-muted-foreground">Higher On-Time Payments</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <div className="text-3xl text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Compliant</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AnalyticsAnimation />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-primary/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">
              Everything You Need to Modernize Lending
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful AI technology designed to increase warm leads and recovery rates while maintaining compliance and improving customer relationship
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">
              How CraftAI Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Industry Leading Time to Value. See results in days, not months.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 text-2xl text-white">
                1
              </div>
              <h3 className="mb-3">Upload Your Campaign</h3>
              <p className="text-muted-foreground">
                Securely upload your debtor data with account details, payment history, and contact information
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 text-2xl text-white">
                2
              </div>
              <h3 className="mb-3">AI Makes the Calls</h3>
              <p className="text-muted-foreground">
                Our intelligent voice agents reach out to debtors, negotiate payment plans, and handle objections
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 text-2xl text-white">
                3
              </div>
              <h3 className="mb-3">Track & Recover</h3>
              <p className="text-muted-foreground">
                Monitor performance in real-time and watch your recovery rates increase with actionable insights
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-primary/5">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl mb-6">
                Why Leading Lenders Choose CraftAI
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join India's top lending agencies that are already using AI to transform their lending operations
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <img
                  src={shubhamLogo}
                  alt="Shubham Housing Finance - CraftAI Partner"
                  width="200"
                  height="80"
                  loading="lazy"
                  className="h-16 md:h-20 w-auto object-contain"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <img
                  src={heroHousingLogo}
                  alt="Hero Housing Finance - CraftAI Partner"
                  width="200"
                  height="80"
                  loading="lazy"
                  className="h-16 md:h-20 w-auto object-contain"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src={srgHousingLogo}
                  alt="SRG Housing Finance Limited - CraftAI Partner"
                  width="200"
                  height="80"
                  loading="lazy"
                  className="h-16 md:h-20 w-auto object-contain"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-12 text-center border-border bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
            <h2 className="text-4xl md:text-5xl mb-4">
              Read to Transform Your Lending?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              See how CraftAI can help you find more warm leads, recover more, reduce costs, and stay compliant. Try our live demo or schedule a personalized walkthrough.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg"
                onClick={onNavigateToDemo}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8"
              >
                Try Live Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary/20 hover:border-primary">
                Talk to Our Team
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
