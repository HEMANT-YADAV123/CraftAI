import { Card } from "./ui/card";
import { motion } from "motion/react";
import { Linkedin } from "lucide-react";
import { Footer } from "./Footer";

interface AboutUsProps {
  onNavigate: (page: string) => void;
}

export function AboutUs({ onNavigate }: AboutUsProps) {
  const teamMembers = [
    {
      name: "Shobhita Agarwal",
      role: "Co-Founder & CEO",
      image: "/src/assets/images/shobhita.jpg",
      bio: "She brings over 13 years of experience in technology, having previously served as Head of Engineering at a US-based collections startup. With professional stints at Amazon and Samsung, she combines global exposure with deep expertise in Indian lending and international collections best practices.",
      linkedin: "https://www.linkedin.com/in/shobhitaagarwal/"
    },
    {
      name: "Abhinav Garg",
      role: "Co-Founder & COO",
      image: "/src/assets/images/abhinav.jpg",
      bio: "With 4 years of experience in technology, he previously led product and operations at PhonePe Alumni. he brings strong expertise in building AI-driven products, combining technical knowledge with hands-on product leadership.",
      linkedin: "https://www.linkedin.com/in/abhinavgarg01/"
    },
    {
      name: "Sayandeep Sarkar",
      role: "Co-Founder & CTO",
      image: "/src/assets/images/sayandeep.jpg",
      bio: "He has 7 years of experience in technology, having previously served as Head of Engineering at Skycap, where he led engineering initiatives across collections and healthcare. His core expertise lies in AI and data engineering, with a strong focus on building scalable, impactful solutions.",
      linkedin: "https://www.linkedin.com/in/sandy247/"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* At Craft AI Section */}
        <section className="py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl mb-8 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
              At Craft AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-5xl mx-auto leading-relaxed">
              At Craft AI, we believe conversations can shape trust, strengthen relationships, and drive business outcomes. Our mission is simple: to empower financial institutions and businesses with intelligent, human-like voice AI agents that deliver results—fast, reliable, and at scale.
            </p>
          </motion.div>
        </section>

        {/* Who we are Section */}
        <section className="py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-8">
              Who we are
            </h2>
            <p className="text-lg text-muted-foreground max-w-5xl mx-auto leading-relaxed">
              We are a team of product thinkers, engineers, and innovators passionate about AI-driven customer engagement. With deep expertise in fintech, lending, and voice technologies, we built Craft AI to solve a pressing problem: making customer communication not just automated, but truly effective and empathetic.
            </p>
          </motion.div>
        </section>

        {/* Meet The Team Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl mb-4">
                Meet The Team
              </h2>
              <p className="text-lg text-muted-foreground">
                Meet our small team that make those great products.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Card className="p-8 border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                  {/* Profile Image */}
                  <div className="mb-6 flex justify-center">
                    <div className="w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="text-2xl mb-2">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="text-muted-foreground mb-4">
                    {member.role}
                  </p>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  {/* LinkedIn Link */}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-primary/10 transition-colors"
                    aria-label={`${member.name}'s LinkedIn profile`}
                  >
                    <Linkedin className="w-5 h-5 text-primary" />
                  </a>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

      </div>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
