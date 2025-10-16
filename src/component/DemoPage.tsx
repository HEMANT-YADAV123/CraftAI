import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { CallPulse } from "./CallPulse";
import { motion } from "motion/react";
import { Phone, CheckCircle2, ArrowLeft, Zap, Brain, Target, AlertCircle } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { useBreadcrumbSchema } from "../hooks/useBreadcrumbSchema";
import { getEnv } from "../utils/env";
import arunImage from "../assets/images/arun_headshotweb.webp";
import priyaImage from "../assets/images/priya_headshotweb.webp";
import triptiImage from "../assets/images/tripti_headshotweb.webp";

interface DemoPageProps {
  onBack: () => void;
}

type AgentType = "priya" | "tripti" | "arun";

// Bolna API status types - matching the actual API responses
type BolnaCallStatus =
  | "queued"
  | "initiated"
  | "ringing"
  | "in-progress"
  | "call-disconnected"
  | "completed"
  | "no-answer"
  | "busy"
  | "failed"
  | "canceled"
  | "balance-low"
  | "stopped"
  | "error";

// UI-facing call status
type CallStatus = "idle" | "calling" | "connected" | "ended" | "error";

interface AgentConfig {
  id: AgentType;
  name: string;
  description: string;
  image: string;
  accent: string;
  agentId: string;
}

