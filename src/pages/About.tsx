
import React from 'react';
import { Award, Users, Heart, Leaf, Truck, Shield } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Award,
      title: 'Quality First',
      description: 'We source only the finest materials and work with skilled artisans to create clothing that stands the test of time.',
    },
    {
      icon: Heart,
      title: 'Passion for Design',
      description: 'Every piece is thoughtfully designed with attention to detail, comfort, and timeless appeal.',
    },
    {
      icon: Leaf,
      title: 'Sustainable Practices',
      description: 'We are committed to ethical manufacturing and sustainable practices that respect our planet.',
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'We believe in building lasting relationships with our customers and supporting our local community.',
    },
  ];

  const team = [
    {
      name: 'Alex Thompson',
      role: 'Founder & Creative Director',
      description: 'With over 15 years in fashion design, Alex brings a vision of minimalist elegance to every collection.',
    },
    {
      name: 'Sarah Chen',
      role: 'Head of Sustainability',
      description: 'Sarah ensures that every aspect of our production process aligns with our environmental values.',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Quality Manager',
      description: 'Marcus oversees our quality control processes, ensuring every garment meets our high standards.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-white_smoke to-isabelline dark:from-eerie_black dark:to-raisin_black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-light text-raisin_black dark:text-white_smoke mb-6">
            About Twenty 1
          </h1>
          <p className="text-xl text-jet dark:text-isabelline leading-relaxed">
            Founded in 2021, Twenty 1 represents a new era of conscious fashion. We believe that 
            exceptional clothing should be both beautiful and responsible, combining timeless design 
            with sustainable practices.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-light text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Twenty 1 was born from a simple observation: the fashion industry had lost its way. 
                  Fast fashion dominated, quality suffered, and sustainability was an afterthought. 
                  We knew there had to be a better way.
                </p>
                <p>
                  Our founders set out to create a brand that would stand for everything they valued: 
                  exceptional quality, timeless design, ethical production, and genuine care for both 
                  customers and the environment.
                </p>
                <p>
                  Today, we continue to honor these values in every garment we create. Each piece in 
                  our collection is designed to be worn and loved for years to come, representing our 
                  commitment to slow fashion and conscious consumption.
                </p>
              </div>
            </div>
            <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-raisin_black dark:bg-white_smoke rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white_smoke dark:text-raisin_black font-bold text-2xl">T</span>
                </div>
                <p className="text-muted-foreground">Founded 2021</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-foreground mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from design to production to customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
                    <value.icon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-foreground mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind Twenty 1's vision and mission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-muted to-muted/50 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-foreground mb-6">Our Commitment</h2>
          <p className="text-xl text-muted-foreground mb-8">
            We promise to continue pushing the boundaries of sustainable fashion while never 
            compromising on quality or style. Every purchase supports our mission to create 
            a more responsible fashion industry.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Lifetime Quality</h3>
              <p className="text-sm text-muted-foreground">Built to last with premium materials</p>
            </div>
            <div className="text-center">
              <Leaf className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Carbon Neutral</h3>
              <p className="text-sm text-muted-foreground">Committed to environmental responsibility</p>
            </div>
            <div className="text-center">
              <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">On all orders worldwide</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
