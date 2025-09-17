import { useState } from "react";
import { Calendar, Mail, BookOpen, FileText, Code, Image, Play, Zap } from "lucide-react";
import HeroSection from "../components/HeroSection";
import ToolGrid from "../components/ToolGrid";
import TaskSchedulerModal from "../components/modals/TaskSchedulerModal";
import TextSummarizerModal from "../components/modals/TextSummarizerModal";
import CodeExplainerModal from "../components/modals/CodeExplainerModal";
import ImageCaptionModal from "../components/modals/ImageCaptionModal";
import KnowledgeAgentModal from "../components/modals/KnowledgeAgentModal";
import EmailAssistantModal from "../components/modals/EmailAssistantModal";

const tools = [
  {
    id: "task-scheduler",
    title: "Task Scheduler",
    description: "Schedule meetings and events with natural language",
    icon: Calendar,
    color: "bg-peach",
    category: "Productivity"
  },
  {
    id: "email-assistant",
    title: "Email Assistant",
    description: "Draft, reply, and manage emails intelligently",
    icon: Mail,
    color: "bg-coral",
    category: "Communication"
  },
  {
    id: "knowledge-agent",
    title: "Knowledge Agent",
    description: "Search and analyze documents for insights",
    icon: BookOpen,
    color: "bg-peach",
    category: "Research"
  },
  {
    id: "text-summarizer",
    title: "Text Summarizer",
    description: "Create concise summaries of long content",
    icon: FileText,
    color: "bg-coral",
    category: "Content"
  },
  {
    id: "code-explainer",
    title: "Code Explainer",
    description: "Understand and document code functionality",
    icon: Code,
    color: "bg-peach",
    category: "Development"
  },
  {
    id: "image-caption",
    title: "Image Caption",
    description: "Generate descriptions and alt text for images",
    icon: Image,
    color: "bg-coral",
    category: "Content"
  }
];

const Dashboard = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [modalPrefill, setModalPrefill] = useState<any>(null);

  const openTool = (toolId: string, prefill?: any) => {
    setSelectedTool(toolId);
    setModalPrefill(prefill || null);
  };

  const closeTool = () => {
    setSelectedTool(null);
    setModalPrefill(null);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <HeroSection onQuickRun={(text) => openTool("task-scheduler", { text })} />

      {/* Tool Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-12">
          <h2 className="section-title">AI Tools & Agents</h2>
          <p className="text-lg text-navy/70 mb-8">
            Choose from our collection of specialized AI agents to help with your tasks
          </p>
        </div>

        <ToolGrid tools={tools} onToolSelect={openTool} />

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="panel p-6 text-center">
            <div className="w-12 h-12 bg-peach border-2 border-navy rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Zap className="w-6 h-6 text-navy" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">6+ AI Tools</h3>
            <p className="text-navy/70">Specialized agents for different tasks</p>
          </div>
          
          <div className="panel p-6 text-center">
            <div className="w-12 h-12 bg-coral border-2 border-navy rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Play className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">Instant Results</h3>
            <p className="text-navy/70">Get AI assistance in seconds</p>
          </div>
          
          <div className="panel p-6 text-center">
            <div className="w-12 h-12 bg-peach border-2 border-navy rounded-lg mx-auto mb-4 flex items-center justify-center">
              <FileText className="w-6 h-6 text-navy" />
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">Export Ready</h3>
            <p className="text-navy/70">Download results in multiple formats</p>
          </div>
        </div>
      </div>

      {/* Tool Modals */}
      {selectedTool === "task-scheduler" && (
        <TaskSchedulerModal 
          isOpen={true} 
          onClose={closeTool} 
          prefill={modalPrefill}
        />
      )}
      
      {selectedTool === "text-summarizer" && (
        <TextSummarizerModal 
          isOpen={true} 
          onClose={closeTool} 
          prefill={modalPrefill}
        />
      )}
      
      {selectedTool === "code-explainer" && (
        <CodeExplainerModal 
          isOpen={true} 
          onClose={closeTool} 
          prefill={modalPrefill}
        />
      )}
      
      {selectedTool === "image-caption" && (
        <ImageCaptionModal 
          isOpen={true} 
          onClose={closeTool} 
          prefill={modalPrefill}
        />
      )}
      
      {selectedTool === "knowledge-agent" && (
        <KnowledgeAgentModal 
          isOpen={true} 
          onClose={closeTool} 
          prefill={modalPrefill}
        />
      )}
      
      {selectedTool === "email-assistant" && (
        <EmailAssistantModal 
          isOpen={true} 
          onClose={closeTool} 
          prefill={modalPrefill}
        />
      )}
    </div>
  );
};

export default Dashboard;