export function DemoPage({ onBack }: DemoPageProps) {
  // SEO meta tags for demo page
  usePageMeta({
    title: "Live Demo - CraftAI Voice AI Platform | Try Our AI Agents",
    description: "Experience CraftAI's intelligent Voice AI agents in action. Try our live demo with Priya (Lead Generation), Tripti (EMI Reminders), or Arun (Debt Collection). See how AI-powered voice calls transform lending operations.",
    keywords: "voice AI demo, AI voice agent demo, debt collection demo, EMI reminder demo, lead generation AI, live voice AI demo",
    canonicalUrl: "https://app.craftai.tech/demo"
  });

  // Breadcrumb structured data for SEO
  useBreadcrumbSchema([
    { name: "Home", url: "https://app.craftai.tech/" },
    { name: "Demo", url: "https://app.craftai.tech/demo" }
  ]);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null);
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [callDuration, setCallDuration] = useState(0);
  const [executionId, setExecutionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Refs for cleanup
  const pollingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const durationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Poll execution status from Bolna API
  const pollExecutionStatus = async (execId: string): Promise<void> => {
    try {
      const apiToken = getEnv('VITE_BOLNA_API_KEY');
      const response = await fetch(`https://api.bolna.ai/executions/${execId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${apiToken || "dummy-token"}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch execution status: ${response.status}`);
      }

      const data = await response.json();
      const status = data.status as BolnaCallStatus;

      // Map Bolna status to UI status
      mapBolnaStatusToUIStatus(status, data);

      // If call is in a terminal state, stop polling
      if (isTerminalStatus(status)) {
        stopPolling();
      }
    } catch (err) {
      console.error("Error polling execution status:", err);
    }
  };

  // Check if status is terminal (no more updates expected)
  const isTerminalStatus = (status: BolnaCallStatus): boolean => {
    return [
      "completed",
      "call-disconnected",
      "no-answer",
      "busy",
      "failed",
      "canceled",
      "stopped",
      "error"
    ].includes(status);
  };

  // Map Bolna API status to UI call status
  const mapBolnaStatusToUIStatus = (status: BolnaCallStatus, data?: { conversation_time?: number }) => {
    switch (status) {
      case "queued":
      case "initiated":
      case "ringing":
        setCallStatus("calling");
        break;

      case "in-progress":
        setCallStatus("connected");
        // Start duration timer if not already started
        if (!durationIntervalRef.current) {
          durationIntervalRef.current = setInterval(() => {
            setCallDuration((prev) => prev + 1);
          }, 1000);
        }
        break;

      case "call-disconnected":
      case "completed":
        setCallStatus("ended");
        // Use conversation_time from API if available
        if (data?.conversation_time) {
          setCallDuration(Math.floor(data.conversation_time));
        }
        stopDurationTimer();
        break;

      case "no-answer":
      case "busy":
      case "balance-low":
        setError(getStatusErrorMessage(status));
        setCallStatus("error");
        stopDurationTimer();
        break;

      case "failed":
      case "canceled":
      case "stopped":
      case "error":
        setError(getStatusErrorMessage(status));
        setCallStatus("error");
        stopDurationTimer();
        break;
    }
  };

  // Get user-friendly error messages for different statuses
  const getStatusErrorMessage = (status: BolnaCallStatus): string => {
    switch (status) {
      case "no-answer":
        return "No answer - The recipient did not pick up the call";
      case "busy":
        return "Line busy - The recipient is currently on another call";
      case "balance-low":
        return "Insufficient balance - Please contact support";
      case "failed":
        return "Call failed - Please try again";
      case "canceled":
        return "Call was canceled";
      case "stopped":
        return "Call was stopped";
      case "error":
        return "An error occurred during the call";
      default:
        return "Call could not be completed";
    }
  };

  // Start polling for execution status
  const startPolling = (execId: string) => {
    // Poll immediately
    pollExecutionStatus(execId);

    // Then poll every 2 seconds
    pollingIntervalRef.current = setInterval(() => {
      pollExecutionStatus(execId);
    }, 2000);
  };

  // Stop polling
  const stopPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  };

  // Stop duration timer
  const stopDurationTimer = () => {
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }
  };

  // Dummy agent configuration with Bolna API credentials
  const agents: AgentConfig[] = [
    {
      id: "priya" as AgentType,
      name: "Priya",
      description: "Calls leads and asks questions to gauge interest",
      image: priyaImage,
      accent: "from-primary to-purple-600",
      agentId: getEnv('VITE_BOLNA_AGENT_PRIYA') || "priya-agent-uuid-001",
    },
    {
      id: "tripti" as AgentType,
      name: "Tripti",
      description: "Reminds customers of their upcoming EMIs and educates them on the importance of paying on time",
      image: triptiImage,
      accent: "from-accent to-blue-600",
      agentId: getEnv('VITE_BOLNA_AGENT_TRIPTI') || "tripti-agent-uuid-002",
    },
    {
      id: "arun" as AgentType,
      name: "Arun",
      description: "Professional debt collector that negotiates with customers and pushes for payment post bounce",
      image: arunImage,
      accent: "from-purple-500 to-accent",
      agentId: getEnv('VITE_BOLNA_AGENT_ARUN') || "arun-agent-uuid-003",
    },
  ];

  const makeCall = async () => {
    if (!phoneNumber || !selectedAgent) return;

    setIsLoading(true);
    setError(null);
    setCallStatus("calling");

    const selectedAgentConfig = agents.find((a) => a.id === selectedAgent);
    if (!selectedAgentConfig) {
      setError("Agent configuration not found");
      setCallStatus("error");
      setIsLoading(false);
      return;
    }

    // Prepare Bolna API payload
    const payload = {
      agent_id: selectedAgentConfig.agentId,
      recipient_phone_number: phoneNumber.replace(/\s+/g, ""), // Remove spaces
      user_data: {
        agent_name: selectedAgentConfig.name,
        call_type: selectedAgent,
        timestamp: new Date().toISOString(),
        demo_mode: "true",
      },
    };

    try {
      const apiToken = getEnv('VITE_BOLNA_API_KEY');

      // Call Bolna API
      const response = await fetch("https://api.bolna.ai/call", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiToken || "dummy-token"}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorDetails = data?.error || data?.message || response.statusText || "Unknown error";
        throw new Error(`API Error (${response.status}): ${errorDetails}`);
      }

      if (data.execution_id) {
        setExecutionId(data.execution_id);

        // Start polling for real-time status updates from Bolna API
        startPolling(data.execution_id);
      } else {
        throw new Error(`Unexpected response format: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to initiate call";
      setError(errorMessage);
      setCallStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const endCall = async () => {
    // Stop polling and duration timer
    stopPolling();
    stopDurationTimer();

    // Call Bolna API to stop the call if we have an execution ID
    if (executionId) {
      try {
        const apiToken = getEnv('VITE_BOLNA_API_KEY');
        await fetch(`https://api.bolna.ai/call/${executionId}/stop`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiToken || "dummy-token"}`,
            "Content-Type": "application/json",
          },
        });
      } catch {
        // Silently fail - the UI will still show call as ended
      }
    }

    setCallStatus("ended");
  };

  const resetCall = () => {
    // Stop polling and duration timer
    stopPolling();
    stopDurationTimer();

    setCallStatus("idle");
    setCallDuration(0);
    setPhoneNumber("");
    setSelectedAgent(null);
    setExecutionId(null);
    setError(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPolling();
      stopDurationTimer();
    };
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 text-foreground hover:bg-primary/10 hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Experience Our Voice AI in Action
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter your phone number and select an agent to receive a live demo call
            </p>
          </motion.div>
        </div>

        {callStatus === "idle" || callStatus === "ended" || callStatus === "error" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 border-border">
              {callStatus === "ended" && (
                <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-primary mb-1">Call Completed!</h4>
                    <p className="text-sm text-muted-foreground">
                      Duration: {formatDuration(callDuration)} - Execution ID: {executionId}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Our AI agent demonstrated natural conversation, context understanding, and intelligent responses.
                    </p>
                  </div>
                </div>
              )}

              {callStatus === "error" && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-red-600 mb-1">Call Failed</h4>
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={isLoading}
                    className="mt-2 h-12 bg-input-background border-border focus:border-primary"
                  />
                </div>

                <div>
                  <Label>Select Agent</Label>
                  <div className="grid md:grid-cols-3 gap-4 mt-3">
                    {agents.map((agent) => (
                      <button
                        key={agent.id}
                        onClick={() => setSelectedAgent(agent.id)}
                        disabled={isLoading}
                        aria-label={`Select ${agent.name} - ${agent.description}`}
                        aria-pressed={selectedAgent === agent.id}
                        className={`p-4 rounded-xl border-2 transition-all text-left flex flex-col items-center ${
                          selectedAgent === agent.id
                            ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                            : "border-border hover:border-primary/50 bg-card"
                        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <div className="mb-3 flex items-center justify-center h-16 w-16">
                          <img
                            src={agent.image}
                            alt={`${agent.name} - CraftAI Voice AI Agent for ${agent.description}`}
                            className="w-16 h-16 rounded-full object-fit"
                          />
                        </div>
                        <h4 className="mb-1 text-center w-full">{agent.name}</h4>
                        <p className="text-sm text-muted-foreground text-center w-full">
                          {agent.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={callStatus === "ended" || callStatus === "error" ? resetCall : makeCall}
                  disabled={(!phoneNumber || !selectedAgent) && callStatus === "idle"}
                  className="w-full h-14 bg-gradient-to-r from-primary to-accent hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {isLoading && "Initiating..."}
                  {!isLoading && (callStatus === "ended" || callStatus === "error") && "Try Another Agent"}
                  {!isLoading && callStatus === "idle" && "Start Demo Call"}
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-16 border-border text-center bg-gradient-to-br from-card via-card to-primary/5">
              <div className="flex flex-col items-center">
                <CallPulse />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mt-12 space-y-6"
                >
                  {callStatus === "connected" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="mb-8"
                    >
                      <div className="text-6xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                        {formatDuration(callDuration)}
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-3">
                    <h2 className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {callStatus === "calling" ? "Calling" : "Connected"}
                    </h2>
                    
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <p className="text-xl text-muted-foreground">
                        {agents.find((a) => a.id === selectedAgent)?.name}
                      </p>
                    </motion.div>

                    <p className="text-lg text-muted-foreground/70">
                      {phoneNumber}
                    </p>

                    {executionId && (
                      <p className="text-sm text-muted-foreground/50 mt-4">
                        Execution ID: {executionId}
                      </p>
                    )}
                  </div>

                  {callStatus === "calling" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-8 flex items-center justify-center gap-3"
                    >
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.3, 1, 0.3]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.2,
                              ease: "easeInOut"
                            }}
                            className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">Establishing connection</span>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8"
                  >
                    <Button
                      size="lg"
                      variant="destructive"
                      onClick={endCall}
                      className="w-48 bg-red-600 hover:bg-red-700"
                    >
                      End Call
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6 border-border text-center bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <h4 className="mb-2">Instant Response</h4>
            <p className="text-sm text-muted-foreground">
              AI responds in milliseconds, just like a human
            </p>
          </Card>
          <Card className="p-6 border-border text-center bg-gradient-to-br from-accent/5 to-transparent">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
            </div>
            <h4 className="mb-2">Context Aware</h4>
            <p className="text-sm text-muted-foreground">
              Understands conversation flow and remembers context
            </p>
          </Card>
          <Card className="p-6 border-border text-center bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-500/60 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <h4 className="mb-2">Goal Oriented</h4>
            <p className="text-sm text-muted-foreground">
              Trained to achieve specific outcomes efficiently
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}