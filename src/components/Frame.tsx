"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import sdk, {
  AddFrame,
  SignIn as SignInCore,
  type Context,
} from "@farcaster/frame-sdk";
import { calculateTimeRemaining } from "~/lib/calculateTimeRemaining";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";

import { config } from "~/components/providers/WagmiProvider/config";
import { truncateAddress } from "~/lib/truncateAddress";
import { base } from "wagmi/chains";
import { useSession } from "next-auth/react";
// Remove unused WalletConnect modal-core import
import { Label } from "~/components/ui/label";
import { PROJECT_TITLE } from "~/lib/constants";

interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function TimerComponent({ timeRemaining }: { timeRemaining: TimeRemaining }) {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const targetProgress = useRef(0);

  useEffect(() => {
    const calculateProgress = () => {
      return 1 - (timeRemaining.days * 86400 + 
                timeRemaining.hours * 3600 + 
                timeRemaining.minutes * 60 + 
                timeRemaining.seconds) / (7 * 86400);
    };

    targetProgress.current = calculateProgress();
    
    const animate = () => {
      setProgress(prev => {
        const diff = targetProgress.current - prev;
        return prev + diff * 0.1; // Ease-out factor
      });
      
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
        requestAnimationFrame(animate);
      }
    };
    
    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [timeRemaining]);

  // Handle container resize
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
    });

    if (progressBarRef.current) {
      resizeObserver.observe(progressBarRef.current.parentElement!);
    }

    return () => resizeObserver.disconnect();
  }, [progress]);
  const [timeFormat, setTimeFormat] = useState<'12h' | '24h'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('timeFormat') as '12h' | '24h' || '24h';
    }
    return '24h';
  });

  const toggleTimeFormat = () => {
    const newFormat = timeFormat === '24h' ? '12h' : '24h';
    setTimeFormat(newFormat);
    localStorage.setItem('timeFormat', newFormat);
  };

  const formatHour = (hour: number) => {
    if (timeFormat === '12h') {
      return hour % 12 || 12;
    }
    return hour;
  };

  const getPeriod = (hour: number) => {
    return hour >= 12 ? 'PM' : 'AM';
  };
  return (
    <Card 
      className="crt-effect cursor-pointer" 
      onClick={toggleTimeFormat}
      onTouchStart={(e) => {
        e.preventDefault();
        toggleTimeFormat();
      }}
      onTouchEnd={(e) => e.preventDefault()}
      style={{
        transform: 'translateZ(0)', // Enable GPU acceleration
        touchAction: 'manipulation'
      }}
    >
      <CardHeader>
        <CardTitle className="blink">COUNTDOWN TO 5PM UTC</CardTitle>
        <CardDescription className="neon-text">
          TIME REMAINING
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="progress-container h-4 rounded-full bg-opacity-20 bg-neutral-800 overflow-hidden">
          <div 
            className="progress-bar h-full rounded-full relative" 
            ref={progressBarRef}
            style={{
              background: 'linear-gradient(90deg, var(--neon-green) 0%, var(--electric-blue) 50%, var(--hot-pink) 100%)',
              willChange: 'transform',
              transform: `scaleX(${progress})`
            }}
          >
            <div className="scanline-overlay absolute inset-0 bg-repeat opacity-20" 
                 style={{backgroundImage: 'repeating-linear-gradient(180deg, transparent 0px, transparent 1px, black 2px, black 3px)'}} />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="flex flex-col">
            <span className="text-4xl font-mono">{timeRemaining.days}</span>
            <span className="text-sm">DAYS</span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-mono">
              {formatHour(timeRemaining.hours)}
              <span className="text-sm">{timeFormat === '12h' && getPeriod(timeRemaining.hours)}</span>
            </span>
            <span className="text-sm">HOURS</span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-mono">{timeRemaining.minutes}</span>
            <span className="text-sm">MINUTES</span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-mono">{timeRemaining.seconds}</span>
            <span className="text-sm">SECONDS</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Frame() {
  // CSS variables for retro color palette
  const retroStyles = {
    '--neon-green': '#00FF00',
    '--hot-pink': '#FF00FF',
    '--electric-blue': '#0000FF',
  } as React.CSSProperties;

  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context>();
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [added, setAdded] = useState(false);

  const [addFrameResult, setAddFrameResult] = useState("");

  const addFrame = useCallback(async () => {
    try {
      await sdk.actions.addFrame();
    } catch (error) {
      if (error instanceof AddFrame.RejectedByUser) {
        setAddFrameResult(`Not added: ${error.message}`);
      }

      if (error instanceof AddFrame.InvalidDomainManifest) {
        setAddFrameResult(`Not added: ${error.message}`);
      }

      setAddFrameResult(`Error: ${error}`);
    }
  }, []);

  // Lock viewport height for mobile
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
    };
    
    setVh(); // Set initial height
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  // Update timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const load = async () => {
      const context = await sdk.context;
      if (!context) {
        return;
      }

      setContext(context);
      setAdded(context.client.added);

      // If frame isn't already added, prompt user to add it
      if (!context.client.added) {
        addFrame();
      }

      sdk.on("frameAdded", ({ notificationDetails }) => {
        setAdded(true);
      });

      sdk.on("frameAddRejected", ({ reason }) => {
        console.log("frameAddRejected", reason);
      });

      sdk.on("frameRemoved", () => {
        console.log("frameRemoved");
        setAdded(false);
      });

      sdk.on("notificationsEnabled", ({ notificationDetails }) => {
        console.log("notificationsEnabled", notificationDetails);
      });
      sdk.on("notificationsDisabled", () => {
        console.log("notificationsDisabled");
      });

      sdk.on("primaryButtonClicked", () => {
        console.log("primaryButtonClicked");
      });

      console.log("Calling ready");
      sdk.actions.ready({});

      // Removed MIPD Store integration since it's not being used
      // and was causing missing dependency errors
    };
    if (sdk && !isSDKLoaded) {
      console.log("Calling load");
      setIsSDKLoaded(true);
      load();
      return () => {
        sdk.removeAllListeners();
      };
    }
  }, [isSDKLoaded, addFrame, context?.client.added]);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        ...retroStyles,
        paddingTop: context?.client?.safeAreaInsets?.top ?? 0,
        paddingBottom: context?.client?.safeAreaInsets?.bottom ?? 0,
        paddingLeft: context?.client?.safeAreaInsets?.left ?? 0,
        paddingRight: context?.client?.safeAreaInsets?.right ?? 0,
        minHeight: '100svh',
        backgroundColor: 'black',
        color: 'var(--neon-green)',
        fontFamily: 'monospace',
      }}
    >
      <style>{`
        .crt-effect {
          position: relative;
          overflow: hidden;
        }
        .crt-effect::after {
          content: " ";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: 
            linear-gradient(0deg, 
              rgba(0,255,0,0.1) 50%, 
              rgba(0,255,0,0.2) 50%),
            repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.15) 0px,
              rgba(0, 0, 0, 0.15) 1px,
              transparent 1px,
              transparent 2px
            );
          z-index: 2;
          pointer-events: none;
          animation: scanline 6s linear infinite;
        }

        @keyframes scanline {
          from { background-position: 0 0; }
          to { background-position: 0 100vh; }
        }
        .blink {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        .neon-text {
          animation: neonPulse 1.5s ease-in-out infinite alternate;
          text-shadow: 0 0 5px var(--hot-pink),
                       0 0 10px var(--hot-pink),
                       0 0 20px var(--electric-blue);
        }
        @keyframes neonPulse {
          from {
            text-shadow: 0 0 5px var(--hot-pink),
                         0 0 10px var(--hot-pink),
                         0 0 20px var(--electric-blue);
          }
          to {
            text-shadow: 0 0 5px var(--electric-blue),
                         0 0 10px var(--electric-blue),
                         0 0 20px var(--hot-pink);
          }
        }
      `}</style>
      <div 
        className="w-[300px] mx-auto py-2 px-2"
        style={{
          touchAction: 'manipulation' // Prevent default touch behaviors
        }}
      >
        <TimerComponent timeRemaining={timeRemaining} />
      </div>
    </div>
  );
}
