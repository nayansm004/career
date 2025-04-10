
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const OPENAI_API_KEY = "your-openai-api-key"; // For future use
const RAPIDAPI_KEY = "your-rapidapi-key"; // For future use

const demoInternships = [
  { title: "UI/UX Design Intern", company: "CreativeLabs", location: "Remote", duration: "3 months", tags: ["Design"] },
  { title: "Graphic Design Intern", company: "PixelForge", location: "New York, NY", duration: "2 months", tags: ["Design"] },
  { title: "Content Writing Intern", company: "WriteAway", location: "Remote", duration: "4 months", tags: ["Writing"] },
  { title: "Software Engineering Intern", company: "CodeSmith", location: "San Francisco, CA", duration: "6 months", tags: ["Tech"] },
  { title: "Marketing Intern", company: "Brandify", location: "Los Angeles, CA", duration: "3 months", tags: ["Business"] },
  { title: "AI Research Intern", company: "DeepNet AI", location: "Remote", duration: "6 months", tags: ["Tech"] },
  { title: "Finance Analyst Intern", company: "MoneyMatters", location: "Chicago, IL", duration: "3 months", tags: ["Business"] },
];

const demoCareerSuggestions = (interests, skills, attributes) => {
  const suggestions = [];
  const lowerI = interests.toLowerCase();
  const lowerS = skills.toLowerCase();
  const lowerA = attributes.toLowerCase();

  if (lowerI.includes("design") || lowerS.includes("ui") || lowerA.includes("creative")) {
    suggestions.push("UX Designer", "Product Designer", "Graphic Designer");
  }
  if (lowerI.includes("writing") || lowerS.includes("communication")) {
    suggestions.push("Content Writer", "Editor", "Copywriter");
  }
  if (lowerI.includes("tech") || lowerS.includes("coding") || lowerS.includes("programming")) {
    suggestions.push("Software Developer", "AI Engineer", "Data Scientist");
  }
  if (lowerI.includes("marketing") || lowerS.includes("sales")) {
    suggestions.push("Marketing Manager", "SEO Specialist", "Product Marketer");
  }
  if (lowerI.includes("finance") || lowerS.includes("analytics")) {
    suggestions.push("Financial Analyst", "Investment Banker", "Data Analyst");
  }

  return suggestions.length > 0 ? `Based on your input, you may thrive in careers such as:\n\n${suggestions.map(s => `• ${s}`).join("\n")}` :
    "Try exploring interdisciplinary fields like Product Management, Digital Strategy, or Entrepreneurship.";
};

const CareerPortal = () => {
  const [interests, setInterests] = useState("");
  const [skills, setSkills] = useState("");
  const [attributes, setAttributes] = useState("");
  const [careerSuggestion, setCareerSuggestion] = useState("");
  const [internships, setInternships] = useState([]);

  const suggestCareer = () => {
    try {
      const suggestion = demoCareerSuggestions(interests, skills, attributes);
      setCareerSuggestion(suggestion);
    } catch (error) {
      console.error("Error generating career suggestion:", error);
      setCareerSuggestion("Sorry, something went wrong. Please try again later.");
    }
  };

  const applyInternship = (title) => {
    alert(`Applied for ${title} internship!`);
  };

  const searchInternships = () => {
    const filtered = demoInternships.filter((internship) =>
      internship.title.toLowerCase().includes(interests.toLowerCase()) ||
      internship.tags.some(tag => tag.toLowerCase().includes(interests.toLowerCase()))
    );
    setInternships(filtered);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800 dark:text-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center">🌟 AI Career Guidance & Internship Tracker</h1>
      <Tabs defaultValue="career" className="w-full">
        <TabsList>
          <TabsTrigger value="career">Career Guidance</TabsTrigger>
          <TabsTrigger value="internships">Internship Tracker</TabsTrigger>
        </TabsList>

        <TabsContent value="career">
          <Card className="my-4">
            <CardContent className="space-y-4 p-4">
              <Textarea placeholder="Describe your interests..." value={interests} onChange={(e) => setInterests(e.target.value)} />
              <Textarea placeholder="List your skills..." value={skills} onChange={(e) => setSkills(e.target.value)} />
              <Textarea placeholder="Mention your personal attributes (e.g., analytical, empathetic)..." value={attributes} onChange={(e) => setAttributes(e.target.value)} />
              <Button onClick={suggestCareer}>✨ Get Career Suggestion</Button>
              {careerSuggestion && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="mt-4 font-medium whitespace-pre-line bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
                    {careerSuggestion}
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="internships">
          <Card className="my-4">
            <CardContent className="space-y-4 p-4">
              <Input placeholder="Enter a field or keyword (e.g., tech, design)..." value={interests} onChange={(e) => setInterests(e.target.value)} />
              <Button onClick={searchInternships}>🔍 Search Internships</Button>
              <div className="space-y-4 mt-4">
                {internships.map((internship, index) => (
                  <Card key={index} className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-md">
                    <div className="mb-2 text-lg font-semibold">{internship.title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <p><strong>Company:</strong> {internship.company}</p>
                      <p><strong>Location:</strong> {internship.location}</p>
                      <p><strong>Duration:</strong> {internship.duration}</p>
                    </div>
                    <Button className="mt-2" onClick={() => applyInternship(internship.title)}>🚀 Apply Now</Button>
                  </Card>
                ))}
                {internships.length === 0 && <p className="text-gray-600 dark:text-gray-400">No internships found for your interest.</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CareerPortal;
