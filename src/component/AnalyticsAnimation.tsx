import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function AnalyticsAnimation() {
  const [activeBar, setActiveBar] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBar((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { 
      height: 30, 
      label: "Promise to Pay", 
      value: "False",
      displayValue: "False",
      isNegative: true
    },
    { 
      height: 65, 
      label: "Risk Indicators", 
      value: "Job Loss",
      displayValue: "Job Loss",
      isWarning: true
    },
    { 
      height: 90, 
      label: "Intent to Pay", 
      value: "High",
      displayValue: "High"
    },
    { 
      height: 35, 
      label: "Ability to Pay", 
      value: "Low",
      displayValue: "Low",
      isNegative: true
    },
  ];

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent rounded-3xl" />
      
      {/* Main chart container */}
      <div className="relative w-full max-w-md h-64 flex items-end justify-around gap-4 px-8">
        {metrics.map((metric, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-3">
            {/* Value indicator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: activeBar === index ? 1 : 0,
                y: activeBar === index ? 0 : 10 
              }}
              transition={{ duration: 0.3 }}
              className={`text-sm px-3 py-1 rounded-full whitespace-nowrap ${
                metric.isNegative 
                  ? "text-red-600 bg-red-50" 
                  : metric.isWarning
                  ? "text-amber-600 bg-amber-50"
                  : "text-primary bg-primary/10"
              }`}
            >
              {metric.displayValue}
            </motion.div>

            {/* Bar */}
            <motion.div
              className="w-full rounded-t-xl bg-gradient-to-t relative overflow-hidden"
              initial={{ height: 0 }}
              animate={{ 
                height: `${metric.height}%`,
              }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: "easeOut" 
              }}
              style={{
                background:
                  activeBar === index
                    ? metric.isNegative
                      ? "linear-gradient(to top, #EF4444, #DC2626)"
                      : metric.isWarning
                      ? "linear-gradient(to top, #F59E0B, #D97706)"
                      : "linear-gradient(to top, #8B5CF6, #3B82F6)"
                    : metric.isNegative
                    ? "linear-gradient(to top, #FEE2E2, #FECACA)"
                    : metric.isWarning
                    ? "linear-gradient(to top, #FEF3C7, #FDE68A)"
                    : "linear-gradient(to top, #E9D5FF, #DBEAFE)",
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "linear",
                }}
              />
            </motion.div>

            {/* Label */}
            <span className="text-xs text-muted-foreground text-center leading-tight whitespace-nowrap">{metric.label}</span>
          </div>
        ))}
      </div>

      {/* Floating metrics */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-8 left-8 bg-card border border-border rounded-xl px-4 py-3 shadow-lg"
      >
        <div className="text-xs text-muted-foreground">Contactibility Rate</div>
        <div className="text-2xl text-primary mt-1">94.2%</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute top-24 right-8 bg-card border border-border rounded-xl px-4 py-3 shadow-lg"
      >
        <div className="text-xs text-muted-foreground">Avg. Call Time</div>
        <div className="text-2xl text-accent mt-1">54s</div>
      </motion.div>
    </div>
  );
}
